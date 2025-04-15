import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: { type: Number, min: 1, max: 5 },
  comment: String
}, { timestamps: true });

export default mongoose.models.Feedback || mongoose.model('Feedback', feedbackSchema);
