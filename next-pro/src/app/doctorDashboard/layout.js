// src/app/doctorDashboard/layout.js
'use client'
  // تأكد من استيراد الشريط الجانبي بشكل صحيح
import { useState } from 'react';
import SidebarDoctor from '../components/SidebarDoctor';

export default function DoctorDashboardLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex">
      {/* شريط جانبي */}
      <SidebarDoctor isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

      <div className={`flex-1 p-6 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
        {/* محتوى الصفحات */}
        {children}
      </div>
    </div>
  );
}
