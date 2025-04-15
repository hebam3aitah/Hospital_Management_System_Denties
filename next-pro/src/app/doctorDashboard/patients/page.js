// // // // // // // // 'use client'
// // // // // // // // // components/PatientRecordsPage.jsx
// // // // // // // // import { useState } from 'react';
// // // // // // // // import { 
// // // // // // // //   SearchIcon, 
// // // // // // // //   FilterIcon, 
// // // // // // // //   PlusCircleIcon, 
// // // // // // // //   DocumentDownloadIcon,
// // // // // // // //   PencilIcon,
// // // // // // // //   TrashIcon,
// // // // // // // //   EyeIcon
// // // // // // // // } from '@heroicons/react/outline';

// // // // // // // // export default function Patients() {
// // // // // // // //   // Sample data for patient records
// // // // // // // //   const [patients, setPatients] = useState([
// // // // // // // //     { 
// // // // // // // //       id: "P-1001", 
// // // // // // // //       name: "John Smith", 
// // // // // // // //       age: 45, 
// // // // // // // //       gender: "Male", 
// // // // // // // //       contact: "+1-555-123-4567", 
// // // // // // // //       diagnosis: "Hypertension, Diabetes",
// // // // // // // //       lastVisit: "2025-04-01",
// // // // // // // //       status: "Active" 
// // // // // // // //     },
// // // // // // // //     { 
// // // // // // // //       id: "P-1002", 
// // // // // // // //       name: "Sarah Johnson", 
// // // // // // // //       age: 32, 
// // // // // // // //       gender: "Female", 
// // // // // // // //       contact: "+1-555-234-5678", 
// // // // // // // //       diagnosis: "Pregnancy - Third Trimester",
// // // // // // // //       lastVisit: "2025-04-03",
// // // // // // // //       status: "Follow-up" 
// // // // // // // //     },
// // // // // // // //     { 
// // // // // // // //       id: "P-1003", 
// // // // // // // //       name: "Michael Chen", 
// // // // // // // //       age: 58, 
// // // // // // // //       gender: "Male", 
// // // // // // // //       contact: "+1-555-345-6789", 
// // // // // // // //       diagnosis: "Post-operative Care, Arthritis",
// // // // // // // //       lastVisit: "2025-03-25",
// // // // // // // //       status: "Active" 
// // // // // // // //     },
// // // // // // // //     { 
// // // // // // // //       id: "P-1004", 
// // // // // // // //       name: "Emily Williams", 
// // // // // // // //       age: 27, 
// // // // // // // //       gender: "Female", 
// // // // // // // //       contact: "+1-555-456-7890", 
// // // // // // // //       diagnosis: "Migraine, Anxiety",
// // // // // // // //       lastVisit: "2025-04-05",
// // // // // // // //       status: "New" 
// // // // // // // //     },
// // // // // // // //     { 
// // // // // // // //       id: "P-1005", 
// // // // // // // //       name: "David Rodriguez", 
// // // // // // // //       age: 41, 
// // // // // // // //       gender: "Male", 
// // // // // // // //       contact: "+1-555-567-8901", 
// // // // // // // //       diagnosis: "Lower Back Pain",
// // // // // // // //       lastVisit: "2025-03-30",
// // // // // // // //       status: "Follow-up" 
// // // // // // // //     },
// // // // // // // //     { 
// // // // // // // //       id: "P-1006", 
// // // // // // // //       name: "Lisa Thompson", 
// // // // // // // //       age: 52, 
// // // // // // // //       gender: "Female", 
// // // // // // // //       contact: "+1-555-678-9012", 
// // // // // // // //       diagnosis: "Hypothyroidism",
// // // // // // // //       lastVisit: "2025-03-28",
// // // // // // // //       status: "Active" 
// // // // // // // //     },
// // // // // // // //     { 
// // // // // // // //       id: "P-1007", 
// // // // // // // //       name: "Robert Kim", 
// // // // // // // //       age: 36, 
// // // // // // // //       gender: "Male", 
// // // // // // // //       contact: "+1-555-789-0123", 
// // // // // // // //       diagnosis: "Asthma",
// // // // // // // //       lastVisit: "2025-04-02",
// // // // // // // //       status: "Active" 
// // // // // // // //     },
// // // // // // // //   ]);

// // // // // // // //   // Status colors
// // // // // // // //   const statusColors = {
// // // // // // // //     Active: 'bg-green-100 text-green-800',
// // // // // // // //     'Follow-up': 'bg-blue-100 text-blue-800',
// // // // // // // //     New: 'bg-purple-100 text-purple-800',
// // // // // // // //     Completed: 'bg-gray-100 text-gray-800'
// // // // // // // //   };

// // // // // // // //   // Search state
// // // // // // // //   const [searchTerm, setSearchTerm] = useState('');
  
// // // // // // // //   // Filter patients based on search term
// // // // // // // //   const filteredPatients = patients.filter(patient => 
// // // // // // // //     patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // // // // //     patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // // // // //     patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
// // // // // // // //   );

// // // // // // // //   return (
// // // // // // // //     <div className="bg-[#D7E2E9] bg-opacity-20 min-h-screen p-6">
// // // // // // // //       <div className="mb-6">
// // // // // // // //         <h1 className="text-2xl font-bold text-gray-800">Patient Records</h1>
// // // // // // // //         <p className="text-gray-600">Manage and view all patient records in the system</p>
// // // // // // // //       </div>

// // // // // // // //       {/* Search and Filters */}
// // // // // // // //       <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
// // // // // // // //         <div className="flex flex-wrap gap-4">
// // // // // // // //           <div className="flex-1 min-w-[300px]">
// // // // // // // //             <div className="relative">
// // // // // // // //               <input
// // // // // // // //                 type="text"
// // // // // // // //                 placeholder="Search patients by name, ID or diagnosis..."
// // // // // // // //                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#415A80]"
// // // // // // // //                 value={searchTerm}
// // // // // // // //                 onChange={(e) => setSearchTerm(e.target.value)}
// // // // // // // //               />
// // // // // // // //               <SearchIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
// // // // // // // //             </div>
// // // // // // // //           </div>
          
// // // // // // // //           <div className="flex space-x-2">
// // // // // // // //             <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
// // // // // // // //               <FilterIcon className="h-5 w-5 mr-2" />
// // // // // // // //               Filter
// // // // // // // //             </button>
// // // // // // // //             <button className="flex items-center px-4 py-2 bg-[#415A80] text-white rounded-lg hover:bg-opacity-90">
// // // // // // // //               <PlusCircleIcon className="h-5 w-5 mr-2" />
// // // // // // // //               Add Patient
// // // // // // // //             </button>
// // // // // // // //             <button className="flex items-center px-4 py-2 bg-[#A5D4DC] text-[#415A80] rounded-lg hover:bg-opacity-90">
// // // // // // // //               <DocumentDownloadIcon className="h-5 w-5 mr-2" />
// // // // // // // //               Export
// // // // // // // //             </button>
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       </div>

// // // // // // // //       {/* Patient Records Table */}
// // // // // // // //       <div className="bg-white rounded-lg shadow-sm overflow-hidden">
// // // // // // // //         <div className="overflow-x-auto">
// // // // // // // //           <table className="w-full">
// // // // // // // //             <thead className="bg-[#415A80] text-white text-sm">
// // // // // // // //               <tr>
// // // // // // // //                 <th className="py-3 px-6 text-left">Patient ID</th>
// // // // // // // //                 <th className="py-3 px-6 text-left">Name</th>
// // // // // // // //                 <th className="py-3 px-6 text-left">Age</th>
// // // // // // // //                 <th className="py-3 px-6 text-left">Gender</th>
// // // // // // // //                 <th className="py-3 px-6 text-left">Contact</th>
// // // // // // // //                 <th className="py-3 px-6 text-left">Diagnosis</th>
// // // // // // // //                 <th className="py-3 px-6 text-left">Last Visit</th>
// // // // // // // //                 <th className="py-3 px-6 text-left">Status</th>
// // // // // // // //                 <th className="py-3 px-6 text-center">Actions</th>
// // // // // // // //               </tr>
// // // // // // // //             </thead>
// // // // // // // //             <tbody className="divide-y divide-gray-100">
// // // // // // // //               {filteredPatients.map((patient) => (
// // // // // // // //                 <tr key={patient.id} className="hover:bg-[#D7E2E9] hover:bg-opacity-20">
// // // // // // // //                   <td className="py-4 px-6 font-medium text-[#415A80]">{patient.id}</td>
// // // // // // // //                   <td className="py-4 px-6 font-medium text-gray-900">{patient.name}</td>
// // // // // // // //                   <td className="py-4 px-6 text-gray-600">{patient.age}</td>
// // // // // // // //                   <td className="py-4 px-6 text-gray-600">{patient.gender}</td>
// // // // // // // //                   <td className="py-4 px-6 text-gray-600">{patient.contact}</td>
// // // // // // // //                   <td className="py-4 px-6 text-gray-600">{patient.diagnosis}</td>
// // // // // // // //                   <td className="py-4 px-6 text-gray-600">{patient.lastVisit}</td>
// // // // // // // //                   <td className="py-4 px-6">
// // // // // // // //                     <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColors[patient.status]}`}>
// // // // // // // //                       {patient.status}
// // // // // // // //                     </span>
// // // // // // // //                   </td>
// // // // // // // //                   <td className="py-4 px-6">
// // // // // // // //                     <div className="flex justify-center space-x-2">
// // // // // // // //                       <button className="p-1 rounded-full bg-[#D7E2E9] text-[#415A80] hover:bg-[#A5D4DC]">
// // // // // // // //                         <EyeIcon className="h-5 w-5" />
// // // // // // // //                       </button>
// // // // // // // //                       <button className="p-1 rounded-full bg-[#D7E2E9] text-[#415A80] hover:bg-[#A5D4DC]">
// // // // // // // //                         <PencilIcon className="h-5 w-5" />
// // // // // // // //                       </button>
// // // // // // // //                       <button className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200">
// // // // // // // //                         <TrashIcon className="h-5 w-5" />
// // // // // // // //                       </button>
// // // // // // // //                     </div>
// // // // // // // //                   </td>
// // // // // // // //                 </tr>
// // // // // // // //               ))}
// // // // // // // //               {filteredPatients.length === 0 && (
// // // // // // // //                 <tr>
// // // // // // // //                   <td colSpan="9" className="py-8 text-center text-gray-500">
// // // // // // // //                     No patients found matching your search criteria
// // // // // // // //                   </td>
// // // // // // // //                 </tr>
// // // // // // // //               )}
// // // // // // // //             </tbody>
// // // // // // // //           </table>
// // // // // // // //         </div>
        
