'use client'
import { useState } from 'react';
// import { 
//   UserGroupIcon, 
//   ClipboardCheckIcon, 
//   DocumentTextIcon, 
//   CalendarIcon 
// } from '@heroicons/react/outline';

import SidebarDoctor from '../components/SidebarDoctor';

export default function doctorDashboard() {
  // Sample data
  const stats = [
    { title: 'Total Patients', value: '3,845', icon: <div className="h-8 w-8" />, color: 'bg-blue-100 text-blue-600' },
    { title: 'Active Cases', value: '482', icon: <div className="h-8 w-8" />, color: 'bg-green-100 text-green-600' },
    { title: 'New Records', value: '28', icon: <div className="h-8 w-8" />, color: 'bg-purple-100 text-purple-600' },
    { title: 'Today\'s Appointments', value: '42', icon: <div className="h-8 w-8" />, color: 'bg-amber-100 text-amber-600' },
  ];

  const recentPatients = [
    { id: 'P-78912', name: 'Emma Wilson', age: 34, diagnosis: 'Hypertension', lastVisit: '2025-04-05', status: 'Active' },
    { id: 'P-78845', name: 'John Miller', age: 52, diagnosis: 'Diabetes Type 2', lastVisit: '2025-04-03', status: 'Active' },
    { id: 'P-78752', name: 'Sophia Thomas', age: 28, diagnosis: 'Pregnancy Check-up', lastVisit: '2025-04-02', status: 'Follow-up' },
    { id: 'P-78701', name: 'Robert Chen', age: 47, diagnosis: 'Lower Back Pain', lastVisit: '2025-04-01', status: 'New' },
    { id: 'P-78699', name: 'Michelle Garcia', age: 39, diagnosis: 'Migraine', lastVisit: '2025-03-31', status: 'Active' },
  ];

  // Status colors
  const statusColors = {
    Active: 'bg-green-100 text-green-800',
    'Follow-up': 'bg-blue-100 text-blue-800',
    New: 'bg-purple-100 text-purple-800',
    Completed: 'bg-gray-100 text-gray-800'
  };

  return (
    <div className='bg-[#D7E2E9] bg-opacity-20'>
      {/* <SidebarDoctor /> */}
      
      <div className="flex-1 ml"> {/* ml-64 to account for sidebar width */}
        {/* Header */}
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Patient Records Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="bg-[#415A80] text-white px-4 py-2 rounded-md hover:bg-[#374E70] transition">
              Add New Patient
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-full`}>
                    {stat.icon}
                  </div>
                </div>
                <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Patients */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">Recent Patients</h2>
                <button className="text-sm text-[#415A80] hover:text-[#374E70]">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 text-gray-600 text-sm">
                    <tr>
                      <th className="py-3 px-6 text-left">Patient ID</th>
                      <th className="py-3 px-6 text-left">Name</th>
                      <th className="py-3 px-6 text-left">Age</th>
                      <th className="py-3 px-6 text-left">Diagnosis</th>
                      <th className="py-3 px-6 text-left">Last Visit</th>
                      <th className="py-3 px-6 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {recentPatients.map((patient) => (
                      <tr key={patient.id} className="hover:bg-gray-50">
                        <td className="py-4 px-6 font-medium text-[#415A80]">{patient.id}</td>
                        <td className="py-4 px-6 font-medium text-gray-900">{patient.name}</td>
                        <td className="py-4 px-6 text-gray-600">{patient.age}</td>
                        <td className="py-4 px-6 text-gray-600">{patient.diagnosis}</td>
                        <td className="py-4 px-6 text-gray-600">{patient.lastVisit}</td>
                        <td className="py-4 px-6">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColors[patient.status]}`}>
                            {patient.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="space-y-8">
              {/* Today's Schedule */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-800">Today's Schedule</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-[#D7E2E9] text-[#415A80] font-medium rounded-md px-2 py-1 text-center min-w-[60px]">
                        <div>09:30</div>
                        <div>AM</div>
                      </div>
                      <div className="ml-4">
                        <p className="font-medium text-gray-800">Emma Wilson</p>
                        <p className="text-sm text-gray-600">Follow-up Appointment</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-[#D7E2E9] text-[#415A80] font-medium rounded-md px-2 py-1 text-center min-w-[60px]">
                        <div>11:00</div>
                        <div>AM</div>
                      </div>
                      <div className="ml-4">
                        <p className="font-medium text-gray-800">John Miller</p>
                        <p className="text-sm text-gray-600">Medication Review</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-[#D7E2E9] text-[#415A80] font-medium rounded-md px-2 py-1 text-center min-w-[60px]">
                        <div>02:15</div>
                        <div>PM</div>
                      </div>
                      <div className="ml-4">
                        <p className="font-medium text-gray-800">Sophia Thomas</p>
                        <p className="text-sm text-gray-600">Pregnancy Check-up</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t border-gray-100 text-center">
                  <button className="text-sm font-medium text-[#415A80] hover:text-[#374E70]">
                    View Full Schedule
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-800">Quick Actions</h2>
                </div>
                <div className="p-6 grid grid-cols-2 gap-4">
                  <button className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
                    <div className="w-6 h-6 text-[#415A80] mb-2" />
                    <span className="text-sm font-medium text-gray-700">New Record</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
                    <div className="w-6 h-6 text-[#415A80] mb-2" />
                    <span className="text-sm font-medium text-gray-700">Schedule</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
                    <div className="w-6 h-6 text-[#415A80] mb-2" />
                    <span className="text-sm font-medium text-gray-700">Checklist</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
                    <div className="w-6 h-6 text-[#415A80] mb-2" />
                    <span className="text-sm font-medium text-gray-700">Patients</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}