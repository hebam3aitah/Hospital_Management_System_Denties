// // // "use client";

// // // import React, { useState, useEffect } from "react";
// // // import axios from "axios";

// // // const UploadReportForm = () => {
// // //   const [bookings, setBookings] = useState([]); // لتخزين الحجوزات
// // //   const [file, setFile] = useState(null); // لتخزين الملف المرفوع
// // //   const [loading, setLoading] = useState(false); // حالة التحميل
// // //   const [error, setError] = useState(null); // لتخزين رسائل الخطأ
// // //   const [success, setSuccess] = useState(null); // لتخزين رسالة النجاح

// // //   // جلب الحجوزات من الـ API
// // //   useEffect(() => {
// // //     const fetchBookings = async () => {
// // //       try {
// // //         const response = await axios.get("/api/doctorDashboard/patients");
// // //         setBookings(response.data); // تخزين الحجوزات في state
// // //       } catch (err) {
// // //         setError("حدث خطأ في جلب البيانات.");
// // //       }
// // //     };

// // //     fetchBookings();
// // //   }, []);

// // //   // التعامل مع تغيير الملف
// // //   const handleFileChange = (e) => {
// // //     // تأكد من أن الملف يتم اختياره
// // //     const selectedFile = e.target.files[0];
// // //     setFile(selectedFile);
// // //   };

// // //   // إرسال الملف إلى الـ API
// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     if (!file) {
// // //       setError("من فضلك اختر ملفًا للرفع");
// // //       return;
// // //     }

// // //     setLoading(true);
// // //     setError(null);
// // //     setSuccess(null);

// // //     const formData = new FormData();
// // //     formData.append("report", file);
// // //     // formData.append("bookingId", bookingId); // إرسال الـ bookingId
// // //     // formData.append("patientId", patientId); // إرسال الـ patientId

// // //     try {
// // //         console.log(formData);
// // //       const response = await axios.post("/api/doctorDashboard/report", formData, {
// // //         headers: {
// // //           "Content-Type": "multipart/form-data", // تحديد نوع المحتوى
// // //         },
// // //       });

// // //       setSuccess("تم رفع التقرير بنجاح!");
// // //     } catch (err) {
// // //       setError("حدث خطأ أثناء رفع التقرير.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
// // //       <h2 className="text-2xl font-semibold mb-4">رفع تقرير للمريض</h2>

// // //       {error && <div className="text-red-600 mb-4">{error}</div>}
// // //       {success && <div className="text-green-600 mb-4">{success}</div>}

// // //       {/* عرض الحجوزات والمعلومات الخاصة بكل مريض */}
// // //       {bookings.length > 0 ? (
// // //         bookings.map((booking) => (
// // //           <div key={booking._id} className="mb-6">
// // //             <div className="mb-4">
// // //               <p className="font-semibold">معلومات المريض:</p>
// // //               <p>الاسم: {booking.patient.name}</p>
// // //               <p>البريد الإلكتروني: {booking.patient.email}</p>
// // //               <p>الحالة: {booking.patient.status}</p>
// // //             </div>

// // //             {/* نموذج رفع التقرير لكل مريض */}
// // //             <form onSubmit={(e) => handleSubmit(e, booking._id, booking.patient._id)}>
// // //               <div className="mb-4">
// // //                 <label htmlFor="report" className="block text-gray-700">اختر التقرير (صورة أو PDF)</label>
// // //                 <input
// // //                   type="file"
// // //                   id="report"
// // //                   name="report"
// // //                   accept="image/*,application/pdf"
// // //                   onChange={handleFileChange}
// // //                   className="mt-2 p-2 border border-gray-300 rounded"
// // //                 />
// // //               </div>

// // //               <div className="mb-4">
// // //                 <button
// // //                   type="submit"
// // //                   disabled={loading}
// // //                   className={`px-4 py-2 bg-blue-500 text-white rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
// // //                 >
// // //                   {loading ? "جاري الرفع..." : "رفع التقرير"}
// // //                 </button>
// // //               </div>
// // //             </form>
// // //           </div>
// // //         ))
// // //       ) : (
// // //         <p>لا توجد حجوزات لعرضها.</p>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default UploadReportForm;
// // "use client";

// // import React, { useState, useEffect } from "react";
// // import axios from "axios";

// // const UploadReportForm = () => {
// //   const [bookings, setBookings] = useState([]); // لتخزين الحجوزات
// //   const [file, setFile] = useState(null); // لتخزين الملف المرفوع
// //   const [loading, setLoading] = useState(false); // حالة التحميل
// //   const [error, setError] = useState(null); // لتخزين رسائل الخطأ
// //   const [success, setSuccess] = useState(null); // لتخزين رسالة النجاح

// //   // جلب الحجوزات من الـ API
// //   useEffect(() => {
// //     const fetchBookings = async () => {
// //       try {
// //         const response = await axios.get("/api/doctorDashboard/patients");
// //         setBookings(response.data); // تخزين الحجوزات في state
// //       } catch (err) {
// //         setError("حدث خطأ في جلب البيانات.");
// //       }
// //     };

