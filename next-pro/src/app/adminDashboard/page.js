'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

function StatsCard({ title, value, icon, color }) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className={`flex-shrink-0 rounded-md p-3 ${color}`}>
            {icon}
          </div>
          <div className="ml-5">
            <p className="text-sm font-medium text-gray-500 truncate">{title}</p>
            <p className="mt-1 text-3xl font-semibold text-[#415A80]">{value}</p>
          </div>
        </div>
      </div>
      <div className="bg-[#E5E7E9] px-5 py-3">
        <div className="text-sm">
          <Link href={`/adminDashboard/${title.toLowerCase()}`} className="font-medium text-[#415A80] hover:text-[#334766]">
            View All
          </Link>
        </div>
      </div>
    </div>
  );
}

function RecentActivity({ title, items }) {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-[#E5E7E9]">
        <h3 className="text-lg font-medium text-[#415A80]">{title}</h3>
      </div>
      <div className="divide-y divide-[#E5E7E9]">
        {items.length === 0 ? (
          <div className="px-4 py-8 text-center text-gray-500">
            No recent activity
          </div>
        ) : (
          items.map((item, index) => (
            <div key={index} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-[#415A80] truncate">{item.title}</p>
                <div className="ml-2 flex-shrink-0 flex">
                  <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                    item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    item.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                    item.status === 'Patient' ? 'bg-[#D7E2E9] text-[#415A80]' :
                    item.status === 'Doctor' ? 'bg-[#A5D4DC] text-[#415A80]' :
                    'bg-[#A5D4DC] text-[#415A80]'
                  }`}>
                    {item.status}
                  </p>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-500">{item.user}</p>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <p>{item.date}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({ patients: 0, doctors: 0, appointments: 0, revenue: 0 });
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get('/api/admin/dashboard/summary');
        const { stats, recentAppointments, recentUsers } = res.data;
        setStats(stats);
        setRecentAppointments(recentAppointments);
        setRecentUsers(recentUsers);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-[#415A80]">Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] p-6 rounded-lg">
      <div className="pb-5 border-b border-[#E5E7E9] mb-5">
        <h1 className="text-2xl font-bold text-[#415A80]">Dashboard</h1>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Patients" 
          value={stats.patients} 
          icon={<svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>} 
          color="bg-[#415A80]" 
        />
        <StatsCard 
          title="Doctors" 
          value={stats.doctors} 
          icon={<svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.5 0 4.5-2 4.5-4.5S14.5 3 12 3 7.5 5 7.5 7.5 9.5 12 12 12zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>} 
          color="bg-[#A5D4DC]" 
        />
        <StatsCard 
          title="Appointments" 
          value={stats.appointments} 
          icon={<svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.89-1.99 2L3 21c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.11-.9-2-2-2zm0 18H5V9h14v12z"/></svg>} 
          color="bg-[#415A80]" 
        />
        <StatsCard 
          title="Revenue" 
          value={`JD${stats.revenue}`} 
          icon={<svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1C5.924 1 1 5.924 1 12s4.924 11 11 11 11-4.924 11-11S18.076 1 12 1zm0 20c-4.962 0-9-4.038-9-9s4.038-9 9-9 9 4.038 9 9-4.038 9-9 9z"/><path d="M12.5 7h-1v4h-1v2h2v4h1v-4h1v-2h-2z"/></svg>} 
          color="bg-[#A5D4DC]" 
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentActivity title="Recent Appointments" items={recentAppointments} />
        <RecentActivity title="Recent Users" items={recentUsers} />
      </div>
    </div>
  );
}