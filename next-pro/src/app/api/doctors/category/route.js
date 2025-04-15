// /app/api/doctors/route.js
import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Doctor from "@/models/Doctor";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const specialization = searchParams.get("specialization");
    
    await connectToDB();
    
    const query = {};
    
    // Add specialization filter if provided
    if (specialization && ["Children", "Cosmetic", "General"].includes(specialization)) {
      query.specialization = specialization;
    }
    
    const doctors = await Doctor.find(query).select("-password");
    
    return NextResponse.json({ 
      success: true, 
      count: doctors.length,
      data: doctors 
    });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch doctors" },
      { status: 500 }
    );
  }
}