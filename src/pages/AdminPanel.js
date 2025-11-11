import React, { useState } from 'react';
import { consultants, fortuneTypes, calculateConsultantEarning } from '../data/consultantsData';
import './AdminPanel.css';

function AdminPanel() {
  // Örnek randevu verileri (gerçek uygulamada backend'den gelecek)
  const [bookings] = useState([
    {
      id: 1,
      consultantId: 1,
      consultantName: 'Onur',
      customerName: 'Ayşe Yılmaz',
      fortuneType: 'tarot',
      fortuneName: 'Tarot Falı',
      price: 300,
      date: '2025-11-15',
      time: '14:00',
      status: 'completed',
      createdAt: '2025-11-10'
    },
    {
      id: 2,
      consultantId: 2,
      consultantName: 'Elmas',
      customerName: 'Mehmet Kaya',
      fortuneType: 'coffee',
      fortuneName: 'Kahve Falı',
      price: 200,
      date: '2025-11-15',
      time: '16:00',
      status: 'completed',
      createdAt: '2025-11-10'
    },
    {
      id: 3,
      consultantId: 1,
      consultantName: 'Onur',
      customerName: 'Zeynep Demir',
      fortuneType: 'katina',
      fortuneName: 'Katina Aşk Falı',
      price: 500,
      date: '2025-11-16',
      time: '11:00',
      status: 'confirmed',
      createdAt: '2025-11-11'
    },
    {
      id: 4,
      consultantId: 2,
      consultantName: 'Elmas',
      customerName: 'Ali Şahin',
      fortuneType: 'water',
      fortuneName: 'Su Falı',
      price: 700,
      date: '2025-11-16',
      time: '15:00',
      status: 'pending',
      createdAt: '2025-11-12'
    },
    {
      id: 5,
      consultantId: 1,
      consultantName: 'Onur',
      customerName: 'Fatma Arslan',
      fortuneType: 'clairvoyance',
      fortuneName: 'Durugörü',
      price: 400,
      date: '2025-11-17',
      time: '10:00',
      status: 'pending',
      createdAt: '2025-11-12'
    }
  ]);

  const [filter, setFilter] = useState('all');

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

  // Filtrelenmiş randevular
  const filteredBookings = filter === 'all'
    ? bookings
    : bookings.filter(b => b.status === filter);

  // İstatistikler
  const totalRevenue = bookings
    .filter(b => b.status === 'completed')
    .reduce((sum, b) => sum + b.price, 0);

  const totalCommission = bookings
    .filter(b => b.status === 'completed')
    .reduce((sum, b) => {
      const calc = calculateConsultantEarning(b.price, 40);
      return sum + calc.commission;
    }, 0);

  const consultantEarnings = {};
  consultants.forEach(consultant => {
    const consultantBookings = bookings.filter(
      b => b.consultantId === consultant.id && b.status === 'completed'
    );
    const total = consultantBookings.reduce((sum, b) => sum + b.price, 0);
    const calc = calculateConsultantEarning(total, consultant.commission);
    consultantEarnings[consultant.id] = {
      name: consultant.name,
      totalRevenue: total,
      commission: calc.commission,
      earning: calc.consultantEarning,
      bookingCount: consultantBookings.length
    };
  });

  return (
    <div className="admin-panel">
      <h1>🔐 Admin Paneli</h1>

      {/* Genel İstatistikler */}
      <section className="stats-section">
        <h2>📊 Genel İstatistikler</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <h3>Toplam Gelir</h3>
              <p className="stat-value">{totalRevenue} ₺</p>
              <span className="stat-desc">Tamamlanan randevular</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">💵</div>
            <div className="stat-info">
              <h3>Toplam Komisyon</h3>
              <p className="stat-value">{totalCommission.toFixed(2)} ₺</p>
              <span className="stat-desc">%40 komisyon</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-info">
              <h3>Toplam Randevu</h3>
              <p className="stat-value">{bookings.length}</p>
              <span className="stat-desc">Tüm durumlar</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <h3>Tamamlanan</h3>
              <p className="stat-value">
                {bookings.filter(b => b.status === 'completed').length}
              </p>
              <span className="stat-desc">Başarılı fal</span>
            </div>
          </div>
        </div>
      </section>

      {/* Danışman Kazançları */}
      <section className="consultants-earnings">
        <h2>👥 Danışman Kazançları</h2>
        <div className="earnings-grid">
          {Object.values(consultantEarnings).map(earning => (
            <div key={earning.name} className="earning-card">
              <h3>{earning.name}</h3>
              <div className="earning-details">
                <div className="earning-row">
                  <span>Toplam Fal:</span>
                  <strong>{earning.bookingCount}</strong>
                </div>
                <div className="earning-row">
                  <span>Toplam Ciro:</span>
                  <strong>{earning.totalRevenue} ₺</strong>
                </div>
                <div className="earning-row highlight">
                  <span>Komisyon (%40):</span>
                  <strong className="commission-amount">
                    {earning.commission.toFixed(2)} ₺
                  </strong>
                </div>
                <div className="earning-row highlight">
                  <span>Falcı Kazancı:</span>
                  <strong className="earning-amount">
                    {earning.earning.toFixed(2)} ₺
                  </strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Randevular */}
      <section className="bookings-section">
        <div className="section-header">
          <h2>📋 Randevular</h2>
          <div className="filter-buttons">
            <button
              className={filter === 'all' ? 'active' : ''}
              onClick={() => setFilter('all')}
            >
              Tümü ({bookings.length})
            </button>
            <button
              className={filter === 'pending' ? 'active' : ''}
              onClick={() => setFilter('pending')}
            >
              Beklemede ({bookings.filter(b => b.status === 'pending').length})
            </button>
            <button
              className={filter === 'confirmed' ? 'active' : ''}
              onClick={() => setFilter('confirmed')}
            >
              Onaylı ({bookings.filter(b => b.status === 'confirmed').length})
            </button>
            <button
              className={filter === 'completed' ? 'active' : ''}
              onClick={() => setFilter('completed')}
            >
              Tamamlandı ({bookings.filter(b => b.status === 'completed').length})
            </button>
          </div>
        </div>

        <div className="bookings-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Müşteri</th>
                <th>Falcı</th>
                <th>Hizmet</th>
                <th>Fiyat</th>
                <th>Tarih</th>
                <th>Saat</th>
                <th>Durum</th>
                <th>Komisyon</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map(booking => {
                const calc = calculateConsultantEarning(booking.price, 40);
                return (
                  <tr key={booking.id}>
                    <td>#{booking.id}</td>
                    <td>{booking.customerName}</td>
                    <td>{booking.consultantName}</td>
                    <td>{booking.fortuneName}</td>
                    <td className="price-cell">{booking.price} ₺</td>
                    <td>{booking.date}</td>
                    <td>{booking.time}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(booking.status)}`}>
                        {getStatusText(booking.status)}
                      </span>
                    </td>
                    <td className="commission-cell">
                      {booking.status === 'completed' ? `${calc.commission} ₺` : '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredBookings.length === 0 && (
            <div className="no-bookings">
              <p>Bu filtrede randevu bulunmuyor.</p>
            </div>
          )}
        </div>
      </section>

      {/* Fal Türleri Raporu */}
      <section className="fortune-types-report">
        <h2>🔮 Fal Türleri Raporu</h2>
        <div className="fortune-stats-grid">
          {Object.values(fortuneTypes).map(fortune => {
            const fortuneBookings = bookings.filter(
              b => b.fortuneType === fortune.id && b.status === 'completed'
            );
            const count = fortuneBookings.length;
            const revenue = fortuneBookings.reduce((sum, b) => sum + b.price, 0);

            return (
              <div key={fortune.id} className="fortune-stat-card">
                <span className="fortune-icon">{fortune.icon}</span>
                <h3>{fortune.name}</h3>
                <div className="fortune-stats">
                  <div className="fortune-stat">
                    <span>Toplam:</span>
                    <strong>{count} fal</strong>
                  </div>
                  <div className="fortune-stat">
                    <span>Gelir:</span>
                    <strong>{revenue} ₺</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default AdminPanel;
