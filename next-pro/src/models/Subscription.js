import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  isActive: { type: Boolean, default: true },
  // ممكن تضيف خصائص مثل السعر، نوع الاشتراك...
});

export default mongoose.models.Subscription || mongoose.model("Subscription", subscriptionSchema);