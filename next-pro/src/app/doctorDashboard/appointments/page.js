// // // // // // // 'use client'
// // // // // // // import { useState, useEffect } from 'react';
// // // // // // // // import SidebarDoctor from './SidebarDoctor';  // تأكد من استيراد الشريط الجانبي الخاص بك
// // // // // // // import { CalendarIcon, UsersIcon } from '@heroicons/react/24/outline';
// // // // // // // import Link from 'next/link';

// // // // // // // export default function Appointments() {
// // // // // // //   const [isCollapsed, setIsCollapsed] = useState(false);
// // // // // // //   const [appointments, setAppointments] = useState([]);
// // // // // // //   const [loading, setLoading] = useState(true);

// // // // // // //   const toggleSidebar = () => {
// // // // // // //     setIsCollapsed(!isCollapsed);
// // // // // // //   };

// // // // // // //   // محاكاة جلب البيانات من الـ API
// // // // // // //   useEffect(() => {
// // // // // // //     // هذه البيانات ستكون عادة من API
// // // // // // //     const fetchAppointments = async () => {
// // // // // // //       setLoading(true);
// // // // // // //       // محاكاة جلب البيانات (من الممكن أن يكون هنا API endpoint)
// // // // // // //       const response = [
// // // // // // //         { id: 'A-001', patient: 'Emma Wilson', time: '2025-04-07 09:30', status: 'Scheduled' },
// // // // // // //         { id: 'A-002', patient: 'John Miller', time: '2025-04-07 11:00', status: 'Confirmed' },
// // // // // // //         { id: 'A-003', patient: 'Sophia Thomas', time: '2025-04-08 02:15', status: 'Scheduled' },
// // // // // // //       ];
// // // // // // //       setAppointments(response);
// // // // // // //       setLoading(false);
// // // // // // //     };
// // // // // // //     fetchAppointments();
// // // // // // //   }, []);

// // // // // // //   const renderAppointmentsTable = () => {
// // // // // // //     return (
// // // // // // //       <div className="overflow-x-auto">
// // // // // // //         <table className="w-full">
// // // // // // //           <thead className="bg-gray-50 text-gray-600 text-sm">
// // // // // // //             <tr>
// // // // // // //               <th className="py-3 px-6 text-left">Appointment ID</th>
// // // // // // //               <th className="py-3 px-6 text-left">Patient Name</th>
// // // // // // //               <th className="py-3 px-6 text-left">Time</th>
// // // // // // //               <th className="py-3 px-6 text-left">Status</th>
// // // // // // //               <th className="py-3 px-6 text-left">Actions</th>
// // // // // // //             </tr>
// // // // // // //           </thead>
// // // // // // //           <tbody className="divide-y divide-gray-100">
// // // // // // //             {appointments.map((appointment) => (
// // // // // // //               <tr key={appointment.id} className="hover:bg-gray-50">
// // // // // // //                 <td className="py-4 px-6 font-medium text-[#415A80]">{appointment.id}</td>
// // // // // // //                 <td className="py-4 px-6 font-medium text-gray-900">{appointment.patient}</td>
// // // // // // //                 <td className="py-4 px-6 text-gray-600">{appointment.time}</td>
// // // // // // //                 <td className="py-4 px-6">
// // // // // // //                   <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${appointment.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
// // // // // // //                     {appointment.status}
// // // // // // //                   </span>
// // // // // // //                 </td>
// // // // // // //                 <td className="py-4 px-6">
// // // // // // //                   <Link href={`/appointments/${appointment.id}`} className="text-[#415A80] hover:text-[#374E70] text-sm font-medium">
// // // // // // //                     View Details
// // // // // // //                   </Link>
// // // // // // //                 </td>
// // // // // // //               </tr>
// // // // // // //             ))}
// // // // // // //           </tbody>
// // // // // // //         </table>
// // // // // // //       </div>
// // // // // // //     );
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="flex">
// // // // // // //       {/* <SidebarDoctor isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} /> */}

// // // // // // //       <div >
// // // // // // //         {/* Header */}
// // // // // // //         <div className="flex justify-between items-center">
// // // // // // //           <h1 className="text-2xl font-semibold">Appointments</h1>
// // // // // // //           <button className="bg-[#415A80] text-white px-4 py-2 rounded-md hover:bg-[#374E70]">
// // // // // // //             Add New Appointment
// // // // // // //           </button>
// // // // // // //         </div>

// // // // // // //         {/* Main Content */}
// // // // // // //         {loading ? (
// // // // // // //           <div className="flex justify-center items-center mt-6">
// // // // // // //             <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-transparent border-solid border-[#374E70]" role="status"></div>
// // // // // // //           </div>
// // // // // // //         ) : (
// // // // // // //           <div className="mt-6">
// // // // // // //             {renderAppointmentsTable()}
// // // // // // //           </div>
// // // // // // //         )}
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }
// // // // // // 'use client'
// // // // // // import { useState, useEffect } from 'react';
// // // // // // import { FaSearch, FaPlusCircle, FaFilter, FaDownload, FaEye, FaPencilAlt, FaTrash } from 'react-icons/fa';  // استيراد الأيقونات من مكتبة react-icons/fa
// // // // // // import Link from 'next/link';

// // // // // // export default function appointments() {
// // // // // //   const [isCollapsed, setIsCollapsed] = useState(false);
// // // // // //   const [appointments, setAppointments] = useState([]);
// // // // // //   const [loading, setLoading] = useState(true);

// // // // // //   const toggleSidebar = () => {
// // // // // //     setIsCollapsed(!isCollapsed);
// // // // // //   };

// // // // // //   // محاكاة جلب البيانات من الـ API
// // // // // //   useEffect(() => {
// // // // // //     // هذه البيانات ستكون عادة من API
// // // // // //     const fetchAppointments = async () => {
// // // // // //       setLoading(true);
// // // // // //       // محاكاة جلب البيانات (من الممكن أن يكون هنا API endpoint)
// // // // // //       const response = [
// // // // // //         { id: 'A-001', patient: 'Emma Wilson', time: '2025-04-07 09:30', status: 'Scheduled' },
// // // // // //         { id: 'A-002', patient: 'John Miller', time: '2025-04-07 11:00', status: 'Confirmed' },
// // // // // //         { id: 'A-003', patient: 'Sophia Thomas', time: '2025-04-08 02:15', status: 'Scheduled' },
// // // // // //       ];
// // // // // //       setAppointments(response);
// // // // // //       setLoading(false);
// // // // // //     };
// // // // // //     fetchAppointments();
// // // // // //   }, []);

// // // // // //   const renderAppointmentsTable = () => {
// // // // // //     return (
// // // // // //       <div className="overflow-x-auto">
// // // // // //         <table className="w-full">
// // // // // //           <thead className="bg-[#415A80] text-white text-sm">
// // // // // //             <tr>
// // // // // //               <th className="py-3 px-6 text-left">Appointment ID</th>
// // // // // //               <th className="py-3 px-6 text-left">Patient Name</th>
// // // // // //               <th className="py-3 px-6 text-left">Time</th>
// // // // // //               <th className="py-3 px-6 text-left">Status</th>
// // // // // //               <th className="py-3 px-6 text-left">Actions</th>
// // // // // //             </tr>
// // // // // //           </thead>
// // // // // //           <tbody className="divide-y divide-gray-100">
// // // // // //             {appointments.map((appointment) => (
// // // // // //               <tr key={appointment.id} className="hover:bg-[#D7E2E9] hover:bg-opacity-20">
// // // // // //                 <td className="py-4 px-6 font-medium text-[#415A80]">{appointment.id}</td>
// // // // // //                 <td className="py-4 px-6 font-medium text-gray-900">{appointment.patient}</td>
// // // // // //                 <td className="py-4 px-6 text-gray-600">{appointment.time}</td>
// // // // // //                 <td className="py-4 px-6">
// // // // // //                   <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${appointment.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
// // // // // //                     {appointment.status}
// // // // // //                   </span>
// // // // // //                 </td>
// // // // // //                 <td className="py-4 px-6">
// // // // // //                   <Link href={`/appointments/${appointment.id}`} className="text-[#415A80] hover:text-[#374E70] text-sm font-medium">
// // // // // //                     View Details
// // // // // //                   </Link>
// // // // // //                 </td>
// // // // // //               </tr>
// // // // // //             ))}
// // // // // //           </tbody>
// // // // // //         </table>
// // // // // //       </div>
// // // // // //     );
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="flex bg-[#D7E2E9] bg-opacity-20">
// // // // // //       {/* SidebarDoctor يمكننا إلغاء التعليق عليه إذا كنت بحاجة إلى شريط جانبي */}
// // // // // //       {/* <SidebarDoctor isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} /> */}
// // // // // // <div>
     
