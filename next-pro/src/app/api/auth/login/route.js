
import { connectToDB } from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';//: لتشفير ومقارنة كلمات المرور.
import jwt from 'jsonwebtoken';// لإنشاء JSON Web Token.



export async function POST(req) {
  try {
    await connectToDB();

    //2. استخراج البريد وكلمة المرور من جسم الطلب:
    const { email, password } = await req.json();
    //3. البحث عن المستخدم في قاعدة البيانات:

    const user = await User.findOne({ email });
//إذا لم يتم العثور على المستخدم:

    if (!user) {
      return new Response(JSON.stringify({ message: 'البريد غير مسجل' }), { status: 404 });
    }
    
// 👉 JSON.stringify()
// وهي دالة في JavaScript تقوم بتحويل كائن (object) أو مصفوفة (array) أو أي قيمة JavaScript إلى سلسلة نصية بصيغة JSON.


//4. التحقق إذا كان المستخدم فعّل بريده الإلكتروني:


    if (!user.IsConfirmed) {
      return new Response(JSON.stringify({ message: 'يرجى تأكيد البريد الإلكتروني أولاً' }), { status: 403 });
    }
   // 5. التحقق من كلمة المرور:


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ message: 'كلمة المرور غير صحيحة' }), { status: 401 });
    }
    
  //6. إنشاء التوكن JWT:


    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    // إعداد الكوكي
    const cookie = `token=${token}; Path=/; HttpOnly; Max-Age=604800; SameSite=Strict; ${
      process.env.NODE_ENV === 'production' ? 'Secure;' : ''
    }`;

    return new Response(JSON.stringify({ message: 'تم تسجيل الدخول بنجاح' }), {
      status: 200,
      headers: {
        'Set-Cookie': cookie,
        'Content-Type': 'application/json',
      },
    });

  } catch (err) {
    console.error('Login Error:', err);
    return new Response(JSON.stringify({ message: 'حدث خطأ أثناء تسجيل الدخول' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
