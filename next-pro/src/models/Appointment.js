// models/Appointment.js
import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: Date,
  time: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'cancelled', 'completed'],
    default: 'pending'
  },
  reason: String,
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