// // // // // //         <header className="px-6 py-4 flex items-center justify-between">
// // // // // //           <h1 className="text-2xl font-semibold text-gray-800">Appointments</h1>
// // // // // //           <button className="bg-[#415A80] text-white px-4 py-2 rounded-md hover:bg-[#374E70]">
// // // // // //             <FaPlusCircle className="h-5 w-5 mr-2" />
// // // // // //             Add New Appointment
// // // // // //           </button>
// // // // // //         </header>

// // // // // //         {/* Main Content */}
// // // // // //         {loading ? (
// // // // // //           <div className="flex justify-center items-center mt-6">
// // // // // //             <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-transparent border-solid border-[#374E70]" role="status"></div>
// // // // // //           </div>
// // // // // //         ) : (
// // // // // //           <div className="mt-6">
// // // // // //             {renderAppointmentsTable()}
// // // // // //           </div>
// // // // // //         )}
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }
// // // 'use client'
// // // import { useState, useEffect } from 'react';
// // // import { FaSearch, FaPlusCircle, FaFilter, FaDownload, FaEye, FaPencilAlt, FaTrash, FaCalendarAlt } from 'react-icons/fa';
// // // import Link from 'next/link';

// // // export default function appointments() {
// // //   const [isCollapsed, setIsCollapsed] = useState(false);
// // //   const [appointments, setAppointments] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [selectedDate, setSelectedDate] = useState(new Date());
// // //   const [selectedAppointment, setSelectedAppointment] = useState(null);
// // //   const [view, setView] = useState('list'); // 'list', 'calendar', 'details'

// // //   const toggleSidebar = () => {
// // //     setIsCollapsed(!isCollapsed);
// // //   };

// // //   // محاكاة جلب البيانات من الـ API
// // //   useEffect(() => {
// // //     // هذه البيانات ستكون عادة من API
// // //     const fetchAppointments = async () => {
// // //       setLoading(true);
// // //       // محاكاة جلب البيانات (من الممكن أن يكون هنا API endpoint)
// // //       const response = [
// // //         { 
// // //           id: 'A-001', 
// // //           patient: 'Emma Wilson', 
// // //           time: '2025-04-07 09:30', 
// // //           status: 'Scheduled',
// // //           details: {
// // //             age: 32,
// // //             gender: 'أنثى',
// // //             phone: '+1 (555) 123-4567',
// // //             email: 'emma.wilson@example.com',
// // //             address: '123 Main St, New York, NY',
// // //             insurance: 'BlueCross',
// // //             medicalHistory: 'ارتفاع ضغط الدم، الحساسية من البنسلين',
// // //             reason: 'فحص دوري'
// // //           }
// // //         },
// // //         { 
// // //           id: 'A-002', 
// // //           patient: 'John Miller', 
// // //           time: '2025-04-07 11:00', 
// // //           status: 'Confirmed',
// // //           details: {
// // //             age: 45,
// // //             gender: 'ذكر',
// // //             phone: '+1 (555) 987-6543',
// // //             email: 'john.miller@example.com',
// // //             address: '456 Oak Ave, Boston, MA',
// // //             insurance: 'Aetna',
// // //             medicalHistory: 'مرض السكري، ارتفاع الكوليسترول',
// // //             reason: 'الشعور بألم في الصدر'
// // //           }
// // //         },
// // //         { 
// // //           id: 'A-003', 
// // //           patient: 'Sophia Thomas', 
// // //           time: '2025-04-08 02:15', 
// // //           status: 'Scheduled',
// // //           details: {
// // //             age: 28,
// // //             gender: 'أنثى',
// // //             phone: '+1 (555) 456-7890',
// // //             email: 'sophia.thomas@example.com',
// // //             address: '789 Pine Rd, Chicago, IL',
// // //             insurance: 'UnitedHealth',
// // //             medicalHistory: 'لا يوجد',
// // //             reason: 'صداع مستمر منذ أسبوع'
// // //           }
// // //         },
// // //       ];
// // //       setAppointments(response);
// // //       setLoading(false);
// // //     };
// // //     fetchAppointments();
// // //   }, []);

// // //   const handleViewAppointment = (appointment) => {
// // //     setSelectedAppointment(appointment);
// // //     setView('details');
// // //   };

// // //   // دالة للحصول على الأيام في الشهر الحالي
// // //   const getDaysInMonth = (year, month) => {
// // //     const date = new Date(year, month, 1);
// // //     const days = [];
// // //     while (date.getMonth() === month) {
// // //       days.push(new Date(date));
// // //       date.setDate(date.getDate() + 1);
// // //     }
// // //     return days;
// // //   };

// // //   // الحصول على أيام الشهر الحالي
// // //   const currentMonth = selectedDate.getMonth();
// // //   const currentYear = selectedDate.getFullYear();
// // //   const daysInMonth = getDaysInMonth(currentYear, currentMonth);

// // //   // الحصول على مواعيد اليوم المحدد
// // //   const getAppointmentsForDate = (date) => {
// // //     const dateString = date.toISOString().split('T')[0];
// // //     return appointments.filter(appointment => {
// // //       const appointmentDate = appointment.time.split(' ')[0];
// // //       return appointmentDate === dateString;
// // //     });
// // //   };

// // //   const renderAppointmentsTable = () => {
// // //     return (
// // //       <div className="overflow-x-auto">
// // //         <table className="w-full">
// // //           <thead className="bg-[#415A80] text-white text-sm">
// // //             <tr>
// // //               <th className="py-3 px-6 text-left">رقم الموعد</th>
// // //               <th className="py-3 px-6 text-left">اسم المريض</th>
// // //               <th className="py-3 px-6 text-left">الوقت</th>
// // //               <th className="py-3 px-6 text-left">الحالة</th>
// // //               <th className="py-3 px-6 text-left">الإجراءات</th>
// // //             </tr>
// // //           </thead>
// // //           <tbody className="divide-y divide-gray-100">
// // //             {appointments.map((appointment) => (
// // //               <tr key={appointment.id} className="hover:bg-[#D7E2E9] hover:bg-opacity-20">
// // //                 <td className="py-4 px-6 font-medium text-[#415A80]">{appointment.id}</td>
// // //                 <td className="py-4 px-6 font-medium text-gray-900">{appointment.patient}</td>
// // //                 <td className="py-4 px-6 text-gray-600">{appointment.time}</td>
// // //                 <td className="py-4 px-6">
// // //                   <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${appointment.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
// // //                     {appointment.status}
// // //                   </span>
// // //                 </td>
// // //                 <td className="py-4 px-6">
// // //                   <button 
// // //                     onClick={() => handleViewAppointment(appointment)} 
// // //                     className="text-[#415A80] hover:text-[#374E70] text-sm font-medium mr-3">
// // //                     <FaEye className="inline mr-1" /> عرض التفاصيل
// // //                   </button>
// // //                   <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-3">
// // //                     <FaPencilAlt className="inline mr-1" /> تعديل
// // //                   </button>
// // //                   <button className="text-red-600 hover:text-red-800 text-sm font-medium">
// // //                     <FaTrash className="inline mr-1" /> حذف
// // //                   </button>
// // //                 </td>
// // //               </tr>
// // //             ))}
// // //           </tbody>
// // //         </table>
// // //       </div>
// // //     );
// // //   };

