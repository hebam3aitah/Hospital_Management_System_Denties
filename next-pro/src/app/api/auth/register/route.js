
import { connectToDB } from "@/lib/db";
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    await connectToDB();

    const { name, email, password, phone, address } = await req.json();

    if (!email || !password || !name || !phone || !address) {
      return Response.json({ message: 'يرجى ملء جميع الحقول' }, { status: 400 });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return Response.json({ message: 'البريد الإلكتروني مستخدم مسبقًا' }, { status: 409 });
    }
    console.log("🚀 Trying to send OTP to:", email);

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      IsConfirmed: false,
      otp,
    });

    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"بادر" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'رمز التحقق من البريد الإلكتروني',
      text: `رمز التحقق الخاص بك هو: ${otp}`,
    });
    console.log("📬 Email send info:", info);


    // حفظ الإيميل في sessionStorage في الفرونت (لازم تضيفه هناك)
    return Response.json({ message: 'تم إرسال رمز التحقق إلى بريدك الإلكتروني' }, { status: 200 });

  } catch (err) {
    console.error('❌ Register Error:', err);
    return Response.json({ message: 'حدث خطأ أثناء التسجيل' }, { status: 500 });
  }
}