import mongoose from 'mongoose';

const prescriptionSchema = new mongoose.Schema({
  medicalRecord: { type: mongoose.Schema.Types.ObjectId, ref: 'MedicalRecord' },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  medications: [{
    name: String,
    dosage: String,
    instructions: String
  }],
}, { timestamps: true });

export default mongoose.models.Prescription || mongoose.model('Prescription', prescriptionSchema);
