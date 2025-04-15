// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter, useParams } from 'next/navigation';
// import axios from 'axios';

// export default function EditDoctorPage() {
//   const router = useRouter();
//   const { id } = useParams();
//   const [formData, setFormData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState(null);
//   const [message, setMessage] = useState({ type: '', text: '' });

//   useEffect(() => {
//     fetchDoctor();
//   }, [id]);

//   const fetchDoctor = async () => {
//     if (!id) return;
    
//     setLoading(true);
//     setError(null);
    
//     try {
//       console.log('جاري إرسال طلب إلى API باستخدام Axios...');
//       const response = await axios.get(`/api/admin/doctors/${id}`);
      
//       console.log('استجابة API:', response.status);
//       const data = response.data;
      
//       // تحضير البيانات لعرضها في النموذج
//       setFormData({
//         ...data,
//         // معالجة حقل التاريخ لعرضه بشكل صحيح
//         birthDate: data.birthDate ? new Date(data.birthDate).toISOString().split('T')[0] : '',
//         // التأكد من وجود بيانات الجدول الزمني
//         availability: Array.isArray(data.availability) && data.availability.length ? data.availability : [
//           { day: 'Monday', from: '', to: '' },
//           { day: 'Tuesday', from: '', to: '' },
//           { day: 'Wednesday', from: '', to: '' },
//           { day: 'Thursday', from: '', to: '' },
//           { day: 'Friday', from: '', to: '' },
//           { day: 'Saturday', from: '', to: '' },
//           { day: 'Sunday', from: '', to: '' }
//         ]
//       });
//     } catch (error) {
//       console.error('Error fetching doctor:', error);
//       let errorMessage = 'حدث خطأ أثناء جلب البيانات';
      
//       if (error.response) {
//         if (error.response.status === 404) {
//           errorMessage = 'لم يتم العثور على الطبيب';
//         } else {
//           errorMessage = error.response.data.message || errorMessage;
//         }
//       }
      
//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type } = e.target;
//     setFormData({ 
//       ...formData, 
//       [name]: type === 'number' ? (value ? parseInt(value, 10) : '') : value 
//     });
//   };

//   const handleAvailabilityChange = (i, field, value) => {
//     const copy = [...formData.availability];
//     copy[i][field] = value;
//     setFormData({ ...formData, availability: copy });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);
//     setMessage({ type: '', text: '' });
    
//     // تجهيز البيانات للإرسال
//     const dataToSubmit = {
//       ...formData,
//       experienceYears: formData.experienceYears ? parseInt(formData.experienceYears, 10) : 0,
//       // معالجة خاصة للتاريخ
//       birthDate: formData.birthDate || null
//     };
    
//     try {
//       const response = await axios.put(`/api/doctors/${id}`, dataToSubmit);
      
//       setMessage({ type: 'success', text: 'تم تحديث بيانات الطبيب بنجاح' });
      
//       // انتظر لحظة قبل التوجيه
//       setTimeout(() => {
//         router.push('/adminDashboard/doctors');
//       }, 1000);
//     } catch (error) {
//       console.error('Error updating doctor:', error);
//       let errorMessage = 'حدث خطأ أثناء تحديث البيانات';
      
//       if (error.response) {
//         errorMessage = error.response.data.message || errorMessage;
//       }
      