// // // // // // // //         {/* Pagination */}
// // // // // // // //         <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
// // // // // // // //           <div className="text-sm text-gray-600">
// // // // // // // //             Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredPatients.length}</span> of <span className="font-medium">{patients.length}</span> patients
// // // // // // // //           </div>
// // // // // // // //           <div className="flex space-x-1">
// // // // // // // //             <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 disabled:opacity-50" disabled>
// // // // // // // //               Previous
// // // // // // // //             </button>
// // // // // // // //             <button className="px-3 py-1 bg-[#415A80] text-white rounded-md hover:bg-opacity-90">
// // // // // // // //               1
// // // // // // // //             </button>
// // // // // // // //             <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
// // // // // // // //               2
// // // // // // // //             </button>
// // // // // // // //             <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
// // // // // // // //               3
// // // // // // // //             </button>
// // // // // // // //             <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
// // // // // // // //               Next
// // // // // // // //             </button>
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }


// // // // // // // 'use client'
// // // // // // // import { useState ,useEffect} from 'react';
// // // // // // // import { 
// // // // // // //   FaSearch, 
// // // // // // //   FaFilter, 
// // // // // // //   FaPlusCircle, 
// // // // // // //   FaDownload, 
// // // // // // //   FaPencilAlt, 
// // // // // // //   FaTrash, 
// // // // // // //   FaEye
// // // // // // // } from 'react-icons/fa'; // استيراد الأيقونات من مكتبة react-icons/fa

// // // // // // // export default function Patients() {
// // // // // // //   // Sample data for patient records
// // // // // // //   const [patients, setPatients] = useState([
// // // // // // //   ]);
// // // // // // //   const fetchPatients = async () => {
// // // // // // //     const res = await fetch("/api/patients");
// // // // // // //     const data = await res.json();
// // // // // // //     setPatients(data.patients);
// // // // // // //   };
// // // // // // //   useEffect(() => {
// // // // // // //     fetchPatients();
// // // // // // //   }, []); 
// // // // // // //   // Status colors
// // // // // // //   const statusColors = {
// // // // // // //     Active: 'bg-green-100 text-green-800',
// // // // // // //     'Follow-up': 'bg-blue-100 text-blue-800',
// // // // // // //     New: 'bg-purple-100 text-purple-800',
// // // // // // //     Completed: 'bg-gray-100 text-gray-800'
// // // // // // //   };

// // // // // // //   // Search state
// // // // // // //   const [searchTerm, setSearchTerm] = useState('');
  
// // // // // // //   // Filter patients based on search term
// // // // // // //   const filteredPatients = patients.filter(patient => 
// // // // // // //     patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // // // //     patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // // // //     patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
// // // // // // //   );

// // // // // // //   return (
// // // // // // //     <div className="bg-[#D7E2E9] bg-opacity-20 min-h-screen p-6">
// // // // // // //       <div className="mb-6">
// // // // // // //         <h1 className="text-2xl font-bold text-gray-800">Patient Records</h1>
// // // // // // //         <p className="text-gray-600">Manage and view all patient records in the system</p>
// // // // // // //       </div>

// // // // // // //       {/* Search and Filters */}
// // // // // // //       <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
// // // // // // //         <div className="flex flex-wrap gap-4">
// // // // // // //           <div className="flex-1 min-w-[300px]">
// // // // // // //             <div className="relative">
// // // // // // //               <input
// // // // // // //                 type="text"
// // // // // // //                 placeholder="Search patients by name, ID or diagnosis..."
// // // // // // //                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#415A80]"
// // // // // // //                 value={searchTerm}
// // // // // // //                 onChange={(e) => setSearchTerm(e.target.value)}
// // // // // // //               />
// // // // // // //               <FaSearch className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
// // // // // // //             </div>
// // // // // // //           </div>
          
// // // // // // //           <div className="flex space-x-2">
// // // // // // //             <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
// // // // // // //               <FaFilter className="h-5 w-5 mr-2" />
// // // // // // //               Filter
// // // // // // //             </button>
// // // // // // //             <button className="flex items-center px-4 py-2 bg-[#415A80] text-white rounded-lg hover:bg-opacity-90">
// // // // // // //               <FaPlusCircle className="h-5 w-5 mr-2" />
// // // // // // //               Add Patient
// // // // // // //             </button>
// // // // // // //             <button className="flex items-center px-4 py-2 bg-[#A5D4DC] text-[#415A80] rounded-lg hover:bg-opacity-90">
// // // // // // //               <FaDownload className="h-5 w-5 mr-2" />
// // // // // // //               Export
// // // // // // //             </button>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       </div>

// // // // // // //       {/* Patient Records Table */}
// // // // // // //       <div className="bg-white rounded-lg shadow-sm overflow-hidden">
// // // // // // //         <div className="overflow-x-auto">
// // // // // // //           <table className="w-full">
// // // // // // //             <thead className="bg-[#415A80] text-white text-sm">
// // // // // // //               <tr>
// // // // // // //                 <th className="py-3 px-6 text-left">Patient ID</th>
// // // // // // //                 <th className="py-3 px-6 text-left">Name</th>
// // // // // // //                 <th className="py-3 px-6 text-left">Age</th>
// // // // // // //                 <th className="py-3 px-6 text-left">Gender</th>
// // // // // // //                 <th className="py-3 px-6 text-left">Contact</th>
// // // // // // //                 <th className="py-3 px-6 text-left">Diagnosis</th>
// // // // // // //                 <th className="py-3 px-6 text-left">Last Visit</th>
// // // // // // //                 <th className="py-3 px-6 text-left">Status</th>
// // // // // // //                 <th className="py-3 px-6 text-center">Actions</th>
// // // // // // //               </tr>
// // // // // // //             </thead>
// // // // // // //             <tbody className="divide-y divide-gray-100">
// // // // // // //               {filteredPatients.map((patient) => (
// // // // // // //                 <tr key={patient.id} className="hover:bg-[#D7E2E9] hover:bg-opacity-20">
// // // // // // //                   <td className="py-4 px-6 font-medium text-[#415A80]">{patient.id}</td>
// // // // // // //                   <td className="py-4 px-6 font-medium text-gray-900">{patient.name}</td>
// // // // // // //                   <td className="py-4 px-6 text-gray-600">{patient.age}</td>
// // // // // // //                   <td className="py-4 px-6 text-gray-600">{patient.gender}</td>
// // // // // // //                   <td className="py-4 px-6 text-gray-600">{patient.contact}</td>
// // // // // // //                   <td className="py-4 px-6 text-gray-600">{patient.diagnosis}</td>
// // // // // // //                   <td className="py-4 px-6 text-gray-600">{patient.lastVisit}</td>
// // // // // // //                   <td className="py-4 px-6">
// // // // // // //                     <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColors[patient.status]}`}>
// // // // // // //                       {patient.status}
// // // // // // //                     </span>
// // // // // // //                   </td>
// // // // // // //                   <td className="py-4 px-6">
// // // // // // //                     <div className="flex justify-center space-x-2">
// // // // // // //                       <button className="p-1 rounded-full bg-[#D7E2E9] text-[#415A80] hover:bg-[#A5D4DC]">
// // // // // // //                         <FaEye className="h-5 w-5" />
// // // // // // //                       </button>
// // // // // // //                       <button className="p-1 rounded-full bg-[#D7E2E9] text-[#415A80] hover:bg-[#A5D4DC]">
// // // // // // //                         <FaPencilAlt className="h-5 w-5" />
// // // // // // //                       </button>
// // // // // // //                       <button className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200">
// // // // // // //                         <FaTrash className="h-5 w-5" />
// // // // // // //                       </button>
// // // // // // //                     </div>
// // // // // // //                   </td>
// // // // // // //                 </tr>
// // // // // // //               ))}
// // // // // // //               {filteredPatients.length === 0 && (
// // // // // // //                 <tr>
// // // // // // //                   <td colSpan="9" className="py-8 text-center text-gray-500">
// // // // // // //                     No patients found matching your search criteria
// // // // // // //                   </td>
// // // // // // //                 </tr>
// // // // // // //               )}
// // // // // // //             </tbody>
// // // // // // //           </table>
// // // // // // //         </div>
        
