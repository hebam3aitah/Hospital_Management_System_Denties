// // ✅ app/adminDashboard/patients/create/page.js (إضافة مريض)
// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';

// export default function CreatePatientPage() {
//   const router = useRouter();
//   const [form, setForm] = useState({
//     name: '', age: '', gender: '', contact: '', diagnosis: '', lastVisit: '', status: 'Active'
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await axios.post('/api/admin/patients', form);
//     router.push('/adminDashboard/patients');
//   };

//   return (
//     <div className="p-6 bg-white rounded shadow max-w-xl mx-auto">
//       <h2 className="text-xl font-bold mb-4">إضافة مريض جديد</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {['name', 'age', 'gender', 'contact', 'diagnosis'].map((field) => (
//           <div key={field}>
//             <label className="block mb-1">{field}</label>
//             <input
//               name={field}
//               type={field === 'age' ? 'number' : 'text'}
//               value={form[field]}
//               onChange={handleChange}
//               required
//               className="w-full border p-2 rounded"
//             />
//           </div>
//         ))}
//         <div>
//           <label className="block mb-1">تاريخ آخر زيارة</label>
//           <input
//             type="date"
//             name="lastVisit"
//             value={form.lastVisit}
//             onChange={handleChange}
//             required
//             className="w-full border p-2 rounded"
//           />
//         </div>
//         <div>
//           <label className="block mb-1">الحالة</label>
//           <select
//             name="status"
//             value={form.status}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//           >
//             <option value="Active">Active</option>
//             <option value="Follow-up">Follow-up</option>
//             <option value="New">New</option>
//             <option value="Completed">Completed</option>
//           </select>
//         </div>
//         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">حفظ</button>
//       </form>
//     </div>
//   );
// }



'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function CreatePatientPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '', 
    age: '', 
    gender: '', 
    contact: '', 
    diagnosis: '', 
    lastVisit: '', 
    status: 'Active'
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/admin/patients', form);
    router.push('/adminDashboard/patients');
  };

  // These colors match the color palette from the image
  const colors = {
    primary: '#415A80',    // Dark blue
    secondary: '#A5D4DC',  // Light teal
    light: '#E5E7E9',      // Light gray
    lightest: '#D7E2E9',   // Very light blue
  };

  const labelClass = "block mb-2 font-medium text-gray-700";
  const inputClass = "w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none";
  const inputFocusClass = {
    name: "focus:ring-[#415A80]",
    age: "focus:ring-[#415A80]",
    gender: "focus:ring-[#A5D4DC]",
    contact: "focus:ring-[#A5D4DC]",
    diagnosis: "focus:ring-[#E5E7E9]",
    lastVisit: "focus:ring-[#D7E2E9]",
    status: "focus:ring-[#415A80]",
  };

  return (
    <div className="p-8 bg-white rounded-xl shadow-md max-w-2xl mx-auto my-8">
      <h2 className="text-2xl font-bold mb-6 text-[#415A80]">Add New Patient</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className={labelClass}>Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              className={`${inputClass} ${inputFocusClass.name}`}
              placeholder="Enter patient name"
            />
          </div>
          
          <div>
            <label htmlFor="age" className={labelClass}>Age</label>
            <input
              id="age"
              name="age"
              type="number"
              value={form.age}
              onChange={handleChange}
              required
              className={`${inputClass} ${inputFocusClass.age}`}
              placeholder="Enter age"
            />
          </div>
          
          <div>
            <label htmlFor="gender" className={labelClass}>Gender</label>
            <select
              id="gender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
              className={`${inputClass} ${inputFocusClass.gender}`}
            >
              <option value="" disabled>Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="contact" className={labelClass}>Contact Number</label>
            <input
              id="contact"
              name="contact"
              type="text"
              value={form.contact}
              onChange={handleChange}
              required
              className={`${inputClass} ${inputFocusClass.contact}`}
              placeholder="Enter contact number"
            />
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="diagnosis" className={labelClass}>Diagnosis</label>
            <textarea
              id="diagnosis"
              name="diagnosis"
              value={form.diagnosis}
              onChange={handleChange}
              required
              rows="3"
              className={`${inputClass} ${inputFocusClass.diagnosis}`}
              placeholder="Enter patient diagnosis"
            />
          </div>
          
          <div>
            <label htmlFor="lastVisit" className={labelClass}>Last Visit Date</label>
            <input
              id="lastVisit"
              type="date"
              name="lastVisit"
              value={form.lastVisit}
              onChange={handleChange}
              required
              className={`${inputClass} ${inputFocusClass.lastVisit}`}
            />
          </div>
          
          <div>
            <label htmlFor="status" className={labelClass}>Status</label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
              className={`${inputClass} ${inputFocusClass.status}`}
            >
              <option value="Active">Active</option>
              <option value="Follow-up">Follow-up</option>
              <option value="New">New</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-end pt-4">
          <button 
            type="button"
            onClick={() => router.push('/adminDashboard/patients')}
            className="mr-4 px-5 py-2.5 bg-[#D7E2E9] text-gray-700 rounded-lg hover:bg-[#E5E7E9] focus:outline-none"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="px-5 py-2.5 bg-[#415A80] text-white rounded-lg hover:bg-[#364b6d] focus:outline-none focus:ring-2 focus:ring-[#A5D4DC] focus:ring-opacity-50"
          >
            Save Patient
          </button>
        </div>
      </form>
    </div>
  );
}