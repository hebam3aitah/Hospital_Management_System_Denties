'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function CreateAppointmentPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    patient: '',
    doctor: '',
    date: '',
    time: '',
    reason: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await axios.post('/api/admin/appointments', form);
      router.push('/adminDashboard/appointments');
    } catch (error) {
      console.error('Error creating appointment:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-6 text-[#415A80] pb-3 border-b border-[#D7E2E9]">Add New Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="patient" className="block text-sm font-medium text-[#415A80] mb-1">Patient Name</label>
          <input
            id="patient"
            type="text"
            name="patient"
            placeholder="Enter patient name"
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
            placeholder="Enter doctor name"
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
            placeholder="Enter appointment reason"
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
            value={form.date} 
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

        <div className="pt-4 border-t border-[#D7E2E9] mt-6">
          <div className="flex justify-end">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-[#415A80] text-white px-4 py-2 rounded hover:bg-[#A5D4DC] transition-colors"
            >
              {isSubmitting ? 'Saving...' : 'Save Appointment'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}