// // // // // // //         {/* Pagination */}
// // // // // // //         <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
// // // // // // //           <div className="text-sm text-gray-600">
// // // // // // //             Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredPatients.length}</span> of <span className="font-medium">{patients.length}</span> patients
// // // // // // //           </div>
// // // // // // //           <div className="flex space-x-1">
// // // // // // //             <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 disabled:opacity-50" disabled>
// // // // // // //               Previous
// // // // // // //             </button>
// // // // // // //             <button className="px-3 py-1 bg-[#415A80] text-white rounded-md hover:bg-opacity-90">
// // // // // // //               1
// // // // // // //             </button>
// // // // // // //             <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
// // // // // // //               2
// // // // // // //             </button>
// // // // // // //             <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
// // // // // // //               3
// // // // // // //             </button>
// // // // // // //             <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
// // // // // // //               Next
// // // // // // //             </button>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }
// // // // // // 'use client'
// // // // // // import { useState, useEffect } from 'react';
// // // // // // import { 
// // // // // //   FaSearch, 
// // // // // //   FaFilter, 
// // // // // //   FaPlusCircle, 
// // // // // //   FaDownload, 
// // // // // //   FaPencilAlt, 
// // // // // //   FaTrash, 
// // // // // //   FaEye
// // // // // // } from 'react-icons/fa';
// // // // // // import Link from 'next/link';

// // // // // // export default function Patients() {
// // // // // //   const [patients, setPatients] = useState([]);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [searchTerm, setSearchTerm] = useState('');
// // // // // //   const [newPatient, setNewPatient] = useState({ name: '', age: '', gender: '', diagnosis: '', contact: '' });

// // // // // //   // Fetch patients from the server
// // // // // //   const fetchPatients = async () => {
// // // // // //     setLoading(true);
// // // // // //     const res = await fetch('/api/doctorDashboard/patients');
// // // // // //     const data = await res.json();
// // // // // //     setPatients(data.patients);
// // // // // //     setLoading(false);
// // // // // //   };

// // // // // //   // Fetch patients on initial load
// // // // // //   useEffect(() => {
// // // // // //     fetchPatients();
// // // // // //   }, []);

// // // // // //   // Filter patients based on search term
// // // // // //   const filteredPatients = patients.filter(patient => 
// // // // // //     patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // // //     patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // // //     patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
// // // // // //   );

// // // // // //   // Handle adding a new patient
// // // // // //   const handleAddPatient = async () => {
// // // // // //     const res = await fetch("/api/doctorDashboard/patients", {
// // // // // //       method: "POST",
// // // // // //       body: JSON.stringify({
// // // // // //         name: "New Patient",
// // // // // //         age: 30,
// // // // // //         gender: "Male",
// // // // // //         contact: "123-456-7890",
// // // // // //         diagnosis: "Hypertension",
// // // // // //         lastVisit: "2025-04-10",
// // // // // //         status: "Active"
// // // // // //       }),
// // // // // //       headers: {
// // // // // //         "Content-Type": "application/json"
// // // // // //       }
// // // // // //     });
    
// // // // // //     if (res.ok) {
// // // // // //       setNewPatient({ name: '', age: '', gender: '', diagnosis: '', contact: '' });
// // // // // //       fetchPatients(); // Re-fetch the updated patient list
// // // // // //     }
// // // // // //   };

// // // // // //   // Handle editing a patient
// // // // // //   const handleEditPatient = async (id, updatedPatient) => {
// // // // // //     const res = await fetch(`/api/doctorDashboard/patients/${id}`, {
// // // // // //       method: 'PUT',
// // // // // //       headers: {
// // // // // //         'Content-Type': 'application/json',
// // // // // //       },
// // // // // //       body: JSON.stringify(updatedPatient),
// // // // // //     });

// // // // // //     if (res.ok) {
// // // // // //       fetchPatients(); // Re-fetch the updated patient list
// // // // // //     }
// // // // // //   };

// // // // // //   // Handle deleting a patient
// // // // // //   const handleDeletePatient = async (id) => {
// // // // // //     const res = await fetch(`/api/doctorDashboard/patients/${id}`, { method: 'DELETE' });

// // // // // //     if (res.ok) {
// // // // // //       fetchPatients(); // Re-fetch the updated patient list
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="bg-[#D7E2E9] bg-opacity-20 min-h-screen p-6">
// // // // // //       <div className="mb-6">
// // // // // //         <h1 className="text-2xl font-bold text-gray-800">Patient Records</h1>
// // // // // //         <p className="text-gray-600">Manage and view all patient records in the system</p>
// // // // // //       </div>

// // // // // //       {/* Search and Filters */}
// // // // // //       <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
// // // // // //         <div className="flex flex-wrap gap-4">
// // // // // //           <div className="flex-1 min-w-[300px]">
// // // // // //             <div className="relative">
// // // // // //               <input
// // // // // //                 type="text"
// // // // // //                 placeholder="Search patients by name, ID or diagnosis..."
// // // // // //                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#415A80]"
// // // // // //                 value={searchTerm}
// // // // // //                 onChange={(e) => setSearchTerm(e.target.value)}
// // // // // //               />
// // // // // //               <FaSearch className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
// // // // // //             </div>
// // // // // //           </div>
          
// // // // // //           <div className="flex space-x-2">
// // // // // //             <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
// // // // // //               <FaFilter className="h-5 w-5 mr-2" />
// // // // // //               Filter
// // // // // //             </button>
// // // // // //             <button onClick={handleAddPatient} className="flex items-center px-4 py-2 bg-[#415A80] text-white rounded-lg hover:bg-opacity-90">
// // // // // //               <FaPlusCircle className="h-5 w-5 mr-2" />
// // // // // //               Add Patient
// // // // // //             </button>
// // // // // //             <button className="flex items-center px-4 py-2 bg-[#A5D4DC] text-[#415A80] rounded-lg hover:bg-opacity-90">
// // // // // //               <FaDownload className="h-5 w-5 mr-2" />
// // // // // //               Export
// // // // // //             </button>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* Patient Records Table */}
// // // // // //       <div className="bg-white rounded-lg shadow-sm overflow-hidden">
// // // // // //         <div className="overflow-x-auto">
// // // // // //           <table className="w-full">
// // // // // //             <thead className="bg-[#415A80] text-white text-sm">
// // // // // //               <tr>
// // // // // //                 <th className="py-3 px-6 text-left">Patient ID</th>
// // // // // //                 <th className="py-3 px-6 text-left">Name</th>
// // // // // //                 <th className="py-3 px-6 text-left">Age</th>
// // // // // //                 <th className="py-3 px-6 text-left">Gender</th>
// // // // // //                 <th className="py-3 px-6 text-left">Contact</th>
// // // // // //                 <th className="py-3 px-6 text-left">Diagnosis</th>
// // // // // //                 <th className="py-3 px-6 text-left">Last Visit</th>
// // // // // //                 <th className="py-3 px-6 text-left">Status</th>
// // // // // //                 <th className="py-3 px-6 text-center">Actions</th>
// // // // // //               </tr>
// // // // // //             </thead>
// // // // // //             <tbody className="divide-y divide-gray-100">
// // // // // //               {filteredPatients.map((patient) => (
// // // // // //                 <tr key={patient.id} className="hover:bg-[#D7E2E9] hover:bg-opacity-20">
// // // // // //                   <td className="py-4 px-6 font-medium text-[#415A80]">{patient.id}</td>
// // // // // //                   <td className="py-4 px-6 font-medium text-gray-900">{patient.name}</td>
// // // // // //                   <td className="py-4 px-6 text-gray-600">{patient.age}</td>
// // // // // //                   <td className="py-4 px-6 text-gray-600">{patient.gender}</td>
// // // // // //                   <td className="py-4 px-6 text-gray-600">{patient.contact}</td>
// // // // // //                   <td className="py-4 px-6 text-gray-600">{patient.diagnosis}</td>
// // // // // //                   <td className="py-4 px-6 text-gray-600">{patient.lastVisit}</td>
// // // // // //                   <td className="py-4 px-6">
// // // // // //                     <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColors[patient.status]}`}>
// // // // // //                       {patient.status}
// // // // // //                     </span>
// // // // // //                   </td>
// // // // // //                   <td className="py-4 px-6">
// // // // // //                     <div className="flex justify-center space-x-2">
// // // // // //                       <button className="p-1 rounded-full bg-[#D7E2E9] text-[#415A80] hover:bg-[#A5D4DC]">
// // // // // //                         <FaEye className="h-5 w-5" />
// // // // // //                       </button>
// // // // // //                       <button onClick={() => handleEditPatient(patient.id, patient)} className="p-1 rounded-full bg-[#D7E2E9] text-[#415A80] hover:bg-[#A5D4DC]">
// // // // // //                         <FaPencilAlt className="h-5 w-5" />
// // // // // //                       </button>
// // // // // //                       <button onClick={() => handleDeletePatient(patient.id)} className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200">
// // // // // //                         <FaTrash className="h-5 w-5" />
// // // // // //                       </button>
// // // // // //                     </div>
// // // // // //                   </td>
// // // // // //                 </tr>
// // // // // //               ))}
// // // // // //               {filteredPatients.length === 0 && (
// // // // // //                 <tr>
// // // // // //                   <td colSpan="9" className="py-8 text-center text-gray-500">
// // // // // //                     No patients found matching your search criteria
// // // // // //                   </td>
// // // // // //                 </tr>
// // // // // //               )}
// // // // // //             </tbody>
// // // // // //           </table>
// // // // // //         </div>
        
