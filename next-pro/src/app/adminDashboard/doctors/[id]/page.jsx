

// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import axios from 'axios';

// export default function DoctorDetailPage() {
//   const { id } = useParams();
//   const [doctor, setDoctor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (id) {
//       fetchDoctor();
//     }
//   }, [id]);

//   const fetchDoctor = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.get(`/api/admin/doctors/${id}`);
//       setDoctor(response.data);
//     } catch (error) {
//       console.error('Error fetching doctor:', error);
//       if (error.response && error.response.data && error.response.data.message) {
//         setError(error.response.data.message);
//       } else {
//         setError('حدث خطأ أثناء تحميل بيانات الطبيب.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-40">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-100 text-red-800 p-4 rounded">
//         <p>{error}</p>
//       </div>
//     );
//   }

//   if (!doctor) {
//     return (
//       <div className="text-center py-10 text-gray-600">
//         لم يتم العثور على بيانات الطبيب.
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md max-w-3xl mx-auto mt-4">
//       <h1 className="text-2xl font-bold text-gray-800 mb-4">بيانات الطبيب</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <strong>الاسم الكامل:</strong>
//           <p>{doctor.name || 'غير محدد'}</p>
//         </div>

//         <div>
//           <strong>البريد الإلكتروني:</strong>
//           <p>{doctor.email || 'غير محدد'}</p>
//         </div>

//         <div>
//           <strong>التخصص:</strong>
//           <p>{doctor.specialization || 'غير محدد'}</p>
//         </div>

//         <div>
//           <strong>سنوات الخبرة:</strong>
//           <p>{doctor.experienceYears ?? 'غير محدد'}</p>
//         </div>

//         <div>
//           <strong>العنوان:</strong>
//           <p>{doctor.address || 'غير محدد'}</p>
//         </div>

//         <div>
//           <strong>تاريخ الميلاد:</strong>
//           <p>{doctor.birthDate ? new Date(doctor.birthDate).toLocaleDateString() : 'غير محدد'}</p>
//         </div>
//       </div>

//       <div className="mt-6">
//         <h2 className="text-lg font-semibold text-gray-800 mb-2">أوقات الدوام</h2>
//         <ul className="space-y-2">
//           {doctor.availability?.map((slot, i) => (
//             <li key={i} className="text-gray-700">
//               <strong>{slot.day}:</strong> {slot.from || '--:--'} - {slot.to || '--:--'}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }



'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

export default function DoctorDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchDoctor();
    }
  }, [id]);

  const fetchDoctor = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/api/admin/doctors/${id}`);
      setDoctor(response.data);
    } catch (error) {
      console.error('Error fetching doctor:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred while loading doctor information.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#415A80]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-800 p-4 rounded">
        <p>{error}</p>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="text-center py-10 text-gray-600">
        Doctor information not found.
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-3xl mx-auto">
      <div className="flex justify-between items-center pb-5 border-b border-[#E5E7E9] mb-6">
        <h1 className="text-2xl font-bold text-[#415A80]">Doctor Details</h1>
        <div className="space-x-2">
          <Link
            href={`/adminDashboard/doctors/${id}/edit`}
            className="px-4 py-2 bg-[#A5D4DC] text-[#415A80] rounded-lg hover:bg-[#80A9B2] transition duration-200"
          >
            Edit
          </Link>
          <Link
            href="/adminDashboard/doctors"
            className="px-4 py-2 border border-[#E5E7E9] text-[#415A80] rounded-lg hover:bg-[#D7E2E9] transition duration-200"
          >
            Back to List
          </Link>
        </div>
      </div>

      <div className="bg-[#F8FAFC] rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div>
              <span className="text-sm text-gray-500">Full Name</span>
              <p className="text-lg font-medium text-[#415A80]">{doctor.name || 'Not specified'}</p>
            </div>
            
            <div>
              <span className="text-sm text-gray-500">Email</span>
              <p className="text-lg text-gray-700">{doctor.email || 'Not specified'}</p>
            </div>
            
            <div>
              <span className="text-sm text-gray-500">Specialization</span>
              <p className="text-lg text-gray-700">
                {doctor.specialization || 'Not specified'}
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div>
              <span className="text-sm text-gray-500">Years of Experience</span>
              <p className="text-lg text-gray-700">
                {doctor.experienceYears ? `${doctor.experienceYears} years` : 'Not specified'}
              </p>
            </div>
            
            <div>
              <span className="text-sm text-gray-500">Address</span>
              <p className="text-lg text-gray-700">{doctor.address || 'Not specified'}</p>
            </div>
            
            <div>
              <span className="text-sm text-gray-500">Date of Birth</span>
              <p className="text-lg text-gray-700">
                {doctor.birthDate ? new Date(doctor.birthDate).toLocaleDateString() : 'Not specified'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-[#415A80] mb-4">Availability Schedule</h2>
        <div className="bg-white border border-[#E5E7E9] rounded-lg overflow-hidden">
          {doctor.availability?.map((slot, i) => (
            <div 
              key={i} 
              className={`p-4 flex justify-between items-center ${
                i % 2 === 0 ? 'bg-[#F8FAFC]' : 'bg-white'
              } ${i !== doctor.availability.length - 1 ? 'border-b border-[#E5E7E9]' : ''}`}
            >
              <div className="font-medium text-[#415A80]">{slot.day}</div>
              <div className="text-gray-700">
                {(slot.from && slot.to) ? 
                  `${slot.from} - ${slot.to}` : 
                  <span className="text-gray-400">Not available</span>
                }
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {doctor.bio && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-[#415A80] mb-2">Biography</h2>
          <div className="bg-white border border-[#E5E7E9] rounded-lg p-4">
            <p className="text-gray-700 whitespace-pre-line">{doctor.bio}</p>
          </div>
        </div>
      )}
      
      {doctor.education && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-[#415A80] mb-2">Education</h2>
          <div className="bg-white border border-[#E5E7E9] rounded-lg p-4">
            <p className="text-gray-700">{doctor.education}</p>
          </div>
        </div>
      )}
    </div>
  );
}