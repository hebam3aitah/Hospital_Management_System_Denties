
// // ✅ app/adminDashboard/patients/page.js (عرض المرضى)
// 'use client';

// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import axios from 'axios';

// export default function PatientsPage() {
//   const [patients, setPatients] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get('/api/admin/patients')
//       .then((res) => setPatients(res.data))
//       .catch((err) => console.error('فشل تحميل المرضى:', err))
//       .finally(() => setLoading(false));
//   }, []);

//   const handleDelete = async (id) => {
//     if (!confirm('هل أنت متأكد من الحذف؟')) return;
//     await axios.delete(`/api/admin/patients/${id}`);
//     setPatients(patients.filter((p) => p._id !== id));
//   };

//   return (
//     <div className="p-6 bg-white rounded shadow">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-xl font-bold">إدارة المرضى</h1>
//         <Link href="/adminDashboard/patients/create" className="bg-blue-600 text-white px-4 py-2 rounded">
//           إضافة مريض
//         </Link>
//       </div>

//       {loading ? <p>جاري التحميل...</p> : (
//         <table className="w-full border">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-2">الاسم</th>
//               <th className="p-2">العمر</th>
//               <th className="p-2">الجنس</th>
//               <th className="p-2">رقم التواصل</th>
//               <th className="p-2">التشخيص</th>
//               <th className="p-2">آخر زيارة</th>
//               <th className="p-2">الحالة</th>
//               <th className="p-2">إجراءات</th>
//             </tr>
//           </thead>
//           <tbody>
//             {patients.map((p) => (
//               <tr key={p._id} className="border-t hover:bg-gray-50">
//                 <td className="p-2">{p.name}</td>
//                 <td className="p-2">{p.age}</td>
//                 <td className="p-2">{p.gender}</td>
//                 <td className="p-2">{p.contact}</td>
//                 <td className="p-2">{p.diagnosis}</td>
//                 <td className="p-2">{new Date(p.lastVisit).toLocaleDateString()}</td>
//                 <td className="p-2">{p.status}</td>
//                 <td className="p-2">
//                   <button onClick={() => handleDelete(p._id)} className="text-red-600 hover:underline">
//                     حذف
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }



'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('/api/admin/patients')
      .then((res) => setPatients(res.data))
      .catch((err) => console.error('Failed to load patients:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this patient?')) return;
    await axios.delete(`/api/admin/patients/${id}`);
    setPatients(patients.filter((p) => p._id !== id));
  };

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Follow-up':
        return 'bg-[#A5D4DC] text-[#415A80]';
      case 'New':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-7xl mx-auto my-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-[#415A80]">Patient Management</h1>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0">
            <input
              type="text"
              placeholder="Search patients..."
              className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A5D4DC]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg 
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          
          <Link 
            href="/adminDashboard/patients/create" 
            className="inline-flex items-center px-4 py-2 bg-[#415A80] text-white rounded-lg hover:bg-[#364b6d] focus:outline-none focus:ring-2 focus:ring-[#A5D4DC] focus:ring-opacity-50 transition-colors"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Patient
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#415A80]"></div>
        </div>
      ) : (
        <>
          {filteredPatients.length === 0 ? (
            <div className="bg-[#D7E2E9] rounded-lg p-8 text-center">
              <p className="text-gray-700 text-lg">No patients found matching your search criteria.</p>
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="mt-4 text-[#415A80] hover:underline focus:outline-none"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#E5E7E9]">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diagnosis</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Visit</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPatients.map((p) => (
                    <tr key={p._id} className="hover:bg-[#D7E2E9]/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.age}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.gender}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.contact}</td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 max-w-xs truncate">{p.diagnosis}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(p.lastVisit).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(p.status)}`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-3">
                          <Link 
                            href={`/adminDashboard/patients/edit/${p._id}`}
                            className="text-[#415A80] hover:text-[#364b6d]"
                          >
                            Edit
                          </Link>
                          <button 
                            onClick={() => handleDelete(p._id)} 
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="mt-4 text-sm text-gray-500">
            Showing {filteredPatients.length} of {patients.length} patients
          </div>
        </>
      )}
    </div>
  );
}