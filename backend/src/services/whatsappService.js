/**
 * WhatsApp Service
 * Basit Click-to-Chat implementasyonu
 * Gelecekte Twilio WhatsApp API entegrasyonu eklenebilir
 */

// Generate WhatsApp Click-to-Chat URL
const generateWhatsAppUrl = (phoneNumber, message) => {
  // Remove all non-numeric characters from phone
  const cleanPhone = phoneNumber.replace(/\D/g, '');

  // Encode message for URL
  const encodedMessage = encodeURIComponent(message);

  // Generate WhatsApp URL
  // Format: https://wa.me/905301234567?text=Hello
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
};

// Generate booking WhatsApp message template
const generateBookingMessage = (booking, consultant) => {
  return `Merhaba ${consultant.name}, Burcfal üzerinden randevu almak istiyorum.

📋 Randevu Bilgileri:
- Hizmet: ${booking.fortuneName}
- Tarih: ${booking.preferredDate}
- Saat: ${booking.preferredTime}
- İletişim: ${getCommunicationMethodText(booking.communicationMethod)}

Müsait misiniz?`;
};

// Generate confirmation WhatsApp message
const generateConfirmationMessage = (customerName, booking) => {
  return `Merhaba ${customerName}, Burcfal randevunuz onaylandı!

📋 Detaylar:
- Tarih: ${booking.preferredDate}
- Saat: ${booking.preferredTime}
- Hizmet: ${booking.fortuneName}

Randevu saatinizde görüşme linki gönderilecektir.

İyi fallar! 🔮`;
};

// Generate video link WhatsApp message
const generateVideoLinkMessage = (customerName, jitsiUrl, booking) => {
  return `Merhaba ${customerName}, video görüşme zamanınız geldi!

🎥 Görüşme Linki:
${jitsiUrl}

📅 ${booking.preferredDate} - ${booking.preferredTime}

Lütfen linke tıklayarak katılın.`;
};

// Helper function
const getCommunicationMethodText = (method) => {
  const map = {
    video: '📹 Video Görüşme',
    audio: '🎙️ Sesli Görüşme',
    message: '💬 Mesajlaşma'
  };
  return map[method] || method;
};

// Send WhatsApp notification (placeholder for future Twilio integration)
const sendWhatsAppNotification = async (phoneNumber, message) => {
  // TODO: Twilio WhatsApp API entegrasyonu
  // const client = require('twilio')(accountSid, authToken);
  // await client.messages.create({
  //   body: message,
  //   from: 'whatsapp:+14155238886',
  //   to: `whatsapp:+${phoneNumber}`
  // });

  console.log(`📱 WhatsApp notification would be sent to: ${phoneNumber}`);
  console.log(`Message: ${message}`);

  return {
    success: false,
    message: 'WhatsApp API not configured yet. Use click-to-chat instead.',
    whatsappUrl: generateWhatsAppUrl(phoneNumber, message)
  };
};

module.exports = {
  generateWhatsAppUrl,
  generateBookingMessage,
  generateConfirmationMessage,
  generateVideoLinkMessage,
  sendWhatsAppNotification
};
