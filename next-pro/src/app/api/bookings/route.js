import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import BookingRequest from '@/models/BookingRequest';
import { getCurrentUser } from '@/lib/getCurrentUser';

export async function POST(request) {
  try {
    await connectToDB();
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const newBooking = new BookingRequest({
      patient: user._id,
      doctor: body.doctor,
      date: body.date,
      time: body.time,
      reason: body.reason,
      status: 'pending',
    });

    await newBooking.save();
    return NextResponse.json(newBooking, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