// // // // // //         {/* Pagination */}
// // // // // //         <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
// // // // // //           <div className="text-sm text-gray-600">
// // // // // //             Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredPatients.length}</span> of <span className="font-medium">{patients.length}</span> patients
// // // // // //           </div>
// // // // // //           <div className="flex space-x-1">
// // // // // //             <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 disabled:opacity-50" disabled>
// // // // // //               Previous
// // // // // //             </button>
// // // // // //             <button className="px-3 py-1 bg-[#415A80] text-white rounded-md hover:bg-opacity-90">
// // // // // //               1
// // // // // //             </button>
// // // // // //             <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
// // // // // //               2
// // // // // //             </button>
// // // // // //             <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
// // // // // //               3
// // // // // //             </button>
// // // // // //             <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
// // // // // //               Next
// // // // // //             </button>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }
// // // // // 'use client'
// // // // // import { useState, useEffect } from 'react';
// // // // // import { FaSearch, FaFilter, FaPlusCircle, FaDownload, FaPencilAlt, FaTrash, FaEye } from 'react-icons/fa';
// // // // // import Link from 'next/link';
// // // // // import axios from 'axios';  // استيراد axios

// // // // // export default function Patients() {
// // // // //   const [patients, setPatients] = useState([]);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [searchTerm, setSearchTerm] = useState('');
// // // // //   const [newPatient, setNewPatient] = useState({ name: '', age: '', gender: '', diagnosis: '', contact: '' });
// // // // //   const statusColors = {
// // // // //     Active: "bg-green-100 text-green-600",  // لون لحالة "Active"
// // // // //     Inactive: "bg-gray-100 text-gray-600",  // لون لحالة "Inactive"
// // // // //     Pending: "bg-yellow-100 text-yellow-600",  // لون لحالة "Pending"
// // // // //     // يمكنك إضافة المزيد من الحالات حسب الحاجة
// // // // //   };
  
// // // // //   // Fetch patients from the server
// // // // //   const fetchPatients = async () => {
// // // // //     setLoading(true);
// // // // //     try {
// // // // //       const res = await axios.get('/api/doctorDashboard/patients');  // استخدام axios
// // // // //       setPatients(res.data.patients);
// // // // //     } catch (error) {
// // // // //       console.error("Error fetching patients", error);
// // // // //     }
// // // // //     setLoading(false);
// // // // //   };

// // // // //   // Fetch patients on initial load
// // // // //   useEffect(() => {
// // // // //     fetchPatients();
// // // // //   }, []);

// // // // //   // Filter patients based on search term
// // // // //   const filteredPatients = patients.filter(patient =>
// // // // //     patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // //     patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // //     patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
// // // // //   );

// // // // //   // Handle adding a new patient
// // // // //   const handleAddPatient = async () => {
// // // // //     try {
// // // // //       const res = await axios.post("/api/doctorDashboard/patients", {
// // // // //         name: "New Patient",
// // // // //         age: 30,
// // // // //         gender: "Male",
// // // // //         contact: "123-456-7890",
// // // // //         diagnosis: "Hypertension",
// // // // //         lastVisit: "2025-04-10",
// // // // //         status: "Active"
// // // // //       });
    
// // // // //       if (res.status === 201) {
// // // // //         setNewPatient({ name: '', age: '', gender: '', diagnosis: '', contact: '' });
// // // // //         fetchPatients(); // Re-fetch the updated patient list
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error("Error adding patient", error);
// // // // //     }
// // // // //   };

// // // // //   // Handle editing a patient
// // // // //   const handleEditPatient = async (id, updatedPatient) => {
// // // // //     try {
// // // // //       const res = await axios.put(`/api/doctorDashboard/patients/${id}`, updatedPatient);
// // // // //       if (res.status === 200) {
// // // // //         fetchPatients(); // Re-fetch the updated patient list
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error("Error editing patient", error);
// // // // //     }
// // // // //   };

// // // // //   // Handle deleting a patient
// // // // //   const handleDeletePatient = async (id) => {
// // // // //     try {
// // // // //       const res = await axios.delete(`/api/doctorDashboard/patients/${id}`);
// // // // //       if (res.status === 200) {
// // // // //         fetchPatients(); // Re-fetch the updated patient list
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error("Error deleting patient", error);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="bg-[#D7E2E9] bg-opacity-20 min-h-screen p-6">
// // // // //       <div className="mb-6">
// // // // //         <h1 className="text-2xl font-bold text-gray-800">Patient Records</h1>
// // // // //         <p className="text-gray-600">Manage and view all patient records in the system</p>
// // // // //       </div>

// // // // //       {/* Search and Filters */}
// // // // //       <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
// // // // //         <div className="flex flex-wrap gap-4">
// // // // //           <div className="flex-1 min-w-[300px]">
// // // // //             <div className="relative">
// // // // //               <input
// // // // //                 type="text"
// // // // //                 placeholder="Search patients by name, ID or diagnosis..."
// // // // //                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#415A80]"
// // // // //                 value={searchTerm}
// // // // //                 onChange={(e) => setSearchTerm(e.target.value)}
// // // // //               />
// // // // //               <FaSearch className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
// // // // //             </div>
// // // // //           </div>
          
// // // // //           <div className="flex space-x-2">
// // // // //             <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
// // // // //               <FaFilter className="h-5 w-5 mr-2" />
// // // // //               Filter
// // // // //             </button>
// // // // //             <button onClick={handleAddPatient} className="flex items-center px-4 py-2 bg-[#415A80] text-white rounded-lg hover:bg-opacity-90">
// // // // //               <FaPlusCircle className="h-5 w-5 mr-2" />
// // // // //               Add Patient
// // // // //             </button>
// // // // //             <button className="flex items-center px-4 py-2 bg-[#A5D4DC] text-[#415A80] rounded-lg hover:bg-opacity-90">
// // // // //               <FaDownload className="h-5 w-5 mr-2" />
// // // // //               Export
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* Patient Records Table */}
// // // // //       <div className="bg-white rounded-lg shadow-sm overflow-hidden">
// // // // //         <div className="overflow-x-auto">
// // // // //           <table className="w-full">
// // // // //             <thead className="bg-[#415A80] text-white text-sm">
// // // // //               <tr>
// // // // //                 <th className="py-3 px-6 text-left">Patient ID</th>
// // // // //                 <th className="py-3 px-6 text-left">Name</th>
// // // // //                 <th className="py-3 px-6 text-left">Age</th>
// // // // //                 <th className="py-3 px-6 text-left">Gender</th>
// // // // //                 <th className="py-3 px-6 text-left">Contact</th>
// // // // //                 <th className="py-3 px-6 text-left">Diagnosis</th>
// // // // //                 <th className="py-3 px-6 text-left">Last Visit</th>
// // // // //                 <th className="py-3 px-6 text-left">Status</th>
// // // // //                 <th className="py-3 px-6 text-center">Actions</th>
// // // // //               </tr>
// // // // //             </thead>
// // // // //             <tbody className="divide-y divide-gray-100">
// // // // //               {filteredPatients.map((patient) => (
// // // // //                 <tr key={patient._id} className="hover:bg-[#D7E2E9] hover:bg-opacity-20">
// // // // //                   <td className="py-4 px-6 font-medium text-[#415A80]">{patient._id}</td>
// // // // //                   <td className="py-4 px-6 font-medium text-gray-900">{patient.name}</td>
// // // // //                   <td className="py-4 px-6 text-gray-600">{patient.age}</td>
// // // // //                   <td className="py-4 px-6 text-gray-600">{patient.gender}</td>
// // // // //                   <td className="py-4 px-6 text-gray-600">{patient.contact}</td>
// // // // //                   <td className="py-4 px-6 text-gray-600">{patient.diagnosis}</td>
// // // // //                   <td className="py-4 px-6 text-gray-600">{patient.lastVisit}</td>
// // // // //                   <td className="py-4 px-6">
// // // // //                     <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColors[patient.status]}`}>
// // // // //                       {patient.status}
// // // // //                     </span>
// // // // //                   </td>
// // // // //                   <td className="py-4 px-6">
// // // // //                     <div className="flex justify-center space-x-2">
// // // // //                       <button className="p-1 rounded-full bg-[#D7E2E9] text-[#415A80] hover:bg-[#A5D4DC]">
// // // // //                         <FaEye className="h-5 w-5" />
// // // // //                       </button>
// // // // //                       <button onClick={() => handleEditPatient(patient.id, patient)} className="p-1 rounded-full bg-[#D7E2E9] text-[#415A80] hover:bg-[#A5D4DC]">
// // // // //                         <FaPencilAlt className="h-5 w-5" />
// // // // //                       </button>
// // // // //                       <button onClick={() => handleDeletePatient(patient.id)} className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200">
// // // // //                         <FaTrash className="h-5 w-5" />
// // // // //                       </button>
// // // // //                     </div>
// // // // //                   </td>
// // // // //                 </tr>
// // // // //               ))}
// // // // //               {filteredPatients.length === 0 && (
// // // // //                 <tr>
// // // // //                   <td colSpan="9" className="py-8 text-center text-gray-500">
// // // // //                     No patients found matching your search criteria
// // // // //                   </td>
// // // // //                 </tr>
// // // // //               )}
// // // // //             </tbody>
// // // // //           </table>
// // // // //         </div>
        
