
import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  diagnosis: {
    type: String,
    required: true,
  },
  lastVisit: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Active', 'Follow-up', 'New', 'Completed'],
    default: 'Active',
  },
  medicalHistory: {
    type: String,
    required: false, // تاريخ مرضي يمكن أن يكون فارغًا
  },
  report: {
    type: String, // لحفظ رابط الملف (صورة أو PDF)
    required: false, // يمكن أن يكون فارغًا عند عدم رفع التقرير
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId, // قد يكون رابط لمعرف الطبيب الذي أضاف التقرير
    ref: 'Doctor', // إذا كان لديك نموذج خاص بالأطباء
    required: false,
  },
}, { timestamps: true });

export default mongoose.models.Patient || mongoose.model('Patient', patientSchema);
