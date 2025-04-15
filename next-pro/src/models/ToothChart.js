import mongoose from 'mongoose';

const toothChartSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  chart: [{
    toothNumber: String,
    condition: String,
    notes: String
  }]
}, { timestamps: true });

export default mongoose.models.ToothChart || mongoose.model('ToothChart', toothChartSchema);
