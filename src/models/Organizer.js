// src/models/Organizer.js
import mongoose from 'mongoose';


// Define schema for Event Organizer
const OrganizerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
}, {
  timestamps: true
});

// Create and export the model
export default mongoose.models.Organizer || mongoose.model('Organizer', OrganizerSchema);
