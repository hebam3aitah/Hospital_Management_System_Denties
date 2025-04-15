import mongoose from 'mongoose';

const doctorProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  specialization: String,
  experienceYears: Number,
  availability: [{ 
    day: String,
    from: String,
    to: String
  }],
}, { timestamps: true });

export default mongoose.models.DoctorProfile || mongoose.model('DoctorProfile', doctorProfileSchema);
