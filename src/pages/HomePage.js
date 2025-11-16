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

          <div className="hero-contact-buttons">
            <a
              href="https://wa.me/905305714067?text=Merhaba!%20Burcfal%20hakkında%20bilgi%20almak%20istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              className="contact-button whatsapp-button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp ile İletişime Geç
            </a>

            <a
              href="tel:905305714067"
              className="contact-button phone-button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              Hemen Ara: 0530 571 40 67
            </a>
          </div>
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
