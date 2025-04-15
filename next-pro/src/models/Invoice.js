import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
  services: [{
    description: String,
    price: Number
  }],
  totalAmount: Number,
  isPaid: { type: Boolean, default: false },
  paymentDate: Date,
}, { timestamps: true });

export default mongoose.models.Invoice || mongoose.model('Invoice', invoiceSchema);
