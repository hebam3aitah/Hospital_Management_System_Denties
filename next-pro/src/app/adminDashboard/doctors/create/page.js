// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";

// export default function AddDoctorPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ type: "", text: "" });
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     specialization: "",
//     experienceYears: "",
//     availability: [
//       { day: "Monday", from: "", to: "" },
//       { day: "Tuesday", from: "", to: "" },
//       { day: "Wednesday", from: "", to: "" },
//       { day: "Thursday", from: "", to: "" },
//       { day: "Friday", from: "", to: "" },
//       { day: "Saturday", from: "", to: "" },
//       { day: "Sunday", from: "", to: "" },
//     ],
//     profilePicture: "",
//     address: "",
//     birthDate: "",
//   });

//   const handleChange = (e) => {
//     const { name, value, type } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "number" ? (value ? parseInt(value, 10) : "") : value,
//     });
//   };

//   const handleAvailabilityChange = (i, field, value) => {
//     const copy = [...formData.availability];
//     copy[i][field] = value;
//     setFormData({ ...formData, availability: copy });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage({ type: "", text: "" });

//     // تجهيز البيانات للإرسال
//     const dataToSubmit = {
//       ...formData,
//       experienceYears: formData.experienceYears
//         ? parseInt(formData.experienceYears, 10)
//         : 0,
//       birthDate: formData.birthDate || null,
//     };

//     try {
//       // تأكد من أن مسار API صحيح
//       const response = await axios.post("/api/admin/doctors", dataToSubmit);
//       setMessage({ type: "success", text: "تم إضافة الطبيب بنجاح" });

//       // انتظر لحظة قبل التوجيه
//       setTimeout(() => {
//         router.push("/adminDashboard/doctors");
//       }, 1000);
//     } catch (error) {
//       console.error("Error adding doctor:", error);
//       let errorMessage = "حدث خطأ أثناء إضافة الطبيب";

//       if (error.response) {
//         errorMessage = error.response.data.message || errorMessage;
//       }

//       setMessage({ type: "error", text: errorMessage });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md">
//       <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
//         <h2 className="text-2xl font-bold text-gray-800">إضافة طبيب جديد</h2>

//         {message.text && (
//           <div
//             className={`p-4 rounded ${
//               message.type === "success"
//                 ? "bg-green-100 text-green-700"
//                 : "bg-red-100 text-red-700"
//             }`}
//           >
//             {message.text}
//           </div>
//         )}

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               الاسم الكامل
//             </label>
//             <input
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               البريد الإلكتروني
//             </label>
//             <input
//               name="email"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               كلمة المرور
//             </label>
//             <input
//               name="password"
//               type="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               التخصص
//             </label>
//             <input
//               name="specialization"
//               value={formData.specialization}
//               onChange={handleChange}
//               required
//               className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               سنوات الخبرة
//             </label>
//             <input
//               name="experienceYears"
//               type="number"
//               min="0"
//               value={formData.experienceYears}
//               onChange={handleChange}
//               className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               العنوان
//             </label>
//             <input
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               تاريخ الميلاد
//             </label>
//             <input
//               name="birthDate"
//               type="date"
//               value={formData.birthDate}
//               onChange={handleChange}
//               className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//         </div>

//         <div className="mt-6">
//           <h3 className="text-lg font-semibold text-gray-800">أوقات الدوام</h3>
//           <div className="mt-2 space-y-3">
//             {formData.availability.map((slot, i) => (
//               <div key={i} className="flex flex-wrap items-center gap-3">
//                 <span className="font-medium text-gray-700 w-24">
//                   {slot.day}
//                 </span>
//                 <div className="flex items-center gap-2">
//                   <label className="text-sm text-gray-600">من</label>
//                   <input
//                     type="time"
//                     value={slot.from}
//                     onChange={(e) =>
//                       handleAvailabilityChange(i, "from", e.target.value)
//                     }
//                     className="border border-gray-300 rounded p-1.5 shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <label className="text-sm text-gray-600">إلى</label>
//                   <input
//                     type="time"
//                     value={slot.to}
//                     onChange={(e) =>
//                       handleAvailabilityChange(i, "to", e.target.value)
//                     }
//                     className="border border-gray-300 rounded p-1.5 shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="flex justify-end pt-5">
//           <button
//             type="button"
//             onClick={() => router.push("/adminDashboard/doctors")}
//             className="ml-3 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           >
//             إلغاء
//           </button>
//           <button
//             type="submit"
//             disabled={loading}
//             className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
//               loading ? "opacity-75 cursor-not-allowed" : ""
//             }`}
//           >
//             {loading ? "جاري الإضافة..." : "إضافة الطبيب"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }



"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AddDoctorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    experienceYears: "",
    availability: [
      { day: "Monday", from: "", to: "" },
      { day: "Tuesday", from: "", to: "" },
      { day: "Wednesday", from: "", to: "" },
      { day: "Thursday", from: "", to: "" },
      { day: "Friday", from: "", to: "" },
      { day: "Saturday", from: "", to: "" },
      { day: "Sunday", from: "", to: "" },
    ],
    profilePicture: "",
    address: "",
    birthDate: "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? (value ? parseInt(value, 10) : "") : value,
    });
  };

  const handleAvailabilityChange = (i, field, value) => {
    const copy = [...formData.availability];
    copy[i][field] = value;
    setFormData({ ...formData, availability: copy });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    // Prepare data for submission
    const dataToSubmit = {
      ...formData,
      experienceYears: formData.experienceYears
        ? parseInt(formData.experienceYears, 10)
        : 0,
      birthDate: formData.birthDate || null,
    };

    try {
      // Make sure the API path is correct
      const response = await axios.post("/api/admin/doctors", dataToSubmit);
      setMessage({ type: "success", text: "Doctor added successfully" });

      // Wait a moment before redirecting
      setTimeout(() => {
        router.push("/adminDashboard/doctors");
      }, 1000);
    } catch (error) {
      console.error("Error adding doctor:", error);
      let errorMessage = "An error occurred while adding the doctor";

      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }

      setMessage({ type: "error", text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const specializations = [
    "General Practitioner",
    "Cardiologist",
    "Dermatologist",
    "Neurologist",
    "Gynecologist",
    "Pediatrician",
    "Orthopedic Surgeon",
    "Psychiatrist",
    "Ophthalmologist",
    "ENT Specialist",
    "Urologist",
    "Endocrinologist",
    "Gastroenterologist",
    "Oncologist",
    "Radiologist",
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold text-[#415A80] mb-6">Add New Doctor</h2>

        {message.text && (
          <div
            className={`p-4 rounded ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 w-full p-2 border border-[#E5E7E9] rounded-md shadow-sm focus:ring-[#415A80] focus:border-[#415A80]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full p-2 border border-[#E5E7E9] rounded-md shadow-sm focus:ring-[#415A80] focus:border-[#415A80]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 w-full p-2 border border-[#E5E7E9] rounded-md shadow-sm focus:ring-[#415A80] focus:border-[#415A80]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Specialization
            </label>
            <select
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
              className="mt-1 w-full p-2 border border-[#E5E7E9] rounded-md shadow-sm focus:ring-[#415A80] focus:border-[#415A80]"
            >
              <option value="">Select Specialization</option>
              {specializations.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Years of Experience
            </label>
            <input
              name="experienceYears"
              type="number"
              min="0"
              value={formData.experienceYears}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-[#E5E7E9] rounded-md shadow-sm focus:ring-[#415A80] focus:border-[#415A80]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-[#E5E7E9] rounded-md shadow-sm focus:ring-[#415A80] focus:border-[#415A80]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              name="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-[#E5E7E9] rounded-md shadow-sm focus:ring-[#415A80] focus:border-[#415A80]"
            />
          </div>
        </div>

        <div className="mt-6 bg-[#F8FAFC] p-4 rounded-lg border border-[#E5E7E9]">
          <h3 className="text-lg font-semibold text-[#415A80] mb-3">Availability Schedule</h3>
          <div className="mt-2 space-y-3">
            {formData.availability.map((slot, i) => (
              <div key={i} className="flex flex-wrap items-center gap-3 p-2 hover:bg-[#D7E2E9] rounded-md transition-colors duration-200">
                <span className="font-medium text-[#415A80] w-24">
                  {slot.day}
                </span>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">From</label>
                  <input
                    type="time"
                    value={slot.from}
                    onChange={(e) =>
                      handleAvailabilityChange(i, "from", e.target.value)
                    }
                    className="border border-[#E5E7E9] rounded p-1.5 shadow-sm focus:ring-[#415A80] focus:border-[#415A80]"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">To</label>
                  <input
                    type="time"
                    value={slot.to}
                    onChange={(e) =>
                      handleAvailabilityChange(i, "to", e.target.value)
                    }
                    className="border border-[#E5E7E9] rounded p-1.5 shadow-sm focus:ring-[#415A80] focus:border-[#415A80]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-5 border-t border-[#E5E7E9] mt-6">
          <button
            type="button"
            onClick={() => router.push("/adminDashboard/doctors")}
            className="mr-3 px-4 py-2 text-sm font-medium text-[#415A80] bg-white border border-[#E5E7E9] rounded-lg shadow-sm hover:bg-[#D7E2E9] transition duration-200 focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 text-sm font-medium text-white bg-[#415A80] border border-transparent rounded-lg shadow-sm hover:bg-[#334766] transition duration-200 focus:outline-none ${
              loading ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Adding..." : "Add Doctor"}
          </button>
        </div>
      </form>
    </div>
  );
}