// // // // //         {/* Pagination */}
// // // // //         <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
// // // // //           <div className="text-sm text-gray-600">
// // // // //             Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredPatients.length}</span> of <span className="font-medium">{patients.length}</span> patients
// // // // //           </div>
// // // // //           <div className="flex space-x-1">
// // // // //             <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 disabled:opacity-50" disabled>
// // // // //               Previous
// // // // //             </button>
// // // // //             <button className="px-3 py-1 bg-[#415A80] text-white rounded-md hover:bg-opacity-90">
// // // // //               1
// // // // //             </button>
// // // // //             <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
// // // // //               2
// // // // //             </button>
// // // // //             <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
// // // // //               3
// // // // //             </button>
// // // // //             <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
// // // // //               Next
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }
// // // // 'use client'
// // // // import { useState, useEffect } from 'react';
// // // // import { FaSearch, FaFilter, FaPlusCircle, FaDownload, FaPencilAlt, FaTrash, FaEye } from 'react-icons/fa';
// // // // import Link from 'next/link';
// // // // import axios from 'axios';  // استيراد axios

// // // // export default function Patients() {
// // // //   const [patients, setPatients] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [searchTerm, setSearchTerm] = useState('');
// // // //   const [newPatient, setNewPatient] = useState({ name: '', age: '', gender: '', diagnosis: '', contact: '' });
// // // //   const statusColors = {
// // // //     Active: "bg-green-100 text-green-600",  // لون لحالة "Active"
// // // //     Inactive: "bg-gray-100 text-gray-600",  // لون لحالة "Inactive"
// // // //     Pending: "bg-yellow-100 text-yellow-600",  // لون لحالة "Pending"
// // // //     // يمكنك إضافة المزيد من الحالات حسب الحاجة
// // // //   };
  
// // // //   // Fetch patients from the server
// // // //   const fetchPatients = async () => {
// // // //     setLoading(true);
// // // //     try {
// // // //       const res = await axios.get('/api/doctorDashboard/patients');  // استخدام axios
// // // //       setPatients(res.data.patients);
// // // //     } catch (error) {
// // // //       console.error("Error fetching patients", error);
// // // //     }
// // // //     setLoading(false);
// // // //   };

// // // //   // Fetch patients on initial load
// // // //   useEffect(() => {
// // // //     fetchPatients();
// // // //   }, []);

// // // //   // Filter patients based on search term
// // // //   const filteredPatients = patients.filter(patient =>
// // // //     patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // //     patient._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // //     patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
// // // //   );

// // // //   // Handle adding a new patient
// // // //   const handleAddPatient = async () => {
// // // //     try {
// // // //       const res = await axios.post("/api/doctorDashboard/patients", {
// // // //         name: "New Patient",
// // // //         age: 30,
// // // //         gender: "Male",
// // // //         contact: "123-456-7890",
// // // //         diagnosis: "Hypertension",
// // // //         lastVisit: "2025-04-10",
// // // //         status: "Active"
// // // //       });
    
// // // //       if (res.status === 201) {
// // // //         setNewPatient({ name: '', age: '', gender: '', diagnosis: '', contact: '' });
// // // //         fetchPatients(); // Re-fetch the updated patient list
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error adding patient", error);
// // // //     }
// // // //   };

// // // //   // Handle editing a patient
// // // //   const handleEditPatient = async (id, updatedPatient) => {
// // // //     try {
// // // //       const res = await axios.put(`/api/doctorDashboard/patients/${id}`, updatedPatient);
// // // //       if (res.status === 200) {
// // // //         fetchPatients(); // Re-fetch the updated patient list
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error editing patient", error);
// // // //     }
// // // //   };

// // // //   // Handle deleting a patient
// // // //   const handleDeletePatient = async (id) => {
// // // //     try {
// // // //       const res = await axios.delete(`/api/doctorDashboard/patients/${id}`);
// // // //       if (res.status === 200) {
// // // //         fetchPatients(); // Re-fetch the updated patient list
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error deleting patient", error);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="bg-[#D7E2E9] bg-opacity-20 min-h-screen p-6">
// // // //       <div className="mb-6">
// // // //         <h1 className="text-2xl font-bold text-gray-800">Patient Records</h1>
// // // //         <p className="text-gray-600">Manage and view all patient records in the system</p>
// // // //       </div>

// // // //       {/* Search and Filters */}
// // // //       <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
// // // //         <div className="flex flex-wrap gap-4">
// // // //           <div className="flex-1 min-w-[300px]">
// // // //             <div className="relative">
// // // //               <input
// // // //                 type="text"
// // // //                 placeholder="Search patients by name, ID or diagnosis..."
// // // //                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#415A80]"
// // // //                 value={searchTerm}
// // // //                 onChange={(e) => setSearchTerm(e.target.value)}
// // // //               />
// // // //               <FaSearch className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
// // // //             </div>
// // // //           </div>
          
// // // //           <div className="flex space-x-2">
// // // //             <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
// // // //               <FaFilter className="h-5 w-5 mr-2" />
// // // //               Filter
// // // //             </button>
// // // //             <button onClick={handleAddPatient} className="flex items-center px-4 py-2 bg-[#415A80] text-white rounded-lg hover:bg-opacity-90">
// // // //               <FaPlusCircle className="h-5 w-5 mr-2" />
// // // //               Add Patient
// // // //             </button>
// // // //             <button className="flex items-center px-4 py-2 bg-[#A5D4DC] text-[#415A80] rounded-lg hover:bg-opacity-90">
// // // //               <FaDownload className="h-5 w-5 mr-2" />
// // // //               Export
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* Patient Records Table */}
// // // //       <div className="bg-white rounded-lg shadow-sm overflow-hidden">
// // // //         <div className="overflow-x-auto">
// // // //           <table className="w-full">
// // // //             <thead className="bg-[#415A80] text-white text-sm">
// // // //               <tr>
// // // //                 <th className="py-3 px-6 text-left">Patient ID</th>
// // // //                 <th className="py-3 px-6 text-left">Name</th>
// // // //                 <th className="py-3 px-6 text-left">Age</th>
// // // //                 <th className="py-3 px-6 text-left">Gender</th>
// // // //                 <th className="py-3 px-6 text-left">Contact</th>
// // // //                 <th className="py-3 px-6 text-left">Diagnosis</th>
// // // //                 <th className="py-3 px-6 text-left">Last Visit</th>
// // // //                 <th className="py-3 px-6 text-left">Status</th>
// // // //                 <th className="py-3 px-6 text-center">Actions</th>
// // // //               </tr>
// // // //             </thead>
// // // //             <tbody className="divide-y divide-gray-100">
// // // //               {filteredPatients.map((patient) => (
// // // //                 <tr key={patient._id} className="hover:bg-[#D7E2E9] hover:bg-opacity-20">
// // // //                   <td className="py-4 px-6 font-medium text-[#415A80]">{patient._id}</td>
// // // //                   <td className="py-4 px-6 font-medium text-gray-900">{patient.name}</td>
// // // //                   <td className="py-4 px-6 text-gray-600">{patient.age}</td>
// // // //                   <td className="py-4 px-6 text-gray-600">{patient.gender}</td>
// // // //                   <td className="py-4 px-6 text-gray-600">{patient.contact}</td>
// // // //                   <td className="py-4 px-6 text-gray-600">{patient.diagnosis}</td>
// // // //                   <td className="py-4 px-6 text-gray-600">{patient.lastVisit}</td>
// // // //                   <td className="py-4 px-6">
// // // //                     <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColors[patient.status]}`}>
// // // //                       {patient.status}
// // // //                     </span>
// // // //                   </td>
// // // //                   <td className="py-4 px-6">
// // // //                     <div className="flex justify-center space-x-2">
// // // //                       <button className="p-1 rounded-full bg-[#D7E2E9] text-[#415A80] hover:bg-[#A5D4DC]">
// // // //                         <FaEye className="h-5 w-5" />
// // // //                       </button>
// // // //                       <button onClick={() => handleEditPatient(patient._id, patient)} className="p-1 rounded-full bg-[#D7E2E9] text-[#415A80] hover:bg-[#A5D4DC]">
// // // //                         <FaPencilAlt className="h-5 w-5" />
// // // //                       </button>
// // // //                       <button onClick={() => handleDeletePatient(patient._id)} className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200">
// // // //                         <FaTrash className="h-5 w-5" />
// // // //                       </button>
// // // //                     </div>
// // // //                   </td>
// // // //                 </tr>
// // // //               ))}
// // // //               {filteredPatients.length === 0 && (
// // // //                 <tr>
// // // //                   <td colSpan="9" className="py-8 text-center text-gray-500">
// // // //                     No patients found matching your search criteria
// // // //                   </td>
// // // //                 </tr>
// // // //               )}
// // // //             </tbody>
// // // //           </table>
// // // //         </div>
        
