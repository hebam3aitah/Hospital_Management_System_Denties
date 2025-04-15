


// 'use client';

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

// export default function BookPage() {
//   const router = useRouter();
//   const [doctors, setDoctors] = useState([]);
//   const [selectedDoctor, setSelectedDoctor] = useState('');
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [availableTimes, setAvailableTimes] = useState([]);
//   const [selectedTime, setSelectedTime] = useState('');
//   const [reason, setReason] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get('/api/doctors/with-availability')
//       .then(res => setDoctors(res.data))
//       .finally(() => setLoading(false));
//   }, []);

//   useEffect(() => {
//     if (!selectedDoctor || !selectedDate) return;

//     const doc = doctors.find(d => d._id === selectedDoctor);
//     const selectedDay = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });

//     const availability = doc.availability.find(a => a.day === selectedDay);
//     if (!availability || !availability.from || !availability.to) {
//       setAvailableTimes([]);
//       return;
//     }

//     const start = parseInt(availability.from.split(':')[0]);
//     const end = parseInt(availability.to.split(':')[0]);
//     const times = [];

//     for (let h = start; h < end; h++) {
//       times.push(`${h.toString().padStart(2, '0')}:00`);
//     }

//     const dateKey = `${doc._id}_${selectedDate.toISOString().split('T')[0]}`;
//     const booked = doc.bookedSlots[dateKey] || [];

//     const filtered = times.map(t => ({
//       time: t,
//       disabled: booked.includes(t),
//     }));

//     setAvailableTimes(filtered);
//   }, [selectedDoctor, selectedDate, doctors]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedDoctor || !selectedDate || !selectedTime || !reason) return;

//     try {
//       await axios.post('/api/bookings', {
//         doctor: selectedDoctor,
//         date: selectedDate,
//         time: selectedTime,
//         reason,
//       });
//       router.push('/patient/booking-success');
//     } catch (err) {
//       alert('فشل في إرسال الطلب');
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
//       <h1 className="text-2xl font-bold mb-4">حجز موعد</h1>

//       {loading ? <p>جاري تحميل الأطباء...</p> : (
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block mb-1">اختر الطبيب</label>
//             <select value={selectedDoctor} onChange={e => setSelectedDoctor(e.target.value)} className="w-full border p-2 rounded">
//               <option value="">اختر...</option>
//               {doctors.map(doc => (
//                 <option key={doc._id} value={doc._id}>{doc.name}</option>
//               ))}
//             </select>
//           </div>

//           {selectedDoctor && (
//             <div>
//               <label className="block mb-1">اختر التاريخ</label>
//               <Calendar
//                 onChange={setSelectedDate}
//                 value={selectedDate}
//                 minDate={new Date()}
//               />
//             </div>
//           )}

//           {selectedDate && availableTimes.length > 0 && (
//             <div>
//               <label className="block mt-4 mb-1">الأوقات المتاحة</label>
//               <div className="grid grid-cols-3 gap-2">
//                 {availableTimes.map(slot => (
//                   <button
//                     key={slot.time}
//                     type="button"
//                     disabled={slot.disabled}
//                     onClick={() => setSelectedTime(slot.time)}
//                     className={`p-2 rounded text-sm ${
//                       slot.disabled
//                         ? 'bg-gray-300 cursor-not-allowed'
//                         : slot.time === selectedTime
//                         ? 'bg-green-600 text-white'
//                         : 'bg-blue-500 text-white hover:bg-blue-600'
//                     }`}
//                   >
//                     {slot.time}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {selectedTime && (
//             <div className="mt-2 text-green-700 font-semibold">
//               تم اختيار: {selectedDate.toLocaleDateString('ar-EG')} الساعة {selectedTime}
//             </div>
//           )}

//           <div>
//             <label className="block mb-1">سبب الحجز</label>
//             <textarea value={reason} onChange={e => setReason(e.target.value)} className="w-full border p-2 rounded" rows={3} />
//           </div>

//           <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
//             تأكيد الحجز
//           </button>
//         </form>
//       )}
//     </div>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Calendar from 'react-calendar';
import { motion } from 'framer-motion';
import { Clock, Calendar as CalendarIcon, User, FileText, CheckCircle, Loader } from 'lucide-react';
import 'react-calendar/dist/Calendar.css';

