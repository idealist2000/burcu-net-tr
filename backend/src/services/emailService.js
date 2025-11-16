const sgMail = require('@sendgrid/mail');

// Initialize SendGrid with API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Send booking confirmation to customer
const sendBookingConfirmation = async (booking, consultant) => {
  try {
    const msg = {
      to: booking.customerEmail,
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@burcfal.com.tr',
      subject: '✨ Randevu Onayı - Burcfal',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #9333ea;">🔮 Randevunuz Alındı!</h2>
          <p>Merhaba <strong>${booking.customerName}</strong>,</p>
          <p>Burcfal üzerinden yaptığınız randevu talebiniz başarıyla alındı.</p>

          <div style="background: #f3e8ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #7c3aed; margin-top: 0;">📋 Randevu Detayları</h3>
            <p><strong>Falcı:</strong> ${consultant.name}</p>
            <p><strong>Hizmet:</strong> ${booking.fortuneName}</p>
            <p><strong>Fiyat:</strong> ${booking.price} ₺</p>
            <p><strong>Tarih:</strong> ${booking.preferredDate}</p>
            <p><strong>Saat:</strong> ${booking.preferredTime}</p>
            <p><strong>İletişim Yöntemi:</strong> ${getCommunicationMethodText(booking.communicationMethod)}</p>
          </div>

          ${booking.communicationMethod === 'video' ? `
            <div style="background: #dbeafe; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0;"><strong>📹 Video Görüşme:</strong></p>
              <p style="margin: 10px 0 0 0;">Randevu saatinizde size video görüşme linki gönderilecektir.</p>
            </div>
          ` : ''}

          <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>💰 Ödeme Bilgileri:</strong></p>
            <p style="margin: 10px 0 0 0;">Ödeme talimatları en kısa sürede e-posta ile gönderilecektir.</p>
          </div>

          <p>Randevunuz onaylandığında tekrar bilgilendirme yapılacaktır.</p>

          <p>Sorularınız için: <a href="mailto:${process.env.ADMIN_EMAIL}">${process.env.ADMIN_EMAIL}</a></p>

          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            Sevgilerle,<br>
            <strong>Burcfal Ekibi</strong>
          </p>
        </div>
      `
    };

    await sgMail.send(msg);
    console.log('✅ SendGrid email sent to customer:', booking.customerEmail);
    return true;
  } catch (error) {
    console.error('❌ SendGrid email sending failed:', error.message);
    if (error.response) {
      console.error('SendGrid error details:', error.response.body);
    }
    return false;
  }
};

// Send booking notification to consultant
const sendConsultantNotification = async (booking, consultant) => {
  try {
    const msg = {
      to: consultant.email,
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@burcfal.com.tr',
      subject: '🔔 Yeni Randevu Talebi - Burcfal',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #9333ea;">👤 Yeni Randevu Talebi</h2>
          <p>Merhaba <strong>${consultant.name}</strong>,</p>
          <p>Yeni bir randevu talebiniz var!</p>

          <div style="background: #f3e8ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #7c3aed; margin-top: 0;">👥 Danışan Bilgileri</h3>
            <p><strong>Ad Soyad:</strong> ${booking.customerName}</p>
            <p><strong>Telefon:</strong> <a href="tel:${booking.customerPhone}">${booking.customerPhone}</a></p>
            <p><strong>E-posta:</strong> <a href="mailto:${booking.customerEmail}">${booking.customerEmail}</a></p>
          </div>

          <div style="background: #dbeafe; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #2563eb; margin-top: 0;">🔮 Randevu Detayları</h3>
            <p><strong>Hizmet:</strong> ${booking.fortuneName}</p>
            <p><strong>Fiyat:</strong> ${booking.price} ₺</p>
            <p><strong>Kazancınız:</strong> ${booking.consultantEarning} ₺ (%60 komisyon sonrası)</p>
            <p><strong>Tarih:</strong> ${booking.preferredDate}</p>
            <p><strong>Saat:</strong> ${booking.preferredTime}</p>
            <p><strong>İletişim:</strong> ${getCommunicationMethodText(booking.communicationMethod)}</p>
          </div>

          ${booking.notes ? `
            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0;"><strong>📝 Danışan Notu:</strong></p>
              <p style="margin: 10px 0 0 0;">${booking.notes}</p>
            </div>
          ` : ''}

          <p>Lütfen <a href="${process.env.FRONTEND_URL}/falci-panel">Falcı Panelinize</a> giriş yaparak randevuyu onaylayın.</p>

          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            <strong>Burcfal Yönetimi</strong>
          </p>
        </div>
      `
    };

    await sgMail.send(msg);
    console.log('✅ SendGrid email sent to consultant:', consultant.email);
    return true;
  } catch (error) {
    console.error('❌ SendGrid email sending failed:', error.message);
    if (error.response) {
      console.error('SendGrid error details:', error.response.body);
    }
    return false;
  }
};

// Send booking confirmation with video link
const sendVideoLink = async (booking, consultant, jitsiUrl) => {
  try {
    const msg = {
      to: booking.customerEmail,
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@burcfal.com.tr',
      subject: '📹 Video Görüşme Linki - Burcfal',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #9333ea;">📹 Video Görüşme Zamanı!</h2>
          <p>Merhaba <strong>${booking.customerName}</strong>,</p>
          <p>Randevunuz için video görüşme linkiniz hazır.</p>

          <div style="background: #f3e8ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <p><strong>Falcı:</strong> ${consultant.name}</p>
            <p><strong>Tarih:</strong> ${booking.preferredDate}</p>
            <p><strong>Saat:</strong> ${booking.preferredTime}</p>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${jitsiUrl}" style="background: #9333ea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
              🎥 Görüşmeye Katıl
            </a>
          </div>

          <p style="background: #fef3c7; padding: 15px; border-radius: 8px;">
            <strong>💡 İpucu:</strong> Görüşmeye katılmadan önce mikrofon ve kameranızın çalıştığından emin olun.
          </p>

          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            İyi fallar!<br>
            <strong>Burcfal Ekibi</strong>
          </p>
        </div>
      `
    };

    await sgMail.send(msg);
    console.log('✅ SendGrid video link sent to:', booking.customerEmail);
    return true;
  } catch (error) {
    console.error('❌ SendGrid email sending failed:', error.message);
    if (error.response) {
      console.error('SendGrid error details:', error.response.body);
    }
    return false;
  }
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

module.exports = {
  sendBookingConfirmation,
  sendConsultantNotification,
  sendVideoLink
};