// //     fetchBookings();
// //   }, []);

// //   // التعامل مع تغيير الملف
// //   const handleFileChange = (e) => {
// //     // تأكد من أن الملف يتم اختياره
// //     const selectedFile = e.target.files[0];
// //     setFile(selectedFile);
// //   };

// //   // إرسال الملف إلى الـ API
// //   const handleSubmit = async (e, bookingId, patientId) => {
// //     e.preventDefault();
// //     if (!file) {
// //       setError("من فضلك اختر ملفًا للرفع");
// //       return;
// //     }

// //     setLoading(true);
// //     setError(null);
// //     setSuccess(null);

// //     const formData = new FormData();
// //     formData.append("report", file); // إضافة الملف إلى FormData
// //     formData.append("bookingId", bookingId); // إرسال الـ bookingId
// //     formData.append("patientId", patientId); // إرسال الـ patientId

// //     try {
// //       console.log(formData);
// //       const response = await axios.post("/api/doctorDashboard/report", formData, {
// //         headers: {
// //           "Content-Type": "multipart/form-data", // تحديد نوع المحتوى
// //         },
// //       });

// //       setSuccess("تم رفع التقرير بنجاح!");
// //     } catch (err) {
// //       setError("حدث خطأ أثناء رفع التقرير.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
// //       <h2 className="text-2xl font-semibold mb-4">رفع تقرير للمريض</h2>

// //       {error && <div className="text-red-600 mb-4">{error}</div>}
// //       {success && <div className="text-green-600 mb-4">{success}</div>}

// //       {/* عرض الحجوزات والمعلومات الخاصة بكل مريض */}
// //       {bookings.length > 0 ? (
// //         bookings.map((booking) => (
// //           <div key={booking._id} className="mb-6">
// //             <div className="mb-4">
// //               <p className="font-semibold">معلومات المريض:</p>
// //               <p>الاسم: {booking.patient.name}</p>
// //               <p>البريد الإلكتروني: {booking.patient.email}</p>
// //               <p>الحالة: {booking.patient.status}</p>
// //             </div>

// //             {/* نموذج رفع التقرير لكل مريض */}
// //             <form onSubmit={(e) => handleSubmit(e, booking._id, booking.patient._id)}>
// //               <div className="mb-4">
// //                 <label htmlFor="report" className="block text-gray-700">اختر التقرير (صورة أو PDF)</label>
// //                 <input
// //                   type="file"
// //                   id="report"
// //                   name="report"
// //                   accept="image/*,application/pdf"
// //                   onChange={handleFileChange}
// //                   className="mt-2 p-2 border border-gray-300 rounded"
// //                 />
// //               </div>

// //               <div className="mb-4">
// //                 <button
// //                   type="submit"
// //                   disabled={loading}
// //                   className={`px-4 py-2 bg-blue-500 text-white rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
// //                 >
// //                   {loading ? "جاري الرفع..." : "رفع التقرير"}
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         ))
// //       ) : (
// //         <p>لا توجد حجوزات لعرضها.</p>
// //       )}
// //     </div>
// //   );
// // };

// // export default UploadReportForm;
// "use client";

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const UploadReportForm = () => {
//   const [bookings, setBookings] = useState([]); // لتخزين الحجوزات
//   const [file, setFile] = useState(null); // لتخزين الملف المرفوع
//   const [loading, setLoading] = useState(false); // حالة التحميل
//   const [error, setError] = useState(null); // لتخزين رسائل الخطأ
//   const [success, setSuccess] = useState(null); // لتخزين رسالة النجاح

//   // جلب الحجوزات من الـ API
//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const response = await axios.get("/api/doctorDashboard/patients");
//         setBookings(response.data); // تخزين الحجوزات في state
//       } catch (err) {
//         setError("حدث خطأ في جلب البيانات.");
//       }
//     };

//     fetchBookings();
//   }, []);

//   // التعامل مع تغيير الملف
//   const handleFileChange = (e) => {
//     // تأكد من أن الملف يتم اختياره
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile); // تعيين الملف في الحالة
//     console.log(selectedFile); // تحقق من أن الملف تم اختياره بشكل صحيح
//   };

//   // إرسال الملف إلى الـ API
//   const handleSubmit = async (e, bookingId, patientId) => {
//     e.preventDefault();
//     if (!file) {
//       setError("من فضلك اختر ملفًا للرفع");
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     // إعداد FormData
//     const formData = new FormData();
//     formData.append("report", file); // إضافة الملف إلى FormData
//     formData.append("bookingId", bookingId); // إرسال الـ bookingId
//     formData.append("patientId", patientId); // إرسال الـ patientId
//     for (let pair of formData.entries()) {
//         console.log(pair[0]+ ', ' + pair[1]);
//       }
//     // تحقق من محتويات FormData
//     console.log("FormData:", formData);

//     try {
//       // إرسال الطلب إلى السيرفر
//       const response = await axios.post("/api/doctorDashboard/report", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data", // تحديد نوع المحتوى
//         },
//       });