// // // //         {/* Pagination */}
// // // //         <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
// // // //           <div className="text-sm text-gray-600">
// // // //             Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredPatients.length}</span> of <span className="font-medium">{patients.length}</span> patients
// // // //           </div>
// // // //           <div className="flex space-x-1">
// // // //             <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 disabled:opacity-50" disabled>
// // // //               Previous
// // // //             </button>
// // // //             <button className="px-3 py-1 bg-[#415A80] text-white rounded-md hover:bg-opacity-90">
// // // //               1
// // // //             </button>
// // // //             <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
// // // //               2
// // // //             </button>
// // // //             <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
// // // //               3
// // // //             </button>
// // // //             <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
// // // //               Next
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }
// // // 'use client'
// // // import { useState, useEffect } from 'react';
// // // import { FaSearch, FaFilter, FaPlusCircle, FaDownload, FaPencilAlt, FaTrash, FaEye } from 'react-icons/fa';
// // // import axios from 'axios';  // استيراد axios

// // // export default function Patients() {
// // //   const [patients, setPatients] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [searchTerm, setSearchTerm] = useState('');
// // //   const [newPatient, setNewPatient] = useState({ name: '', age: '', gender: '', diagnosis: '', contact: '' });
// // //   const [isEditing, setIsEditing] = useState(false); // لتحديد إذا كان المستخدم في وضع تعديل أو إضافة
// // //   const [currentPatientId, setCurrentPatientId] = useState(null); // لتخزين id المريض الذي سيتم تعديله

// // //   const statusColors = {
// // //     Active: "bg-green-100 text-green-600",
// // //     Inactive: "bg-gray-100 text-gray-600",
// // //     Pending: "bg-yellow-100 text-yellow-600",
// // //   };

// // //   // Fetch patients from the server
// // //   const fetchPatients = async () => {
// // //     setLoading(true);
// // //     try {
// // //       const res = await axios.get('/api/doctorDashboard/patients');
// // //       setPatients(res.data.patients);
// // //     } catch (error) {
// // //       console.error("Error fetching patients", error);
// // //     }
// // //     setLoading(false);
// // //   };

// // //   useEffect(() => {
// // //     fetchPatients();
// // //   }, []);

// // //   // Filter patients based on search term
// // //   const filteredPatients = patients.filter(patient =>
// // //     patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //     patient._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //     patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
// // //   );

// // //   // Handle adding or editing a patient
// // //   const handleSubmit = async () => {
// // //     if (isEditing && currentPatientId) {
// // //       // Update existing patient
// // //       try {
// // //         const res = await axios.put(`/api/doctorDashboard/patients/${currentPatientId}`, newPatient);
// // //         if (res.status === 200) {
// // //           fetchPatients(); // Re-fetch the updated patient list
// // //           resetForm(); // Reset form after submission
// // //         }
// // //       } catch (error) {
// // //         console.error("Error editing patient", error);
// // //       }
// // //     } else {
// // //       // Add new patient
// // //       try {
// // //         const res = await axios.post("/api/doctorDashboard/patients", newPatient);
// // //         if (res.status === 201) {
// // //           fetchPatients(); // Re-fetch the updated patient list
// // //           resetForm(); // Reset form after submission
// // //         }
// // //       } catch (error) {
// // //         console.error("Error adding patient", error);
// // //       }
// // //     }
// // //   };

// // //   // Reset the form
// // //   const resetForm = () => {
// // //     setNewPatient({ name: '', age: '', gender: '', diagnosis: '', contact: '' });
// // //     setIsEditing(false);
// // //     setCurrentPatientId(null);
// // //   };

// // //   // Handle editing a patient
// // //   const handleEditPatient = (id, patient) => {
// // //     setIsEditing(true);
// // //     setCurrentPatientId(id);
// // //     setNewPatient({
// // //       name: patient.name,
// // //       age: patient.age,
// // //       gender: patient.gender,
// // //       diagnosis: patient.diagnosis,
// // //       contact: patient.contact,
// // //     });
// // //   };

// // //   // Handle deleting a patient
// // //   const handleDeletePatient = async (id) => {
// // //     try {
// // //       const res = await axios.delete(`/api/doctorDashboard/patients/${id}`);
// // //       if (res.status === 200) {
// // //         fetchPatients(); // Re-fetch the updated patient list
// // //       }
// // //     } catch (error) {
// // //       console.error("Error deleting patient", error);
// // //     }
// // //   };

//   // return (
//   //   <div className="bg-[#D7E2E9] bg-opacity-20 min-h-screen p-6">
//   //     <div className="mb-6">
//   //       <h1 className="text-2xl font-bold text-gray-800">Patient Records</h1>
//   //       <p className="text-gray-600">Manage and view all patient records in the system</p>
//   //     </div>

//   //     {/* Search and Filters */}
//   //     <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
//   //       <div className="flex flex-wrap gap-4">
//   //         <div className="flex-1 min-w-[300px]">
//   //           <div className="relative">
//   //             <input
//   //               type="text"
//   //               placeholder="Search patients by name, ID or diagnosis..."
//   //               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#415A80]"
//   //               value={searchTerm}
//   //               onChange={(e) => setSearchTerm(e.target.value)}
//   //             />
//   //             <FaSearch className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
//   //           </div>
//   //         </div>
//   //         <div className="flex space-x-2">
//   //           <button onClick={() => resetForm()} className="flex items-center px-4 py-2 bg-[#415A80] text-white rounded-lg hover:bg-opacity-90">
//   //             <FaPlusCircle className="h-5 w-5 mr-2" />
//   //             {isEditing ? "Cancel" : "Add Patient"}
//   //           </button>
//   //         </div>
//   //       </div>
//   //     </div>

//   //     {/* Patient Form */}
//   //     {(isEditing || currentPatientId) && (
//   //       <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
//   //         <h3 className="text-lg font-semibold text-gray-800">{isEditing ? "Edit Patient" : "Add Patient"}</h3>
//   //         <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
//   //           <div className="space-y-4">
//   //             <div className="flex gap-4">
//   //               <div className="flex-1">
//   //                 <label className="block text-gray-700">Name</label>
//   //                 <input
//   //                   type="text"
//   //                   className="w-full px-3 py-2 border rounded-md"
//   //                   value={newPatient.name}
//   //                   onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
//   //                   required
//   //                 />
//   //               </div>
//   //               <div className="flex-1">
//   //                 <label className="block text-gray-700">Age</label>
//   //                 <input
//   //                   type="number"
//   //                   className="w-full px-3 py-2 border rounded-md"
//   //                   value={newPatient.age}
//   //                   onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
//   //                   required
//   //                 />
//   //               </div>
//   //             </div>
//   //             <div className="flex gap-4">
//   //               <div className="flex-1">
//   //                 <label className="block text-gray-700">Gender</label>
//   //                 <select
//   //                   className="w-full px-3 py-2 border rounded-md"
//   //                   value={newPatient.gender}
//   //                   onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
//   //                   required
//   //                 >
//   //                   <option value="Male">Male</option>
//   //                   <option value="Female">Female</option>
//   //                 </select>
//   //               </div>
//   //               <div className="flex-1">
//   //                 <label className="block text-gray-700">Contact</label>
//   //                 <input
//   //                   type="text"
//   //                   className="w-full px-3 py-2 border rounded-md"
//   //                   value={newPatient.contact}
//   //                   onChange={(e) => setNewPatient({ ...newPatient, contact: e.target.value })}
//   //                   required
//   //                 />
//   //               </div>
//   //             </div>
//   //             <div>
//   //               <label className="block text-gray-700">Diagnosis</label>
//   //               <input
//   //                 type="text"
//   //                 className="w-full px-3 py-2 border rounded-md"
//   //                 value={newPatient.diagnosis}
//   //                 onChange={(e) => setNewPatient({ ...newPatient, diagnosis: e.target.value })}
//   //                 required
//   //               />
//   //             </div>
//   //             <button type="submit" className="w-full px-4 py-2 bg-[#415A80] text-white rounded-md hover:bg-opacity-90">
//   //               {isEditing ? "Update Patient" : "Add Patient"}
//   //             </button>
//   //           </div>
//   //         </form>
//   //       </div>
//   //     )}

