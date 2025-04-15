import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import Appointment from '@/models/Appointment';

export async function PUT(req, { params }) {
  try {
    await connectToDB();
    const updates = await req.json();
    const updated = await Appointment.findByIdAndUpdate(params.id, updates, { new: true });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  try {
    await connectToDB();
    await Appointment.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true, message: 'Appointment deleted' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
