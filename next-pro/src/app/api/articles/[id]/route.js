import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/db";
import Article from "../../../../models/article";

export async function GET(_, { params }) {
  await dbConnect();
  try {
    const article = await Article.findById(params.id);
    if (!article || article.isDeleted) {
      return NextResponse.json(
        { success: false, message: "Article not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: article }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  await dbConnect();
  try {
    const body = await req.json();
    const updatedArticle = await Article.findByIdAndUpdate(
      params.id,
      { ...body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!updatedArticle) {
      return NextResponse.json(
        { success: false, message: "Article not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, data: updatedArticle },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function DELETE(_, { params }) {
  await dbConnect();
  try {
    const deletedArticle = await Article.findByIdAndUpdate(
      params.id,
      { isDeleted: true, updatedAt: Date.now() },
      { new: true }
    );
    if (!deletedArticle) {
      return NextResponse.json(
        { success: false, message: "Article not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, message: "Article soft deleted" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
