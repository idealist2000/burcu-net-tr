import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getConsultantById, fortuneTypes, communicationMethods } from '../data/consultantsData';
import './ConsultantDetail.css';

function ConsultantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const consultant = getConsultantById(id);

  const [bookingForm, setBookingForm] = useState({
    fortuneType: '',
    communicationMethod: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    preferredDate: '',
    preferredTime: '',
    notes: ''
  });

  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedFortune, setSelectedFortune] = useState(null);

  if (!consultant) {
    return (
      <div className="consultant-detail">
        <div className="error-message">
          <h2>Falcı bulunamadı</h2>
          <button onClick={() => navigate('/')}>Ana Sayfaya Dön</button>
        </div>
      </div>
    );
  }

  const handleFortuneSelect = (fortuneId) => {
    setSelectedFortune(fortuneTypes[fortuneId]);
    setBookingForm({ ...bookingForm, fortuneType: fortuneId });
    setShowBookingForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingForm({ ...bookingForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validasyonu
    if (!bookingForm.fortuneType || !bookingForm.communicationMethod ||
        !bookingForm.customerName || !bookingForm.customerEmail ||
        !bookingForm.customerPhone || !bookingForm.preferredDate ||
        !bookingForm.preferredTime) {
      alert('Lütfen tüm zorunlu alanları doldurun!');
      return;
    }

    // Burada gerçek uygulamada backend'e istek atılır
    const booking = {
      consultant: consultant.name,
      consultantId: consultant.id,
      ...bookingForm,
      fortuneName: selectedFortune.name,
      price: selectedFortune.price,
      createdAt: new Date().toISOString()
    };

    console.log('Randevu Oluşturuldu:', booking);

    alert(`
      Randevu talebiniz alındı!

      Falcı: ${consultant.name}
      Hizmet: ${selectedFortune.name}
      Fiyat: ${selectedFortune.price} ₺
      Tarih: ${bookingForm.preferredDate}
      Saat: ${bookingForm.preferredTime}

      En kısa sürede size dönüş yapılacaktır.
    `);

    // Form reset
    setBookingForm({
      fortuneType: '',
      communicationMethod: '',
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      preferredDate: '',
      preferredTime: '',
      notes: ''
    });
    setShowBookingForm(false);
    setSelectedFortune(null);
  };

  // Komisyon hesaplama (gelecekte kullanılabilir)
  // const earnings = selectedFortune ? calculateConsultantEarning(selectedFortune.price, consultant.commission) : null;

  return (
    <div className="consultant-detail">
      <div className="consultant-profile">
        {/* Profil Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            {consultant.profileImage ? (
              <img src={consultant.profileImage} alt={consultant.name} />
            ) : (
              <div className="avatar-placeholder-large">
                {consultant.name.charAt(0)}
              </div>
            )}
          </div>
          <div className="profile-info">
            <h1>{consultant.name}</h1>
            <p className="profile-title">{consultant.title}</p>
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-icon">⭐</span>
                <span className="stat-value">{consultant.rating}</span>
                <span className="stat-label">Puan</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">📊</span>
                <span className="stat-value">{consultant.totalReadings}</span>
                <span className="stat-label">Fal</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">🎓</span>
                <span className="stat-value">{consultant.experience}</span>
                <span className="stat-label">Deneyim</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hakkında */}
        <div className="profile-section">
          <h2>📖 Hakkında</h2>
          <p>{consultant.about}</p>
          <div className="availability">
            <strong>Müsaitlik:</strong> {consultant.availability}
          </div>
        </div>

        {/* İletişim Yöntemleri */}
        <div className="profile-section">
          <h2>💬 İletişim Yöntemleri</h2>
          <div className="communication-methods">
            {consultant.communicationMethods.map(method => (
              <div key={method} className="method-card">
                <span className="method-icon">{communicationMethods[method].icon}</span>
                <h3>{communicationMethods[method].name}</h3>
                <p>{communicationMethods[method].description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hizmetler */}
        <div className="profile-section">
          <h2>🔮 Sunulan Fal Hizmetleri</h2>
          <div className="services-list">
            {consultant.specialties.map(specId => {
              const fortune = fortuneTypes[specId];
              return (
                <div key={specId} className="service-item">
                  <div className="service-info">
                    <span className="service-icon">{fortune.icon}</span>
                    <div>
                      <h3>{fortune.name}</h3>
                      <p>{fortune.description}</p>
                      <p className="service-duration">Süre: {fortune.duration}</p>
                    </div>
                  </div>
                  <div className="service-price-action">
                    <span className="service-price">{fortune.price} ₺</span>
                    <button
                      className="book-btn"
                      onClick={() => handleFortuneSelect(specId)}
                    >
                      Randevu Al
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Randevu Formu */}
        {showBookingForm && selectedFortune && (
          <div className="booking-form-overlay">
            <div className="booking-form-container">
              <button
                className="close-form-btn"
                onClick={() => {
                  setShowBookingForm(false);
                  setSelectedFortune(null);
                }}
              >
                ✕
              </button>

              <h2>Randevu Al</h2>
              <div className="booking-summary">
                <p><strong>Falcı:</strong> {consultant.name}</p>
                <p><strong>Hizmet:</strong> {selectedFortune.name}</p>
                <p><strong>Fiyat:</strong> {selectedFortune.price} ₺</p>
                <p><strong>Süre:</strong> {selectedFortune.duration}</p>
              </div>

              <form onSubmit={handleSubmit} className="booking-form">
                <div className="form-group">
                  <label htmlFor="communicationMethod">İletişim Yöntemi *</label>
                  <select
                    id="communicationMethod"
                    name="communicationMethod"
                    value={bookingForm.communicationMethod}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Seçiniz</option>
                    {consultant.communicationMethods.map(method => (
                      <option key={method} value={method}>
                        {communicationMethods[method].name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="customerName">Adınız Soyadınız *</label>
                  <input
                    type="text"
                    id="customerName"
                    name="customerName"
                    value={bookingForm.customerName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="customerEmail">E-posta Adresiniz *</label>
                  <input
                    type="email"
                    id="customerEmail"
                    name="customerEmail"
                    value={bookingForm.customerEmail}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="customerPhone">Telefon Numaranız *</label>
                  <input
                    type="tel"
                    id="customerPhone"
                    name="customerPhone"
                    value={bookingForm.customerPhone}
                    onChange={handleInputChange}
                    placeholder="05XX XXX XX XX"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="preferredDate">Tercih Ettiğiniz Tarih *</label>
                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      value={bookingForm.preferredDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="preferredTime">Tercih Ettiğiniz Saat *</label>
                    <input
                      type="time"
                      id="preferredTime"
                      name="preferredTime"
                      value={bookingForm.preferredTime}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="notes">Notlarınız (Opsiyonel)</label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={bookingForm.notes}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Falcıya iletmek istediğiniz özel notlar..."
                  />
                </div>

                <div className="payment-note">
                  <p>⚠️ Ödeme bilgileri randevu onaylandıktan sonra tarafınıza iletilecektir.</p>
                </div>

                <button type="submit" className="submit-booking-btn">
                  Randevu Talebini Gönder
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ConsultantDetail;
