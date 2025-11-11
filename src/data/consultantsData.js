// Fal türleri ve fiyatları
export const fortuneTypes = {
  tarot: {
    id: 'tarot',
    name: 'Tarot Falı',
    price: 300,
    description: 'Tarot kartları ile geleceğinizi keşfedin',
    icon: '🃏',
    duration: '30-45 dakika'
  },
  katina: {
    id: 'katina',
    name: 'Katina Aşk Falı',
    price: 500,
    description: 'Aşk hayatınız hakkında detaylı bilgi',
    icon: '💕',
    duration: '45-60 dakika'
  },
  water: {
    id: 'water',
    name: 'Su Falı',
    price: 700,
    description: 'Su ile geleceğinize dair işaretler',
    icon: '💧',
    duration: '45-60 dakika'
  },
  coffee: {
    id: 'coffee',
    name: 'Kahve Falı',
    price: 200,
    description: 'Geleneksel Türk kahve falı',
    icon: '☕',
    duration: '20-30 dakika'
  },
  clairvoyance: {
    id: 'clairvoyance',
    name: 'Durugörü',
    price: 400,
    description: 'Ruhsal enerji ile gelecek görümü',
    icon: '🔮',
    duration: '30-45 dakika'
  }
};

// İletişim yöntemleri
export const communicationMethods = {
  video: {
    id: 'video',
    name: 'Video Görüşme',
    icon: '📹',
    description: 'Canlı video görüşme ile fal'
  },
  audio: {
    id: 'audio',
    name: 'Sesli Görüşme',
    icon: '🎙️',
    description: 'Telefon veya sesli görüşme'
  },
  message: {
    id: 'message',
    name: 'Mesajlaşma',
    icon: '💬',
    description: 'Yazılı mesajlaşma ile fal'
  }
};

// Danışmanlar (Falcılar)
export const consultants = [
  {
    id: 1,
    name: 'Onur',
    title: 'Profesyonel Falcı',
    specialties: ['tarot', 'katina', 'water', 'coffee', 'clairvoyance'],
    rating: 4.8,
    totalReadings: 1247,
    experience: '8 yıl',
    about: 'Tarot ve mistik bilimler üzerine uzmanlaşmış, binlerce danışana yol göstermiştir.',
    availability: 'Haftanın 7 günü',
    communicationMethods: ['video', 'audio', 'message'],
    phone: '0530 571 40 67',
    email: 'onur@burcfal.com',
    username: 'onur',
    password: 'onur123', // Şu an sadece demo için - gerçekte hash'lenmiş olmalı
    profileImage: null,
    isActive: true,
    commission: 40 // %40
  },
  {
    id: 2,
    name: 'Elmas',
    title: 'Usta Falcı',
    specialties: ['tarot', 'katina', 'water', 'coffee', 'clairvoyance'],
    rating: 4.9,
    totalReadings: 2156,
    experience: '12 yıl',
    about: 'Geleneksel fal yöntemleri ve modern tarot konusunda deneyimli, empatik yaklaşımıyla tanınır.',
    availability: 'Haftanın 7 günü',
    communicationMethods: ['video', 'audio', 'message'],
    phone: '0530 571 40 68',
    email: 'elmas@burcfal.com',
    username: 'elmas',
    password: 'elmas123',
    profileImage: null,
    isActive: true,
    commission: 40 // %40
  },
  {
    id: 3,
    name: 'Ayşe',
    title: 'Uzman Falcı',
    specialties: ['tarot', 'coffee', 'clairvoyance'],
    rating: 4.7,
    totalReadings: 856,
    experience: '5 yıl',
    about: 'Kahve falı ve tarot konusunda uzman, sıcak ve samimi yaklaşımıyla müşterilerine rehberlik eder.',
    availability: 'Pazartesi-Cuma',
    communicationMethods: ['video', 'audio', 'message'],
    phone: '0530 571 40 69',
    email: 'ayse@burcfal.com',
    username: 'ayse',
    password: 'ayse123',
    profileImage: null,
    isActive: true,
    commission: 40 // %40
  }
];

// Yardımcı fonksiyonlar
export const getConsultantById = (id) => {
  return consultants.find(c => c.id === parseInt(id));
};

export const getFortuneTypeById = (id) => {
  return fortuneTypes[id];
};

export const calculateConsultantEarning = (price, commissionRate = 40) => {
  const commission = (price * commissionRate) / 100;
  const earning = price - commission;
  return {
    totalPrice: price,
    commission: commission,
    consultantEarning: earning
  };
};

export const getActiveConsultants = () => {
  return consultants.filter(c => c.isActive);
};

// Admin kullanıcıları
export const adminUsers = [
  {
    username: 'admin',
    password: 'admin123', // Demo için basit şifre
    role: 'admin',
    name: 'Admin'
  }
];

// Danışan demo kullanıcıları (opsiyonel)
export const clientUsers = [
  {
    username: 'demo',
    password: 'demo123',
    role: 'client',
    name: 'Demo Kullanıcı',
    email: 'demo@example.com',
    phone: '0555 123 45 67'
  }
];

// Login kontrolü
export const authenticateUser = (username, password, role) => {
  if (role === 'admin') {
    return adminUsers.find(u => u.username === username && u.password === password);
  } else if (role === 'consultant') {
    return consultants.find(c => c.username === username && c.password === password);
  } else if (role === 'client') {
    return clientUsers.find(c => c.username === username && c.password === password);
  }
  return null;
};

// Kullanıcıyı localStorage'a kaydet
export const saveUserSession = (user) => {
  localStorage.setItem('burcfal_user', JSON.stringify(user));
};

// Oturum kontrolü
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('burcfal_user');
  return userStr ? JSON.parse(userStr) : null;
};

// Çıkış yap
export const logout = () => {
  localStorage.removeItem('burcfal_user');
};