//       setSuccess("تم رفع التقرير بنجاح!");
//     } catch (err) {
//       setError("حدث خطأ أثناء رفع التقرير.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
//       <h2 className="text-2xl font-semibold mb-4">رفع تقرير للمريض</h2>

//       {error && <div className="text-red-600 mb-4">{error}</div>}
//       {success && <div className="text-green-600 mb-4">{success}</div>}

//       {/* عرض الحجوزات والمعلومات الخاصة بكل مريض */}
//       {bookings.length > 0 ? (
//         bookings.map((booking) => (
//           <div key={booking._id} className="mb-6">
//             <div className="mb-4">
//               <p className="font-semibold">معلومات المريض:</p>
//               <p>الاسم: {booking.patient.name}</p>
//               <p>البريد الإلكتروني: {booking.patient.email}</p>
//               <p>الحالة: {booking.patient.status}</p>
//             </div>

//             {/* نموذج رفع التقرير لكل مريض */}
//             <form onSubmit={(e) => handleSubmit(e, booking._id, booking.patient._id)}>
//               <div className="mb-4">
//                 <label htmlFor="report" className="block text-gray-700">اختر التقرير (صورة أو PDF)</label>
//                 <input
//                   type="file"
//                   id="report"
//                   name="report"
//                   accept="image/*,application/pdf"
//                   onChange={handleFileChange}
//                   className="mt-2 p-2 border border-gray-300 rounded"
//                 />
//               </div>

//               <div className="mb-4">
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className={`px-4 py-2 bg-blue-500 text-white rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
//                 >
//                   {loading ? "جاري الرفع..." : "رفع التقرير"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         ))
//       ) : (
//         <p>لا توجد حجوزات لعرضها.</p>
//       )}
//     </div>
//   );
// };

// export default UploadReportForm;
"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const UploadReportForm = () => {
  const [bookings, setBookings] = useState([]); // لتخزين الحجوزات
  const [file, setFile] = useState(null); // لتخزين الملف المرفوع
  const [loading, setLoading] = useState(false); // حالة التحميل
  const [error, setError] = useState(null); // لتخزين رسائل الخطأ
  const [success, setSuccess] = useState(null); // لتخزين رسالة النجاح

  // جلب الحجوزات من الـ API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("/api/doctorDashboard/patients");
        setBookings(response.data); // تخزين الحجوزات في state
      } catch (err) {
        setError("حدث خطأ في جلب البيانات.");
      }
    };

    fetchBookings();
  }, []);

  // التعامل مع تغيير الملف
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile); // تعيين الملف في الحالة
    console.log(selectedFile); // تحقق من أن الملف تم اختياره بشكل صحيح
  };

  // إرسال الملف إلى الـ API
  const handleSubmit = async (e, bookingId, patientId) => {
    e.preventDefault();
    if (!file) {
      setError("من فضلك اختر ملفًا للرفع");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    // إعداد FormData
    const formData = new FormData();
    formData.append("report", file); // إضافة الملف إلى FormData
    formData.append("bookingId", bookingId); // إرسال الـ bookingId
    formData.append("patientId", patientId); // إرسال الـ patientId

    // التحقق من محتويات FormData باستخدام entries()
    for (let pair of formData.entries()) {
      if (pair[0] === "report") {
        // إذا كان الحقل هو "report" (الملف)
        console.log(`${pair[0]}: ${pair[1].name}, ${pair[1].size} bytes, ${pair[1].type}`);
      } else {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
    }

    try {
      // إرسال الطلب إلى السيرفر
      const response = await axios.post("/api/doctorDashboard/report", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // تحديد نوع المحتوى
        },
      });

      setSuccess("تم رفع التقرير بنجاح!");
    } catch (err) {
      setError("حدث خطأ أثناء رفع التقرير.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">رفع تقرير للمريض</h2>

      {error && <div className="text-red-600 mb-4">{error}</div>}
      {success && <div className="text-green-600 mb-4">{success}</div>}

      {/* عرض الحجوزات والمعلومات الخاصة بكل مريض */}
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div key={booking._id} className="mb-6">
            <div className="mb-4">
              <p className="font-semibold">معلومات المريض:</p>
              <p>الاسم: {booking.patient.name}</p>
              <p>البريد الإلكتروني: {booking.patient.email}</p>
              <p>الحالة: {booking.patient.status}</p>
            </div>

            {/* نموذج رفع التقرير لكل مريض */}
            <form onSubmit={(e) => handleSubmit(e, booking._id, booking.patient._id)}>
              <div className="mb-4">
                <label htmlFor="report" className="block text-gray-700">اختر التقرير (صورة أو PDF)</label>
                <input
                  type="file"
                  id="report"
                  name="report"
                  accept="image/*,application/pdf"
                  onChange={handleFileChange}
                  className="mt-2 p-2 border border-gray-300 rounded"
                />
              </div>

              <div className="mb-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-4 py-2 bg-blue-500 text-white rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {loading ? "جاري الرفع..." : "رفع التقرير"}
                </button>
              </div>
            </form>
          </div>
        ))
      ) : (
        <p>لا توجد حجوزات لعرضها.</p>
      )}
    </div>
  );
};

export default UploadReportForm;
