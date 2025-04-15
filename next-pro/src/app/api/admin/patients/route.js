
// ✅ app/api/admin/patients/route.js (GET all + POST new)
import { NextResponse } from 'next/server';
import { connectToDB } from "@/lib/db";
import Patient from '@/models/Patient';

export async function GET() {
  try {
    await connectToDB();
    const patients = await Patient.find().sort({ createdAt: -1 });
    return NextResponse.json(patients);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectToDB();
    const body = await request.json();
    const patient = await Patient.create(body);
    return NextResponse.json(patient, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}