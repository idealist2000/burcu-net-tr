const Booking = require('../models/Booking');
const Consultant = require('../models/Consultant');
const User = require('../models/User');
const { sendBookingConfirmation, sendConsultantNotification, sendVideoLink } = require('../services/emailService');
const { generateJitsiRoom } = require('../services/jitsiService');
const { generateWhatsAppUrl, generateBookingMessage } = require('../services/whatsappService');

// Create new booking
exports.createBooking = async (req, res) => {
  try {
    const {
      consultantId,
      consultantName,
      consultantPhone,
      customerName,
      customerEmail,
      customerPhone,
      fortuneType,
      fortuneName,
      price,
      communicationMethod,
      preferredDate,
      preferredTime,
      notes
    } = req.body;

    // Default commission (40%)
    const commissionRate = 40;
    const commission = (price * commissionRate) / 100;
    const consultantEarning = price - commission;

    // Create booking with frontend data (not using MongoDB Consultant model for now)
    const booking = await Booking.create({
      consultantId: consultantId.toString(), // Store as string for now
      consultantName: consultantName || 'Falcı',
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
      consultantEarning,
      status: 'pending'
    });

    // TODO: Send emails when consultant is in MongoDB
    // await sendBookingConfirmation(booking, { name: consultantName });

    console.log('✅ Booking created successfully:', booking._id);

    res.status(201).json({
      success: true,
      message: 'Randevu başarıyla oluşturuldu',
      data: booking
    });
  } catch (error) {
    console.error('❌ Booking creation error:', error);
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

