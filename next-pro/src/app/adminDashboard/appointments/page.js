'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get('/api/admin/appointments');
        setAppointments(res.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const filtered = filter === 'all'
    ? appointments
    : appointments.filter((a) => a.status === filter);

  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-[#415A80]',
      cancelled: 'bg-red-100 text-red-800'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status] || 'bg-gray-100'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#D7E2E9]">
        <h1 className="text-xl font-bold text-[#415A80]">Appointments Management</h1>
        <Link 
          href="/adminDashboard/appointments/create" 
          className="bg-[#415A80] text-white px-4 py-2 rounded hover:bg-[#A5D4DC] transition-colors"
        >
          Add Appointment
        </Link>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <div>
          <label htmlFor="filter" className="text-sm font-medium text-[#415A80] mr-2">Filter by Status:</label>
          <select 
            id="filter"
            value={filter} 
            onChange={(e) => setFilter(e.target.value)} 
            className="border border-[#D7E2E9] p-2 rounded bg-[#E5E7E9] focus:ring-[#A5D4DC] focus:border-[#A5D4DC]"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div className="text-sm text-gray-500">
          {filtered.length} {filtered.length === 1 ? 'appointment' : 'appointments'} found
        </div>
      </div>

      {loading ? (
        <div className="py-8 text-center text-gray-500">
          <p>Loading appointments...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-8 text-center text-gray-500 border border-dashed border-[#D7E2E9] rounded-lg">
          <p>No appointments found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-[#D7E2E9] text-sm rounded-lg overflow-hidden">
            <thead className="bg-[#E5E7E9]">
              <tr>
                <th className="p-3 text-left text-[#415A80] font-medium">Patient</th>
                <th className="p-3 text-left text-[#415A80] font-medium">Doctor</th>
                <th className="p-3 text-left text-[#415A80] font-medium">Date & Time</th>
                <th className="p-3 text-left text-[#415A80] font-medium">Status</th>
                <th className="p-3 text-left text-[#415A80] font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a._id} className="border-t border-[#D7E2E9] hover:bg-[#E5E7E9] transition-colors">
                  <td className="p-3">{a.patient?.name || a.patient}</td>
                  <td className="p-3">{a.doctor?.name || a.doctor}</td>
                  <td className="p-3">{a.date?.slice(0, 10)} {a.time}</td>
                  <td className="p-3">
                    {getStatusBadge(a.status)}
                  </td>
                  <td className="p-3">
                    <Link 
                      href={`/adminDashboard/appointments/${a._id}`} 
                      className="text-[#415A80] hover:text-[#A5D4DC] transition-colors mr-3"
                    >
                      View
                    </Link>
                    <Link 
                      href={`/adminDashboard/appointments/${a._id}/edit`} 
                      className="text-[#A5D4DC] hover:text-[#415A80] transition-colors"
                    >
                      Edit
                    </Link>
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