// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: {
    type: String,
    enum: ["user", "admin", "doctor"],
    default: "user"
  },
  image: { type: String },
  profilePicture: { type: String, default: "" },
  address: { type: String },
  birthDate: { type: Date },
  IsConfirmed: { type: Boolean, default: false },
  registrationDate: { type: Date, default: Date.now },
  otp: { type: String },
  // علاقة مع الاشتراكات
  subscriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subscription" }],
  status: {
    type: String,
    enum: ['Active', 'Follow-up', 'New', 'Completed'],
    default: 'Active',
  },
  report: {
    type: String, // لحفظ رابط الملف (صورة أو PDF)
    required: false, // يمكن أن يكون فارغًا عند عدم رفع التقرير
  },
},
{
  timestamps: true // يضيف createdAt و updatedAt تلقائيًا
});

export default mongoose.models.User || mongoose.model("User", userSchema);


