# Burcfal Backend API

Burcfal platformu için Node.js backend API servisi.

## 🚀 Özellikler

- ✅ MongoDB veritabanı entegrasyonu
- ✅ Randevu yönetim sistemi
- ✅ E-posta bildirimleri (Nodemailer)
- ✅ Jitsi Meet video görüşme entegrasyonu
- ✅ WhatsApp Click-to-Chat
- ✅ Komisyon hesaplama sistemi
- ✅ RESTful API

## 📋 Gereksinimler

- Node.js (v14 veya üzeri)
- MongoDB Atlas hesabı (ücretsiz)
- Gmail hesabı (e-posta için)

## ⚙️ Kurulum

### 1. Dependencies Yükleme

```bash
cd backend
npm install
```

### 2. MongoDB Atlas Kurulumu (ÜCRETSİZ)

1. https://www.mongodb.com/cloud/atlas adresine gidin
2. Ücretsiz hesap oluşturun
3. "Create a New Cluster" → **FREE (M0)** seçin
4. Cluster oluşturulduktan sonra:
   - "Connect" butonuna tıklayın
   - "Connect your application" seçin
   - Connection string'i kopyalayın

### 3. Gmail App Password Oluşturma

1. Google hesabınıza gidin
2. Güvenlik → 2 Adımlı Doğrulama'yı aktif edin
3. "Uygulama şifreleri" → Yeni şifre oluşturun
4. "Posta" ve "Diğer" seçip şifreyi kaydedin

### 4. .env Dosyası Oluşturma

`.env.example` dosyasını kopyalayın:

```bash
cp .env.example .env
```

`.env` dosyasını düzenleyin:

```env
PORT=5000
NODE_ENV=development

# MongoDB Atlas connection string (adım 2'den)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/burcfal?retryWrites=true&w=majority

# JWT Secret (random bir string)
JWT_SECRET=supersecretkey123456789

# Gmail SMTP (adım 3'ten)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Admin Email
ADMIN_EMAIL=admin@burcfal.com
```

## 🏃 Çalıştırma

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

Server çalıştığında:
- Backend: http://localhost:5000
- Health Check: http://localhost:5000/api/health

## 📡 API Endpoints

### Bookings

- **POST** `/api/bookings` - Yeni randevu oluştur
- **GET** `/api/bookings` - Tüm randevuları getir (admin)
- **GET** `/api/bookings/consultant/:consultantId` - Falcıya ait randevular
- **PUT** `/api/bookings/:id/status` - Randevu durumunu güncelle

### Örnek Request (POST /api/bookings)

```json
{
  "consultantId": "mongodbObjectId",
  "customerName": "Ayşe Yılmaz",
  "customerEmail": "ayse@example.com",
  "customerPhone": "0555 123 45 67",
  "fortuneType": "tarot",
  "fortuneName": "Tarot Falı",
  "price": 300,
  "communicationMethod": "video",
  "preferredDate": "2025-11-20",
  "preferredTime": "14:00",
  "notes": "İlk defa fal baktıracağım"
}
```

## 🎥 Video Görüşme Nasıl Çalışır?

1. Müşteri randevu alır
2. Falcı randevuyu onaylar (`status: 'confirmed'`)
3. Backend otomatik Jitsi Meet odası oluşturur
4. Müşteri ve falcıya e-posta ile link gönderilir
5. Her iki taraf da linke tıklayarak görüşmeye katılır

## 📧 E-posta Bildirimleri

Sistem otomatik olarak şu e-postaları gönderir:

1. **Müşteriye:** Randevu onay maili
2. **Falcıya:** Yeni randevu bildirimi
3. **Müşteriye:** Video görüşme linki (randevu onaylandığında)

## 📱 WhatsApp Entegrasyonu

Şu an **Click-to-Chat** sistemi aktif:
- Her randevuda WhatsApp linki oluşturulur
- Falcı numarası gizli kalır
- Gelecekte Twilio WhatsApp API eklenebilir

## 🔄 Frontend Entegrasyonu

Frontend'te API çağrısı örneği:

```javascript
// Randevu oluşturma
const response = await fetch('http://localhost:5000/api/bookings', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(bookingData)
});

const result = await response.json();
console.log(result.whatsappUrl); // WhatsApp linki
```

## 🐛 Sorun Giderme

**MongoDB bağlanamıyor:**
- Connection string'i kontrol edin
- MongoDB Atlas'ta IP whitelist'e 0.0.0.0/0 ekleyin

**E-posta gönderilmiyor:**
- Gmail App Password doğru mu?
- 2 Adımlı Doğrulama aktif mi?

**Port zaten kullanımda:**
- `.env` dosyasında PORT değiştirin

## 📦 Deploy (Ücretsiz Seçenekler)

- **Render.com** - Backend için (ücretsiz)
- **Railway.app** - Backend için (ücretsiz)
- **Heroku** - Backend için ($5/ay)

## 🔐 Güvenlik Notları

⚠️ **Üretim ortamına geçmeden önce:**
- JWT_SECRET'i güçlü bir değer yapın
- Environment variables'ları güvenli tutun
- Rate limiting ekleyin
- HTTPS kullanın

## 📚 Daha Fazla Bilgi

- [Jitsi Meet API](https://jitsi.github.io/handbook/)
- [Nodemailer Docs](https://nodemailer.com/)
- [MongoDB Atlas](https://www.mongodb.com/docs/atlas/)

## 🆘 Destek

Sorularınız için: info@burcfal.com