// // //   const renderCalendar = () => {
// // //     return (
// // //       <div className="bg-white rounded-lg shadow p-4">
// // //         <div className="flex justify-between items-center mb-4">
// // //           <h2 className="text-xl font-semibold">
// // //             {selectedDate.toLocaleDateString('ar-SA', { month: 'long', year: 'numeric' })}
// // //           </h2>
// // //           <div>
// // //             <button 
// // //               onClick={() => setSelectedDate(new Date(currentYear, currentMonth - 1, 1))}
// // //               className="p-2 mx-1 bg-gray-100 rounded hover:bg-gray-200">
// // //               السابق
// // //             </button>
// // //             <button 
// // //               onClick={() => setSelectedDate(new Date(currentYear, currentMonth + 1, 1))}
// // //               className="p-2 mx-1 bg-gray-100 rounded hover:bg-gray-200">
// // //               التالي
// // //             </button>
// // //           </div>
// // //         </div>
        
// // //         <div className="grid grid-cols-7 gap-1 mb-2 text-center">
// // //           {['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'].map(day => (
// // //             <div key={day} className="font-medium text-sm py-2 bg-gray-50">
// // //               {day}
// // //             </div>
// // //           ))}
// // //         </div>
        
// // //         <div className="grid grid-cols-7 gap-1">
// // //           {/* فراغات لبداية الشهر */}
// // //           {Array.from({ length: daysInMonth[0].getDay() }).map((_, index) => (
// // //             <div key={`empty-${index}`} className="h-20 border bg-gray-50"></div>
// // //           ))}
          
// // //           {/* أيام الشهر */}
// // //           {daysInMonth.map(day => {
// // //             const dayAppointments = getAppointmentsForDate(day);
// // //             const isToday = day.toDateString() === new Date().toDateString();
            
// // //             return (
// // //               <div 
// // //                 key={day.toString()} 
// // //                 className={`h-20 border p-1 ${isToday ? 'bg-blue-50 border-blue-300' : ''}`}
// // //                 onClick={() => setSelectedDate(new Date(day))}
// // //               >
// // //                 <div className="flex justify-between">
// // //                   <span className={`text-sm font-medium ${isToday ? 'text-blue-600' : ''}`}>
// // //                     {day.getDate()}
// // //                   </span>
// // //                   {dayAppointments.length > 0 && (
// // //                     <span className="text-xs bg-blue-500 text-white px-1 rounded-full">
// // //                       {dayAppointments.length}
// // //                     </span>
// // //                   )}
// // //                 </div>
// // //                 <div className="mt-1">
// // //                   {dayAppointments.slice(0, 2).map(apt => (
// // //                     <div key={apt.id} className="text-xs truncate bg-blue-100 mb-1 p-1 rounded">
// // //                       {apt.time.split(' ')[1]} - {apt.patient}
// // //                     </div>
// // //                   ))}
// // //                   {dayAppointments.length > 2 && (
// // //                     <div className="text-xs text-gray-500">+{dayAppointments.length - 2} المزيد</div>
// // //                   )}
// // //                 </div>
// // //               </div>
// // //             );
// // //           })}
// // //         </div>
        
// // //         {/* مواعيد اليوم المحدد */}
// // //         <div className="mt-4">
// // //           <h3 className="font-medium text-lg mb-2">
// // //             مواعيد {selectedDate.toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
// // //           </h3>
// // //           <div className="divide-y">
// // //             {getAppointmentsForDate(selectedDate).map(apt => (
// // //               <div key={apt.id} className="py-2 flex justify-between items-center">
// // //                 <div>
// // //                   <span className="font-medium">{apt.time.split(' ')[1]}</span> - {apt.patient}
// // //                 </div>
// // //                 <button 
// // //                   onClick={() => handleViewAppointment(apt)} 
// // //                   className="text-[#415A80] hover:text-[#374E70] text-sm">
// // //                   عرض التفاصيل
// // //                 </button>
// // //               </div>
// // //             ))}
// // //             {getAppointmentsForDate(selectedDate).length === 0 && (
// // //               <div className="py-2 text-gray-500 text-center">لا توجد مواعيد لهذا اليوم</div>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   };

// // //   const renderPatientDetails = () => {
// // //     if (!selectedAppointment) return null;
    
// // //     return (
// // //       <div className="bg-white rounded-lg shadow">
// // //         <div className="p-4 border-b">
// // //           <div className="flex justify-between items-center">
// // //             <h2 className="text-xl font-semibold">تفاصيل الموعد</h2>
// // //             <button 
// // //               onClick={() => setView('list')}
// // //               className="text-gray-500 hover:text-gray-700">
// // //               العودة إلى القائمة
// // //             </button>
// // //           </div>
// // //         </div>
        
// // //         <div className="p-4">
// // //           <div className="bg-blue-50 p-4 rounded-lg mb-4">
// // //             <h3 className="text-lg font-medium mb-2">معلومات الموعد</h3>
// // //             <div className="grid grid-cols-2 gap-4">
// // //               <div>
// // //                 <p className="text-gray-500 text-sm">رقم الموعد</p>
// // //                 <p className="font-medium">{selectedAppointment.id}</p>
// // //               </div>
// // //               <div>
// // //                 <p className="text-gray-500 text-sm">التاريخ والوقت</p>
// // //                 <p className="font-medium">{selectedAppointment.time}</p>
// // //               </div>
// // //               <div>
// // //                 <p className="text-gray-500 text-sm">الحالة</p>
// // //                 <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${selectedAppointment.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
// // //                   {selectedAppointment.status}
// // //                 </span>
// // //               </div>
// // //               <div>
// // //                 <p className="text-gray-500 text-sm">سبب الزيارة</p>
// // //                 <p className="font-medium">{selectedAppointment.details.reason}</p>
// // //               </div>
// // //             </div>
// // //           </div>
          
// // //           <h3 className="text-lg font-medium mb-2">معلومات المريض</h3>
// // //           <div className="overflow-x-auto">
// // //             <table className="w-full">
// // //               <tbody className="divide-y divide-gray-100">
// // //                 <tr>
// // //                   <td className="py-3 px-4 bg-gray-50 font-medium text-gray-700">الاسم</td>
// // //                   <td className="py-3 px-4">{selectedAppointment.patient}</td>
// // //                 </tr>
// // //                 <tr>
// // //                   <td className="py-3 px-4 bg-gray-50 font-medium text-gray-700">العمر</td>
// // //                   <td className="py-3 px-4">{selectedAppointment.details.age} سنة</td>
// // //                 </tr>
// // //                 <tr>
// // //                   <td className="py-3 px-4 bg-gray-50 font-medium text-gray-700">الجنس</td>
// // //                   <td className="py-3 px-4">{selectedAppointment.details.gender}</td>
// // //                 </tr>
// // //                 <tr>
// // //                   <td className="py-3 px-4 bg-gray-50 font-medium text-gray-700">رقم الهاتف</td>
// // //                   <td className="py-3 px-4">{selectedAppointment.details.phone}</td>
// // //                 </tr>
// // //                 <tr>
// // //                   <td className="py-3 px-4 bg-gray-50 font-medium text-gray-700">البريد الإلكتروني</td>
// // //                   <td className="py-3 px-4">{selectedAppointment.details.email}</td>
// // //                 </tr>
// // //                 <tr>
// // //                   <td className="py-3 px-4 bg-gray-50 font-medium text-gray-700">العنوان</td>
// // //                   <td className="py-3 px-4">{selectedAppointment.details.address}</td>
// // //                 </tr>
// // //                 <tr>
// // //                   <td className="py-3 px-4 bg-gray-50 font-medium text-gray-700">التأمين الصحي</td>
// // //                   <td className="py-3 px-4">{selectedAppointment.details.insurance}</td>
// // //                 </tr>
// // //                 <tr>
// // //                   <td className="py-3 px-4 bg-gray-50 font-medium text-gray-700">التاريخ الطبي</td>
// // //                   <td className="py-3 px-4">{selectedAppointment.details.medicalHistory}</td>
// // //                 </tr>
// // //               </tbody>
// // //             </table>
// // //           </div>
          
