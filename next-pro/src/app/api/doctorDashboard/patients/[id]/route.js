// // // // pages/api/patients/[id].js
// // // import { connectToDB } from "../../../../../lib/db";
// // // import Patient from "../../../../../models/Patient";
// // // import { NextResponse } from 'next/server';  // استيراد NextResponse

// // // // PUT request handler
// // // export async function PUT(req, context) {
// // //   await connectToDB();
// // //   const { id } = await context.params;
// // //   if (!id) {
// // //     return NextResponse.json({ message: "Patient ID is required" }, { status: 400 });
// // //   }
// // //   try {
// // //     const { name, age, gender, contact, diagnosis, lastVisit, status } = await req.json();

// // //     const updatedPatient = await Patient.findByIdAndUpdate(
// // //       id,
// // //       { name, age, gender, contact, diagnosis, lastVisit, status },
// // //       { new: true }
// // //     );

// // //     if (!updatedPatient) {
// // //       return NextResponse.json({ message: "Patient not found" }, { status: 404 });
// // //     }

// // //     return NextResponse.json({ message: "Patient updated successfully", patient: updatedPatient }, { status: 200 });
// // //   } catch (error) {
// // //     console.error(error);
// // //     return NextResponse.json({ message: "Error updating patient" }, { status: 500 });
// // //   }
// // // }

// // // // DELETE request handler
// // // export async function DELETE(req, context) {
// // //   await connectToDB();
// // //   const { id } = await context.params;
// // //   if (!id) {
// // //     return NextResponse.json({ message: "Patient ID is required" }, { status: 400 });
// // //   }
// // //   try {
// // //     const deletedPatient = await Patient.findByIdAndDelete(id);

// // //     if (!deletedPatient) {
// // //       return NextResponse.json({ message: "Patient not found" }, { status: 404 });
// // //     }

// // //     return NextResponse.json({ message: "Patient deleted successfully" }, { status: 200 });
// // //   } catch (error) {
// // //     console.error(error);
// // //     return NextResponse.json({ message: "Error deleting patient" }, { status: 500 });
// // //   }
// // // }

// // // // If method is not allowed
// // // export async function OPTIONS(req) {
// // //   return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
// // // }
// // // src/app/api/doctorDashboard/patients/[id]/route.js
// // import { connectToDB } from "../../../../../lib/db";
// // import Patient from "../../../../../models/Patient";
// // import { NextResponse } from 'next/server';

// // // DELETE request handler
// // export async function DELETE(req, context) {
// //   await connectToDB();
  
// //   // يجب انتظار params قبل الوصول إليها
// //   const { id } = await context.params;

// //   // تحقق من وجود id
// //   if (!id) {
// //     return NextResponse.json({ message: "Patient ID is required" }, { status: 400 });
// //   }

// //   try {
// //     const deletedPatient = await Patient.findByIdAndDelete(id);

// //     if (!deletedPatient) {
// //       return NextResponse.json({ message: "Patient not found" }, { status: 404 });
// //     }

// //     return NextResponse.json({ message: "Patient deleted successfully" }, { status: 200 });
// //   } catch (error) {
// //     console.error(error);
// //     return NextResponse.json({ message: "Error deleting patient" }, { status: 500 });
// //   }
// // }

// // // PUT request handler
// // export async function PUT(req, context) {
// //   await connectToDB();
  
// //   // يجب انتظار params قبل الوصول إليها
// //   const { id } = await context.params;

// //   // تحقق من وجود id
// //   if (!id) {
// //     return NextResponse.json({ message: "Patient ID is required" }, { status: 400 });
// //   }

// //   try {
// //     const { name, age, gender, contact, diagnosis, lastVisit, status } = await req.json();

// //     const updatedPatient = await Patient.findByIdAndUpdate(
// //       id,
// //       { name, age, gender, contact, diagnosis, lastVisit, status },
// //       { new: true }
// //     );

// //     if (!updatedPatient) {
// //       return NextResponse.json({ message: "Patient not found" }, { status: 404 });
// //     }

// //     return NextResponse.json({ message: "Patient updated successfully", patient: updatedPatient }, { status: 200 });
// //   } catch (error) {
// //     console.error(error);
// //     return NextResponse.json({ message: "Error updating patient" }, { status: 500 });
// //   }
// // }

// // // If method is not allowed
// // export async function OPTIONS(req) {
// //   return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
// // }
// import { NextResponse } from 'next/server';
// import { getCurrentUser } from '@/lib/getCurrentUser';  // adjust path as needed
// import { connectToDB } from '@/lib/db';
// import patient from '@/models/Patient';

// // PUT /api/doctorDashboard/patients/[id]
// export async function PUT(request, { params }) {
//   try {
//     // 1) Get current user
//     const user = await getCurrentUser();
//     if (!user) {
//       return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
//     }

//     // 2) Check user role
//     if (user.role !== 'doctor') {
//       return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
//     }

//     // 3) Parse the body from the request
//     const body = await request.json();
//     const { status } = body; // the new status from the front-end

//     // 4) Connect to DB
//     await connectToDB();

//     // 5) Find booking by ID and update
//     const { id } = params;
//      // from [id] in the URL
//     const updatedBooking = await patient.findByIdAndUpdate(
//       id,
//       { status },
//       { new: true }
//     );

//     if (!updatedBooking) {
//       return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
//     }

//     // 6) Return updated booking
//     return NextResponse.json({
//       message: 'Booking status updated successfully',
//       booking: updatedBooking
//     }, { status: 200 });
//   } catch (error) {
//     console.error('🔴 Error updating booking status:', error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import User from '@/models/User';  // Assuming the Patient model exists
import { getCurrentUser } from '@/lib/getCurrentUser'; // Get the logged-in user

export async function PUT(request, { params }) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    if (user.role !== 'doctor') {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
    }

    await connectToDB();

    // Extract patient ID from params
    const { id } =await params;

    // Get the data sent in the body of the PUT request
    const { status } = await request.json();
console.log(status);
    // Find the patient by ID and update the status
    const updatedPatient = await User.findByIdAndUpdate(
      id,
      { status }, // Update only the status
      { new: true } // Return the updated document
    );

    if (!updatedPatient) {
      return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Patient status updated successfully', patient: updatedPatient });
  } catch (error) {
    console.error('Error updating patient status:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
