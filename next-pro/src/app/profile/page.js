
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { format } from "date-fns";
import {
  Calendar,
  Clock,
  User as UserIcon,
  FileText,
  AlertCircle,
  X as CloseIcon,
  Check,
  XCircle,
  CreditCard,
  Mail,
  MapPin,
  UserCheck,
  CalendarDays,
  Save,
  FileUp,
  Loader,
  CheckCircle,
  File
} from "lucide-react";

// Status badge helper function
function getStatusBadge(status) {
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
}

// Helper to check if appointment can be cancelled
function canCancel(date, time) {
  try {
    const appointmentDateTime = new Date(`${date}T${time}`);
    const now = new Date();
    const diff = (appointmentDateTime - now) / (1000 * 60 * 60); // difference in hours
    return diff >= 1 && !isNaN(diff);
  } catch (error) {
    console.error("Error calculating cancel eligibility:", error);
    return false;
  }
}

export default function ProfilePage() {
  // Profile states
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState("");
  const [profileSuccess, setProfileSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  // Appointments states
  const [appointments, setAppointments] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [appointmentsError, setAppointmentsError] = useState("");

  // Cancellation states
  const [cancelReason, setCancelReason] = useState("");
  const [cancelId, setCancelId] = useState(null);

  // Profile data fetching
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoadingProfile(true);
        const res = await fetch("/api/profile");
        if (!res.ok) {
          throw new Error("Failed to load profile data");
        }
        const data = await res.json();
        setUserData(data);
        // Fill editable fields
        setName(data.name || "");
        setAddress(data.address || "");
      } catch (err) {
        console.error(err);
        setProfileError("Error loading profile data.");
      } finally {
        setLoadingProfile(false);
      }
    };
    fetchProfile();
  }, []);

  // Appointments fetching
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoadingAppointments(true);
        const res = await axios.get("/api/bookings/my");
        setAppointments(res.data);
      } catch (err) {
        setAppointmentsError(
          "Failed to load your appointments. Please try again later."
        );
        console.error("Error fetching appointments:", err);
      } finally {
        setLoadingAppointments(false);
      }
    };
    fetchAppointments();
  }, []);

  // Handle profile update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileError("");
    setProfileSuccess("");
    setSaving(true);

    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, address }),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to update profile");
      }
      const updated = await res.json();
      setUserData(updated.user);
      setProfileSuccess("Profile updated successfully.");
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => {
        setProfileSuccess("");
      }, 3000);
    } catch (error) {
      console.error(error);
      setProfileError(error.message || "An error occurred while updating profile");
    } finally {
      setSaving(false);
    }
  };

  // Confirm appointment cancellation
  const confirmCancel = (appointmentId) => {
    setCancelId(appointmentId);
  };

  // Execute cancellation
  const submitCancel = async () => {
    if (!cancelReason.trim()) return;

    try {
      await axios.put(`/api/bookings/${cancelId}`, {
        status: "cancelled",
        cancelMessage: cancelReason,
      });
      // Update appointments list without reloading
      setAppointments((prev) => 
        prev.map(a => a._id === cancelId ? { ...a, status: "cancelled" } : a)
      );

      // Clean up cancellation fields
      setCancelId(null);
      setCancelReason("");
    } catch (err) {
      alert("Failed to cancel the appointment. Please try again.");
      console.error("Error cancelling appointment:", err);
    }
  };

  // Loading state
  if (loadingProfile) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="flex flex-col items-center">
          <Loader className="h-10 w-10 text-[#415A80] animate-spin" />
          <p className="mt-4 text-gray-600">Loading profile information...</p>
        </div>
      </div>
    );
  }

  // No user data found
  if (!userData) {
    return (
      <div className="max-w-5xl mx-auto py-8 px-4">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>User data not found. Please make sure you are logged in.</span>
          </div>
          <div className="mt-4">
            <Link href="/login" className="text-[#415A80] hover:underline">
              Go to login page
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-8">
      {/* Profile Section */}
      <section className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-[#D7E2E9] p-6">
          <h2 className="text-2xl font-bold text-[#415A80]">My Profile</h2>
          <p className="text-gray-500 mt-1">Manage your personal information</p>
        </div>

        <div className="p-6">
          {/* Status messages */}
          {profileError && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6 flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <span>{profileError}</span>
            </div>
          )}
          
          {profileSuccess && (
            <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg mb-6 flex items-start">
              <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <span>{profileSuccess}</span>
            </div>
          )}

          {/* User information display */}
          <div className="bg-[#F8FAFC] rounded-lg p-6 mb-6 space-y-4">
            <div className="flex items-start">
              <div className="bg-[#E5E7E9] p-2 rounded-full mr-3 mt-0.5">
                <Mail className="h-5 w-5 text-[#415A80]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-[#415A80]">{userData.email}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-[#E5E7E9] p-2 rounded-full mr-3 mt-0.5">
                <UserCheck className="h-5 w-5 text-[#415A80]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Account Type</p>
                <p className="font-medium text-[#415A80] capitalize">{userData.role}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-[#E5E7E9] p-2 rounded-full mr-3 mt-0.5">
                <CalendarDays className="h-5 w-5 text-[#415A80]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Birth Date</p>
                <p className="font-medium text-[#415A80]">
                  {userData.birthDate ? new Date(userData.birthDate).toLocaleDateString() : "Not specified"}
                </p>
              </div>
            </div>
          </div>

          {/* Edit profile form */}
          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#415A80] mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  type="text"
                  className="pl-10 w-full border border-[#D7E2E9] rounded-lg p-2.5 bg-[#E5E7E9] focus:ring-[#A5D4DC] focus:border-[#A5D4DC] focus:outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-[#415A80] mb-1">
                Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="address"
                  type="text"
                  className="pl-10 w-full border border-[#D7E2E9] rounded-lg p-2.5 bg-[#E5E7E9] focus:ring-[#A5D4DC] focus:border-[#A5D4DC] focus:outline-none"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="bg-[#415A80] hover:bg-[#A5D4DC] text-white px-4 py-2 rounded-lg transition-colors flex items-center disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <Loader className="animate-spin -ml-1 mr-2 h-5 w-5" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5 mr-2" />
                    Save Profile
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Appointments Section */}
      <section className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-[#D7E2E9] p-6">
          <h2 className="text-2xl font-bold text-[#415A80]">My Appointments</h2>
          <p className="text-gray-500 mt-1">View and manage your upcoming appointments</p>
        </div>

        <div className="p-6">
          {/* Loading state */}
          {loadingAppointments ? (
            <div className="flex justify-center items-center py-12">
              <div className="flex flex-col items-center">
                <Loader className="h-8 w-8 text-[#415A80] animate-spin" />
                <p className="mt-4 text-gray-600">Loading your appointments...</p>
              </div>
            </div>
          ) : appointmentsError ? (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
              <div className="flex">
                <AlertCircle className="h-5 w-5 mr-2" />
                <span>{appointmentsError}</span>
              </div>
            </div>
          ) : appointments.length === 0 ? (
            <div className="bg-[#F8FAFC] rounded-lg p-8 text-center">
              <Calendar className="h-12 w-12 text-[#A5D4DC] mx-auto mb-4" />
              <h3 className="text-xl font-medium text-[#415A80] mb-2">
                No Appointments Found
              </h3>
              <p className="text-gray-600 mb-6">
                You don't have any scheduled appointments at the moment.
              </p>
              <Link 
                href="/book"
                className="inline-flex items-center bg-[#415A80] hover:bg-[#A5D4DC] text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Book an Appointment
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-[#D7E2E9] -mx-6">
              {appointments.map((app) => (
                <div
                  key={app._id}
                  className="p-6 hover:bg-[#F8FAFC] transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-5">
                    {/* Appointment details */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="bg-[#E5E7E9] p-2 rounded-full">
                          <UserIcon className="h-5 w-5 text-[#415A80]" />
                        </div>
                        <div>
                          <span className="font-medium text-[#415A80]">
                            Dr. {app.doctor?.name || "Unknown"}
                          </span>
                          {app.doctor?.specialty && (
                            <span className="text-sm text-gray-500 ml-1">
                              ({app.doctor.specialty})
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="bg-[#E5E7E9] p-2 rounded-full">
                          <Calendar className="h-5 w-5 text-[#415A80]" />
                        </div>
                        <span className="text-gray-700">
                          {format(new Date(app.date), "EEEE, MMMM d, yyyy")}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="bg-[#E5E7E9] p-2 rounded-full">
                          <Clock className="h-5 w-5 text-[#415A80]" />
                        </div>
                        <span className="text-gray-700">{app.time || "Time not specified"}</span>
                      </div>

                      {app.reason && (
                        <div className="flex items-start gap-2">
                          <div className="bg-[#E5E7E9] p-2 rounded-full mt-0.5">
                            <FileText className="h-5 w-5 text-[#415A80]" />
                          </div>
                          <span className="text-gray-700">{app.reason}</span>
                        </div>
                      )}
                    </div>

                    {/* Status and action buttons */}
                    <div className="flex flex-col items-end gap-3">
                      <div className="space-y-2">
                        {getStatusBadge(app.status)}
                        {app.paymentStatus && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            <CreditCard className="w-3 h-3 mr-1" />
                            {app.paymentStatus === "paid" ? "Paid" : "Payment Due"}
                          </span>
                        )}
                      </div>

                      <div className="mt-2 space-y-2">
                        {app.status === "pending" && (
                          <button
                            onClick={() => canCancel(app.date, app.time) && confirmCancel(app._id)}
                            className={`text-sm font-medium inline-flex items-center px-3 py-1.5 rounded-md transition-colors ${
                              canCancel(app.date, app.time)
                                ? "bg-red-50 text-red-600 hover:bg-red-100"
                                : "bg-gray-100 text-gray-400 cursor-not-allowed"
                            }`}
                            disabled={!canCancel(app.date, app.time)}
                            title={!canCancel(app.date, app.time) ? "Cannot cancel appointments less than 1 hour before start time" : ""}
                          >
                            <XCircle className="h-4 w-4 mr-1.5" />
                            Cancel Appointment
                          </button>
                        )}

                        {app.status === "approved" && (!app.paymentStatus || app.paymentStatus !== "paid") && (
                          <Link
                            href={`/patient/payment/${app._id}`}
                            className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-1.5 rounded-md transition-colors flex items-center"
                          >
                            <CreditCard className="h-4 w-4 mr-2" />
                            Pay Now
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Medical Report Section */}
      {userData.report && (
        <section className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b border-[#D7E2E9] p-6">
            <h2 className="text-2xl font-bold text-[#415A80]">Medical Report</h2>
            <p className="text-gray-500 mt-1">View your medical report documents</p>
          </div>
          
          <div className="p-6">
            <div className="bg-[#F8FAFC] rounded-lg p-6">
              {userData.report.toLowerCase().endsWith(".pdf") ? (
                <div className="flex flex-col items-center">
                  <div className="bg-red-100 p-4 rounded-full mb-4">
                    <File className="h-8 w-8 text-red-600" />
                  </div>
                  <p className="text-[#415A80] font-medium mb-4">Your medical report (PDF)</p>
                  <a
                    href={userData.report}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#415A80] hover:bg-[#A5D4DC] text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                  >
                    <FileUp className="h-5 w-5 mr-2" />
                    View PDF Report
                  </a>
                </div>
              ) : (
                <div>
                  <p className="text-[#415A80] font-medium mb-4">Your medical report image:</p>
                  <div className="border border-[#D7E2E9] rounded-lg overflow-hidden">
                    <img
                      src={userData.report}
                      alt="Medical Report"
                      className="max-w-full h-auto"
                    />
                  </div>
                  <div className="mt-4 text-right">
                    <a
                      href={userData.report}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#415A80] hover:text-[#A5D4DC] transition-colors inline-flex items-center"
                    >
                      <FileUp className="h-5 w-5 mr-1" />
                      Open in new tab
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Cancellation Modal */}
      {cancelId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-fadeIn">
            <div className="bg-[#415A80] text-white px-6 py-4 flex justify-between items-center">
              <h2 className="text-lg font-medium">Cancel Appointment</h2>
              <button
                onClick={() => {
                  setCancelId(null);
                  setCancelReason("");
                }}
                className="text-white hover:text-[#D7E2E9] transition-colors focus:outline-none"
                aria-label="Close"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4 pb-4 border-b border-[#D7E2E9]">
                <p className="text-sm text-gray-500">
                  Appointments can only be cancelled at least 1 hour before the scheduled time.
                </p>
              </div>
              <p className="mb-3 text-gray-700 font-medium">
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
                  className="px-4 py-2 border border-[#D7E2E9] text-gray-700 rounded-lg hover:bg-[#E5E7E9] transition-colors focus:outline-none focus:ring-2 focus:ring-[#D7E2E9] focus:ring-offset-2"
                >
                  Close
                </button>
                <button
                  onClick={submitCancel}
                  disabled={!cancelReason.trim()}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:bg-red-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
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