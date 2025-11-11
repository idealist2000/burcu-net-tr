const Booking = require('../models/Booking');
const Consultant = require('../models/Consultant');
const User = require('../models/User');
const { sendBookingConfirmation, sendConsultantNotification, sendVideoLink } = require('../services/emailService');
const { generateJitsiRoom } = require('../services/jitsiService');
const { generateWhatsAppUrl, generateBookingMessage } = require('../services/whatsappService');

// Create new booking
exports.createBooking = async (req, res) => {
  try {
    const { consultantId, customerName, customerEmail, customerPhone, fortuneType, fortuneName, price, communicationMethod, preferredDate, preferredTime, notes } = req.body;

    // Get consultant
    const consultant = await Consultant.findById(consultantId).populate('userId');
    if (!consultant) {
      return res.status(404).json({ success: false, message: 'Falcı bulunamadı' });
    }

    // Calculate commission
    const commission = (price * consultant.commission) / 100;
    const consultantEarning = price - commission;

    // Create booking
    const booking = await Booking.create({
      consultantId,
      customerName,
      customerEmail,
      customerPhone,
      fortuneType,
      fortuneName,
      price,
      communicationMethod,
      preferredDate,
      preferredTime,
      notes,
      commission,
      consultantEarning
    });

    // Send emails
    await sendBookingConfirmation(booking, { name: consultant.userId.name });
    await sendConsultantNotification(booking, consultant.userId);

    // Generate WhatsApp URL
    const whatsappUrl = generateWhatsAppUrl(consultant.userId.phone, generateBookingMessage(booking, { name: consultant.userId.name }));

    res.status(201).json({
      success: true,
      message: 'Randevu başarıyla oluşturuldu',
      booking,
      whatsappUrl
    });
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all bookings (admin)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('consultantId').sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get consultant bookings
exports.getConsultantBookings = async (req, res) => {
  try {
    const { consultantId } = req.params;
    const bookings = await Booking.find({ consultantId }).sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update booking status
exports.updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true });

    // If confirmed and video, generate Jitsi room
    if (status === 'confirmed' && booking.communicationMethod === 'video') {
      const consultant = await Consultant.findById(booking.consultantId).populate('userId');
      const jitsiRoom = generateJitsiRoom(booking._id, consultant.userId.name, booking.customerName);
      
      booking.jitsiRoomId = jitsiRoom.roomId;
      booking.jitsiRoomUrl = jitsiRoom.roomUrl;
      await booking.save();

      await sendVideoLink(booking, { name: consultant.userId.name }, jitsiRoom.roomUrl);
    }

    res.json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