//       setMessage({ type: 'error', text: errorMessage });
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded">
//         <div className="flex">
//           <div className="mr-3">
//             <p className="text-sm text-red-700">{error}</p>
//           </div>
//         </div>
//         <div className="mt-4">
//           <button 
//             onClick={() => router.push('/adminDashboard/doctors')}
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             العودة إلى قائمة الأطباء
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!formData) {
//     return (
//       <div className="text-center py-10">
//         <h2 className="text-xl text-gray-600">لم يتم العثور على بيانات الطبيب</h2>
//         <button 
//           onClick={() => router.push('/adminDashboard/doctors')}
//           className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           العودة إلى قائمة الأطباء
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md">
//       <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
//         <h2 className="text-2xl font-bold text-gray-800">تعديل بيانات الطبيب</h2>
        
//         {message.text && (
//           <div className={`p-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
//             {message.text}
//           </div>
//         )}
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">الاسم الكامل</label>
//             <input 
//               name="name" 
//               value={formData.name || ''}
//               onChange={handleChange} 
//               required 
//               className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
//             <input 
//               name="email" 
//               type="email"
//               value={formData.email || ''}
//               onChange={handleChange} 
//               required 
//               className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700">التخصص</label>
//             <input 
//               name="specialization" 
//               value={formData.specialization || ''}
//               onChange={handleChange} 
//               required 
//               className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700">سنوات الخبرة</label>
//             <input 
//               name="experienceYears" 
//               type="number" 
//               min="0"
//               value={formData.experienceYears || ''}
//               onChange={handleChange} 
//               className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700">العنوان</label>
//             <input 
//               name="address" 
//               value={formData.address || ''}
//               onChange={handleChange} 
//               className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700">تاريخ الميلاد</label>
//             <input 
//               name="birthDate" 
//               type="date" 
//               value={formData.birthDate || ''}
//               onChange={handleChange} 
//               className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
//             />
//           </div>
//         </div>

//         <div className="mt-6">
//           <h3 className="text-lg font-semibold text-gray-800">أوقات الدوام</h3>
//           <div className="mt-2 space-y-3">
//             {formData.availability.map((slot, i) => (
//               <div key={i} className="flex flex-wrap items-center gap-3">
//                 <span className="font-medium text-gray-700 w-24">{slot.day}</span>
//                 <div className="flex items-center gap-2">
//                   <label className="text-sm text-gray-600">من</label>
//                   <input 
//                     type="time" 
//                     value={slot.from || ''} 
//                     onChange={(e) => handleAvailabilityChange(i, 'from', e.target.value)} 
//                     className="border border-gray-300 rounded p-1.5 shadow-sm focus:ring-blue-500 focus:border-blue-500" 
//                   />
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <label className="text-sm text-gray-600">إلى</label>
//                   <input 
//                     type="time" 
//                     value={slot.to || ''} 
//                     onChange={(e) => handleAvailabilityChange(i, 'to', e.target.value)} 
//                     className="border border-gray-300 rounded p-1.5 shadow-sm focus:ring-blue-500 focus:border-blue-500" 
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="flex justify-end pt-5">
//           <button 
//             type="button" 
//             onClick={() => router.push('/adminDashboard/doctors')} 
//             className="ml-3 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           >
//             إلغاء
//           </button>
//           <button 
//             type="submit" 
//             disabled={saving}
//             className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${saving ? 'opacity-75 cursor-not-allowed' : ''}`}
//           >
//             {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';

export default function EditDoctorPage() {
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchDoctor();
  }, [id]);

  const fetchDoctor = async () => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      console.log('Sending request to API using Axios...');
      const response = await axios.get(`/api/admin/doctors/${id}`);
      
      console.log('API Response:', response.status);
      const data = response.data;
      
      // Prepare data for display in the form
      setFormData({
        ...data,
        // Format date field correctly
        birthDate: data.birthDate ? new Date(data.birthDate).toISOString().split('T')[0] : '',
        // Ensure availability schedule exists
        availability: Array.isArray(data.availability) && data.availability.length ? data.availability : [
          { day: 'Monday', from: '', to: '' },
          { day: 'Tuesday', from: '', to: '' },
          { day: 'Wednesday', from: '', to: '' },
          { day: 'Thursday', from: '', to: '' },
          { day: 'Friday', from: '', to: '' },
          { day: 'Saturday', from: '', to: '' },
          { day: 'Sunday', from: '', to: '' }
        ]
      });
    } catch (error) {
      console.error('Error fetching doctor:', error);
      let errorMessage = 'An error occurred while retrieving the data';
      
      if (error.response) {
        if (error.response.status === 404) {
          errorMessage = 'Doctor not found';
        } else {
          errorMessage = error.response.data.message || errorMessage;
        }
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'number' ? (value ? parseInt(value, 10) : '') : value 
    });
  };

  const handleAvailabilityChange = (i, field, value) => {
    const copy = [...formData.availability];
    copy[i][field] = value;
    setFormData({ ...formData, availability: copy });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });
    
    // Prepare data for submission
    const dataToSubmit = {
      ...formData,
      experienceYears: formData.experienceYears ? parseInt(formData.experienceYears, 10) : 0,
      // Special handling for date
      birthDate: formData.birthDate || null
    };
    
    try {
      const response = await axios.put(`/api/admin/doctors/${id}`, dataToSubmit);
      
      setMessage({ type: 'success', text: 'Doctor information updated successfully' });
      
      // Wait a moment before redirecting
      setTimeout(() => {
        router.push('/adminDashboard/doctors');
      }, 1000);
    } catch (error) {
      console.error('Error updating doctor:', error);
      let errorMessage = 'An error occurred while updating the information';
      
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }
      
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setSaving(false);
    }
  };

  const specializations = [
    'General Practitioner',
    'Cardiologist',
    'Dermatologist',
    'Neurologist',
    'Gynecologist',
    'Pediatrician',
    'Orthopedic Surgeon',
    'Psychiatrist',
    'Ophthalmologist',
    'ENT Specialist',
    'Urologist',
    'Endocrinologist',
    'Gastroenterologist',
    'Oncologist',
    'Radiologist'
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#415A80]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded">
        <div className="flex">
          <div className="flex-grow">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
        <div className="mt-4">
          <button 
            onClick={() => router.push('/adminDashboard/doctors')}
            className="px-4 py-2 bg-[#415A80] text-white rounded-lg hover:bg-[#334766] transition duration-200"
          >
            Return to Doctors List
          </button>
        </div>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl text-gray-600">Doctor information not found</h2>
        <button 
          onClick={() => router.push('/adminDashboard/doctors')}
          className="mt-4 px-4 py-2 bg-[#415A80] text-white rounded-lg hover:bg-[#334766] transition duration-200"
        >
          Return to Doctors List
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="pb-5 border-b border-[#E5E7E9] mb-6">
        <h1 className="text-2xl font-bold text-[#415A80]">Edit Doctor</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl mx-auto">
        {message.text && (
          <div className={`p-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message.text}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input 
              name="name" 
              value={formData.name || ''}
              onChange={handleChange} 
              required 
              className="mt-1 w-full p-2 border border-[#E5E7E9] rounded-md shadow-sm focus:ring-[#415A80] focus:border-[#415A80]" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              name="email" 
              type="email"
              value={formData.email || ''}
              onChange={handleChange} 
              required 
              className="mt-1 w-full p-2 border border-[#E5E7E9] rounded-md shadow-sm focus:ring-[#415A80] focus:border-[#415A80]" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Specialization</label>
            <select
              name="specialization"
              value={formData.specialization || ''}
              onChange={handleChange}
              required
              className="mt-1 w-full p-2 border border-[#E5E7E9] rounded-md shadow-sm focus:ring-[#415A80] focus:border-[#415A80]"
            >
              <option value="">Select Specialization</option>
              {specializations.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
            <input 
              name="experienceYears" 
              type="number" 
              min="0"
              value={formData.experienceYears || ''}
              onChange={handleChange} 
              className="mt-1 w-full p-2 border border-[#E5E7E9] rounded-md shadow-sm focus:ring-[#415A80] focus:border-[#415A80]" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input 
              name="address" 
              value={formData.address || ''}
              onChange={handleChange} 
              className="mt-1 w-full p-2 border border-[#E5E7E9] rounded-md shadow-sm focus:ring-[#415A80] focus:border-[#415A80]" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input 
              name="birthDate" 
              type="date" 
              value={formData.birthDate || ''}
              onChange={handleChange} 
              className="mt-1 w-full p-2 border border-[#E5E7E9] rounded-md shadow-sm focus:ring-[#415A80] focus:border-[#415A80]" 
            />
          </div>
        </div>

        <div className="mt-8 bg-[#F8FAFC] p-4 rounded-lg border border-[#E5E7E9]">
          <h3 className="text-lg font-semibold text-[#415A80] mb-3">Availability Schedule</h3>
          <div className="mt-2 space-y-3">
            {formData.availability.map((slot, i) => (
              <div key={i} className="flex flex-wrap items-center gap-3 p-2 hover:bg-[#D7E2E9] rounded-md transition-colors duration-200">
                <span className="font-medium text-[#415A80] w-24">{slot.day}</span>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">From</label>
                  <input 
                    type="time" 
                    value={slot.from || ''} 
                    onChange={(e) => handleAvailabilityChange(i, 'from', e.target.value)} 
                    className="border border-[#E5E7E9] rounded p-1.5 shadow-sm focus:ring-[#415A80] focus:border-[#415A80]" 
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">To</label>
                  <input 
                    type="time" 
                    value={slot.to || ''} 
                    onChange={(e) => handleAvailabilityChange(i, 'to', e.target.value)} 
                    className="border border-[#E5E7E9] rounded p-1.5 shadow-sm focus:ring-[#415A80] focus:border-[#415A80]" 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-5 border-t border-[#E5E7E9] mt-6">
          <button 
            type="button" 
            onClick={() => router.push('/adminDashboard/doctors')} 
            className="mr-3 px-4 py-2 text-sm font-medium text-[#415A80] bg-white border border-[#E5E7E9] rounded-lg shadow-sm hover:bg-[#D7E2E9] transition duration-200 focus:outline-none"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={saving}
            className={`px-4 py-2 text-sm font-medium text-white bg-[#415A80] border border-transparent rounded-lg shadow-sm hover:bg-[#334766] transition duration-200 focus:outline-none ${saving ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}