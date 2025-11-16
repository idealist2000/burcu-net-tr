const { Resend } = require('resend');

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Send booking confirmation to customer
const sendBookingConfirmation = async (booking, consultant) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Burcfal <onboarding@resend.dev>',
      to: [booking.customerEmail],
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
    });

    if (error) {
      console.error('❌ Resend email error:', error);
      return false;
    }

    console.log('✅ Resend email sent to customer:', booking.customerEmail, '- ID:', data.id);
    return true;
  } catch (error) {
    console.error('❌ Resend email sending failed:', error.message);
    return false;
  }
};

// Send booking notification to consultant
const sendConsultantNotification = async (booking, consultant) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Burcfal <onboarding@resend.dev>',
      to: [consultant.email],
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
    });

    if (error) {
      console.error('❌ Resend email error:', error);
      return false;
    }

    console.log('✅ Resend email sent to consultant:', consultant.email, '- ID:', data.id);
    return true;
  } catch (error) {
    console.error('❌ Resend email sending failed:', error.message);
    return false;
  }
};

// Send booking confirmation with video link
const sendVideoLink = async (booking, consultant, jitsiUrl) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Burcfal <onboarding@resend.dev>',
      to: [booking.customerEmail],
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
    });

    if (error) {
      console.error('❌ Resend email error:', error);
      return false;
    }

    console.log('✅ Resend video link sent to:', booking.customerEmail, '- ID:', data.id);
    return true;
  } catch (error) {
    console.error('❌ Resend email sending failed:', error.message);
    return false;
  }
};

// Send admin notification for new booking
const sendAdminNotification = async (booking, consultant) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Burcfal <onboarding@resend.dev>',
      to: [process.env.ADMIN_EMAIL],
      subject: '🔔 Yeni Randevu Talebi - Burcfal Admin',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #9333ea;">📢 Yeni Randevu Bildirimi</h2>
          <p>Merhaba Admin,</p>
          <p>Sistemde yeni bir randevu talebi oluşturuldu!</p>

          <div style="background: #f3e8ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #7c3aed; margin-top: 0;">👥 Müşteri Bilgileri</h3>
            <p><strong>Ad Soyad:</strong> ${booking.customerName}</p>
            <p><strong>Telefon:</strong> <a href="tel:${booking.customerPhone}">${booking.customerPhone}</a></p>
            <p><strong>E-posta:</strong> <a href="mailto:${booking.customerEmail}">${booking.customerEmail}</a></p>
          </div>

          <div style="background: #dbeafe; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #2563eb; margin-top: 0;">🔮 Randevu Detayları</h3>
            <p><strong>Falcı:</strong> ${consultant.name}</p>
            <p><strong>Hizmet:</strong> ${booking.fortuneName}</p>
            <p><strong>Fiyat:</strong> ${booking.price} ₺</p>
            <p><strong>Platform Komisyonu:</strong> ${booking.commission} ₺ (40%)</p>
            <p><strong>Falcı Kazancı:</strong> ${booking.consultantEarning} ₺ (60%)</p>
            <p><strong>Tarih:</strong> ${booking.preferredDate}</p>
            <p><strong>Saat:</strong> ${booking.preferredTime}</p>
            <p><strong>İletişim:</strong> ${getCommunicationMethodText(booking.communicationMethod)}</p>
          </div>

          ${booking.notes ? `
            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0;"><strong>📝 Müşteri Notu:</strong></p>
              <p style="margin: 10px 0 0 0;">${booking.notes}</p>
            </div>
          ` : ''}

          <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>💼 İşlem Durumu:</strong></p>
            <p style="margin: 10px 0 0 0;">✅ Müşteriye onay emaili gönderildi</p>
            <p style="margin: 10px 0 0 0;">✅ MongoDB'ye kaydedildi</p>
            <p style="margin: 10px 0 0 0;">📊 Randevu ID: ${booking._id}</p>
          </div>

          <p>Randevu detaylarını <a href="${process.env.FRONTEND_URL || 'https://burcfal.com.tr'}/admin">Admin Panelinden</a> görebilirsiniz.</p>

          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            <strong>Burcfal Sistem Bildirimi</strong>
          </p>
        </div>
      `
    });

    if (error) {
      console.error('❌ Admin email error:', error);
      return false;
    }

    console.log('✅ Admin notification sent - ID:', data.id);
    return true;
  } catch (error) {
    console.error('❌ Admin notification failed:', error.message);
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
  sendVideoLink,
  sendAdminNotification
};