// // //           <div className="mt-6 flex space-x-4 rtl:space-x-reverse">
// // //             <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
// // //               <FaPencilAlt className="inline mr-2" /> تعديل الموعد
// // //             </button>
// // //             <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
// // //               <FaTrash className="inline mr-2" /> إلغاء الموعد
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   };

// // //   return (
// // //     <div className="flex bg-[#D7E2E9] bg-opacity-20 min-h-screen">
// // //       {/* SidebarDoctor يمكننا إلغاء التعليق عليه إذا كنت بحاجة إلى شريط جانبي */}
// // //       {/* <SidebarDoctor isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} /> */}
      
// // //       <div className="flex-1 p-6">
// // //         <header className="px-6 py-4 flex items-center justify-between bg-white rounded-lg shadow">
// // //           <h1 className="text-2xl font-semibold text-gray-800">المواعيد</h1>
// // //           <div className="flex space-x-4 rtl:space-x-reverse">
// // //             <button 
// // //               onClick={() => setView('list')}
// // //               className={`px-4 py-2 rounded-md ${view === 'list' ? 'bg-[#415A80] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
// // //               قائمة المواعيد
// // //             </button>
// // //             <button 
// // //               onClick={() => setView('calendar')}
// // //               className={`px-4 py-2 rounded-md ${view === 'calendar' ? 'bg-[#415A80] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
// // //               <FaCalendarAlt className="inline mr-2" />
// // //               التقويم
// // //             </button>
// // //             <button className="bg-[#415A80] text-white px-4 py-2 rounded-md hover:bg-[#374E70]">
// // //               <FaPlusCircle className="inline mr-2" />
// // //               إضافة موعد جديد
// // //             </button>
// // //           </div>
// // //         </header>

// // //         {/* البحث والتصفية */}
// // //         <div className="mt-6 bg-white p-4 rounded-lg shadow">
// // //           <div className="flex flex-wrap gap-4">
// // //             <div className="flex-1">
// // //               <div className="relative">
// // //                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// // //                   <FaSearch className="text-gray-400" />
// // //                 </div>
// // //                 <input
// // //                   type="text"
// // //                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
// // //                   placeholder="البحث عن موعد أو مريض..."
// // //                 />
// // //               </div>
// // //             </div>
// // //             <div className="flex space-x-2 rtl:space-x-reverse">
// // //               <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200">
// // //                 <FaFilter className="inline mr-2" />
// // //                 تصفية
// // //               </button>
// // //               <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200">
// // //                 <FaDownload className="inline mr-2" />
// // //                 تصدير
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* المحتوى الرئيسي */}
// // //         <div className="mt-6">
// // //           {loading ? (
// // //             <div className="flex justify-center items-center mt-6">
// // //               <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-transparent border-solid border-[#374E70]" role="status"></div>
// // //             </div>
// // //           ) : (
// // //             <>
// // //               {view === 'list' && renderAppointmentsTable()}
// // //               {view === 'calendar' && renderCalendar()}
// // //               {view === 'details' && renderPatientDetails()}
// // //             </>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // 'use client';
// // // import { useState, useEffect } from 'react';
// // // import { FaSearch, FaPlusCircle, FaFilter, FaDownload, FaEye, FaPencilAlt, FaTrash, FaCalendarAlt } from 'react-icons/fa';
// // // import Link from 'next/link';
// // // import axios from 'axios';  // Make sure to use axios to handle API requests

// // // export default function Appointments() {
// // //   const [isCollapsed, setIsCollapsed] = useState(false);
// // //   const [appointments, setAppointments] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [selectedDate, setSelectedDate] = useState(new Date());
// // //   const [selectedAppointment, setSelectedAppointment] = useState(null);
// // //   const [view, setView] = useState('list'); // 'list', 'calendar', 'details'

// // //   const toggleSidebar = () => {
// // //     setIsCollapsed(!isCollapsed);
// // //   };

// // //   // Simulate fetching data from API
// // //   useEffect(() => {
// // //     // Normally, you will fetch data from your API
// // //     const fetchAppointments = async () => {
// // //       setLoading(true);
// // //       try {
// // //         // Fetch appointments for this specific doctor
// // //         const response = await axios.get('/api/appointments');
// // //         setAppointments(response.data);
// // //       } catch (error) {
// // //         console.error('Error fetching appointments', error);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchAppointments();
// // //   }, []);

// // //   const handleViewAppointment = (appointment) => {
// // //     setSelectedAppointment(appointment);
// // //     setView('details');
// // //   };

// // //   const handleDeleteAppointment = async (id) => {
// // //     try {
// // //       await axios.delete(`/api/appointments/${id}`);
// // //       setAppointments(appointments.filter(appointment => appointment.id !== id));
// // //     } catch (error) {
// // //       console.error('Error deleting appointment', error);
// // //     }
// // //   };

// // //   // Function to get the days in the current month
// // //   const getDaysInMonth = (year, month) => {
// // //     const date = new Date(year, month, 1);
// // //     const days = [];
// // //     while (date.getMonth() === month) {
// // //       days.push(new Date(date));
// // //       date.setDate(date.getDate() + 1);
// // //     }
// // //     return days;
// // //   };

// // //   // Get the current month and year
// // //   const currentMonth = selectedDate.getMonth();
// // //   const currentYear = selectedDate.getFullYear();
// // //   const daysInMonth = getDaysInMonth(currentYear, currentMonth);

// // //   // Get appointments for the selected date
// // //   const getAppointmentsForDate = (date) => {
// // //     const dateString = date.toISOString().split('T')[0];
// // //     return appointments.filter(appointment => {
// // //       const appointmentDate = appointment.time.split(' ')[0];
// // //       return appointmentDate === dateString;
// // //     });
// // //   };

// // //   const renderAppointmentsTable = () => {
// // //     return (
// // //       <div className="overflow-x-auto">
// // //         <table className="w-full">
// // //           <thead className="bg-[#415A80] text-white text-sm">
// // //             <tr>
// // //               <th className="py-3 px-6 text-left">Appointment ID</th>
// // //               <th className="py-3 px-6 text-left">Patient Name</th>
// // //               <th className="py-3 px-6 text-left">Time</th>
// // //               <th className="py-3 px-6 text-left">Status</th>
// // //               <th className="py-3 px-6 text-left">Actions</th>
// // //             </tr>
// // //           </thead>
// // //           <tbody className="divide-y divide-gray-100">
// // //             {appointments.map((appointment) => (
// // //               <tr key={appointment.id} className="hover:bg-[#D7E2E9] hover:bg-opacity-20">
// // //                 <td className="py-4 px-6 font-medium text-[#415A80]">{appointment.id}</td>
// // //                 <td className="py-4 px-6 font-medium text-gray-900">{appointment.patient}</td>
// // //                 <td className="py-4 px-6 text-gray-600">{appointment.time}</td>
// // //                 <td className="py-4 px-6">
// // //                   <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${appointment.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
// // //                     {appointment.status}
// // //                   </span>
// // //                 </td>
// // //                 <td className="py-4 px-6">
// // //                   <button 
// // //                     onClick={() => handleViewAppointment(appointment)} 
// // //                     className="text-[#415A80] hover:text-[#374E70] text-sm font-medium mr-3">
// // //                     <FaEye className="inline mr-1" /> View Details
// // //                   </button>
// // //                   <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-3">
// // //                     <FaPencilAlt className="inline mr-1" /> Edit
// // //                   </button>
// // //                   <button onClick={() => handleDeleteAppointment(appointment.id)} className="text-red-600 hover:text-red-800 text-sm font-medium">
// // //                     <FaTrash className="inline mr-1" /> Delete
// // //                   </button>
// // //                 </td>
// // //               </tr>
// // //             ))}
// // //           </tbody>
// // //         </table>
// // //       </div>
// // //     );
// // //   };

