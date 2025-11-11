const { v4: uuidv4 } = require('uuid');

/**
 * Jitsi Meet Service
 * Ücretsiz video görüşme servisi
 * Docs: https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-iframe/
 */

// Generate unique Jitsi room
const generateJitsiRoom = (bookingId, consultantName, customerName) => {
  const roomId = `burcfal-${bookingId}-${uuidv4().split('-')[0]}`;
  const roomUrl = `https://meet.jit.si/${roomId}`;

  return {
    roomId,
    roomUrl,
    subject: `Fal Görüşmesi: ${consultantName} - ${customerName}`
  };
};

// Generate Jitsi iframe configuration
const generateJitsiConfig = (roomId, userName, isConsultant = false) => {
  return {
    roomName: roomId,
    width: '100%',
    height: '600px',
    parentNode: null,
    configOverwrite: {
      prejoinPageEnabled: false,
      startWithAudioMuted: false,
      startWithVideoMuted: false,
      enableWelcomePage: false,
      enableClosePage: false,
      disableDeepLinking: true,
      defaultLanguage: 'tr',
      toolbarButtons: [
        'microphone',
        'camera',
        'closedcaptions',
        'desktop',
        'fullscreen',
        'fodeviceselection',
        'hangup',
        'profile',
        'chat',
        'recording',
        'livestreaming',
        'etherpad',
        'sharedvideo',
        'settings',
        'raisehand',
        'videoquality',
        'filmstrip',
        'feedback',
        'stats',
        'shortcuts',
        'tileview',
        'download',
        'help',
        'mute-everyone'
      ]
    },
    interfaceConfigOverwrite: {
      DEFAULT_BACKGROUND: '#474747',
      DISABLE_VIDEO_BACKGROUND: false,
      INITIAL_TOOLBAR_TIMEOUT: 20000,
      TOOLBAR_TIMEOUT: 4000,
      DEFAULT_REMOTE_DISPLAY_NAME: isConsultant ? 'Danışan' : 'Falcı',
      DEFAULT_LOCAL_DISPLAY_NAME: userName,
      SHOW_JITSI_WATERMARK: false,
      SHOW_WATERMARK_FOR_GUESTS: false,
      SHOW_BRAND_WATERMARK: false,
      BRAND_WATERMARK_LINK: '',
      SHOW_POWERED_BY: false,
      APP_NAME: 'Burcfal',
      NATIVE_APP_NAME: 'Burcfal',
      PROVIDER_NAME: 'Burcfal',
      MOBILE_APP_PROMO: false,
      DISABLE_JOIN_LEAVE_NOTIFICATIONS: false
    },
    userInfo: {
      displayName: userName,
      email: ''
    }
  };
};

// Check if room is active (basic check)
const isRoomActive = (roomId) => {
  // Bu gerçek uygulamada Jitsi API'si ile kontrol edilir
  // Şu an için basit bir implementasyon
  return {
    roomId,
    isActive: false, // Jitsi API ile kontrol edilmeli
    participants: []
  };
};

module.exports = {
  generateJitsiRoom,
  generateJitsiConfig,
  isRoomActive
};
