import mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: true,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    },
    from: {
      type: String,
      default: "",
    },
    to: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "يرجى إدخال اسم الطبيب"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "يرجى إدخال البريد الإلكتروني"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "يرجى إدخال كلمة المرور"],
      minlength: [6, "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل"],
    },
    specialization: {
      type: String,
      enum: ["Children", "Cosmetic", "General"],
      default: "General",
    },
    experienceYears: {
      type: Number,
      default: 0,
    },
    availability: {
      type: [availabilitySchema],
      default: [
        { day: "Monday", from: "", to: "" },
        { day: "Tuesday", from: "", to: "" },
        { day: "Wednesday", from: "", to: "" },
        { day: "Thursday", from: "", to: "" },
        { day: "Friday", from: "", to: "" },
        { day: "Saturday", from: "", to: "" },
        { day: "Sunday", from: "", to: "" },
      ],
    },
    profilePicture: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      trim: true,
      default: "",
    },
    birthDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);

export default Doctor;
