// // pages/api/appointments/[id].js
// import Appointment from '../../../models/Appointment';
// import dbConnect from '../../../utils/dbConnect';
// import { NextResponse } from 'next/server';

// dbConnect();

// export async function PUT(req, { params }) {
//     await connectToDB();  
//   const { id } = params; // Accessing dynamic `id` from URL parameters

//   try {
//     const { time, status, reason } = await req.json(); // Parse JSON body from request
//     const updatedAppointment = await Appointment.findByIdAndUpdate(id, { time, status, reason }, { new: true });
    
//     if (!updatedAppointment) {
//       return NextResponse.json({ message: 'Appointment not found' }, { status: 404 });
//     }

//     return NextResponse.json(updatedAppointment, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ message: 'Error updating appointment' }, { status: 500 });
//   }
// }

// export async function DELETE(req, { params }) {
//     await connectToDB(); 
//   const { id } = params; // Accessing dynamic `id` from URL parameters

//   try {
//     await Appointment.findByIdAndDelete(id);
//     return NextResponse.json({}, { status: 204 });
//   } catch (error) {
//     return NextResponse.json({ message: 'Error deleting appointment' }, { status: 500 });
//   }
// }
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/getCurrentUser';  // adjust path as needed
import { connectToDB } from '@/lib/db';
import BookingRequest from '@/models/BookingRequest';

// PUT /api/doctorDashboard/patients/[id]
export async function PUT(request, { params }) {
  try {
    // 1) Get current user
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // 2) Check user role
    if (user.role !== 'doctor') {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
    }

    // 3) Parse the body from the request
    const body = await request.json();
    const { status } = body; // the new status from the front-end

    // 4) Connect to DB
    await connectToDB();

    // 5) Find booking by ID and update
    const { id } = params;
     // from [id] in the URL
    const updatedBooking = await BookingRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedBooking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // 6) Return updated booking
    return NextResponse.json({
      message: 'Booking status updated successfully',
      booking: updatedBooking
    }, { status: 200 });
  } catch (error) {
    console.error('🔴 Error updating booking status:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
