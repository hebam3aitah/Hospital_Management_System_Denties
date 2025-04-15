import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import User from "@/models/User";
import { getCurrentUser } from "@/lib/getCurrentUser";

export const runtime = "nodejs";

// (1) جلب بيانات البروفايل - GET
export async function GET(req) {
  try {
    // الاتصال بقاعدة البيانات
    await connectToDB();

    // التحقق من المستخدم الحالي
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // جلب المستخدم من قاعدة البيانات
    const foundUser = await User.findById(user._id).select("-password"); 
    // .select("-password") لإخفاء الحقل الحساس إن أردت

    if (!foundUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // إعادة معلومات المستخدم
    return NextResponse.json(
      {
        _id: foundUser._id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        address: foundUser.address,
        birthDate: foundUser.birthDate,
        image: foundUser.image,
        profilePicture: foundUser.profilePicture,
        status: foundUser.status,
        report: foundUser.report,
        // ...أي حقول أخرى تريدها
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error GET /api/profile:", err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

// (2) تعديل بيانات البروفايل - PATCH
export async function PATCH(req) {
  try {
    await connectToDB();

    // التحقق من المستخدم الحالي
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // قراءة البيانات المُرسَلة من الفرونت
    const body = await req.json();

    // إجراء التحديث في قاعدة البيانات
    // (نستخدم findByIdAndUpdate ونُعيد المستند المُحدّث)
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { ...body }, // البيانات الجديدة
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Profile updated successfully",
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error PATCH /api/profile:", err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
