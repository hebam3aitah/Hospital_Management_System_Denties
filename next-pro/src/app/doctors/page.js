// /app/doctors/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import DoctorList from "../components/DoctorList";
import Link from "next/link";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchParams = useSearchParams();
  const specialization = searchParams.get("specialization");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const url = specialization
          ? `/api/doctors/category?specialization=${specialization}`
          : "/api/doctors/category";

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch doctors");
        }

        const result = await response.json();
        setDoctors(result.data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [specialization]);

  // Categories for filtering
  const categories = ["Children", "Cosmetic", "General"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/"
          className="text-[#2b4163] hover:text-[#293c55] flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Home
        </Link>

        <div className="flex items-center space-x-2">
          <span className="text-gray-600">Filter by:</span>
          <div className="flex space-x-2">
            <Link
              href="/doctors"
              className={`px-4 py-2 rounded-md ${
                !specialization
                  ? "bg-[#415A80] text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              All
            </Link>

            {categories.map((category) => (
              <Link
                key={category}
                href={`/doctors?specialization=${category}`}
                className={`px-4 py-2 rounded-md ${
                  specialization === category
                    ? "bg-[#415A80] text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#415A80]"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      ) : (
        <DoctorList doctors={doctors} specialization={specialization} />
      )}
    </div>
  );
}
