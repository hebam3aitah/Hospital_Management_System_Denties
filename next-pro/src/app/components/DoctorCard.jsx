// /components/DoctorCard.jsx
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const DoctorCard = ({ doctor }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-48 bg-gray-200 relative">
        {doctor.profilePicture ? (
          <Image
            src={doctor.profilePicture}
            alt={doctor.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
        <p className="text-[#415A80] font-medium">{doctor.specialization}</p>
        <p className="text-gray-500 mt-1">
          {doctor.experienceYears} years of experience
        </p>
        {doctor.address && (
          <p className="text-gray-500 text-sm mt-2">{doctor.address}</p>
        )}
        <Link
          href={`/patient/book`}
          className="flex items-center justify-center"
        >
          <button
            onClick={() => {
              localStorage.setItem("bookDoctor", doctor.name);
            }}
            className="mt-4 w-full bg-[#415A80] hover:cursor-pointer hover:bg-[#2a4062] text-white py-2 px-4 rounded-md transition-colors"
          >
            Book Appointment
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;
