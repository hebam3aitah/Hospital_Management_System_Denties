// 'use client';

// import { useParams, useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function PaymentPage() {
//   const { id } = useParams();
//   const router = useRouter();
//   const [booking, setBooking] = useState(null);
//   const [paymentMethod, setPaymentMethod] = useState('visa');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get(`/api/bookings/${id}`)
//       .then(res => setBooking(res.data))
//       .finally(() => setLoading(false));
//   }, [id]);

//   const handlePayment = async () => {
//     try {
//       await axios.put(`/api/bookings/${id}`, {
//         paymentMethod,
//         paymentStatus: 'paid'
//       });
//       router.push('/patient/booking-success');
//     } catch (err) {
//       alert('فشل في الدفع');
//     }
//   };

//   if (loading) return <p className="text-center mt-10">جاري تحميل البيانات...</p>;
//   if (!booking) return <p className="text-center text-red-600">لم يتم العثور على الحجز</p>;

//   return (
//     <div className="max-w-xl mx-auto bg-white p-6 mt-10 rounded shadow">
//       <h2 className="text-2xl font-bold mb-4">الدفع</h2>

//       <p><strong>الطبيب:</strong> {booking.doctor?.name || 'غير معروف'}</p>
//       <p><strong>التاريخ:</strong> {new Date(booking.date).toLocaleDateString()} الساعة {booking.time}</p>
//       <p><strong>سبب الحجز:</strong> {booking.reason}</p>

//       <div className="mt-4">
//         <label className="block mb-1">اختر طريقة الدفع:</label>
//         <select
//           value={paymentMethod}
//           onChange={(e) => setPaymentMethod(e.target.value)}
//           className="w-full border p-2 rounded"
//         >
//           <option value="visa">Visa</option>
//           <option value="click">Click</option>
//           <option value="cash">Cash on visit</option>
//         </select>
//       </div>

//       <button
//         onClick={handlePayment}
//         className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//       >
//         تأكيد الدفع
//       </button>
//     </div>
//   );
// }



'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CreditCard, DollarSign, Loader, Calendar, Clock, User, FileText, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

export default function PaymentPage() {
  const { id } = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('visa');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axios.get(`/api/bookings/${id}`);
        setBooking(res.data);
      } catch (err) {
        console.error('Error fetching booking:', err);
        setError('Unable to load booking information. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  const handlePayment = async () => {
    if (processing) return;
    
    setProcessing(true);
    try {
      await axios.put(`/api/bookings/${id}`, {
        paymentMethod,
        paymentStatus: 'paid'
      });
      router.push('/patient/booking-success');
    } catch (err) {
      console.error('Payment error:', err);
      setError('Payment failed. Please try again or contact support.');
      setProcessing(false);
    }
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'EEEE, MMMM d, yyyy');
    } catch (error) {
      return dateString || 'Date not available';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="flex flex-col items-center">
          <Loader className="h-8 w-8 text-[#415A80] animate-spin" />
          <p className="mt-4 text-gray-600">Loading payment information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto p-6 mt-8">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="max-w-xl mx-auto p-6 mt-8">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
          <p>Booking not found. Please check the booking ID and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="pb-5 border-b border-[#D7E2E9] mb-6">
        <h1 className="text-2xl font-bold text-[#415A80]">Payment</h1>
        <p className="text-gray-500 mt-1">Complete your appointment payment</p>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-[#D7E2E9]">
          <div className="p-6">
            <h2 className="text-lg font-medium text-[#415A80] mb-4">Appointment Details</h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-[#E5E7E9] p-2 rounded-full mr-3">
                  <User className="h-5 w-5 text-[#415A80]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Doctor</p>
                  <p className="font-medium text-[#415A80]">{booking.doctor?.name || 'Not specified'}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#E5E7E9] p-2 rounded-full mr-3">
                  <Calendar className="h-5 w-5 text-[#415A80]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium text-[#415A80]">{formatDate(booking.date)}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#E5E7E9] p-2 rounded-full mr-3">
                  <Clock className="h-5 w-5 text-[#415A80]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-medium text-[#415A80]">{booking.time || 'Not specified'}</p>
                </div>
              </div>
              
              {booking.reason && (
                <div className="flex items-start">
                  <div className="bg-[#E5E7E9] p-2 rounded-full mr-3">
                    <FileText className="h-5 w-5 text-[#415A80]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Reason</p>
                    <p className="font-medium text-[#415A80]">{booking.reason}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-medium text-[#415A80] mb-4">Payment Information</h3>
          
          <div className="bg-[#E5E7E9]/50 p-4 rounded-lg mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Appointment Fee</span>
              <span className="font-bold text-[#415A80]">${booking.doctor?.fee || 50}.00</span>
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="paymentMethod" className="block mb-2 text-sm font-medium text-[#415A80]">
              Select Payment Method
            </label>
            <div className="relative">
              <select
                id="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="block w-full p-3 pl-10 border border-[#D7E2E9] rounded-lg bg-[#E5E7E9] focus:ring-[#A5D4DC] focus:border-[#A5D4DC] focus:outline-none appearance-none"
              >
                <option value="visa">Credit/Debit Card (Visa/Mastercard)</option>
                <option value="click">Click Payment</option>
                <option value="cash">Cash on Visit</option>
              </select>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                {paymentMethod === 'visa' && <CreditCard className="h-5 w-5 text-gray-500" />}
                {paymentMethod === 'click' && <CheckCircle className="h-5 w-5 text-gray-500" />}
                {paymentMethod === 'cash' && <DollarSign className="h-5 w-5 text-gray-500" />}
              </div>
            </div>
          </div>
          
          {paymentMethod === 'visa' && (
            <div className="bg-[#E5E7E9]/50 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-600 mb-4">
                For demonstration purposes, no actual payment will be processed. 
                In a real environment, a secure payment form would appear here.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                  <input 
                    type="text" 
                    placeholder="4242 4242 4242 4242" 
                    className="w-full p-2 border border-gray-300 rounded-md bg-white" 
                    disabled 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                    <input 
                      type="text" 
                      placeholder="MM/YY" 
                      className="w-full p-2 border border-gray-300 rounded-md bg-white" 
                      disabled 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                    <input 
                      type="text" 
                      placeholder="123" 
                      className="w-full p-2 border border-gray-300 rounded-md bg-white" 
                      disabled 
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <button
            onClick={handlePayment}
            disabled={processing}
            className="w-full bg-[#415A80] hover:bg-[#A5D4DC] text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#A5D4DC] focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {processing ? (
              <span className="flex items-center justify-center">
                <Loader className="animate-spin -ml-1 mr-2 h-5 w-5" />
                Processing Payment...
              </span>
            ) : (
              `Confirm Payment ($${booking.doctor?.fee || 50}.00)`
            )}
          </button>
          
          <p className="mt-4 text-sm text-gray-500 text-center">
            By confirming payment, you agree to our terms and conditions.
          </p>
        </div>
      </div>
    </div>
  );
}