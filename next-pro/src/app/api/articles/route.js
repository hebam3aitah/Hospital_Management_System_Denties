import { NextResponse } from "next/server";
import { connectToDB } from '../../../lib/db';
import Article from "../../../models/article";

// في الـ GET الخاصة بـ Articles (التي تعرض جميع المقالات)
export async function GET() {
  await connectToDB();
  try {
    const articles = await Article.find({ isDeleted: false })
                                  .sort({ createdAt: -1 });  // عرض جميع المقالات
    return NextResponse.json({ success: true, data: articles }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}


export async function POST(req) {
  try {
    await connectToDB();

    const body = await req.json();

    const article = await Article.create(body);

    return NextResponse.json(
      { success: true, data: article },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error creating article:", error); // 🧠 مهم جداً لفهم الخطأ
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 } // 🟥 500 بدل 400 لأنو غالبًا خطأ بالسيرفر
    );
  }
}
