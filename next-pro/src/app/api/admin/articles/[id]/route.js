
// ✅ app/api/admin/articles/[id]/route.js (GET one + PUT + DELETE)
import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import Article from '@/models/article';

export async function GET(_, { params }) {
  await connectToDB();
  try {
    const article = await Article.findById(params.id);
    if (!article || article.isDeleted) {
      return NextResponse.json({ success: false, message: 'Article not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: article }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
export async function PUT(req, { params }) {
    await connectToDB();
    try {
      const body = await req.json();
  
      // إعادة توليد slug إذا تم تغيير العنوان
      if (body.title) {
        body.slug = body.title
          .toLowerCase()
          .replace(/[^ء-ي\w\s]/gi, '')
          .replace(/\s+/g, '-');
      }
  
      console.log('🔧 Body to update:', body);
  
      const updatedArticle = await Article.findByIdAndUpdate(
        params.id,
        { ...body, updatedAt: Date.now() },
        { new: true, runValidators: true }
      );
  
      if (!updatedArticle) {
        return NextResponse.json({ success: false, message: 'Article not found' }, { status: 404 });
      }
  
      return NextResponse.json({ success: true, data: updatedArticle }, { status: 200 });
    } catch (error) {
      console.error('❌ Error updating article:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }
  
  
  export async function DELETE(_, { params }) {
    await connectToDB();
    try {
      console.log('🗑️ Trying to delete article with ID:', params.id);
  
      const deletedArticle = await Article.findByIdAndUpdate(
        params.id,
        { isDeleted: true, updatedAt: Date.now() },
        { new: true }
      );
  
      if (!deletedArticle) {
        return NextResponse.json(
          { success: false, message: 'Article not found' },
          { status: 404 }
        );
      }
  
      return NextResponse.json(
        { success: true, message: 'Article soft deleted' },
        { status: 200 }
      );
    } catch (error) {
      console.error('❌ Error deleting article:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }
  }
  