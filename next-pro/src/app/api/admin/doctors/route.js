import { connectToDB } from "@/lib/db";
import Doctor from "@/models/Doctor";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"; // تأكد من تثبيته: npm install bcryptjs

// وظيفة لتسجيل الأخطاء بتنسيق منظم
function logError(method, error) {
  console.error(`[API] [${method}] Error:`, error.message);
  console.error(error.stack);
}

// GET - الحصول على قائمة الأطباء
export async function GET(req) {
  console.log("[API] GET request for doctors list");

  try {
    // الاتصال بقاعدة البيانات
    await connectToDB();
    console.log("[API] Connected to database, fetching doctors");

    // إضافة دعم للتصفية والبحث والترتيب
    const { searchParams } = new URL(req.url);
    const query = {};

    const nameSearch = searchParams.get("name");
    const specializationSearch = searchParams.get("specialization");
    if (nameSearch) query.name = { $regex: nameSearch, $options: "i" };
    if (specializationSearch)
      query.specialization = { $regex: specializationSearch, $options: "i" };

    const sortField = searchParams.get("sortBy") || "name";
    const sortOrder = searchParams.get("sortOrder") === "desc" ? -1 : 1;
    const sortOptions = {};
    sortOptions[sortField] = sortOrder;

    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const skip = parseInt(searchParams.get("skip") || "0", 10);

    const doctors = await Doctor.find(query)
      .select("name email specialization experienceYears")
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    const total = await Doctor.countDocuments(query);

    console.log(`[API] Successfully retrieved ${doctors.length} doctors`);

    return NextResponse.json({
      doctors,
      pagination: {
        total,
        limit,
        skip,
        hasMore: skip + doctors.length < total,
      },
    });
  } catch (error) {
    logError("GET", error);
    return NextResponse.json(
      {
        message: "حدث خطأ أثناء استرجاع قائمة الأطباء",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// POST - إضافة طبيب جديد + إنشاء حساب مستخدم له
export async function POST(req) {
  console.log("[API] POST request to create new doctor");

  try {
    await connectToDB();

    const body = await req.json();
    console.log(`[API] Received data for new doctor: ${body.name}`);

    // التحقق من الحقول الأساسية
    if (!body.name || !body.email || !body.password) {
      return NextResponse.json(
        { message: "يجب توفير الاسم والبريد الإلكتروني وكلمة المرور" },
        { status: 400 }
      );
    }

    // التحقق من تكرار البريد الإلكتروني في Doctor أو User
    const doctorExists = await Doctor.findOne({ email: body.email });
    const userExists = await User.findOne({ email: body.email });

    if (doctorExists || userExists) {
      return NextResponse.json(
        { message: "البريد الإلكتروني مستخدم بالفعل" },
        { status: 400 }
      );
    }

    // تجهيز البيانات
    const experienceYears = parseInt(body.experienceYears, 10) || 0;
    const birthDate = body.birthDate || null;
    const hashedPassword = await bcrypt.hash(body.password, 10);

    // إنشاء الطبيب
    const doctor = await Doctor.create({
      ...body,
      experienceYears,
      birthDate,
      password: hashedPassword,
    });

    // إنشاء المستخدم المرتبط
    const user = await User.create({
      _id:doctor._id,
      name: doctor.name,
      email: doctor.email,
      password: hashedPassword,
      role: "doctor",
      profilePicture: doctor.profilePicture,
      address: doctor.address,
      birthDate: doctor.birthDate,
      IsConfirmed: true,
    });

    console.log(`[API] Successfully created doctor and user: ${doctor.email}`);

    return NextResponse.json({ doctor, user }, { status: 201 });
  } catch (error) {
    logError("POST", error);

    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return NextResponse.json(
        {
          message: "خطأ في التحقق من صحة البيانات",
          errors: validationErrors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "حدث خطأ أثناء إضافة الطبيب",
        error: error.message,
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
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400",
    },
  });
}