// // //   return (
// // //     <div className="flex bg-[#D7E2E9] bg-opacity-20 min-h-screen">
// // //       <div className="flex-1 p-6">
// // //         <header className="px-6 py-4 flex items-center justify-between bg-white rounded-lg shadow">
// // //           <h1 className="text-2xl font-semibold text-gray-800">Appointments</h1>
// // //           <div className="flex space-x-4 rtl:space-x-reverse">
// // //             <button 
// // //               onClick={() => setView('list')}
// // //               className={`px-4 py-2 rounded-md ${view === 'list' ? 'bg-[#415A80] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
// // //               Appointment List
// // //             </button>
// // //             <button 
// // //               onClick={() => setView('calendar')}
// // //               className={`px-4 py-2 rounded-md ${view === 'calendar' ? 'bg-[#415A80] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
// // //               <FaCalendarAlt className="inline mr-2" />
// // //               Calendar View
// // //             </button>
// // //             <button className="bg-[#415A80] text-white px-4 py-2 rounded-md hover:bg-[#374E70]">
// // //               <FaPlusCircle className="inline mr-2" />
// // //               Add New Appointment
// // //             </button>
// // //           </div>
// // //         </header>

// // //         {/* Main Content */}
// // //         <div className="mt-6">
// // //           {loading ? (
// // //             <div className="flex justify-center items-center mt-6">
// // //               <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-transparent border-solid border-[#374E70]" role="status"></div>
// // //             </div>
// // //           ) : (
// // //             <>
// // //               {view === 'list' && renderAppointmentsTable()}
// // //             </>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // // 'use client';
// // // import { useState, useEffect } from 'react';
// // // import { FaSearch, FaPlusCircle, FaFilter, FaDownload, FaEye, FaPencilAlt, FaTrash, FaCalendarAlt } from 'react-icons/fa';
// // // import Link from 'next/link';
// // // import axios from 'axios';  // Make sure to use axios to handle API requests

// // // export default function appointments() {
// // //   const [isCollapsed, setIsCollapsed] = useState(false);
// // //   const [appointments, setAppointments] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [selectedDate, setSelectedDate] = useState(new Date());
// // //   const [selectedAppointment, setSelectedAppointment] = useState(null);
// // //   const [view, setView] = useState('list'); // 'list', 'calendar', 'details'

// // //   const toggleSidebar = () => {
// // //     setIsCollapsed(!isCollapsed);
// // //   };

// // //   // Simulate fetching data from API
// // //   useEffect(() => {
// // //     // Normally, you will fetch data from your API
// // //     const fetchAppointments = async () => {
// // //       setLoading(true);
// // //       try {
// // //         // Fetch appointments for this specific doctor
// // //         const response = await axios.get('/api/doctorDashboard/appointments');
// // //         setAppointments(response.data);
// // //       } catch (error) {
// // //         console.error('Error fetching appointments', error);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchAppointments();
// // //   }, []);

// // //   const handleViewAppointment = (appointment) => {
// // //     setSelectedAppointment(appointment);
// // //     setView('details');
// // //   };

// // //   const handleDeleteAppointment = async (id) => {
// // //     try {
// // //       await axios.delete(`/api/doctorDashboard/appointments/${id}`);
// // //       setAppointments(appointments.filter(appointment => appointment.id !== id));
// // //     } catch (error) {
// // //       console.error('Error deleting appointment', error);
// // //     }
// // //   };

// // //   // Function to get the days in the current month
// // //   const getDaysInMonth = (year, month) => {
// // //     const date = new Date(year, month, 1);
// // //     const days = [];
// // //     while (date.getMonth() === month) {
// // //       days.push(new Date(date));
// // //       date.setDate(date.getDate() + 1);
// // //     }
// // //     return days;
// // //   };

// // //   // Get the current month and year
// // //   const currentMonth = selectedDate.getMonth();
// // //   const currentYear = selectedDate.getFullYear();
// // //   const daysInMonth = getDaysInMonth(currentYear, currentMonth);

// // //   // Get appointments for the selected date
// // //   const getAppointmentsForDate = (date) => {
// // //     const dateString = date.toISOString().split('T')[0];
// // //     return appointments.filter(appointment => {
// // //       const appointmentDate = appointment.time.split(' ')[0];
// // //       return appointmentDate === dateString;
// // //     });
// // //   };

// // //   const renderAppointmentsTable = () => {
// // //     return (
// // //       <div className="overflow-x-auto">
// // //         <table className="w-full">
// // //           <thead className="bg-[#415A80] text-white text-sm">
// // //             <tr>
// // //               <th className="py-3 px-6 text-left">Appointment ID</th>
// // //               <th className="py-3 px-6 text-left">Patient Name</th>
// // //               <th className="py-3 px-6 text-left">Time</th>
// // //               <th className="py-3 px-6 text-left">Status</th>
// // //               <th className="py-3 px-6 text-left">Actions</th>
// // //             </tr>
// // //           </thead>
// // //           <tbody className="divide-y divide-gray-100">
// // //             {appointments.map((appointment) => (
// // //               <tr key={appointment.id} className="hover:bg-[#D7E2E9] hover:bg-opacity-20">
// // //                 <td className="py-4 px-6 font-medium text-[#415A80]">{appointment.id}</td>
// // //                 <td className="py-4 px-6 font-medium text-gray-900">{appointment.patient}</td>
// // //                 <td className="py-4 px-6 text-gray-600">{appointment.time}</td>
// // //                 <td className="py-4 px-6">
// // //                   <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${appointment.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
// // //                     {appointment.status}
// // //                   </span>
// // //                 </td>
// // //                 <td className="py-4 px-6">
// // //                   <button 
// // //                     onClick={() => handleViewAppointment(appointment)} 
// // //                     className="text-[#415A80] hover:text-[#374E70] text-sm font-medium mr-3">
// // //                     <FaEye className="inline mr-1" /> View Details
// // //                   </button>
// // //                   <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-3">
// // //                     <FaPencilAlt className="inline mr-1" /> Edit
// // //                   </button>
// // //                   <button onClick={() => handleDeleteAppointment(appointment.id)} className="text-red-600 hover:text-red-800 text-sm font-medium">
// // //                     <FaTrash className="inline mr-1" /> Delete
// // //                   </button>
// // //                 </td>
// // //               </tr>
// // //             ))}
// // //           </tbody>
// // //         </table>
// // //       </div>
// // //     );
// // //   };

// // //   return (
// // //     <div className="flex bg-[#D7E2E9] bg-opacity-20 min-h-screen">
// // //       <div className="flex-1 p-6">
// // //         <header className="px-6 py-4 flex items-center justify-between bg-white rounded-lg shadow">
// // //           <h1 className="text-2xl font-semibold text-gray-800">Appointments</h1>
// // //           <div className="flex space-x-4 rtl:space-x-reverse">
// // //             <button 
// // //               onClick={() => setView('list')}
// // //               className={`px-4 py-2 rounded-md ${view === 'list' ? 'bg-[#415A80] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
// // //               Appointment List
// // //             </button>
// // //             <button 
// // //               onClick={() => setView('calendar')}
// // //               className={`px-4 py-2 rounded-md ${view === 'calendar' ? 'bg-[#415A80] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
// // //               <FaCalendarAlt className="inline mr-2" />
// // //               Calendar View
// // //             </button>
// // //             <button className="bg-[#415A80] text-white px-4 py-2 rounded-md hover:bg-[#374E70]">
// // //               <FaPlusCircle className="inline mr-2" />
// // //               Add New Appointment
// // //             </button>
// // //           </div>
// // //         </header>

// // //         {/* Main Content */}
// // //         <div className="mt-6">
// // //           {loading ? (
// // //             <div className="flex justify-center items-center mt-6">
// // //               <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-transparent border-solid border-[#374E70]" role="status"></div>
// // //             </div>
// // //           ) : (
// // //             <>
// // //               {view === 'list' && renderAppointmentsTable()}
// // //             </>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // 'use client'
// // import { useState, useEffect } from 'react';
// // import { FaSearch, FaPlusCircle, FaFilter, FaDownload, FaEye, FaPencilAlt, FaTrash, FaCalendarAlt } from 'react-icons/fa';
// // import Link from 'next/link';

