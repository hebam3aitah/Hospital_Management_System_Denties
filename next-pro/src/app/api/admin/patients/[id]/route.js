
// ✅ app/api/admin/patients/[id]/route.js (DELETE only)
import { NextResponse } from 'next/server';
import { connectToDB } from "@/lib/db";
import Patient from '@/models/Patient';

export async function DELETE(_, { params }) {
  try {
    await connectToDB();
    await Patient.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'تم حذف المريض' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}