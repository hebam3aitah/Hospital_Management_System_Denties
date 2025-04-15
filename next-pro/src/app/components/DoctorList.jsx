// /components/DoctorList.jsx
import React from "react";
import DoctorCard from "./DoctorCard";

const DoctorList = ({ doctors, specialization }) => {
  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#2a4062]">
          {specialization ? `${specialization} Doctors` : "All Doctors"}
        </h2>
        <p className="mt-2 text-gray-600">{doctors.length} doctors available</p>
      </div>

      {doctors.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">
            No doctors found in this category.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorList;