// // export default function Appointments() {
// //   const [isCollapsed, setIsCollapsed] = useState(false);
// //   const [appointments, setAppointments] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [selectedDate, setSelectedDate] = useState(new Date());
// //   const [selectedAppointment, setSelectedAppointment] = useState(null);
// //   const [view, setView] = useState('list'); // 'list', 'calendar', 'details'

// //   const toggleSidebar = () => {
// //     setIsCollapsed(!isCollapsed);
// //   };

// //   // Simulate fetching data from API
// //   useEffect(() => {
// //     // This data would normally come from an API
// //     const fetchAppointments = async () => {
// //       setLoading(true);
// //       // Simulate fetching data (could be an API endpoint here)
// //       const response = [
// //         { 
// //           id: 'A-001', 
// //           patient: 'Emma Wilson', 
// //           time: '2025-04-07 09:30', 
// //           status: 'Scheduled',
// //           details: {
// //             age: 32,
// //             gender: 'Female',
// //             phone: '+1 (555) 123-4567',
// //             email: 'emma.wilson@example.com',
// //             address: '123 Main St, New York, NY',
// //             insurance: 'BlueCross',
// //             medicalHistory: 'Hypertension, Penicillin allergy',
// //             reason: 'Routine check-up'
// //           }
// //         },
// //         { 
// //           id: 'A-002', 
// //           patient: 'John Miller', 
// //           time: '2025-04-07 11:00', 
// //           status: 'Confirmed',
// //           details: {
// //             age: 45,
// //             gender: 'Male',
// //             phone: '+1 (555) 987-6543',
// //             email: 'john.miller@example.com',
// //             address: '456 Oak Ave, Boston, MA',
// //             insurance: 'Aetna',
// //             medicalHistory: 'Diabetes, High cholesterol',
// //             reason: 'Chest pain'
// //           }
// //         },
// //         { 
// //           id: 'A-003', 
// //           patient: 'Sophia Thomas', 
// //           time: '2025-04-08 02:15', 
// //           status: 'Scheduled',
// //           details: {
// //             age: 28,
// //             gender: 'Female',
// //             phone: '+1 (555) 456-7890',
// //             email: 'sophia.thomas@example.com',
// //             address: '789 Pine Rd, Chicago, IL',
// //             insurance: 'UnitedHealth',
// //             medicalHistory: 'None',
// //             reason: 'Persistent headache for a week'
// //           }
// //         },
// //       ];
// //       setAppointments(response);
// //       setLoading(false);
// //     };
// //     fetchAppointments();
// //   }, []);

// //   const handleViewAppointment = (appointment) => {
// //     setSelectedAppointment(appointment);
// //     setView('details');
// //   };

// //   // Function to get the days in the current month
// //   const getDaysInMonth = (year, month) => {
// //     const date = new Date(year, month, 1);
// //     const days = [];
// //     while (date.getMonth() === month) {
// //       days.push(new Date(date));
// //       date.setDate(date.getDate() + 1);
// //     }
// //     return days;
// //   };

// //   // Get the current month and year
// //   const currentMonth = selectedDate.getMonth();
// //   const currentYear = selectedDate.getFullYear();
// //   const daysInMonth = getDaysInMonth(currentYear, currentMonth);

// //   // Get appointments for the selected date
// //   const getAppointmentsForDate = (date) => {
// //     const dateString = date.toISOString().split('T')[0];
// //     return appointments.filter(appointment => {
// //       const appointmentDate = appointment.time.split(' ')[0];
// //       return appointmentDate === dateString;
// //     });
// //   };

// //   const renderAppointmentsTable = () => {
// //     return (
// //       <div className="overflow-x-auto">
// //         <table className="w-full">
// //           <thead className="bg-[#415A80] text-white text-sm">
// //             <tr>
// //               <th className="py-3 px-6 text-left">Appointment ID</th>
// //               <th className="py-3 px-6 text-left">Patient Name</th>
// //               <th className="py-3 px-6 text-left">Time</th>
// //               <th className="py-3 px-6 text-left">Status</th>
// //               <th className="py-3 px-6 text-left">Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody className="divide-y divide-gray-100">
// //             {appointments.map((appointment) => (
// //               <tr key={appointment.id} className="hover:bg-[#D7E2E9] hover:bg-opacity-20">
// //                 <td className="py-4 px-6 font-medium text-[#415A80]">{appointment.id}</td>
// //                 <td className="py-4 px-6 font-medium text-gray-900">{appointment.patient}</td>
// //                 <td className="py-4 px-6 text-gray-600">{appointment.time}</td>
// //                 <td className="py-4 px-6">
// //                   <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${appointment.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
// //                     {appointment.status}
// //                   </span>
// //                 </td>
// //                 <td className="py-4 px-6">
// //                   <button 
// //                     onClick={() => handleViewAppointment(appointment)} 
// //                     className="text-[#415A80] hover:text-[#374E70] text-sm font-medium mr-3">
// //                     <FaEye className="inline mr-1" /> View Details
// //                   </button>
// //                   <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-3">
// //                     <FaPencilAlt className="inline mr-1" /> Edit
// //                   </button>
// //                   <button className="text-red-600 hover:text-red-800 text-sm font-medium">
// //                     <FaTrash className="inline mr-1" /> Delete
// //                   </button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     );
// //   };

//   // const renderCalendar = () => {
//   //   return (
//   //     <div className="bg-white rounded-lg shadow p-4">
//   //       <div className="flex justify-between items-center mb-4">
//   //         <h2 className="text-xl font-semibold">
//   //           {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
//   //         </h2>
//   //         <div>
//   //           <button 
//   //             onClick={() => setSelectedDate(new Date(currentYear, currentMonth - 1, 1))}
//   //             className="p-2 mx-1 bg-gray-100 rounded hover:bg-gray-200">
//   //             Previous
//   //           </button>
//   //           <button 
//   //             onClick={() => setSelectedDate(new Date(currentYear, currentMonth + 1, 1))}
//   //             className="p-2 mx-1 bg-gray-100 rounded hover:bg-gray-200">
//   //             Next
//   //           </button>
//   //         </div>
//   //       </div>
        
//   //       <div className="grid grid-cols-7 gap-1 mb-2 text-center">
//   //         {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
//   //           <div key={day} className="font-medium text-sm py-2 bg-gray-50">
//   //             {day}
//   //           </div>
//   //         ))}
//   //       </div>
        
//   //       <div className="grid grid-cols-7 gap-1">
//   //         {/* Empty spaces for the start of the month */}
//   //         {Array.from({ length: daysInMonth[0].getDay() }).map((_, index) => (
//   //           <div key={`empty-${index}`} className="h-20 border bg-gray-50"></div>
//   //         ))}
          
//   //         {/* Days of the month */}
//   //         {daysInMonth.map(day => {
//   //           const dayAppointments = getAppointmentsForDate(day);
//   //           const isToday = day.toDateString() === new Date().toDateString();
            
//   //           return (
//   //             <div 
//   //               key={day.toString()} 
//   //               className={`h-20 border p-1 ${isToday ? 'bg-blue-50 border-blue-300' : ''}`}
//   //               onClick={() => setSelectedDate(new Date(day))}
//   //             >
//   //               <div className="flex justify-between">
//   //                 <span className={`text-sm font-medium ${isToday ? 'text-blue-600' : ''}`}>
//   //                   {day.getDate()}
//   //                 </span>
//   //                 {dayAppointments.length > 0 && (
//   //                   <span className="text-xs bg-blue-500 text-white px-1 rounded-full">
//   //                     {dayAppointments.length}
//   //                   </span>
//   //                 )}
//   //               </div>
//   //               <div className="mt-1">
//   //                 {dayAppointments.slice(0, 2).map(apt => (
//   //                   <div key={apt.id} className="text-xs truncate bg-blue-100 mb-1 p-1 rounded">
//   //                     {apt.time.split(' ')[1]} - {apt.patient}
//   //                   </div>
//   //                 ))}
//   //                 {dayAppointments.length > 2 && (
//   //                   <div className="text-xs text-gray-500">+{dayAppointments.length - 2} more</div>
//   //                 )}
//   //               </div>
//   //             </div>
//   //           );
//   //         })}
//   //       </div>
        
