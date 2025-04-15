// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { format } from "date-fns";
// import {
//   Calendar,
//   Clock,
//   User,
//   FileText,
//   AlertCircle,
//   X,
//   Check,
//   XCircle,
// } from "lucide-react";

// export default function MyAppointmentsPage() {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [cancelReason, setCancelReason] = useState("");
//   const [cancelId, setCancelId] = useState(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const res = await axios.get("/api/bookings/my");
//         setAppointments(res.data);
//       } catch (err) {
//         setError("Failed to load your appointments. Please try again later.");
//         console.error("Error fetching appointments:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAppointments();
//   }, []);

//   const canCancel = (date, time) => {
//     const appointmentDateTime = new Date(`${date}T${time}`);
//     const now = new Date();
//     const diff = (appointmentDateTime - now) / (1000 * 60 * 60); // hours
//     return diff >= 2;
//   };

//   const confirmCancel = (id) => {
//     setCancelId(id);
//   };

//   const submitCancel = async () => {
//     if (!cancelReason.trim()) {
//       return;
//     }

//     try {
//       await axios.put(`/api/bookings/${cancelId}`, {
//         status: "cancelled",
//         cancelMessage: cancelReason,
//       });
//       setAppointments((prev) => prev.filter((a) => a._id !== cancelId));
//       setCancelId(null);
//       setCancelReason("");
//     } catch (err) {
//       alert("Failed to cancel the appointment. Please try again.");
//       console.error("Error cancelling appointment:", err);
//     }
//   };

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "approved":
//         return (
//           <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//             <Check className="w-3 h-3 mr-1" />
//             Approved
//           </span>
//         );
//       case "pending":
//         return (
//           <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
//             <Clock className="w-3 h-3 mr-1" />
//             Pending
//           </span>
//         );
//       case "cancelled":
//         return (
//           <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
//             <XCircle className="w-3 h-3 mr-1" />
//             Cancelled
//           </span>
//         );
//       default:
//         return (
//           <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//             {status}
//           </span>
//         );
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto">
//       <div className="pb-5 border-b border-[#D7E2E9] mb-5">
//         <h1 className="text-2xl font-bold text-[#415A80]">My Appointments</h1>
//       </div>

//       {loading ? (
//         <div className="bg-white rounded-lg shadow-md p-8 flex items-center justify-center">
//           <div className="flex flex-col items-center">
//             <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#415A80]"></div>
//             <p className="mt-4 text-gray-600">Loading your appointments...</p>
//           </div>
//         </div>
//       ) : error ? (
//         <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
//           <div className="flex">
//             <AlertCircle className="h-5 w-5 mr-2" />
//             <span>{error}</span>
//           </div>
//         </div>
//       ) : appointments.length === 0 ? (
//         <div className="bg-white rounded-lg shadow-md p-8 text-center">
//           <Calendar className="h-12 w-12 text-[#A5D4DC] mx-auto mb-4" />
//           <h2 className="text-xl font-medium text-[#415A80] mb-2">
//             No Appointments Found
//           </h2>
//           <p className="text-gray-600">
//             You don't have any scheduled appointments at the moment.
//           </p>
//         </div>
//       ) : (
//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           <ul className="divide-y divide-[#D7E2E9]">
//             {appointments.map((app) => (
//               <li
//                 key={app._id}
//                 className="p-6 hover:bg-[#E5E7E9]/30 transition-colors"
//               >
//                 <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-2">
//                       <User className="h-5 w-5 text-[#415A80]" />
//                       <span className="font-medium">Dr. {app.doctor.name}</span>
//                       {app.doctor.specialty && (
//                         <span className="text-sm text-gray-500">
//                           ({app.doctor.specialty})
//                         </span>
//                       )}
//                     </div>

//                     <div className="flex items-center gap-2">
//                       <Calendar className="h-5 w-5 text-[#415A80]" />
//                       <span>
//                         {format(new Date(app.date), "EEEE, MMMM d, yyyy")}
//                       </span>
//                     </div>

//                     <div className="flex items-center gap-2">
//                       <Clock className="h-5 w-5 text-[#415A80]" />
//                       <span>{app.time}</span>
//                     </div>

//                     {app.reason && (
//                       <div className="flex items-start gap-2">
//                         <FileText className="h-5 w-5 text-[#415A80] mt-0.5" />
//                         <span className="text-gray-700">{app.reason}</span>
//                       </div>
//                     )}
//                   </div>

//                   <div className="flex flex-col items-end gap-3">
//                     {getStatusBadge(app.status)}

//                     {app.status === "pending" &&
//                       canCancel(app.date, app.time) && (
//                         <button
//                           onClick={() => confirmCancel(app._id)}
//                           className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors inline-flex items-center"
//                         >
//                           <XCircle className="h-4 w-4 mr-1" />
//                           Cancel Appointment
//                         </button>
//                       )}
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Cancel Modal */}
//       {cancelId && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
//             <div className="bg-[#415A80] text-white px-6 py-4 flex justify-between items-center">
//               <h2 className="text-lg font-medium">Cancel Appointment</h2>
//               <button
//                 onClick={() => {
//                   setCancelId(null);
//                   setCancelReason("");
//                 }}
//                 className="text-white hover:text-[#D7E2E9] transition-colors"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             </div>
//             <div className="p-6">
//               <p className="mb-3 text-gray-700">
//                 Please provide a reason for cancellation:
//               </p>
//               <textarea
//                 value={cancelReason}
//                 onChange={(e) => setCancelReason(e.target.value)}
//                 className="w-full border border-[#D7E2E9] p-3 rounded-lg bg-[#E5E7E9] focus:ring-[#A5D4DC] focus:border-[#A5D4DC] focus:outline-none"
//                 placeholder="Enter your reason here..."
//                 rows={3}
//               />
//               <div className="mt-6 flex justify-end gap-3">
//                 <button
//                   onClick={() => {
//                     setCancelId(null);
//                     setCancelReason("");
//                   }}
//                   className="px-4 py-2 border border-[#D7E2E9] text-gray-700 rounded-lg hover:bg-[#E5E7E9] transition-colors"
//                 >
//                   Close
//                 </button>
//                 <button
//                   onClick={submitCancel}
//                   disabled={!cancelReason.trim()}
//                   className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:bg-red-300 disabled:cursor-not-allowed"
//                 >
//                   Confirm Cancellation
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import {
  Calendar,
  Clock,
  User,
  FileText,
  AlertCircle,
  X,
  Check,
  XCircle,
  CreditCard,
} from "lucide-react";

export default function MyAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelId, setCancelId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get("/api/bookings/my");
        setAppointments(res.data);
      } catch (err) {
        setError("Failed to load your appointments. Please try again later.");
        console.error("Error fetching appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const canCancel = (date, time) => {
    const appointmentDateTime = new Date(`${date}T${time}`);
    const now = new Date();
    const diff = (appointmentDateTime - now) / (1000 * 60 * 60); // hours
    return diff >= 1;
  };

  const confirmCancel = (id) => {
    setCancelId(id);
  };

  const submitCancel = async () => {
    if (!cancelReason.trim()) return;

    try {
      await axios.put(`/api/bookings/${cancelId}`, {
        status: "cancelled",
        cancelMessage: cancelReason,
      });
      setAppointments((prev) => prev.filter((a) => a._id !== cancelId));
      setCancelId(null);
      setCancelReason("");
    } catch (err) {
      alert("Failed to cancel the appointment. Please try again.");
      console.error("Error cancelling appointment:", err);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Check className="w-3 h-3 mr-1" /> Approved
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" /> Pending
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" /> Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="pb-5 border-b border-[#D7E2E9] mb-5">
        <h1 className="text-2xl font-bold text-[#415A80]">My Appointments</h1>
      </div>

      {loading ? (
        <div className="bg-white rounded-lg shadow-md p-8 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#415A80]"></div>
            <p className="mt-4 text-gray-600">Loading your appointments...</p>
          </div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
          <div className="flex">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        </div>
      ) : appointments.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <Calendar className="h-12 w-12 text-[#A5D4DC] mx-auto mb-4" />
          <h2 className="text-xl font-medium text-[#415A80] mb-2">
            No Appointments Found
          </h2>
          <p className="text-gray-600">
            You don't have any scheduled appointments at the moment.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <ul className="divide-y divide-[#D7E2E9]">
            {appointments.map((app) => (
              <li
                key={app._id}
                className="p-6 hover:bg-[#E5E7E9]/30 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-[#415A80]" />
                      <span className="font-medium">Dr. {app.doctor.name}</span>
                      {app.doctor.specialty && (
                        <span className="text-sm text-gray-500">
                          ({app.doctor.specialty})
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-[#415A80]" />
                      <span>
                        {format(new Date(app.date), "EEEE, MMMM d, yyyy")}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-[#415A80]" />
                      <span>{app.time}</span>
                    </div>

                    {app.reason && (
                      <div className="flex items-start gap-2">
                        <FileText className="h-5 w-5 text-[#415A80] mt-0.5" />
                        <span className="text-gray-700">{app.reason}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    {getStatusBadge(app.status)}

                    {app.status === "pending" && (
                      <button
                        onClick={() => confirmCancel(app._id)}
                        className={`text-sm font-medium inline-flex items-center transition-colors ${canCancel(app.date, app.time) ? "text-red-600 hover:text-red-800" : "text-gray-400 cursor-not-allowed"}`}
                        disabled={!canCancel(app.date, app.time)}
                      >
                        <XCircle className="h-4 w-4 mr-1" /> Cancel Appointment
                      </button>
                    )}

                    {app.status === "approved" && app.paymentStatus !== "paid" && (
                      <button
                        onClick={() => window.location.href = `/patient/payment/${app._id}`}
                        className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-1 rounded transition-colors flex items-center"
                      >
                        <CreditCard className="h-4 w-4 mr-2" /> Pay Now
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {cancelId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            <div className="bg-[#415A80] text-white px-6 py-4 flex justify-between items-center">
              <h2 className="text-lg font-medium">Cancel Appointment</h2>
              <button
                onClick={() => {
                  setCancelId(null);
                  setCancelReason("");
                }}
                className="text-white hover:text-[#D7E2E9] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <p className="mb-3 text-gray-700">
                Please provide a reason for cancellation:
              </p>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full border border-[#D7E2E9] p-3 rounded-lg bg-[#E5E7E9] focus:ring-[#A5D4DC] focus:border-[#A5D4DC] focus:outline-none"
                placeholder="Enter your reason here..."
                rows={3}
              />
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setCancelId(null);
                    setCancelReason("");
                  }}
                  className="px-4 py-2 border border-[#D7E2E9] text-gray-700 rounded-lg hover:bg-[#E5E7E9] transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={submitCancel}
                  disabled={!cancelReason.trim()}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:bg-red-300 disabled:cursor-not-allowed"
                >
                  Confirm Cancellation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
