import React, { useEffect } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Page Not Found | Evenzy";
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white px-4 text-center">
      <img src="/error.svg" className="max-w-[70%] max-h-[50%]" />
      <h1 className="text-2xl mt-6 md:text-5xl font-bold text-red-500 mb-1 md:mb-4">
        Page Not Found
      </h1>
      <p className="text-xs md:text-xl text-gray-600 mb-4">
        Oops! The page you are looking for doesn't exist.
      </p>
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full text-base md:text-lg transition"
      >
        <FiArrowLeft size={20} />
        Back to Home
      </button>
    </div>
  );
};

export default ErrorPage;