//   //     {/* Patient Records Table */}
//   //     <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//   //       <div className="overflow-x-auto">
//   //         <table className="w-full">
//   //           <thead className="bg-[#415A80] text-white text-sm">
//   //             <tr>
//   //               <th className="py-3 px-6 text-left">Patient ID</th>
//   //               <th className="py-3 px-6 text-left">Name</th>
//   //               <th className="py-3 px-6 text-left">Age</th>
//   //               <th className="py-3 px-6 text-left">Gender</th>
//   //               <th className="py-3 px-6 text-left">Contact</th>
//   //               <th className="py-3 px-6 text-left">Diagnosis</th>
//   //               <th className="py-3 px-6 text-left">Last Visit</th>
//   //               <th className="py-3 px-6 text-left">Status</th>
//   //               <th className="py-3 px-6 text-center">Actions</th>
//   //             </tr>
//   //           </thead>
//   //           <tbody className="divide-y divide-gray-100">
//   //             {filteredPatients.map((patient) => (
//   //               <tr key={patient._id} className="hover:bg-[#D7E2E9] hover:bg-opacity-20">
//   //                 <td className="py-4 px-6 font-medium text-[#415A80]">{patient._id}</td>
//   //                 <td className="py-4 px-6 font-medium text-gray-900">{patient.name}</td>
//   //                 <td className="py-4 px-6 text-gray-600">{patient.age}</td>
//   //                 <td className="py-4 px-6 text-gray-600">{patient.gender}</td>
//   //                 <td className="py-4 px-6 text-gray-600">{patient.contact}</td>
//   //                 <td className="py-4 px-6 text-gray-600">{patient.diagnosis}</td>
//   //                 <td className="py-4 px-6 text-gray-600">{patient.lastVisit}</td>
//   //                 <td className="py-4 px-6">
//   //                   <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColors[patient.status]}`}>
//   //                     {patient.status}
//   //                   </span>
//   //                 </td>
//   //                 <td className="py-4 px-6">
//   //                   <div className="flex justify-center space-x-2">
//   //                     <button className="p-1 rounded-full bg-[#D7E2E9] text-[#415A80] hover:bg-[#A5D4DC]">
//   //                       <FaEye className="h-5 w-5" />
//   //                     </button>
//   //                     <button onClick={() => handleEditPatient(patient._id, patient)} className="p-1 rounded-full bg-[#D7E2E9] text-[#415A80] hover:bg-[#A5D4DC]">
//   //                       <FaPencilAlt className="h-5 w-5" />
//   //                     </button>
//   //                     <button onClick={() => handleDeletePatient(patient._id)} className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200">
//   //                       <FaTrash className="h-5 w-5" />
//   //                     </button>
//   //                   </div>
//   //                 </td>
//   //               </tr>
//   //             ))}
//   //             {filteredPatients.length === 0 && (
//   //               <tr>
//   //                 <td colSpan="9" className="py-8 text-center text-gray-500">
//   //                   No patients found matching your search criteria
//   //                 </td>
//   //               </tr>
//   //             )}
//   //           </tbody>
//   //         </table>
//   //       </div>
//   //     </div>
//   //   </div>
//   // );
// // // }
// // 'use client'
// // import { useState, useEffect } from 'react';
// // import { FaSearch, FaFilter, FaPlusCircle, FaDownload, FaPencilAlt, FaTrash, FaEye } from 'react-icons/fa';
// // import axios from 'axios';

// // export default function Patients() {
// //   const [patients, setPatients] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [searchTerm, setSearchTerm] = useState('');
  
// //   // لو أردت الاحتفاظ بإضافة مرضى جدد يدويًا، 
// //   // يجب أن يكون لديك فعليًا Route POST /api/doctorDashboard/patients 
// //   // وتعامل مع نموذجيّن (BookingRequest + Patient) أو (User بدور Patient). 
// //   // و إلا يمكنك الاستغناء عن الجزء الخاص بالإضافة والتعديل.

// //   const [newPatient, setNewPatient] = useState({ name: '', age: '', gender: '', diagnosis: '', contact: '' });
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [currentPatientId, setCurrentPatientId] = useState(null);

// //   const statusColors = {
// //     Active: "bg-green-100 text-green-600",
// //     Inactive: "bg-gray-100 text-gray-600",
// //     Pending: "bg-yellow-100 text-yellow-600",
// //   };

// //   // 1) جلب المرضى من السيرفر (المرضى المعمول لهم حجوزات مع الدكتور)
// //   const fetchPatients = async () => {
// //     setLoading(true);
// //     try {
// //       const res = await axios.get('/api/doctorDashboard/patients');
// //       console.log(res);
// //       // نتوقع أن يكون شكل الرد: { patients: [...] }
// //       setPatients(res.data.patients || []);
// //     } catch (error) {
// //       console.error("Error fetching patients", error);
// //     }
// //     setLoading(false);
// //   };

// //   useEffect(() => {
// //     fetchPatients();
// //   }, []);

// //   // 2) عامل تصفية / بحث
// //   const filteredPatients = patients.filter(patient =>
// //     patient.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //     patient._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //     patient.diagnosis?.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   // بقية الدوال (الإضافة / التعديل / الحذف) تتطلب أن يكون لديك فعليًا Endpoints داعمة
// //   // إذا كنت تريد فقط عرض المرضى من حجوزات الدكتور، يمكنك الاستغناء عن الإضافة والتعديل والحذف.

// //   const handleSubmit = async () => {
// //     // ... منطق إضافة/تعديل مريض
// //     // هذا سيحتاج Endpoint خاص لإنشاء أو تعديل مريض
// //   };

// //   const resetForm = () => {
// //     // ...
// //   };

// //   const handleEditPatient = (id, patient) => {
// //     // ...
// //   };

// //   const handleDeletePatient = async (id) => {
// //     // ...
// //   };

// //   return (
// //     <div className="bg-[#D7E2E9] bg-opacity-20 min-h-screen p-6">
// //       <div className="mb-6">
// //         <h1 className="text-2xl font-bold text-gray-800">Patient Records</h1>
// //         <p className="text-gray-600">Manage and view all patient records in the system</p>
// //       </div>

// //       {/* Search and Filters */}
// //       <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
// //         <div className="flex flex-wrap gap-4">
// //           <div className="flex-1 min-w-[300px]">
// //             <div className="relative">
// //               <input
// //                 type="text"
// //                 placeholder="Search patients by name, ID or diagnosis..."
// //                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#415A80]"
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //               />
// //               <FaSearch className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
// //             </div>
// //           </div>
// //           <div className="flex space-x-2">
// //             <button onClick={() => resetForm()} className="flex items-center px-4 py-2 bg-[#415A80] text-white rounded-lg hover:bg-opacity-90">
// //               <FaPlusCircle className="h-5 w-5 mr-2" />
// //               {isEditing ? "Cancel" : "Add Patient"}
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Patient Form (اختياري حسب رغبتك في الإضافة/التعديل) */}
// //       {(isEditing || currentPatientId) && (
// //         <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
// //           {/* بقية الحقول... */}
// //         </div>
// //       )}

// //       {/* Patient Records Table */}
// //       <div className="bg-white rounded-lg shadow-sm overflow-hidden">
// //         <div className="overflow-x-auto">
// //           <table className="w-full">
// //             <thead className="bg-[#415A80] text-white text-sm">
// //               <tr>
// //                 <th className="py-3 px-6 text-left">Patient ID</th>
// //                 <th className="py-3 px-6 text-left">Name</th>
// //                 <th className="py-3 px-6 text-left">Age</th>
// //                 <th className="py-3 px-6 text-left">Gender</th>
// //                 <th className="py-3 px-6 text-left">Contact</th>
// //                 <th className="py-3 px-6 text-left">Diagnosis</th>
// //                 <th className="py-3 px-6 text-left">Last Visit</th>
// //                 <th className="py-3 px-6 text-left">Status</th>
// //                 <th className="py-3 px-6 text-center">Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody className="divide-y divide-gray-100">
// //               {filteredPatients.map((patient) => (
// //                 <tr key={patient._id} className="hover:bg-[#D7E2E9] hover:bg-opacity-20">
// //                   <td className="py-4 px-6 font-medium text-[#415A80]">{patient._id}</td>
// //                   <td className="py-4 px-6 font-medium text-gray-900">{patient.name}</td>
// //                   <td className="py-4 px-6 text-gray-600">{patient.age}</td>
// //                   <td className="py-4 px-6 text-gray-600">{patient.gender}</td>
// //                   <td className="py-4 px-6 text-gray-600">{patient.contact}</td>
// //                   <td className="py-4 px-6 text-gray-600">{patient.diagnosis}</td>
// //                   <td className="py-4 px-6 text-gray-600">{patient.lastVisit}</td>
// //                   <td className="py-4 px-6">
// //                     <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColors[patient.status]}`}>
// //                       {patient.status}
// //                     </span>
// //                   </td>
// //                   <td className="py-4 px-6">
// //                     <div className="flex justify-center space-x-2">
// //                       <button className="p-1 rounded-full bg-[#D7E2E9] text-[#415A80] hover:bg-[#A5D4DC]">
// //                         <FaEye className="h-5 w-5" />
// //                       </button>
// //                       <button onClick={() => handleEditPatient(patient._id, patient)} className="p-1 rounded-full bg-[#D7E2E9] text-[#415A80] hover:bg-[#A5D4DC]">
// //                         <FaPencilAlt className="h-5 w-5" />
// //                       </button>
// //                       <button onClick={() => handleDeletePatient(patient._id)} className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200">
// //                         <FaTrash className="h-5 w-5" />
// //                       </button>
// //                     </div>
// //                   </td>
// //                 </tr>
// //               ))}
// //               {filteredPatients.length === 0 && (
// //                 <tr>
// //                   <td colSpan="9" className="py-8 text-center text-gray-500">
// //                     No patients found matching your search criteria
// //                   </td>
// //                 </tr>
// //               )}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// // 'use client'
// // import React, { useEffect, useState } from "react";
// // import axios from "axios";