//   //       {/* Appointments for the selected day */}
//   //       <div className="mt-4">
//   //         <h3 className="font-medium text-lg mb-2">
//   //           Appointments for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
//   //         </h3>
//   //         <div className="divide-y">
//   //           {getAppointmentsForDate(selectedDate).map(apt => (
//   //             <div key={apt.id} className="py-2 flex justify-between items-center">
//   //               <div>
//   //                 <span className="font-medium">{apt.time.split(' ')[1]}</span> - {apt.patient}
//   //               </div>
//   //               <button 
//   //                 onClick={() => handleViewAppointment(apt)} 
//   //                 className="text-[#415A80] hover:text-[#374E70] text-sm">
//   //                 View Details
//   //               </button>
//   //             </div>
//   //           ))}
//   //           {getAppointmentsForDate(selectedDate).length === 0 && (
//   //             <div className="py-2 text-gray-500 text-center">No appointments for this day</div>
//   //           )}
//   //         </div>
//   //       </div>
//   //     </div>
//   //   );
//   // };

// //   const renderPatientDetails = () => {
// //     if (!selectedAppointment) return null;
    
// //     return (
// //       <div className="bg-white rounded-lg shadow">
// //         <div className="p-4 border-b">
// //           <div className="flex justify-between items-center">
// //             <h2 className="text-xl font-semibold">Appointment Details</h2>
// //             <button 
// //               onClick={() => setView('list')}
// //               className="text-gray-500 hover:text-gray-700">
// //               Back to List
// //             </button>
// //           </div>
// //         </div>
        
// //         <div className="p-4">
// //           <div className="bg-blue-50 p-4 rounded-lg mb-4">
// //             <h3 className="text-lg font-medium mb-2">Appointment Information</h3>
// //             <div className="grid grid-cols-2 gap-4">
// //               <div>
// //                 <p className="text-gray-500 text-sm">Appointment ID</p>
// //                 <p className="font-medium">{selectedAppointment.id}</p>
// //               </div>
// //               <div>
// //                 <p className="text-gray-500 text-sm">Date & Time</p>
// //                 <p className="font-medium">{selectedAppointment.time}</p>
// //               </div>
// //               <div>
// //                 <p className="text-gray-500 text-sm">Status</p>
// //                 <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${selectedAppointment.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
// //                   {selectedAppointment.status}
// //                 </span>
// //               </div>
// //               <div>
// //                 <p className="text-gray-500 text-sm">Reason for Visit</p>
// //                 <p className="font-medium">{selectedAppointment.details.reason}</p>
// //               </div>
// //             </div>
// //           </div>
          
// //           <h3 className="text-lg font-medium mb-2">Patient Information</h3>
// //           <div className="overflow-x-auto">
// //             <table className="w-full">
// //               <tbody className="divide-y divide-gray-100">
// //                 <tr>
// //                   <td className="py-3 px-4 bg-gray-50 font-medium text-gray-700">Name</td>
// //                   <td className="py-3 px-4">{selectedAppointment.patient}</td>
// //                 </tr>
// //                 <tr>
// //                   <td className="py-3 px-4 bg-gray-50 font-medium text-gray-700">Age</td>
// //                   <td className="py-3 px-4">{selectedAppointment.details.age} years</td>
// //                 </tr>
// //                 <tr>
// //                   <td className="py-3 px-4 bg-gray-50 font-medium text-gray-700">Gender</td>
// //                   <td className="py-3 px-4">{selectedAppointment.details.gender}</td>
// //                 </tr>
// //                 <tr>
// //                   <td className="py-3 px-4 bg-gray-50 font-medium text-gray-700">Phone</td>
// //                   <td className="py-3 px-4">{selectedAppointment.details.phone}</td>
// //                 </tr>
// //                 <tr>
// //                   <td className="py-3 px-4 bg-gray-50 font-medium text-gray-700">Email</td>
// //                   <td className="py-3 px-4">{selectedAppointment.details.email}</td>
// //                 </tr>
// //                 <tr>
// //                   <td className="py-3 px-4 bg-gray-50 font-medium text-gray-700">Address</td>
// //                   <td className="py-3 px-4">{selectedAppointment.details.address}</td>
// //                 </tr>
// //                 <tr>
// //                   <td className="py-3 px-4 bg-gray-50 font-medium text-gray-700">Insurance</td>
// //                   <td className="py-3 px-4">{selectedAppointment.details.insurance}</td>
// //                 </tr>
// //                 <tr>
// //                   <td className="py-3 px-4 bg-gray-50 font-medium text-gray-700">Medical History</td>
// //                   <td className="py-3 px-4">{selectedAppointment.details.medicalHistory}</td>
// //                 </tr>
// //               </tbody>
// //             </table>
// //           </div>
          
// //           <div className="mt-6 flex space-x-4 rtl:space-x-reverse">
// //             <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
// //               <FaPencilAlt className="inline mr-2" /> Edit Appointment
// //             </button>
// //             <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
// //               <FaTrash className="inline mr-2" /> Cancel Appointment
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   };

// //   return (
// //     <div className="flex bg-[#D7E2E9] bg-opacity-20 min-h-screen">
// //       {/* SidebarDoctor can be enabled if needed */}
// //       {/* <SidebarDoctor isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} /> */}
      
// //       <div className="flex-1 p-6">
// //         <header className="px-6 py-4 flex items-center justify-between bg-white rounded-lg shadow">
// //           <h1 className="text-2xl font-semibold text-gray-800">Appointments</h1>
// //           <div className="flex space-x-4 rtl:space-x-reverse">
// //             <button 
// //               onClick={() => setView('list')}
// //               className={`px-4 py-2 rounded-md ${view === 'list' ? 'bg-[#415A80] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
// //               Appointment List
// //             </button>
// //             <button 
// //               onClick={() => setView('calendar')}
// //               className={`px-4 py-2 rounded-md ${view === 'calendar' ? 'bg-[#415A80] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
// //               <FaCalendarAlt className="inline mr-2" />
// //               Calendar View
// //             </button>
// //             <button className="bg-[#415A80] text-white px-4 py-2 rounded-md hover:bg-[#374E70]">
// //               <FaPlusCircle className="inline mr-2" />
// //               Add New Appointment
// //             </button>
// //           </div>
// //         </header>

