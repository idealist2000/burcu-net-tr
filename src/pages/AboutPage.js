import React from 'react';
import './AboutPage.css';

function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-container">
        <h1>🌟 Burcfal Hakkında</h1>

        <section className="about-section">
          <h2>Biz Kimiz?</h2>
          <p>
            Burcfal, Türkiye'nin en güvenilir online fal platformudur.
            Deneyimli ve profesyonel falcılarımızla, geleceğinizi keşfetmeniz
            ve hayatınıza yön vermeniz için buradayız.
          </p>
        </section>

        <section className="about-section">
          <h2>Misyonumuz</h2>
          <p>
            Mistik bilim ve geleneksel fal yöntemlerini modern teknoloji ile
            birleştirerek, herkesin kolayca erişebileceği kaliteli fal hizmeti sunmak.
          </p>
        </section>

        <section className="about-section">
          <h2>🔮 Hizmetlerimiz</h2>
          <ul className="services-list">
            <li>🃏 <strong>Tarot Falı:</strong> Kartların gizemli dünyasında geleceğinizi keşfedin</li>
            <li>💕 <strong>Katina Aşk Falı:</strong> Aşk hayatınız hakkında detaylı bilgi edinin</li>
            <li>💧 <strong>Su Falı:</strong> Suyun berraklığında geleceğinizin işaretlerini görün</li>
            <li>☕ <strong>Kahve Falı:</strong> Geleneksel Türk kahve falı ile yol haritanızı belirleyin</li>
            <li>🔮 <strong>Durugörü:</strong> Ruhsal enerji ile gelecek görümü</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>💎 Neden Burcfal?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">✅</div>
              <h3>Profesyonel Falcılar</h3>
              <p>Yıllarca deneyime sahip, alanında uzman falcılar</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Gizlilik</h3>
              <p>Tüm görüşmeleriniz tamamen gizli ve güvenlidir</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Hızlı Hizmet</h3>
              <p>Hızlı randevu sistemi ile kolayca falınıza bakın</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Çoklu İletişim</h3>
              <p>Video, sesli veya mesajlaşma ile dilediğiniz gibi görüşün</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Şeffaf Fiyatlandırma</h3>
              <p>Net ve açık fiyatlar, gizli ücret yok</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⭐</div>
              <h3>Yüksek Memnuniyet</h3>
              <p>Binlerce memnun müşteri yorumu</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>📞 İletişim</h2>
          <p>
            Sorularınız veya özel talepleriniz için bizimle iletişime geçebilirsiniz.
          </p>
          <div className="contact-info">
            <p>📧 Email: info@burcfal.com</p>
            <p>📱 WhatsApp: +90 555 123 45 67</p>
            <p>🕐 Çalışma Saatleri: 7/24 Online</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AboutPage;