// // function DoctorDashboardPatients() {
// //   const [bookings, setBookings] = useState([]);
// //   const [statusOptions] = useState(["pending", "approved", "rejected", "completed"]);

// //   // Fetch all patient bookings
// //   const fetchBookings = async () => {
// //     try {
// //       const response = await axios.get("/api/doctorDashboard/patients");
// //       setBookings(response.data); // Assumes the response returns an array of bookings
// //     } catch (error) {
// //       console.error("Error fetching bookings:", error);
// //     }
// //   };

// //   // Update the booking status
// //   const handleStatusChange = async (bookingId, newStatus) => {
// //     try {
// //       // You may need to adjust the PUT endpoint or request body 
// //       // depending on how your backend is set up
// //       await axios.put(`/api/doctorDashboard/patients/${bookingId}`, {
// //         status: newStatus,
// //       });

// //       // Locally update the booking status after successful PUT
// //       setBookings((prevBookings) =>
// //         prevBookings.map((booking) =>
// //           booking._id === bookingId ? { ...booking, status: newStatus } : booking
// //         )
// //       );
// //     } catch (error) {
// //       console.error("Error updating booking status:", error);
// //     }
// //   };

// //   // Load the bookings on component mount
// //   useEffect(() => {
// //     fetchBookings();
// //   }, []);

// //   return (
// //     <div className="container mx-auto p-4">
// //       <h1 className="text-2xl font-bold mb-4">Patient Bookings</h1>
// //       {bookings.length === 0 ? (
// //         <p className="text-gray-600">No bookings available at the moment.</p>
// //       ) : (
// //         <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded">
// //           <thead className="bg-gray-100 border-b border-gray-200">
// //             <tr>
// //               <th className="px-4 py-2 text-left">Patient Name</th>
// //               <th className="px-4 py-2 text-left">Email</th>
// //               <th className="px-4 py-2 text-left">Booking Date</th>
// //               <th className="px-4 py-2 text-left">Time</th>
// //               <th className="px-4 py-2 text-left">Current Status</th>
// //               <th className="px-4 py-2 text-left">Reason</th>
// //               <th className="px-4 py-2">Update Status</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {bookings.map((booking) => (
// //               <tr
// //                 key={booking._id}
// //                 className="border-b border-gray-200 hover:bg-gray-50"
// //               >
// //                 <td className="px-4 py-2">
// //                   {booking?.patient?.name || "N/A"}
// //                 </td>
// //                 <td className="px-4 py-2">
// //                   {booking?.patient?.email || "N/A"}
// //                 </td>
// //                 <td className="px-4 py-2">
// //                   {new Date(booking.date).toLocaleDateString("en-GB")}
// //                 </td>
// //                 <td className="px-4 py-2">{booking.time}</td>
// //                 <td className="px-4 py-2 capitalize">{booking.status}</td>
// //                 <td className="px-4 py-2">{booking.reason}</td>
// //                 <td className="px-4 py-2">
// //                   <select
// //                     className="border border-gray-300 rounded px-2 py-1"
// //                     onChange={(e) => handleStatusChange(booking._id, e.target.value)}
// //                     defaultValue={booking.status}
// //                   >
// //                     {statusOptions.map((status) => (
// //                       <option key={status} value={status}>
// //                         {status}
// //                       </option>
// //                     ))}
// //                   </select>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       )}
// //     </div>
// //   );
// // }

// // export default DoctorDashboardPatients;
// 'use client'
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function DoctorDashboardPatients() {
//   const [bookings, setBookings] = useState([]);
//   const [statusOptions] = useState(["Active", "Follow-up", "New", "Completed"]);
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [isLoading, setIsLoading] = useState(true);

//   // Fetch all patient bookings
//   const fetchBookings = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get("/api/doctorDashboard/patients");
//       setBookings(response.data);
//     } catch (error) {
//       console.error("Error fetching bookings:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Update the booking status
//   const handleStatusChange = async (bookingId, newStatus) => {
//     try {
//       await axios.put(`/api/doctorDashboard/patients/${bookingId}`, {
//         status: newStatus,
//       });

//       // Locally update the booking status after successful PUT
//       setBookings((prevBookings) =>
//         prevBookings.map((booking) =>
//           booking._id === bookingId ? { ...booking, status: newStatus } : booking
//         )
//       );
//     } catch (error) {
//       console.error("Error updating booking status:", error);
//     }
//   };

//   // Filter bookings based on status
//   const filteredBookings = statusFilter === "all" 
//     ? bookings 
//     : bookings.filter(booking => booking.status === statusFilter);

//   // Load the bookings on component mount
//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'pending': return 'bg-yellow-100 text-yellow-800';
//       case 'approved': return 'bg-green-100 text-green-800';
//       case 'rejected': return 'bg-red-100 text-red-800';
//       case 'completed': return 'bg-blue-100 text-blue-800';
//       default: return 'bg-gray-100';
//     }
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen p-6">
//       <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold text-gray-800">Patient Bookings</h1>
          
//           <div className="flex items-center space-x-4">
//             <label className="text-gray-700 font-medium">Filter by Status:</label>
//             <select
//               className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//             >
//               {statusOptions.map((status) => (
//                 <option key={status} value={status}>
//                   {status.charAt(0).toUpperCase() + status.slice(1)}
//                 </option>
//               ))}
//             </select>
            
//             <button 
//               onClick={fetchBookings}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
//             >
//               <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
//               </svg>
//               Refresh
//             </button>
//           </div>
//         </div>

//         {isLoading ? (
//           <div className="flex justify-center items-center py-12">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//           </div>
//         ) : filteredBookings.length === 0 ? (
//           <div className="bg-gray-50 rounded-lg p-8 text-center">
//             <p className="text-gray-600 text-lg">No bookings available for the selected filter.</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white rounded-lg overflow-hidden">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Patient Name</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Email</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Booking Date</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Time</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Reason</th>
//                   <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {filteredBookings.map((booking) => (
//                   <tr key={booking._id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
//                       {booking?.patient?.name || "N/A"}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                       {booking?.patient?.email || "N/A"}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                       {new Date(booking.date).toLocaleDateString("en-GB")}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                       {booking.time}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.patient.status)}`}>
//                         {booking.patient.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
//                       {booking.reason}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-center">
//                       <select
//                         className="border border-gray-300 rounded-md px-3 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         onChange={(e) => handleStatusChange(booking._id, e.target.value)}
//                         value={booking.patient.status}
//                       >
//                         {statusOptions.slice(1).map((status) => (
//                           <option key={status} value={status}>
//                             {status.charAt(0).toUpperCase() + status.slice(1)}
//                           </option>
//                         ))}
//                       </select>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default DoctorDashboardPatients;
'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";

function DoctorDashboardPatient() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    async function fetchPatients() {
      try {
        const response = await axios.get("/api/doctorDashboard/patients");
        setPatients(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    }

    fetchPatients();
  }, []);

  const handleStatusChange = async (patientId, newStatus) => {
    try {
      await axios.put(`/api/doctorDashboard/patients/${patientId}`, { status: newStatus });
      setPatients((prevPatients) =>
        prevPatients.map((patient) =>
          patient._id === patientId ? { ...patient, status: newStatus } : patient
        )
      );
    } catch (error) {
      console.error("Error updating patient status:", error);
    }
  };
  const statusColors = {
    Active: "bg-green-100 text-green-700",
    "Follow-up": "bg-yellow-100 text-yellow-700",
    New: "bg-blue-100 text-blue-700",
    Completed: "bg-gray-100 text-gray-600",
  };
  
  return (
    <div className="bg-[#D7E2E9] bg-opacity-20 min-h-screen p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Patient Records</h1>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#415A80] text-white text-sm">
            <tr>
              <th className="py-3 px-6 text-left">email</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">address
              </th>
              <th className="py-3 px-6 text-left">Booking Date</th>
              <th className="py-3 px-6 text-left">Time</th>
              <th className="py-3 px-6 text-left">Reason</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {patients.map((patient) => (
              <tr key={patient._id} className="hover:bg-[#D7E2E9] hover:bg-opacity-20">
                <td className="py-4 px-6 font-medium text-[#415A80]">{patient.patient.email}</td>
                <td className="py-4 px-6 font-medium text-gray-900">{patient.patient.name}</td>
                <td className="py-4 px-6 text-gray-600">{patient.patient.address}</td>
                <td className="py-4 px-6 text-gray-600">{patient.date}</td>
                <td className="py-4 px-6 text-gray-600">{patient.time}</td>
                <td className="py-4 px-6 text-gray-600">{patient.reason}</td>
                <td className="py-4 px-6">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColors[patient.status]}`}>
                    {patient.patient.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-center">
                  <select
                    value={patient.patient.status}
                    onChange={(e) => handleStatusChange(patient.patient._id, e.target.value)}
                    className="border rounded-md px-3 py-1"
                  >
                    <option value="Active">Active</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="New">New</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DoctorDashboardPatient;
