"use client"
import React, { useState } from "react";
import Confetti from "react-confetti";
import getUser from "@/libs/actions/getUser";
import Cookie from "js-cookie"; 
import axios, { all } from 'axios';

// interface Items {
//   item_name: string,
//   date: string[],
//   price: string
// }

interface ConfirmBookingButtonProps {
  items: any[];
}

const ConfirmBookingButton: React.FC<ConfirmBookingButtonProps> = ({ items }) => {
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [fade, setFade] = useState(false);

  const sendEmail = async() => {
    const temp = Cookie.get("user_id");
    const result = (await getUser(temp));
    const email = JSON.parse(result || "").email;

    const jsonBody = {
      items: items,
      email: email
    }
    
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/invoice/send`,
      jsonBody
    )

    const data = res.data;
  }

  const handleConfirmBooking = () => {
    // Logic to confirm booking and send email 
    setConfirmationMessage("Congratulations your trip as been booked, check your email for the confirmation of your booking. Safe travels and enjoy your stay!");
    sendEmail()
    setShowConfetti(true)
    
    //Fade out & stop confetti...
    setTimeout(() => {
      setFade(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 2000)
    }, 8000)

  };

  return (
    <div className="relative">
      <div className="absolute inset-0">
        {showConfetti && (
          <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          className={fade ? "confetti animate-fadeOut" : "confetti"}
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