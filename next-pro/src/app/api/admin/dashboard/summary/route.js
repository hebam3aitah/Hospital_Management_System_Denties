// // app/api/admin/dashboard/summary/route.js
// import { NextResponse } from 'next/server';
// import { connectToDB } from '@/lib/db';
// import User from '@/models/User';
// import Appointment from '@/models/Appointment';

// export async function GET() {
//   try {
//     await connectToDB();

//     const patientsCount = await User.countDocuments({ role: 'user' });
//     const doctorsCount = await User.countDocuments({ role: 'doctor' });
//     const appointmentsCount = await Appointment.countDocuments();

//     const recentAppointments = await Appointment.find()
//       .sort({ createdAt: -1 })
//       .limit(5)
//       .populate('patient', 'name')
//       .populate('doctor', 'name');

//     const recentUsers = await User.find()
//       .sort({ createdAt: -1 })
//       .limit(5);

//     return NextResponse.json({
//       stats: {
//         patients: patientsCount,
//         doctors: doctorsCount,
//         appointments: appointmentsCount,
//         revenue: 12500
//       },
//       recentAppointments: recentAppointments.map(a => ({
//         title: `Appointment with Dr. ${a.doctor?.name}`,
//         status: a.status.charAt(0).toUpperCase() + a.status.slice(1),
//         user: a.patient?.name,
//         date: new Date(a.date).toLocaleDateString('en-US', {
//           year: 'numeric',
//           month: 'short',
//           day: 'numeric'
//         }) + ', ' + a.time
//       })),
//       recentUsers: recentUsers.map(u => ({
//         title: 'New User Registration',
//         status: u.role === 'doctor' ? 'Doctor' : 'Patient',
//         user: u.name,
//         date: new Date(u.createdAt).toLocaleDateString('en-US', {
//           year: 'numeric',
//           month: 'short',
//           day: 'numeric'
//         })
//       }))
//     });

//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// app/api/admin/dashboard/summary/route.js
import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import User from "@/models/User";
import Appointment from "@/models/Appointment";

export async function GET() {
  try {
    await connectToDB();

    const patientsCount = await User.countDocuments({ role: "user" });
    const doctorsCount = await User.countDocuments({ role: "doctor" });
    const appointmentsCount = await Appointment.countDocuments();

    const recentAppointments = await Appointment.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("patient", "name")
      .populate("doctor", "name");

    const recentUsers = await User.find()
      .sort({ registrationDate: -1 })
      .limit(5)
      .select("name role registrationDate");

    return NextResponse.json({
      stats: {
        patients: patientsCount,
        doctors: doctorsCount,
        appointments: appointmentsCount,
        revenue: 12500, // مبلغ ثابت مؤقتًا
      },
      recentAppointments: recentAppointments.map((a) => ({
        title: `Appointment with Dr. ${a.doctor?.name}`,
        status: a.status.charAt(0).toUpperCase() + a.status.slice(1),
        user: a.patient?.name,
        date:
          new Date(a.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }) +
          ", " +
          a.time,
      })),
      recentUsers: recentUsers.map((u) => ({
        title: "New User Registration",
        status: u.role === "doctor" ? "Doctor" : "Patient",
        user: u.name,
        date: u.registrationDate
          ? new Date(u.registrationDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : "—",
      })),
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
