// // app/api/bookings/[id]/route.js
// import { NextResponse } from 'next/server';
// import { connectToDB } from '@/lib/db';
// import BookingRequest from '@/models/BookingRequest';

// export async function GET(_, { params }) {
//   try {
//     await connectToDB();
//     const booking = await BookingRequest.findById(params.id).populate('patient', 'name email').populate('doctor', 'name email');
//     if (!booking) {
//       return NextResponse.json({ error: 'Booking request not found' }, { status: 404 });
//     }
//     return NextResponse.json(booking);
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// export async function PUT(req, { params }) {
//   try {
//     await connectToDB();
//     const updates = await req.json();
//     // تحديث طلب الحجز (مثلاً تغيير الحالة أو إضافة طريقة الدفع)
//     const updatedBooking = await BookingRequest.findByIdAndUpdate(params.id, updates, { new: true });
//     if (!updatedBooking) {
//       return NextResponse.json({ error: 'Booking request not found' }, { status: 404 });
//     }
//     return NextResponse.json(updatedBooking);
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// export async function DELETE(_, { params }) {
//   try {
//     await connectToDB();
//     await BookingRequest.findByIdAndDelete(params.id);
//     return NextResponse.json({ message: 'Booking request deleted successfully' });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }




// app/api/bookings/[id]/route.js
import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import BookingRequest from '@/models/BookingRequest';

export async function GET(_, { params }) {
  try {
    await connectToDB();

    const booking = await BookingRequest.findById(params.id)
      .populate('patient', 'name email')
      .populate('doctor', 'name email');

    if (!booking) {
      return NextResponse.json({ error: 'Booking request not found' }, { status: 404 });
    }

    return NextResponse.json(booking);
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectToDB();
    const updates = await req.json();

    // ⛔️ معالجة الإلغاء مع رسالة
    if (updates.status === 'cancelled' && updates.cancelMessage) {
      updates.status = 'rejected'; // نغيرها إلى rejected فعليًا
      updates.reason = `❌ تم إلغاء الموعد من قبل المريض. السبب: ${updates.cancelMessage}`;
      updates.paymentStatus = 'unpaid'; // إلغاء الدفع إن وجد
    }

    // ✅ دعم تحديث الدفع
    if (updates.paymentMethod) {
      updates.paymentStatus = 'paid'; // تحديث حالة الدفع تلقائيًا
    }

    const updatedBooking = await BookingRequest.findByIdAndUpdate(params.id, updates, { new: true });

    if (!updatedBooking) {
      return NextResponse.json({ error: 'Booking request not found' }, { status: 404 });
    }

    return NextResponse.json(updatedBooking);
  } catch (error) {
    console.error('PUT Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  try {
    await connectToDB();

    await BookingRequest.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Booking request deleted successfully' });
  } catch (error) {
    console.error('DELETE Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
