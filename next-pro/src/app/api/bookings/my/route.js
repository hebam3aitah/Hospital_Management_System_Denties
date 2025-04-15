// app/api/bookings/my/route.js
import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import BookingRequest from '@/models/BookingRequest';
import { getCurrentUser } from '@/lib/getCurrentUser';

export async function GET() {
    try {
      await connectToDB();
      const user = await getCurrentUser();
  
      if (!user) {
        console.log('⛔️ Unauthorized - no user');
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
  
      const bookings = await BookingRequest.find({ patient: user._id })
        .populate('doctor', 'name')
        .sort({ date: 1 });
  
      console.log('✅ Found bookings:', bookings.length);
      return NextResponse.json(bookings);
    } catch (err) {
      console.error('🔥 Error in GET /api/bookings/my:', err);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
  