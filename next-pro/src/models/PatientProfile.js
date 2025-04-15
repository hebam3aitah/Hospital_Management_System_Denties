import mongoose from 'mongoose';

const patientProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  gender: String,
  dateOfBirth: Date,
  phone: String,
  address: String,
  medicalHistory: String,
  allergies: [String],
}, { timestamps: true });

export default mongoose.models.PatientProfile || mongoose.model('PatientProfile', patientProfileSchema);
