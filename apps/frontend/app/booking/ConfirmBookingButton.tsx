"use client"
import React, { useState } from "react";
import Confetti from "react-confetti";
import { getUserProfile } from "../account/index"

interface ConfirmBookingButtonProps {
  email: string;
  bookingDetails: string;
}

const sendEmail = async() => {
    const email = (await getUserProfile()).email
    const res = await fetch('/api/execute?email=' + email);
    const data = await res.json();
    console.log(data)
}

const ConfirmBookingButton = () => {
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  
  const handleConfirmBooking = () => {
    // Logic to confirm booking and send email 
    setConfirmationMessage("Congratulations your trip as been booked, check your email for the confirmation of your booking. Safe travels and enjoy your stay!");
    sendEmail()
    setShowConfetti(true);
  };

  return (
    <div className="relative">
      <div className="absolute inset-0">
        {showConfetti && (
          <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          style={{ position: "fixed", top: 0, left: 0, zIndex: -1 }}
        />
        )}
      </div>

      <div className="relative z-10">
        <button
          onClick={handleConfirmBooking}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Confirm Booking
        </button>

        {confirmationMessage && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
            {confirmationMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmBookingButton;