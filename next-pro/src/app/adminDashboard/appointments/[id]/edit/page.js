'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';

export default function EditAppointmentPage() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const res = await axios.get(`/api/admin/appointments`);
        const found = res.data.find((a) => a._id === id);
        if (found) setForm(found);
      } catch (error) {
        console.error('Error fetching appointment:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/admin/appointments/${id}`, form);
      router.push('/adminDashboard/appointments');
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <p className="text-[#415A80]">Loading...</p>
    </div>
  );

  if (!form) return (
    <div className="flex justify-center items-center h-64">
      <p className="text-red-500">Appointment not found</p>
    </div>
  );

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-6 text-[#415A80] pb-3 border-b border-[#D7E2E9]">Edit Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="patient" className="block text-sm font-medium text-[#415A80] mb-1">Patient Name</label>
          <input
            id="patient"
            type="text"
            name="patient"
            value={form.patient}
            onChange={handleChange}
            className="w-full border border-[#D7E2E9] p-2 rounded bg-[#E5E7E9] focus:ring-[#A5D4DC] focus:border-[#A5D4DC]"
            required
          />
        </div>

        <div>
          <label htmlFor="doctor" className="block text-sm font-medium text-[#415A80] mb-1">Doctor Name</label>
          <input
            id="doctor"
            type="text"
            name="doctor"
            value={form.doctor}
            onChange={handleChange}
            className="w-full border border-[#D7E2E9] p-2 rounded bg-[#E5E7E9] focus:ring-[#A5D4DC] focus:border-[#A5D4DC]"
            required
          />
        </div>

        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-[#415A80] mb-1">Reason for Visit</label>
          <input
            id="reason"
            type="text"
            name="reason"
            value={form.reason}
            onChange={handleChange}
            className="w-full border border-[#D7E2E9] p-2 rounded bg-[#E5E7E9] focus:ring-[#A5D4DC] focus:border-[#A5D4DC]"
            required
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-[#415A80] mb-1">Appointment Date</label>
          <input 
            id="date"
            type="date" 
            name="date" 
            value={form.date?.slice(0, 10)} 
            onChange={handleChange} 
            className="w-full border border-[#D7E2E9] p-2 rounded bg-[#E5E7E9] focus:ring-[#A5D4DC] focus:border-[#A5D4DC]" 
            required 
          />
        </div>

        <div>
          <label htmlFor="time" className="block text-sm font-medium text-[#415A80] mb-1">Appointment Time</label>
          <input 
            id="time"
            type="time" 
            name="time" 
            value={form.time} 
            onChange={handleChange} 
            className="w-full border border-[#D7E2E9] p-2 rounded bg-[#E5E7E9] focus:ring-[#A5D4DC] focus:border-[#A5D4DC]" 
            required 
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-[#415A80] mb-1">Status</label>
          <select 
            id="status"
            name="status" 
            value={form.status} 
            onChange={handleChange} 
            className="w-full border border-[#D7E2E9] p-2 rounded bg-[#E5E7E9] focus:ring-[#A5D4DC] focus:border-[#A5D4DC]"
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="pt-4 border-t border-[#D7E2E9] mt-6">
          <div className="flex justify-end">
            <button 
              type="submit" 
              className="bg-[#415A80] text-white px-4 py-2 rounded hover:bg-[#A5D4DC] transition-colors"
            >
              Update Appointment
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}