// //         {/* Search and Filter */}
// //         <div className="mt-6 bg-white p-4 rounded-lg shadow">
// //           <div className="flex flex-wrap gap-4">
// //             <div className="flex-1">
// //               <div className="relative">
// //                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                   <FaSearch className="text-gray-400" />
// //                 </div>
// //                 <input
// //                   type="text"
// //                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
// //                   placeholder="Search by appointment or patient..."
// //                 />
// //               </div>
// //             </div>
// //             <div className="flex space-x-2 rtl:space-x-reverse">
// //               <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200">
// //                 <FaFilter className="inline mr-2" />
// //                 Filter
// //               </button>
// //               <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200">
// //                 <FaDownload className="inline mr-2" />
// //                 Export
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Main Content */}
// //         <div className="mt-6">
// //           {loading ? (
// //             <div className="flex justify-center items-center mt-6">
// //               <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-transparent border-solid border-[#374E70]" role="status"></div>
// //             </div>
// //           ) : (
// //             <>
// //               {view === 'list' && renderAppointmentsTable()}
// //               {view === 'calendar' && renderCalendar()}
// //               {view === 'details' && renderPatientDetails()}
// //             </>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// 'use client'
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function DoctorDashboardPatients() {
//   const [bookings, setBookings] = useState([]);
//   const [statusOptions] = useState(["all", "pending", "approved", "rejected", "completed"]);
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
//                       <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.status)}`}>
//                         {booking.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
//                       {booking.reason}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-center">
//                       <select
//                         className="border border-gray-300 rounded-md px-3 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         onChange={(e) => handleStatusChange(booking._id, e.target.value)}
//                         value={booking.status}
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
'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// استخدم مكتبة لمساعدة في تواريخ مثل dayjs أو date-fns إن أحببت، 
// لكن هنا سنكتفي بالجافاسكربت المدمج.

function DoctorDashboardPatients() {
  const [bookings, setBookings] = useState([]);
  const [statusOptions] = useState(["all", "pending", "approved", "rejected", "completed"]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  // سنضيف حالات للتحكم في التقويم
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // نستخدم هذه الحالات لتحديد الشهر/السنة المعروضين بالتقويم
  const currentMonth = selectedDate.getMonth();   // 0 - 11
  const currentYear = selectedDate.getFullYear(); // ex: 2025

  // ----------------------------------------------------------------
  //                  1) جلب بيانات الحجوزات
  // ----------------------------------------------------------------
  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/doctorDashboard/appointments");
      // response.data هو مصفوفة الحجوزات بالشكل الذي أرسلته (مع المريض والطبيب وغيرها)
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // ----------------------------------------------------------------
  //                  2) تصفية الحجوزات بالـ status
  // ----------------------------------------------------------------
  const filteredBookings = statusFilter === "all"
    ? bookings
    : bookings.filter((booking) => booking.status === statusFilter);

  // ----------------------------------------------------------------
  //    3) دالة لتعديل حالة الحجز (مثال على تغيير status)
  // ----------------------------------------------------------------
  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await axios.put(`/api/doctorDashboard/appointments/${bookingId}`, {
        status: newStatus,
      });
      // تحدّيث الحالة محليًا
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId ? { ...booking, status: newStatus } : booking
        )
      );
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  // ----------------------------------------------------------------
  //   4) توابع التقويم: إنشاء أيام الشهر + جلب حجوزات يوم معين
  // ----------------------------------------------------------------
  // دالة لمعرفة عدد أيام الشهر الحالي
  const daysInCurrentMonth = () => {
    // الشهر القادم = currentMonth + 1
    // وضعنا اليوم = 0 سيعطينا آخر يوم في الشهر السابق
    return new Date(currentYear, currentMonth + 1, 0).getDate();
  };

  // نحصل على أول يوم في الشهر الحالي (لمعرفة اسم اليوم الذي يبدأ به الشهر)
  const firstDayOfMonth = () => {
    return new Date(currentYear, currentMonth, 1).getDay(); 
    // Sunday=0, Monday=1, ...
  };

  // دالة تعيد جميع الحجوزات الخاصة بتاريخ محدد (اليوم + الشهر + السنة)
  const getBookingsForDate = (dateObj) => {
    return bookings.filter((booking) => {
      const bookingDate = new Date(booking.date); // تحويل إلى كائن Date
      return (
        bookingDate.getFullYear() === dateObj.getFullYear() &&
        bookingDate.getMonth() === dateObj.getMonth() &&
        bookingDate.getDate() === dateObj.getDate()
      );
    });
  };

  // ----------------------------------------------------------------
  //        5) عناصر واجهة التقويم
  // ----------------------------------------------------------------
  const renderCalendar = () => {
    const totalDays = daysInCurrentMonth(); // عدد أيام الشهر
    const startDay = firstDayOfMonth();     // اليوم الذي يبدأ فيه الشهر

    // نقوم بإنشاء مصفوفة فراغات لبداية الشهر
    const blanks = [];
    for (let i = 0; i < startDay; i++) {
      blanks.push(<div key={`blank-${i}`} className="h-16 border bg-gray-50" />);
    }

    // ننشئ عناصر لأيام الشهر
    const daysArray = [];
    for (let day = 1; day <= totalDays; day++) {
      const currentDay = new Date(currentYear, currentMonth, day);
      // نجلب الحجوزات في هذا اليوم
      const bookingsInDay = getBookingsForDate(currentDay);

      // هل اليوم هو اليوم الحالي ؟
      const isToday =
        currentDay.toDateString() === new Date().toDateString();

      daysArray.push(
        <div
          key={day}
          onClick={() => setSelectedDate(currentDay)}
          className={`h-16 border p-1 cursor-pointer hover:bg-blue-50 
            ${isToday ? 'bg-blue-100 border-blue-300' : ''}`}
        >
          <div className="flex justify-between">
            <span className={`text-sm font-medium ${isToday ? 'text-blue-600' : ''}`}>
              {day}
            </span>
            {/* إذا عندنا حجوزات في ذلك اليوم نعرض عدادًا */}
            {bookingsInDay.length > 0 && (
              <span className="text-xs bg-blue-500 text-white px-1 rounded-full">
                {bookingsInDay.length}
              </span>
            )}
          </div>
          {/* نعرض مثالاً لأول حجز أو الأوقات */}
          <div className="mt-1">
            {bookingsInDay.slice(0, 1).map((b) => (
              <div key={b._id} className="text-[10px] truncate bg-blue-100 mt-1 p-1 rounded">
                {b.time} 
                {/* يمكنك مثلاً: {b.patient?.name || 'No Name'} */}
              </div>
            ))}
            {bookingsInDay.length > 1 && (
              <div className="text-[10px] text-gray-500">
                +{bookingsInDay.length - 1} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow p-4 mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h2>
          <div>
            <button
              onClick={() => {
                // نرجع شهرًا للخلف
                const prevMonth = new Date(currentYear, currentMonth - 1, 1);
                setSelectedDate(prevMonth);
              }}
              className="p-2 mx-1 bg-gray-100 rounded hover:bg-gray-200"
            >
              Previous
            </button>
            <button
              onClick={() => {
                // نتقدم شهرًا للأمام
                const nextMonth = new Date(currentYear, currentMonth + 1, 1);
                setSelectedDate(nextMonth);
              }}
              className="p-2 mx-1 bg-gray-100 rounded hover:bg-gray-200"
            >
              Next
            </button>
          </div>
        </div>

        {/* عناوين الأيام */}
        <div className="grid grid-cols-7 gap-1 mb-2 text-center">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((dayName) => (
            <div key={dayName} className="font-medium text-sm py-1 bg-gray-50">
              {dayName}
            </div>
          ))}
        </div>

        {/* عرض الفراغات + الأيام */}
        <div className="grid grid-cols-7 gap-1">
          {blanks}
          {daysArray}
        </div>

        {/* قسم يعرض حجوزات اليوم المختار تفصيليًا */}
        <div className="mt-4">
          <h3 className="font-medium text-lg mb-2">
            Appointments for {selectedDate.toDateString()}
          </h3>
          <div className="divide-y">
            {getBookingsForDate(selectedDate).map((b) => (
              <div key={b._id} className="py-2 flex justify-between items-center">
                <div>
                  <span className="font-medium">{b.time}</span> - {b?.patient?.name || 'Unknown'}
                </div>
              </div>
            ))}
            {getBookingsForDate(selectedDate).length === 0 && (
              <div className="py-2 text-gray-500 text-center">
                No appointments for this day
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // ----------------------------------------------------------------
  //                     واجهة المستخدم النهائية
  // ----------------------------------------------------------------
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-6">
        {/* العنوان + الفلتر */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Patient Bookings</h1>

          <div className="flex items-center space-x-4">
            <label className="text-gray-700 font-medium">Filter by Status:</label>
            <select
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>

            <button
              onClick={fetchBookings}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none" stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Refresh
            </button>
          </div>
        </div>

        {/* عرض لودر أو عرض جدول الحجوزات */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-600 text-lg">No bookings available for the selected filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Patient Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Booking Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Reason
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {booking?.patient?.name || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {booking?.patient?.email || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(booking.date).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {booking.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                      {booking.reason}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {/* Select لتحديث الستاتس */}
                      <select
                        className="border border-gray-300 rounded-md px-3 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                        value={booking.status}
                      >
                        {statusOptions.slice(1).map((status) => (
                          <option key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 6) التقويم  */}
        {renderCalendar()}
      </div>
    </div>
  );
}

export default DoctorDashboardPatients;
