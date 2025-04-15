import { NextResponse } from "next/server";
import { connectToDB } from '../../../lib/db';
import Article from "../../../models/article";

// GET all articles
// في الـ GET الخاصة بـ Home
export async function GET() {
  await connectToDB();
  try {
    const articles = await Article.find({ isDeleted: false })
                                  .sort({ createdAt: -1 })
                                  .limit(4);  // عرض آخر 4 مقالات
    return NextResponse.json({ success: true, data: articles }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}