import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import Doctor from '@/models/Doctor';
import BookingRequest from '@/models/BookingRequest';

export async function GET() {
  try {
    await connectToDB();

    const doctors = await Doctor.find();
    const bookings = await BookingRequest.find({ status: { $ne: 'rejected' } });

    const bookingsMap = bookings.reduce((acc, cur) => {
      const key = `${cur.doctor}_${cur.date.toISOString().split('T')[0]}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(cur.time);
      return acc;
    }, {});

    const result = doctors.map((doc) => ({
      _id: doc._id,
      name: doc.name,
      availability: doc.availability,
      bookedSlots: bookingsMap
    }));

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
