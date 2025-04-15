// // // // pages/api/user/uploadReport.js
// // // import { connectToDB } from '@/lib/db'; 
// // // import User from "@/models/User";
// // // import upload from "@/lib/multer";
// // // import BookingRequest from '@/models/BookingRequest';  // Assuming BookingRequest model exists
// // // import { getCurrentUser } from '@/lib/getCurrentUser';
// // // import { NextResponse } from "next/server"; 
// // // // قم بتوصيل إلى قاعدة البيانات
// // // connectToDB ();

// // // const handler = (req, res) => {
// // //   if (req.method === "POST") {
// // //     // استخدام Multer لرفع الملف
// // //     upload.single("report")(req, res, async (err) => {
// // //       if (err) {
// // //         return res.status(500).json({ message: "Error uploading file", error: err });
// // //       }

// // //       // احصل على رابط الملف المرفوع
// // //       const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;
// // //       const user = await getCurrentUser();
// // //       if (!user) {
// // //             return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
// // //           }
      
// // //           if (user.role !== 'doctor') {
// // //             return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
// // //           }
      
// // //           await connectToDB ();
      
// // //           // Fetch patients who have bookings with this doctor
// // //           const bookings = await BookingRequest.find({ doctor: user._id })
// // //             .populate('patient')  // Populating patient information
// // //             .populate('doctor');  // Optionally populate doctor info if necessary
      

// // //       // تحديث حقل التقرير
// // //       bookings.patient.report = fileUrl;
// // //       await bookings.save();
// // // console.log(bookings),
// // //       res.status(200).json({ message: "Report uploaded successfully", fileUrl });
// // //     });
// // //   } else {
// // //     res.status(405).json({ message: "Method not allowed" });
// // //   }
// // // };

// // // export default handler;
// // // src/app/api/doctorDashboard/report/route.js

// // import { NextResponse } from 'next/server';
// // import { connectToDB } from '@/lib/db';
// // import BookingRequest from "@/models/BookingRequest";
// // import upload from "@/lib/multer";
// // import { getCurrentUser } from "@/lib/getCurrentUser";


// // // دالة التعامل مع POST
// // export const POST = async (req) => {
// //   await connectToDB ();

// //   try {
// //     console.log('Request: ', req);
  
// //     // استخدام multer لرفع الملف
// //     await new Promise((resolve, reject) => {
// //       upload.single("report")(req, null, (err) => {
// //         if (err) reject(err);
// //         resolve();
// //       });
// //     });
// //   console.log("Request Files: ", req.file);
   
// //     const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;
// //     const user = await getCurrentUser();

// //     if (!user) {
// //       return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
// //     }

// //     if (user.role !== 'doctor') {
// //       return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
// //     }

// //     // العثور على الحجوزات للطبيب
// //     const bookings = await BookingRequest.find({ doctor: user._id })
// //       .populate('patient')
// //       .populate('doctor');
// //   console.log(bookings);
// //     if (!bookings || bookings.length === 0) {
// //       return NextResponse.json({ message: 'No bookings found for this doctor' }, { status: 404 });
// //     }
// //     // تحديث حقل التقرير لكل مريض
// //     for (let booking of bookings) {
// //         const patient = booking.patient;
// //         console.log(patient)
// //         console.log(fileUrl)
// //         if (patient) {
// //           patient.report = fileUrl; // حفظ رابط التقرير
// //           await patient.save(); // حفظ التحديث في قاعدة البيانات
// //         }
// //       }

      
 

// //     return NextResponse.json({ message: "Report uploaded successfully", fileUrl });   }
// //   catch (err) {
// //     return NextResponse.json({ message: "Error uploading report", error: err.message }, { status: 500 });
// //   }
// // };

// import { NextResponse } from "next/server";
// import formidable from "formidable";
// import { Duplex } from "stream"; // لإنشاء دفق (stream) من الـ buffer
// import fs from "fs";
// import path from "path";

// import { connectToDB } from "@/lib/db";
// import BookingRequest from "@/models/BookingRequest";
// import User from "@/models/User";
// import { getCurrentUser } from "@/lib/getCurrentUser";

// // يجب أن نعمل ضمن بيئة Node.js runtime (وليس Edge)
// export const runtime = "nodejs";

// // تعطيل أي bodyParser افتراضي في Next.js
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export async function POST(req) {
//   try {
//     // 1) الاتصال بقاعدة البيانات
//     await connectToDB();

//     // 2) التحقق من المستخدم
//     const user = await getCurrentUser();
//     if (!user) {
//       return NextResponse.json(
//         { error: "Not authenticated" },
//         { status: 401 }
//       );
//     }
//     if (user.role !== "doctor") {
//       return NextResponse.json(
//         { error: "Not authorized" },
//         { status: 403 }
//       );
//     }

//     // 3) التحقق من الـ Content-Type
//     const contentType = req.headers.get("content-type") || "";
//     if (!contentType.includes("multipart/form-data")) {
//       return NextResponse.json(
//         { error: "Invalid content type, must be multipart/form-data" },
//         { status: 400 }
//       );
//     }

//     // 4) قراءة جسم الطلب كـ arrayBuffer
//     const body = await req.arrayBuffer();
//     const size = body.byteLength;

//     // 5) إنشاء دفق (stream) من الـ buffer وتمرير الرؤوس (headers)
//     const stream = new Duplex();
//     stream.push(Buffer.from(body));
//     stream.push(null);
//     stream.headers = {
//       "content-type": contentType,
//       "content-length": size.toString(),
//     };

//     // 6) إعداد مجلد الرفع
//     const uploadDir = path.join(process.cwd(), "public", "uploads");
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }

