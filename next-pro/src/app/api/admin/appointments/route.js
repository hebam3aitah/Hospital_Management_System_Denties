import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import Appointment from '@/models/Appointment';

export async function GET() {
  try {
    await connectToDB();
    const appointments = await Appointment.find()
      .populate('patient', 'name email')
      .populate('doctor', 'name email');
    return NextResponse.json(appointments);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectToDB();
    const data = await request.json();
    const appointment = new Appointment(data);
    await appointment.save();
    return NextResponse.json(appointment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
