// models/BookingRequest.js
import mongoose from 'mongoose';

const bookingRequestSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  reason: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['visa', 'click', 'cash'],
    default: null
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'paid'],
    default: 'unpaid'
  }
}, { timestamps: true });

export default mongoose.models.BookingRequest || mongoose.model('BookingRequest', bookingRequestSchema);
