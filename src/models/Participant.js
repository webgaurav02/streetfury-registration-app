const mongoose = require('mongoose');
const { Schema } = mongoose;

// User Schema
const participantSchema = new Schema(
  {
    firstname: { type: String, default: null },
    lastname: { type: String, default: null },
    dob: { type: Date, default: null },
    gender: { type: String, default: null, },
    city: { type: String, default: null },
    state: { type: String, default: null },
    sport: { type: String, default: null },
    instagram: { type: String, default: null },
    youtube: { type: String },
    pitch: { type: String, default: null },
    portfolio: { type: String, default: null },
    info: { type: String },
    email: { type: String, unique: true, required: true },
    emailVerified: { type: Boolean, default: false },
    phone: { type: Number, unique: true },
    phoneVerified: { type: Boolean, default: false },
    password: { type: String, default: null },
    image: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    selected: { type: Boolean, required: true, default: false },
    otp: { type: String },
    otpExpiry: { type: Date },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

const Participant = mongoose.models.Participant || mongoose.model('Participant', participantSchema);

export default Participant;