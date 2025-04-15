// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import axios from 'axios';

// export default function DoctorsPage() {
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   const fetchDoctors = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       console.log('جاري إرسال طلب إلى API باستخدام Axios...');
//       const response = await axios.get('/api/admin/doctors', {
//         headers: {
//           'Cache-Control': 'no-cache',
//         },
//         timeout: 10000
//       });

//       console.log('استجابة API:', response.status);
//       const data = response.data;
//       console.log('تم استلام البيانات بنجاح:', data);
      
//       // تعديل هنا 👇
//       setDoctors(Array.isArray(data.doctors) ? data.doctors : []);
//     } catch (error) {
//       console.error('خطأ مفصل:', error);
//       if (error.response) {
//         console.error('استجابة الخادم:', error.response.status, error.response.data);
//         setError(`فشل في جلب البيانات: ${error.response.status} - ${error.response.data.message || 'خطأ في الخادم'}`);
//       } else if (error.request) {
//         console.error('لم يتم استلام استجابة من الخادم');
//         setError('لم يتم استلام استجابة من الخادم. تحقق من اتصالك بالإنترنت أو حالة الخادم.');
//       } else {
//         setError(`حدث خطأ: ${error.message}`);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!confirm('هل أنت متأكد من حذف هذا الطبيب؟')) return;

//     try {
//       await axios.delete(`/api/doctors/${id}`);
//       setDoctors(doctors.filter((doc) => doc._id !== id));
//       alert('تم حذف الطبيب بنجاح');
//     } catch (error) {
//       console.error('Error deleting doctor:', error);
//       let errorMessage = 'حدث خطأ أثناء حذف الطبيب';
//       if (error.response) {
//         errorMessage = error.response.data.message || errorMessage;
//       }
//       alert(errorMessage);
//     }
//   };

//   if (error) {
//     return (
//       <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
//         <div className="flex">
//           <div className="mr-3">
//             <p className="text-sm text-red-700">{error}</p>
//           </div>
//           <div className="ml-auto">
//             <button
//               onClick={fetchDoctors}
//               className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
//             >
//               إعادة المحاولة
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6">
//       <div className="flex justify-between items-center pb-5 border-b border-gray-200 mb-6">
//         <h1 className="text-2xl font-bold text-gray-900">إدارة الأطباء</h1>
//         <Link
//           href="/adminDashboard/doctors/create"
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           إضافة طبيب جديد
//         </Link>
//       </div>

//       {loading ? (
//         <div className="flex justify-center items-center h-40">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       ) : doctors.length === 0 ? (
//         <div className="py-8 text-center">
//           <p className="text-gray-500 text-lg">لا يوجد أطباء مسجلين.</p>
//           <Link
//             href="/adminDashboard/doctors/create"
//             className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             إضافة أول طبيب
//           </Link>
//         </div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الاسم</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التخصص</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">سنوات الخبرة</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {doctors.map((doctor) => (
//                 <tr key={doctor._id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{doctor.name || 'غير محدد'}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doctor.specialization || 'غير محدد'}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {doctor.experienceYears !== undefined ? `${doctor.experienceYears} سنة` : 'غير محدد'}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2 space-x-reverse">
//                     <Link
//                       href={`/adminDashboard/doctors/${doctor._id}`}
//                       className="text-blue-600 hover:text-blue-900 ml-3"
//                     >
//                       عرض
//                     </Link>
//                     <Link
//                       href={`/adminDashboard/doctors/${doctor._id}/edit`}
//                       className="text-amber-600 hover:text-amber-900 ml-3"
//                     >
//                       تعديل
//                     </Link>
//                     <button
//                       onClick={() => handleDelete(doctor._id)}
//                       className="text-red-600 hover:text-red-900"
//                     >
//                       حذف
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }




'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('Sending request to API using Axios...');
      const response = await axios.get('/api/admin/doctors', {
        headers: {
          'Cache-Control': 'no-cache',
        },
        timeout: 10000
      });

      console.log('API Response:', response.status);
      const data = response.data;
      console.log('Data received successfully:', data);
      
      setDoctors(Array.isArray(data.doctors) ? data.doctors : []);
    } catch (error) {
      console.error('Detailed error:', error);
      if (error.response) {
        console.error('Server response:', error.response.status, error.response.data);
        setError(`Failed to fetch data: ${error.response.status} - ${error.response.data.message || 'Server error'}`);
      } else if (error.request) {
        console.error('No response received from server');
        setError('No response received from server. Check your internet connection or server status.');
      } else {
        setError(`An error occurred: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this doctor?')) return;

    try {
      await axios.delete(`/api/admin/doctors/${id}`);
      setDoctors(doctors.filter((doc) => doc._id !== id));
      alert('Doctor deleted successfully');
    } catch (error) {
      console.error('Error deleting doctor:', error);
      let errorMessage = 'An error occurred while deleting the doctor';
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }
      alert(errorMessage);
    }
  };

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
        <div className="flex">
          <div className="flex-grow">
            <p className="text-sm text-red-700">{error}</p>
          </div>
          <div>
            <button
              onClick={fetchDoctors}
              className="px-3 py-1 text-sm text-white bg-[#415A80] rounded hover:bg-[#334766]"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center pb-5 border-b border-[#E5E7E9] mb-6">
        <h1 className="text-2xl font-bold text-[#415A80]">Doctors Management</h1>
        <Link
          href="/adminDashboard/doctors/create"
          className="px-4 py-2 bg-[#415A80] text-white rounded-lg hover:bg-[#334766] transition duration-200"
        >
          Add New Doctor
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#415A80]"></div>
        </div>
      ) : doctors.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-gray-500 text-lg">No registered doctors found.</p>
          <Link
            href="/adminDashboard/doctors/create"
            className="mt-4 inline-block px-4 py-2 bg-[#415A80] text-white rounded-lg hover:bg-[#334766] transition duration-200"
          >
            Add First Doctor
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-[#E5E7E9] shadow-sm rounded-lg">
            <thead className="bg-[#F8FAFC]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience Years</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7E9]">
              {doctors.map((doctor) => (
                <tr key={doctor._id} className="hover:bg-[#D7E2E9]">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{doctor.name || 'Not specified'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doctor.specialization || 'Not specified'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doctor.experienceYears !== undefined ? `${doctor.experienceYears} years` : 'Not specified'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-3">
                    <Link
                      href={`/adminDashboard/doctors/${doctor._id}`}
                      className="text-[#415A80] hover:text-[#334766] mr-3"
                    >
                      View
                    </Link>
                    <Link
                      href={`/adminDashboard/doctors/${doctor._id}/edit`}
                      className="text-[#A5D4DC] hover:text-[#80A9B2] mr-3"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(doctor._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}