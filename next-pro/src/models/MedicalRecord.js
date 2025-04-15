import mongoose from 'mongoose';

const medicalRecordSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  visitDate: Date,
  notes: String,
  diagnosis: String,
  treatment: String,
}, { timestamps: true });

export default mongoose.models.MedicalRecord || mongoose.model('MedicalRecord', medicalRecordSchema);
