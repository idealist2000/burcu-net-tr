const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  consultantId: {
    type: mongoose.Schema.Types.Mixed, // Can be ObjectId or String
    required: true
  },
  consultantName: {
    type: String,
    required: true,
    trim: true
  },
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  customerEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  customerPhone: {
    type: String,
    required: true,
    trim: true
  },
  fortuneType: {
    type: String,
    required: true,
    enum: ['tarot', 'katina', 'water', 'coffee', 'clairvoyance']
  },
  fortuneName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  communicationMethod: {
    type: String,
    required: true,
    enum: ['video', 'audio', 'message']
  },
  preferredDate: {
    type: String,
    required: true
  },
  preferredTime: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  jitsiRoomId: {
    type: String,
    default: null
  },
  jitsiRoomUrl: {
    type: String,
    default: null
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['iban', 'card', 'cash'],
    default: 'iban'
  },
  commission: {
    type: Number,
    required: true
  },
  consultantEarning: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
bookingSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
