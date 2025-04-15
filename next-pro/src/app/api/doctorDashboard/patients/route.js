// // // pages/api/patients/index.js
// // import { connectToDB } from "../../../../lib/db";
// // import Patient from "../../../../models/Patient";
// // import { NextResponse } from 'next/server';  // استيراد NextResponse

// // // GET request handler
// // export async function GET(req) {
// //   try {
// //     await connectToDB();  // تأكد من الاتصال بالـ DB
// //     const patients = await Patient.find({});
// //     return NextResponse.json({ patients });  // استخدام NextResponse بدلاً من res
// //   } catch (error) {
// //     console.error(error);
// //     return NextResponse.json({ message: "Error fetching patients" }, { status: 500 });
// //   }
// // }

// // // POST request handler
// // export async function POST(req) {
// //   try {
// //     await connectToDB(); 
// //     const { name, age, gender, contact, diagnosis, lastVisit, status } = await req.json();
// //     const newPatient = new Patient({
// //       name,
// //       age,
// //       gender,
// //       contact,
// //       diagnosis,
// //       lastVisit,
// //       status,
// //     });

// //     await newPatient.save();
// //     return NextResponse.json({ message: "Patient added successfully", patient: newPatient }, { status: 201 });
// //   } catch (error) {
// //     console.error(error);
// //     return NextResponse.json({ message: "Error adding patient" }, { status: 500 });
// //   }
// // }
// import { NextResponse } from 'next/server';
// import { getCurrentUser } from '@/lib/getCurrentUser'; // عدّل المسار حسب مكان الدالة
// import { connectToDB } from '@/lib/db';                // أو حيثما يوجد connectToDB
// import BookingRequest from '@/models/BookingRequest';
// import Doctor from "@/models/Doctor"; 
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
//       .populate('patient')  
//       .populate('doctor'); 
// console.log(bookings);

//     return NextResponse.json(bookings);
//   } catch (error) {
//     console.error('🔴 Error fetching doctor bookings:', error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db'; 
import Patient from '@/models/Patient';  // Assuming Patient model is defined
import BookingRequest from '@/models/BookingRequest';  // Assuming BookingRequest model exists
import { getCurrentUser } from '@/lib/getCurrentUser'; // Get the logged-in user
import Doctor from "@/models/Doctor"; 
export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    if (user.role !== 'doctor') {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
    }

    await connectToDB();

    // Fetch patients who have bookings with this doctor
    const bookings = await BookingRequest.find({ doctor: user._id })
      .populate('patient')  // Populating patient information
      .populate('doctor');  // Optionally populate doctor info if necessary

    // Extract patient details from the bookings
    // const patients = bookings.map((booking) => booking.patient);
// console.log(patients);
    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching patients:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
