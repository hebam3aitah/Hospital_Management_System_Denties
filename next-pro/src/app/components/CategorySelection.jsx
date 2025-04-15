// /components/CategorySelection.jsx
import React from "react";
import { useRouter } from "next/navigation";

const CategorySelection = () => {
  const router = useRouter();

  const categories = [
    {
      name: "Children",
      description: "Specialized care for children and adolescents",
      image:
        "https://i.pinimg.com/736x/2a/ec/ce/2aecce0f2bd5459497fe808b9c440d6f.jpg",
    },
    {
      name: "Cosmetic",
      description: "Procedures focused on improving appearance",
      image:
        "https://i.pinimg.com/474x/a9/00/91/a9009112eb3ce307349326c256678f56.jpg",
    },
    {
      name: "General",
      description: "Comprehensive healthcare for all patients",
      image:
        "https://i.pinimg.com/736x/65/5f/36/655f367ef2303bff027a66e226b098a0.jpg",
    },
  ];

  const handleCategoryClick = (category) => {
    router.push(`/doctors?specialization=${category}`);
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Choose a Medical Specialization
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Select a category to find specialized doctors for your needs
          </p>
        </div>

        <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.name}
              className="bg-white rounded-xl shadow-xl overflow-hidden cursor-pointer transform transition-transform hover:scale-105 border border-gray-100"
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="h-48 bg-gradient-to-r from-blue-50 to-indigo-50 relative">
                {/* For actual implementation, replace with actual images */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">
                  {category.name}
                </h3>
                <p className="mt-2 text-gray-600 line-clamp-2">
                  {category.description}
                </p>
                <button className="mt-4 hover:cursor-pointer bg-[#415A80] hover:bg-[#384b67] text-white py-2 px-6 rounded-lg shadow-md transition-all duration-300 font-medium flex items-center justify-center">
                  Find Doctors{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySelection;