export default function BookPage() {
  const router = useRouter();
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [bookDoctor, setBookDoctor] = useState("");
  
  useEffect(() => {
    const storedDoctorId = localStorage.getItem("bookDoctor");
    if (storedDoctorId) {
      setBookDoctor(storedDoctorId);
    }
  }, []);
  console.log(bookDoctor)

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get('/api/doctors/with-availability');
        setDoctors(res.data);
      } catch (error) {
        console.error('Failed to fetch doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    if (!selectedDoctor || !selectedDate) return;

    const doc = doctors.find(d => d._id === selectedDoctor);
    if (doc) {
      setDoctorDetails(doc);
    }
    
    const selectedDay = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
    const availability = doc?.availability?.find(a => a.day === selectedDay);
    
    if (!availability || !availability.from || !availability.to) {
      setAvailableTimes([]);
      return;
    }

    const start = parseInt(availability.from.split(':')[0]);
    const end = parseInt(availability.to.split(':')[0]);
    const times = [];

    for (let h = start; h < end; h++) {
      times.push(`${h.toString().padStart(2, '0')}:00`);
    }

    const dateKey = `${doc._id}_${selectedDate.toISOString().split('T')[0]}`;
    const booked = doc.bookedSlots[dateKey] || [];

    const filtered = times.map(t => ({
      time: t,
      disabled: booked.includes(t),
    }));

    setAvailableTimes(filtered);
  }, [selectedDoctor, selectedDate, doctors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDoctor || !selectedDate || !selectedTime || !reason) return;
    
    setSubmitting(true);

    try {
      await axios.post('/api/bookings', {
        doctor: selectedDoctor,
        date: selectedDate,
        time: selectedTime,
        reason,
      });
      router.push('/patient/booking-success');
    } catch (err) {
      console.error('Booking error:', err);
      alert('Failed to submit booking request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const nextStep = () => {
    if (
      (currentStep === 1 && selectedDoctor) ||
      (currentStep === 2 && selectedDate && availableTimes.length > 0 && selectedTime) ||
      (currentStep === 3 && reason.trim().length > 0)
    ) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Custom styles for the calendar
  const calendarStyles = `
    .react-calendar {
      width: 100%;
      max-width: 100%;
      border: 1px solid #D7E2E9;
      border-radius: 0.5rem;
      font-family: inherit;
      line-height: 1.5;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    .react-calendar__tile {
      padding: 0.75rem 0.5rem;
      text-align: center;
      border-radius: 0.25rem;
      transition: all 0.2s;
    }
    .react-calendar__tile:enabled:hover,
    .react-calendar__tile:enabled:focus {
      background-color: #E5E7E9;
    }
    .react-calendar__tile--now {
      background-color: #E5E7E9;
    }
    .react-calendar__tile--active {
      background-color: #415A80 !important;
      color: white;
    }
    .react-calendar__navigation button:enabled:hover,
    .react-calendar__navigation button:enabled:focus {
      background-color: #E5E7E9;
      border-radius: 0.25rem;
    }
    .react-calendar__navigation {
      margin-bottom: 0.5rem;
    }
  `;

  return (
    <div className="max-w-4xl mx-auto">
      <style jsx global>{calendarStyles}</style>
      
      <div className="pb-5 border-b border-[#D7E2E9] mb-5">
        <h1 className="text-2xl font-bold text-[#415A80]">Book an Appointment</h1>
      </div>

      {loading ? (
        <div className="bg-white rounded-lg shadow-md p-8 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader className="h-8 w-8 text-[#415A80] animate-spin mb-4" />
            <p className="text-gray-600">Loading available doctors...</p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Progress steps */}
          <div className="bg-[#E5E7E9] px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  currentStep >= 1 ? 'bg-[#415A80] text-white' : 'bg-[#D7E2E9] text-gray-500'
                }`}>
                  1
                </div>
                <div className={`ml-2 text-sm font-medium ${
                  currentStep >= 1 ? 'text-[#415A80]' : 'text-gray-500'
                }`}>
                  Select Doctor
                </div>
              </div>
              <div className={`flex-1 h-1 mx-4 ${
                currentStep >= 2 ? 'bg-[#415A80]' : 'bg-[#D7E2E9]'
              }`}></div>
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  currentStep >= 2 ? 'bg-[#415A80] text-white' : 'bg-[#D7E2E9] text-gray-500'
                }`}>
                  2
                </div>
                <div className={`ml-2 text-sm font-medium ${
                  currentStep >= 2 ? 'text-[#415A80]' : 'text-gray-500'
                }`}>
                  Choose Date & Time
                </div>
              </div>
              <div className={`flex-1 h-1 mx-4 ${
                currentStep >= 3 ? 'bg-[#415A80]' : 'bg-[#D7E2E9]'
              }`}></div>
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  currentStep >= 3 ? 'bg-[#415A80] text-white' : 'bg-[#D7E2E9] text-gray-500'
                }`}>
                  3
                </div>
                <div className={`ml-2 text-sm font-medium ${
                  currentStep >= 3 ? 'text-[#415A80]' : 'text-gray-500'
                }`}>
                  Appointment Details
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {/* Step 1: Doctor Selection */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <label htmlFor="doctor" className="block text-sm font-medium text-[#415A80] mb-2">
                    <div className="flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Select Doctor
                    </div>
                  </label>
                  <select 
                    id="doctor"
                    value={selectedDoctor} 
                    onChange={e => setSelectedDoctor(e.target.value)} 
                    className="w-full border border-[#D7E2E9] p-3 rounded-lg bg-[#E5E7E9] focus:ring-[#A5D4DC] focus:border-[#A5D4DC] focus:outline-none"
                  >
                    <option value="">Select a doctor...</option>
                    {doctors.map(doc => (
                      <option key={doc._id} value={doc._id}>{doc.name} - {doc.specialty}</option>
                    ))}
                  </select>
                </div>

                {selectedDoctor && doctors.find(d => d._id === selectedDoctor) && (
                  <div className="bg-[#E5E7E9]/50 p-4 rounded-lg">
                    <h3 className="font-medium text-[#415A80] mb-2">Doctor Information</h3>
                    <div className="text-sm text-gray-600">
                      <p><strong>Name:</strong> {doctors.find(d => d._id === selectedDoctor).name}</p>
                      <p><strong>Specialty:</strong> {doctors.find(d => d._id === selectedDoctor).specialty}</p>
                      <p><strong>Available Days:</strong> {doctors.find(d => d._id === selectedDoctor).availability.map(a => a.day).join(', ')}</p>
                    </div>
                  </div>
                )}

                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!selectedDoctor}
                    className="bg-[#415A80] text-white px-6 py-2 rounded-lg hover:bg-[#A5D4DC] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Date and Time Selection */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-[#415A80] mb-2">
                    <div className="flex items-center">
                      <CalendarIcon className="w-5 h-5 mr-2" />
                      Select Date
                    </div>
                  </label>
                  <Calendar
                    onChange={setSelectedDate}
                    value={selectedDate}
                    minDate={new Date()}
                    className="mb-4"
                  />
                </div>

                {selectedDate && (
                  <div>
                    <label className="block text-sm font-medium text-[#415A80] mb-2">
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 mr-2" />
                        Available Time Slots
                      </div>
                    </label>
                    
                    {availableTimes.length > 0 ? (
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                        {availableTimes.map(slot => (
                          <button
                            key={slot.time}
                            type="button"
                            disabled={slot.disabled}
                            onClick={() => setSelectedTime(slot.time)}
                            className={`p-3 rounded-lg text-sm font-medium transition-all ${
                              slot.disabled
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : slot.time === selectedTime
                                ? 'bg-[#A5D4DC] text-[#415A80] border-2 border-[#415A80] shadow-md'
                                : 'bg-[#E5E7E9] text-[#415A80] hover:bg-[#D7E2E9]'
                            }`}
                          >
                            {slot.time}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg">
                        <p>No available time slots for the selected date. Please choose another date.</p>
                      </div>
                    )}
                  </div>
                )}

                {selectedTime && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span>
                      Selected: {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} at {selectedTime}
                    </span>
                  </div>
                )}

                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!selectedDate || !selectedTime}
                    className="bg-[#415A80] text-white px-6 py-2 rounded-lg hover:bg-[#A5D4DC] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Appointment Details */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <label htmlFor="reason" className="block text-sm font-medium text-[#415A80] mb-2">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Reason for Visit
                    </div>
                  </label>
                  <textarea 
                    id="reason"
                    value={reason} 
                    onChange={e => setReason(e.target.value)} 
                    className="w-full border border-[#D7E2E9] p-3 rounded-lg bg-[#E5E7E9] focus:ring-[#A5D4DC] focus:border-[#A5D4DC] focus:outline-none"
                    placeholder="Please describe your symptoms or reason for the appointment..."
                    rows={4}
                    required
                  />
                </div>

                <div className="bg-[#E5E7E9]/50 p-4 rounded-lg space-y-3">
                  <h3 className="font-medium text-[#415A80]">Appointment Summary</h3>
                  
                  <div className="flex items-start">
                    <User className="w-5 h-5 text-[#415A80] mt-0.5 mr-3" />
                    <div>
                      <p className="font-medium">Doctor</p>
                      <p className="text-gray-600">{doctors.find(d => d._id === selectedDoctor)?.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CalendarIcon className="w-5 h-5 text-[#415A80] mt-0.5 mr-3" />
                    <div>
                      <p className="font-medium">Date & Time</p>
                      <p className="text-gray-600">
                        {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} at {selectedTime}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || !reason.trim()}
                    className="bg-[#415A80] text-white px-8 py-2 rounded-lg hover:bg-[#A5D4DC] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
                  >
                    {submitting ? (
                      <>
                        <Loader className="animate-spin -ml-1 mr-2 h-4 w-4" />
                        Processing...
                      </>
                    ) : (
                      'Confirm Booking'
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </form>
        </div>
      )}
    </div>
  );
}