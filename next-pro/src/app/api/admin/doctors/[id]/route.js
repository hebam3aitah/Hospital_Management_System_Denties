import { connectToDB } from '@/lib/db';
import Doctor from '@/models/Doctor';
import { NextResponse } from 'next/server';

// وظيفة مساعدة للتحقق من صحة المعرف
function isValidObjectId(id) {
  return id && /^[0-9a-fA-F]{24}$/.test(id);
}

// وظيفة لتسجيل الأخطاء بتنسيق منظم
function logError(method, error, id) {
  console.error(`[API] [${method}] [Doctor ID: ${id || 'N/A'}] Error:`, error.message);
  console.error(error.stack);
}

// GET - الحصول على طبيب محدد بالمعرف
export async function GET(req, { params }) {
  console.log(`[API] GET request for doctor ID: ${params.id}`);
  
  try {
    // التحقق من صحة المعرف
    if (!isValidObjectId(params.id)) {
      return NextResponse.json(
        { message: 'معرف الطبيب غير صحيح' },
        { status: 400 }
      );
    }
    
    // الاتصال بقاعدة البيانات
    await connectToDB();
    console.log(`[API] Connected to database, searching for doctor ID: ${params.id}`);
    
    // البحث عن الطبيب
    const doctor = await Doctor.findById(params.id);
    
    // التحقق من وجود الطبيب
    if (!doctor) {
      console.log(`[API] Doctor with ID ${params.id} not found`);
      return NextResponse.json(
        { message: 'لم يتم العثور على الطبيب' },
        { status: 404 }
      );
    }
    
    console.log(`[API] Successfully retrieved doctor: ${doctor.name}`);
    
    // إرجاع بيانات الطبيب
    return NextResponse.json(doctor);
  } catch (error) {
    logError('GET', error, params.id);
    return NextResponse.json(
      { 
        message: 'حدث خطأ أثناء استرجاع بيانات الطبيب', 
        error: error.message 
      },
      { status: 500 }
    );
  }
}

// PUT - تحديث بيانات طبيب محدد
export async function PUT(req, { params }) {
  console.log(`[API] PUT request for doctor ID: ${params.id}`);
  
  try {
    // التحقق من صحة المعرف
    if (!isValidObjectId(params.id)) {
      return NextResponse.json(
        { message: 'معرف الطبيب غير صحيح' },
        { status: 400 }
      );
    }
    
    // الاتصال بقاعدة البيانات
    await connectToDB();
    
    // التحقق من وجود الطبيب قبل التحديث
    const doctorExists = await Doctor.findById(params.id);
    
    if (!doctorExists) {
      return NextResponse.json(
        { message: 'لم يتم العثور على الطبيب' },
        { status: 404 }
      );
    }
    
    // الحصول على البيانات المرسلة
    const data = await req.json();
    console.log(`[API] Received update data for doctor: ${doctorExists.name}`);
    
    // معالجة حقل سنوات الخبرة
    if (data.experienceYears !== undefined) {
      data.experienceYears = parseInt(data.experienceYears, 10) || 0;
    }
    
    // معالجة حقل التاريخ
    if (data.birthDate === '') {
      data.birthDate = null;
    }
    
    // التحقق من البريد الإلكتروني إذا تم تغييره
    if (data.email && data.email !== doctorExists.email) {
      const emailExists = await Doctor.findOne({ 
        email: data.email,
        _id: { $ne: params.id } // استبعاد الطبيب الحالي من البحث
      });
      
      if (emailExists) {
        return NextResponse.json(
          { message: 'البريد الإلكتروني مستخدم بالفعل' },
          { status: 400 }
        );
      }
    }
    
    // تحديث بيانات الطبيب
    const updated = await Doctor.findByIdAndUpdate(
      params.id,
      data,
      { new: true, runValidators: true }
    );
    
    console.log(`[API] Doctor updated successfully: ${updated.name}`);
    
    // إرجاع البيانات المحدثة
    return NextResponse.json(updated);
  } catch (error) {
    logError('PUT', error, params.id);
    return NextResponse.json(
      { 
        message: 'حدث خطأ أثناء تحديث بيانات الطبيب', 
        error: error.message 
      },
      { status: 500 }
    );
  }
}

// DELETE - حذف طبيب محدد
export async function DELETE(req, { params }) {
  console.log(`[API] DELETE request for doctor ID: ${params.id}`);
  
  try {
    // التحقق من صحة المعرف
    if (!isValidObjectId(params.id)) {
      return NextResponse.json(
        { message: 'معرف الطبيب غير صحيح' },
        { status: 400 }
      );
    }
    
    // الاتصال بقاعدة البيانات
    await connectToDB();
    
    // التحقق من وجود الطبيب قبل الحذف
    const doctor = await Doctor.findById(params.id);
    
    if (!doctor) {
      return NextResponse.json(
        { message: 'لم يتم العثور على الطبيب' },
        { status: 404 }
      );
    }
    
    console.log(`[API] Deleting doctor: ${doctor.name}`);
    
    // حذف الطبيب
    await Doctor.findByIdAndDelete(params.id);
    
    console.log(`[API] Doctor deleted successfully`);
    
    // إرجاع استجابة ناجحة بدون محتوى
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    logError('DELETE', error, params.id);
    return NextResponse.json(
      { 
        message: 'حدث خطأ أثناء حذف الطبيب', 
        error: error.message 
      },
      { status: 500 }
    );
  }
}

// لدعم طلبات CORS OPTIONS
export async function OPTIONS(req) {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Methods': 'GET, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    }
  });
}