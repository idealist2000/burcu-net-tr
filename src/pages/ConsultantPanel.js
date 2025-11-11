import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../data/consultantsData';
import './ConsultantPanel.css';

function ConsultantPanel() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  // Örnek randevu verileri (gerçek uygulamada backend'den gelecek)
  const [bookings] = useState([
    {
      id: 1,
      consultantId: 1,
      consultantName: 'Onur',
      customerName: 'Ayşe Yılmaz',
      customerPhone: '0555 123 45 67',
      customerEmail: 'ayse@example.com',
      fortuneType: 'tarot',
      fortuneName: 'Tarot Falı',
      price: 300,
      communicationMethod: 'video',
      date: '2025-11-15',
      time: '14:00',
      status: 'completed',
      notes: 'İlk defa fal baktıracağım',
      createdAt: '2025-11-10'
    },
    {
      id: 2,
      consultantId: 2,
      consultantName: 'Elmas',
      customerName: 'Mehmet Kaya',
      customerPhone: '0555 987 65 43',
      customerEmail: 'mehmet@example.com',
      fortuneType: 'coffee',
      fortuneName: 'Kahve Falı',
      price: 200,
      communicationMethod: 'audio',
      date: '2025-11-15',
      time: '16:00',
      status: 'completed',
      notes: '',
      createdAt: '2025-11-10'
    },
    {
      id: 3,
      consultantId: 1,
      consultantName: 'Onur',
      customerName: 'Zeynep Demir',
      customerPhone: '0555 456 78 90',
      customerEmail: 'zeynep@example.com',
      fortuneType: 'katina',
      fortuneName: 'Katina Aşk Falı',
      price: 500,
      communicationMethod: 'video',
      date: '2025-11-16',
      time: '11:00',
      status: 'confirmed',
      notes: 'Aşk hayatım hakkında',
      createdAt: '2025-11-11'
    },
    {
      id: 4,
      consultantId: 1,
      consultantName: 'Onur',
      customerName: 'Fatma Arslan',
      customerPhone: '0555 222 33 44',
      customerEmail: 'fatma@example.com',
      fortuneType: 'clairvoyance',
      fortuneName: 'Durugörü',
      price: 400,
      communicationMethod: 'message',
      date: '2025-11-17',
      time: '10:00',
      status: 'pending',
      notes: 'İş hayatımla ilgili sorularım var',
      createdAt: '2025-11-12'
    }
  ]);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user || user.role !== 'consultant') {
      navigate('/login');
    } else {
      setCurrentUser(user);
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!currentUser) {
    return <div>Yükleniyor...</div>;
  }

  // Sadece kendi randevularını göster
  const myBookings = bookings.filter(b => b.consultantId === currentUser.id);

  // İstatistikler
  const totalEarnings = myBookings
    .filter(b => b.status === 'completed')
    .reduce((sum, b) => sum + (b.price * 0.6), 0); // %40 komisyon

  const pendingCount = myBookings.filter(b => b.status === 'pending').length;
  const confirmedCount = myBookings.filter(b => b.status === 'confirmed').length;
  const completedCount = myBookings.filter(b => b.status === 'completed').length;

  const getStatusText = (status) => {
    const statusMap = {
      pending: 'Beklemede',
      confirmed: 'Onaylandı',
      completed: 'Tamamlandı',
      cancelled: 'İptal'
    };
    return statusMap[status] || status;
  };

  const getStatusClass = (status) => {
    return `status-${status}`;
  };

  const getCommunicationText = (method) => {
    const map = {
      video: '📹 Video',
      audio: '🎙️ Sesli',
      message: '💬 Mesaj'
    };
    return map[method] || method;
  };

  return (
    <div className="consultant-panel">
      <div className="panel-header">
        <div>
          <h1>👤 Falcı Paneli</h1>
          <p className="welcome-text">Hoş geldiniz, <strong>{currentUser.name}</strong>!</p>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          🚪 Çıkış Yap
        </button>
      </div>

      {/* İstatistikler */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>Toplam Kazanç</h3>
            <p className="stat-value">{totalEarnings.toFixed(2)} ₺</p>
            <span className="stat-desc">Tamamlanan işlemler</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <h3>Bekleyen</h3>
            <p className="stat-value">{pendingCount}</p>
            <span className="stat-desc">Onay bekliyor</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>Onaylandı</h3>
            <p className="stat-value">{confirmedCount}</p>
            <span className="stat-desc">Görüşme planlandı</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-info">
            <h3>Tamamlandı</h3>
            <p className="stat-value">{completedCount}</p>
            <span className="stat-desc">Başarılı fal</span>
          </div>
        </div>
      </div>

      {/* İletişim Bilgileri */}
      <div className="contact-info-box">
        <h2>📞 İletişim Bilgileriniz</h2>
        <div className="contact-details">
          <div className="contact-item">
            <span className="contact-label">📱 Telefon:</span>
            <span className="contact-value">{currentUser.phone}</span>
          </div>
          <div className="contact-item">
            <span className="contact-label">📧 E-posta:</span>
            <span className="contact-value">{currentUser.email}</span>
          </div>
          <div className="contact-item">
            <span className="contact-label">👤 Kullanıcı Adı:</span>
            <span className="contact-value">{currentUser.username}</span>
          </div>
        </div>
      </div>

      {/* Randevular */}
      <div className="bookings-section">
        <h2>📋 Randevularım</h2>

        {myBookings.length === 0 ? (
          <div className="no-bookings">
            <p>Henüz randevunuz bulunmuyor.</p>
          </div>
        ) : (
          <div className="bookings-list">
            {myBookings.map(booking => (
              <div key={booking.id} className="booking-card">
                <div className="booking-header">
                  <div className="booking-id">#{booking.id}</div>
                  <span className={`status-badge ${getStatusClass(booking.status)}`}>
                    {getStatusText(booking.status)}
                  </span>
                </div>

                <div className="booking-body">
                  <div className="booking-row">
                    <span className="label">👤 Danışan:</span>
                    <strong>{booking.customerName}</strong>
                  </div>
                  <div className="booking-row">
                    <span className="label">📱 Telefon:</span>
                    <a href={`tel:${booking.customerPhone}`}>{booking.customerPhone}</a>
                  </div>
                  <div className="booking-row">
                    <span className="label">📧 E-posta:</span>
                    <a href={`mailto:${booking.customerEmail}`}>{booking.customerEmail}</a>
                  </div>
                  <div className="booking-row">
                    <span className="label">🔮 Hizmet:</span>
                    <strong>{booking.fortuneName}</strong>
                  </div>
                  <div className="booking-row">
                    <span className="label">💰 Fiyat:</span>
                    <strong className="price">{booking.price} ₺</strong>
                  </div>
                  <div className="booking-row">
                    <span className="label">💵 Kazancınız:</span>
                    <strong className="earning">{(booking.price * 0.6).toFixed(2)} ₺</strong>
                    <span className="commission-note">(%40 komisyon düşüldü)</span>
                  </div>
                  <div className="booking-row">
                    <span className="label">💬 İletişim:</span>
                    <strong>{getCommunicationText(booking.communicationMethod)}</strong>
                  </div>
                  <div className="booking-row">
                    <span className="label">📅 Tarih:</span>
                    <strong>{booking.date} - {booking.time}</strong>
                  </div>
                  {booking.notes && (
                    <div className="booking-notes">
                      <span className="label">📝 Notlar:</span>
                      <p>{booking.notes}</p>
                    </div>
                  )}
                </div>

                {booking.status === 'confirmed' && (
                  <div className="booking-actions">
                    <p className="reminder">
                      ⏰ Randevu zamanı yaklaşıyor! Lütfen {booking.date} tarihinde saat {booking.time}'de müşterinizle görüşmeyi unutmayın.
                    </p>
                    {booking.communicationMethod === 'video' && (
                      <p className="communication-note">
                        📹 Video görüşme için WhatsApp, Zoom veya Google Meet kullanabilirsiniz.
                      </p>
                    )}
                    {booking.communicationMethod === 'audio' && (
                      <p className="communication-note">
                        🎙️ Sesli görüşme için müşteriyi {booking.customerPhone} numarasından arayın.
                      </p>
                    )}
                    {booking.communicationMethod === 'message' && (
                      <p className="communication-note">
                        💬 Mesajlaşma için WhatsApp veya e-posta kullanabilirsiniz.
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ConsultantPanel;
