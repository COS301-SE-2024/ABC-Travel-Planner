"use client";
import React from "react";
import { useRouter } from "next/navigation";

const BookingConfirmation = () => {
  const router = useRouter();
  function handleBackClick() {
    router.push("/home");
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-10 rounded-lg shadow-xl max-w-md w-full">
        <div className="text-center">
          <i className="fas fa-check-circle text-green-500 text-5xl mb-4"></i>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-gray-700 mb-6">
            Thank you for your booking. You will receive a confirmation email
            shortly.
          </p>
          <button
            className="px-6 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={handleBackClick}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
