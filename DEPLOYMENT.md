# 🚀 Burcfal Deployment Guide

## Backend: Railway.app

### 1. Railway Hesabı Oluştur
- https://railway.app adresine git
- "Login with GitHub" ile giriş yap
- GitHub erişimi ver

### 2. Backend Deploy Et

1. **New Project** → **Deploy from GitHub repo**
2. **burcu-net-tr** repository'sini seç
3. Railway otomatik olarak backend'i detect edecek

### 3. Environment Variables Ekle

Railway dashboard'da **Variables** sekmesine git ve şunları ekle:

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://burcfal:laxLKIs0oHciw9Rd@cluster0.0snb1a8.mongodb.net/burcfal?retryWrites=true&w=majority
JWT_SECRET=burcfal-super-secret-jwt-key-2025-secure
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=onurkalafat67@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
FRONTEND_URL=https://burcfal.com.tr
```

⚠️ **ÖNEMLİ:** Gmail App Password'u eklemen gerekiyor:
1. Google Account → Security → 2-Step Verification
2. App passwords → Create new
3. EMAIL_PASSWORD'e yapıştır

### 4. Domain Al

Deploy tamamlandığında Railway size bir URL verecek:
```
https://burcfal-backend-production.up.railway.app
```

Bu URL'i not et! Frontend'te kullanacağız.

---

## Frontend: Plesk (burcfal.com.tr)

### 1. Frontend Build Et

Windows PowerShell'de:

```powershell
cd C:\Users\mimoz\burcu-net-tr

# Railway backend URL'ini .env.local'e ekle
# Örnek: REACT_APP_API_URL=https://your-backend.railway.app/api

npm run build
```

### 2. Build Dosyalarını Plesk'e Yükle

1. Plesk Panel'e giriş yap
2. **burcfal.com.tr** domain'ini seç
3. **File Manager** aç
4. **httpdocs** veya **public_html** klasörüne git
5. İçini temizle (eski dosyaları sil)
6. **build/** klasöründeki TÜM dosyaları yükle:
   - static/
   - index.html
   - favicon.ico
   - manifest.json
   - robots.txt
   - vb.

### 3. .htaccess Ekle (React Router için)

**httpdocs/.htaccess** dosyası oluştur:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```

---

## Test Et

1. **Backend:** https://your-backend.railway.app/api/health
2. **Frontend:** https://burcfal.com.tr
3. **Randevu oluştur ve MongoDB'de kontrol et**

---

## 🔒 Güvenlik Notları

- MongoDB Atlas IP whitelist'e Railway IP'lerini ekle (veya 0.0.0.0/0 bırak)
- Gmail App Password kullan (gerçek şifreyi kullanma)
- JWT_SECRET'i güçlü tut
- HTTPS kullan (Railway ve Plesk otomatik sağlar)

---

## 📊 Maliyet

- **Railway:** Ücretsiz (500 saat/ay) → ~$0
- **MongoDB Atlas:** Free tier → $0
- **Plesk:** Mevcut hosting → Değişiklik yok
- **TOPLAM:** $0/ay 🎉
