# 🚀 Render.com Deployment Guide

Backend'i Render.com'a ücretsiz deploy etme rehberi.

## 📋 ÖN HAZIRLIK

✅ GitHub hesabınız var
✅ MongoDB Atlas connection string hazır
✅ Gmail App Password (opsiyonel - e-posta için)

---

## 🎯 ADIM ADIM DEPLOYMENT

### ADIM 1: Render.com Hesabı Açın (2 dakika)

1. **Tarayıcınızda açın:**
   ```
   https://render.com
   ```

2. **"Get Started for Free" veya "Sign Up" tıklayın**

3. **GitHub ile giriş yapın** (önerilen - en hızlı)
   - "Sign up with GitHub" seçin
   - GitHub'da yetki verin
   - Hesap otomatik oluşturulacak

---

### ADIM 2: GitHub Repository'yi Bağlayın

1. **Render Dashboard açılacak**

2. **"New +" butonuna tıklayın**

3. **"Web Service" seçin**

4. **"Connect a repository" seçeneğinde:**
   - GitHub hesabınızı seçin
   - Repository listesinden **"burcu-net-tr"** bulun
   - "Connect" tıklayın

**Not:** İlk kez kullanıyorsanız GitHub'da Render'a izin vermeniz istenebilir.

---

### ADIM 3: Servis Ayarlarını Yapın

**Otomatik dolacak ama kontrol edin:**

| Alan | Değer |
|------|-------|
| **Name** | `burcfal-backend` (veya istediğiniz ad) |
| **Region** | Frankfurt (veya Europe West) |
| **Branch** | `claude/build-feature-011CUsVj55dkuXxVe1yirQEN` |
| **Root Directory** | `backend` |
| **Runtime** | Node |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Plan** | **FREE** (ÖNEMLİ!) |

---

### ADIM 4: Environment Variables Ekleyin

Sayfayı aşağı kaydırın, **"Environment Variables"** bölümünü bulun:

**"Add Environment Variable" butonuna tıklayıp şunları ekleyin:**

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `10000` |
| `MONGODB_URI` | `mongodb+srv://burcfal:laxLKIs0oHciw9Rd@cluster0.0snb1a8.mongodb.net/burcfal?retryWrites=true&w=majority` |
| `JWT_SECRET` | `burcfal-super-secret-jwt-key-2025-secure` |
| `EMAIL_HOST` | `smtp.gmail.com` |
| `EMAIL_PORT` | `587` |
| `EMAIL_USER` | `onurkalafat67@gmail.com` |
| `EMAIL_PASSWORD` | `GMAIL_APP_PASSWORD` (henüz yoksa boş bırakın) |
| `FRONTEND_URL` | `https://burcfal.com.tr` |
| `ADMIN_EMAIL` | `onurkalafat67@gmail.com` |

**ÖNEMLİ:** MONGODB_URI'yi tam olarak yukarıdaki gibi kopyalayın!

---

### ADIM 5: Deploy Başlatın

1. **En altta "Create Web Service" butonuna tıklayın**

2. **Deploy başlayacak:**
   - Build aşaması: ~2-3 dakika
   - Logs ekranında ilerleyişi göreceksiniz

3. **Başarılı deploy logları:**
   ```
   ✅ MongoDB Connected: cluster0-shard-00-00...
   📦 Database: burcfal
   🚀 Server running on port 10000
   ```

4. **Backend URL'nizi alın:**
   ```
   https://burcfal-backend.onrender.com
   ```
   (Veya sizin seçtiğiniz isim)

---

### ADIM 6: Test Edin

**Tarayıcınızda açın:**
```
https://burcfal-backend.onrender.com/api/health
```

**Beklenen çıktı:**
```json
{
  "status": "OK",
  "message": "Backend is running!"
}
```

✅ BAŞARILI! Backend canlıda!

---

## 🔧 SONRAKI ADIMLAR

### 1. Frontend'i Backend'e Bağlayın

Frontend'te API URL'ini güncelleyin:
```javascript
const API_URL = 'https://burcfal-backend.onrender.com/api';
```

### 2. Gmail App Password Ekleyin

E-posta göndermek için:
1. Gmail App Password oluşturun
2. Render Dashboard → Settings → Environment
3. `EMAIL_PASSWORD` değişkenini güncelleyin

### 3. Custom Domain (Opsiyonel)

Render'da Settings → Custom Domain:
```
api.burcfal.com.tr
```

---

## 💡 ÖNEMLİ NOTLAR

**✅ ÜCRETSİZ PLAN SINIRLAMALARI:**
- 750 saat/ay çalışma süresi (yeterli)
- 15 dakika idle sonrası sleep mode
- İlk istek 30 saniye sürebilir (cold start)

**🔄 OTOMATIK DEPLOY:**
- GitHub'a her push'ta otomatik deploy olur
- Branch: `claude/build-feature-011CUsVj55dkuXxVe1yirQEN`

**🛡️ GÜVENLİK:**
- Environment variables güvenli
- HTTPS otomatik aktif
- Logs şifrelenmiş

---

## 🐛 SORUN GİDERME

**Deploy başarısız olursa:**
1. Logs'u kontrol edin
2. Environment variables doğru mu?
3. MongoDB connection string tam mı?

**MongoDB bağlanamıyorsa:**
1. MongoDB Atlas IP whitelist: `0.0.0.0/0`
2. Connection string doğru formatta mı?
3. Şifre özel karakter içeriyorsa encode edin

**Cold start çok uzun sürüyorsa:**
- Free plan normal davranış
- Paid plan düşünebilirsiniz ($7/ay)

---

## 📚 DAHA FAZLA BİLGİ

- [Render Docs](https://render.com/docs)
- [Node.js Deployment](https://render.com/docs/deploy-node-express-app)
- [Environment Variables](https://render.com/docs/environment-variables)

## 🆘 DESTEK

Sorularınız için: onurkalafat67@gmail.com
