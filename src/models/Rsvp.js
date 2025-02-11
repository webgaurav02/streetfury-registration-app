const mongoose = require('mongoose');
const { Schema } = mongoose;

// User Schema
const rsvpSchema = new Schema(
  {
    firstname: { type: String, default: null },
    lastname: { type: String, default: null },
    dob: { type: String, default: null },
    gender: { type: String, default: null, },
    city: { type: String, default: null },
    state: { type: String, default: null },
    info: { type: String },
    email: { type: String, required: true },
    emailVerified: { type: Boolean, default: false },
    phone: { type: String },
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

const Rsvp = mongoose.models.Rsvp || mongoose.model('Rsvp', rsvpSchema);

export default Rsvp;