//     // 7) إنشاء كائن formidable
//     const form = formidable({
//       multiples: false,
//       maxFileSize: 20 * 1024 * 1024, // 20MB
//       uploadDir,
//       keepExtensions: true,
//     });

//     // 8) معالجة الـ FormData من خلال الـ stream
//     const [fields, files] = await new Promise((resolve, reject) => {
//       form.parse(stream, (err, _fields, _files) => {
//         if (err) return reject(err);
//         resolve([_fields, _files]);
//       });
//     });

//     // حقولنا المفترضة (bookingId, patientId)
//     const { bookingId, patientId } = fields;
//     // الملف المرفوع
//     const uploadedFile = files.report;
//     console.log("uploadedFile =>", uploadedFile);

//     // تحقّق من وجود الملف
//     if (!uploadedFile) {
//       return NextResponse.json(
//         { message: "No file uploaded" },
//         { status: 400 }
//       );
//     }

//     const filePath = uploadedFile.filepath || uploadedFile.path;
//     if (!filePath) {
//       return NextResponse.json(
//         { message: "File path is missing in the uploadedFile object" },
//         { status: 500 }
//       );
//     }
//     const fileName = path.basename(filePath);
//     const fileUrl = `/uploads/${fileName}`;
    

//     // 9) التحقق من أن الحجز يخص هذا الطبيب
//     const booking = await BookingRequest.findOne({
//       _id: bookingId,
//       doctor: user._id,
//     }).populate("patient");
//     if (!booking) {
//       return NextResponse.json(
//         { message: "Booking not found for this doctor" },
//         { status: 404 }
//       );
//     }

//     // 10) تحديث بيانات المريض أو الحجز (حسب ما يلزمك)
//     const patient = await User.findById(patientId);
//     if (!patient) {
//       return NextResponse.json(
//         { message: "Patient not found" },
//         { status: 404 }
//       );
//     }
//     // احفظ المسار في حقل report مثلاً
//     patient.report = fileUrl;
//     await patient.save();

//     // أو بإمكانك حفظه في booking.reportUrl = fileUrl; await booking.save();

//     // 11) إعادة النتيجة للواجهة
//     return NextResponse.json({
//       message: "Report uploaded successfully",
//       fileUrl,
//     });
//   } catch (err) {
//     console.error("Error in POST /report:", err);
//     return NextResponse.json(
//       { message: "Error uploading report", error: err.message },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import formidable from "formidable";
import { Duplex } from "stream"; // لإنشاء دفق (stream) من الـ buffer
import fs from "fs";
import path from "path";

import { connectToDB } from "@/lib/db";
import BookingRequest from "@/models/BookingRequest";
import User from "@/models/User";
import { getCurrentUser } from "@/lib/getCurrentUser";

// يجب أن نعمل ضمن بيئة Node.js runtime (وليس Edge)
export const runtime = "nodejs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  try {
    // 1) الاتصال بقاعدة البيانات
    await connectToDB();

    // 2) التحقق من المستخدم
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }
    if (user.role !== "doctor") {
      return NextResponse.json(
        { error: "Not authorized" },
        { status: 403 }
      );
    }

    // 3) التحقق من الـ Content-Type
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Invalid content type, must be multipart/form-data" },
        { status: 400 }
      );
    }

    // 4) قراءة جسم الطلب كـ arrayBuffer
    const body = await req.arrayBuffer();
    const size = body.byteLength;

    // 5) إنشاء دفق (stream) من الـ buffer وتمرير الرؤوس (headers)
    const stream = new Duplex();
    stream.push(Buffer.from(body));
    stream.push(null);
    stream.headers = {
      "content-type": contentType,
      "content-length": size.toString(),
    };

    // 6) إعداد مجلد الرفع
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // 7) إنشاء كائن formidable
    const form = formidable({
      multiples: false,
      maxFileSize: 20 * 1024 * 1024, // 20MB
      uploadDir,
      keepExtensions: true,
    });

    // 8) معالجة الـ FormData من خلال الـ stream
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(stream, (err, _fields, _files) => {
        if (err) return reject(err);
        resolve([_fields, _files]);
      });
    });

    const { bookingId, patientId } = fields;

    // لاحظ أن files.report هو مصفوفة فيها عنصر واحد
    let uploadedFile = files.report;
    if (Array.isArray(uploadedFile)) {
      uploadedFile = uploadedFile[0];
    }

    // تحقّق من وجود الملف
    if (!uploadedFile) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    const filePath = uploadedFile.filepath; // الآن سيوجد
    if (!filePath) {
      return NextResponse.json(
        { message: "File path is missing in the uploadedFile object" },
        { status: 500 }
      );
    }

    const fileName = path.basename(filePath);
    const fileUrl = `/uploads/${fileName}`;

    // 9) التحقق من أن الحجز يخص هذا الطبيب
    const booking = await BookingRequest.findOne({
      _id: bookingId,
      doctor: user._id,
    }).populate("patient");
    if (!booking) {
      return NextResponse.json(
        { message: "Booking not found for this doctor" },
        { status: 404 }
      );
    }

    // 10) تحديث بيانات المريض أو الحجز
    const patient = await User.findById(patientId);
    if (!patient) {
      return NextResponse.json(
        { message: "Patient not found" },
        { status: 404 }
      );
    }
    patient.report = fileUrl;
    await patient.save();

    // 11) إعادة النتيجة للواجهة
    return NextResponse.json({
      message: "Report uploaded successfully",
      fileUrl,
    });
  } catch (err) {
    console.error("Error in POST /report:", err);
    return NextResponse.json(
      { message: "Error uploading report", error: err.message },
      { status: 500 }
    );
  }
}
