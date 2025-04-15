// // // pages/api/appointments/index.js
// // import Appointment from '../../../../models/Appointment';
// // import Patient from '../../../../models/Patient';
// // import connectToDB from '../../../../lib/db';
// // import { NextResponse } from 'next/server';

// // // connectToDB();

// // export async function GET(req) {
// //   try {
// //     await connectToDB(); 
// //     const appointments = await Appointment.find().populate('patient');
// //     return NextResponse.json(appointments, { status: 200 });
// //   } catch (error) {
// //     return NextResponse.json({ message: 'Error fetching appointments' }, { status: 500 });
// //   }
// // }

// // export async function POST(req) {
// //   try {
// //     await connectToDB(); 
// //     const { patientId, time, status, reason } = await req.json(); // Parse JSON body from request

// //     const patient = await Patient.findById(patientId);
// //     if (!patient) {
// //       return NextResponse.json({ message: 'Patient not found' }, { status: 404 });
// //     }

// //     const newAppointment = new Appointment({
// //       patient: patientId,
// //       time,
// //       status,
// //       reason,
// //     });

// //     await newAppointment.save();
// //     return NextResponse.json(newAppointment, { status: 201 });
// //   } catch (error) {
// //     return NextResponse.json({ message: 'Error creating appointment' }, { status: 500 });
// //   }
// // }
// import { NextResponse } from 'next/server';
// import { getCurrentUser } from '@/lib/getCurrentUser'; // عدّل المسار حسب مكان الدالة
// import { connectToDB } from '@/lib/db';                // أو حيثما يوجد connectToDB
// import BookingRequest from '@/models/BookingRequest';

// export async function GET() {
//   try {
//     // 1) نتحقق من المستخدم الحالي
//     const user = await getCurrentUser();
//     if (!user) {
//       return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
//     }
// console.log(user)
//     // 2) نتحقق إن كان المستخدم لديه صلاحية Doctor
//     //   –– قد يختلف حسب بنية مشروعك. مثلاً user.role === 'doctor' أو نحصل على user.doctorId.
//     if (user.role !== 'doctor') {
//       return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
//     }

//     // 3) نفتح اتصال بقاعدة البيانات
//     await connectToDB();

//     // 4) نجلب جميع الحجوزات التي doctor = user._id (إذا كان الـ _id للطبيب هو نفسه المستخدم).
//     //    لو كان عندك حقل آخر في الـ user يشير لـ Doctor Model (مثلاً user.doctorId)، استخدمه هنا.
//     const bookings = await BookingRequest.find({ doctor: user._id })
//       .populate('patient')   // نجلب معلومات المريض (مثلاً الاسم والبريد)
//       .populate('doctor'); // نجلب معلومات الطبيب أيضاً (اختياري)
// console.log(bookings);
//     // 5) نُرجع البيانات بصيغة JSON
//     return NextResponse.json(bookings);
//   } catch (error) {
//     console.error('🔴 Error fetching doctor bookings:', error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
// app/api/doctorDashboard/appointments/route.js
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/getCurrentUser';
import { connectToDB } from '@/lib/db'; 
import BookingRequest from '@/models/BookingRequest'; // نموذج الحجوزات
import Doctor from '@/models/Doctor';
export async function GET() {
  try {
    // 1) التحقق من المستخدم الحالي (الطبيب)
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    if (user.role !== 'doctor') {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
    }

    // 2) الاتصال بقاعدة البيانات
    await connectToDB();

   
    const bookings = await BookingRequest.find({ doctor: user._id })
      .populate('patient') 
      .populate('doctor'); 
      console.log(bookings);
    // 4) إرجاع البيانات بصيغة JSON
    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching doctor appointments:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
