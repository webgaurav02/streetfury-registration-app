const mongoose = require('mongoose');
const { Schema } = mongoose;

// User Schema
const otpSchema = new Schema(
  {
    otp: { type: String },
    otpExpiry: { type: Date },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

const Otp = mongoose.models.Otp || mongoose.model('Otp', otpSchema);

export default Otp;