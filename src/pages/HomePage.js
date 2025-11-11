import React from 'react';
import { Link } from 'react-router-dom';
import { getActiveConsultants, fortuneTypes } from '../data/consultantsData';
import './HomePage.css';

function HomePage() {
  const consultants = getActiveConsultants();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">✨ Burcfal'a Hoş Geldiniz ✨</h1>
          <p className="hero-subtitle">
            Profesyonel falcılarımızla geleceğinizi keşfedin
          </p>
          <p className="hero-description">
            Tarot, kahve falı, su falı ve daha fazlası...
            Deneyimli falcılarımız sizin için burada.
          </p>
        </div>
      </section>

      {/* Hizmetlerimiz */}
      <section className="services-section">
        <h2>🔮 Fal Hizmetlerimiz</h2>
        <div className="services-grid">
          {Object.values(fortuneTypes).map(fortune => (
            <div key={fortune.id} className="service-card">
              <span className="service-icon">{fortune.icon}</span>
              <h3>{fortune.name}</h3>
              <p>{fortune.description}</p>
              <div className="service-footer">
                <span className="price">{fortune.price} ₺</span>
                <span className="duration">{fortune.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Falcılarımız */}
      <section className="consultants-section">
        <h2>👥 Profesyonel Falcılarımız</h2>
        <div className="consultants-grid">
          {consultants.map(consultant => (
            <div key={consultant.id} className="consultant-card">
              <div className="consultant-header">
                <div className="consultant-avatar">
                  {consultant.profileImage ? (
                    <img src={consultant.profileImage} alt={consultant.name} />
                  ) : (
                    <div className="avatar-placeholder">
                      {consultant.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="consultant-info">
                  <h3>{consultant.name}</h3>
                  <p className="consultant-title">{consultant.title}</p>
                </div>
              </div>

              <div className="consultant-stats">
                <div className="stat">
                  <span className="stat-icon">⭐</span>
                  <span>{consultant.rating}</span>
                </div>
                <div className="stat">
                  <span className="stat-icon">📊</span>
                  <span>{consultant.totalReadings} Fal</span>
                </div>
                <div className="stat">
                  <span className="stat-icon">🎓</span>
                  <span>{consultant.experience}</span>
                </div>
              </div>

              <p className="consultant-about">{consultant.about}</p>

              <div className="consultant-specialties">
                <strong>Uzmanlık Alanları:</strong>
                <div className="specialty-tags">
                  {consultant.specialties.map(spec => (
                    <span key={spec} className="specialty-tag">
                      {fortuneTypes[spec].icon} {fortuneTypes[spec].name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="consultant-communication">
                <strong>İletişim:</strong>
                <div className="communication-icons">
                  {consultant.communicationMethods.includes('video') && <span title="Video Görüşme">📹</span>}
                  {consultant.communicationMethods.includes('audio') && <span title="Sesli Görüşme">🎙️</span>}
                  {consultant.communicationMethods.includes('message') && <span title="Mesajlaşma">💬</span>}
                </div>
              </div>

              <Link to={`/falci/${consultant.id}`} className="view-profile-btn">
                Profili Gör & Randevu Al
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Nasıl Çalışır */}
      <section className="how-it-works">
        <h2>📋 Nasıl Çalışır?</h2>
        <div className="steps-grid">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Falcı Seçin</h3>
            <p>Profesyonel falcılarımız arasından size uygun olanı seçin</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Fal Türü Belirleyin</h3>
            <p>Tarot, kahve falı, su falı veya diğer hizmetlerden birini seçin</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Randevu Alın</h3>
            <p>Size uygun tarih, saat ve iletişim yöntemini belirleyin</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Falınıza Bakın</h3>
            <p>Belirlenen zamanda falcınızla görüşün ve geleceğinizi keşfedin</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
