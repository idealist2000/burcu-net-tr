const mongoose = require('mongoose');

const consultantSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  specialties: [{
    type: String,
    enum: ['tarot', 'katina', 'water', 'coffee', 'clairvoyance']
  }],
  rating: {
    type: Number,
    default: 5.0,
    min: 0,
    max: 5
  },
  totalReadings: {
    type: Number,
    default: 0
  },
  experience: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: true
  },
  availability: {
    type: String,
    default: 'Haftanın 7 günü'
  },
  communicationMethods: [{
    type: String,
    enum: ['video', 'audio', 'message']
  }],
  profileImage: {
    type: String,
    default: null
  },
  commission: {
    type: Number,
    default: 40,
    min: 0,
    max: 100
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Consultant', consultantSchema);
