"use client"
import React, { useState } from "react";
import Confetti from "react-confetti";
import getUser from "@/libs/actions/getUser";
import { createNewDates } from "../utils/functions/convertDates";
import Cookie from "js-cookie"; 
import axios, { all } from 'axios';
import { useTheme } from '../context/ThemeContext';
interface ConfirmBookingButtonProps {
  items: any[];
}

const ConfirmBookingButton: React.FC<ConfirmBookingButtonProps> = ({ items }) => {
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [fade, setFade] = useState(false);
  const { selectedTheme, themeStyles, setTheme } = useTheme();

  const sendEmail = async() => {
    const temp = Cookie.get("user_id");
    const result = (await getUser(temp));
    const email = JSON.parse(result || "").email;

    items.forEach((item) => {
      item.date = [createNewDates(item.date)];
    })

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
    
    // Fade out & stop confetti...
    setTimeout(() => {
      setFade(true);
    }, 8000)
    
    setTimeout(() => {
      setShowConfetti(false);
      setFade(false);
    }, 10000)
  };

  return (
    <div className="relative">
      <style>
      {`
          @keyframes fadeOut {
            0% {
              opacity: 1;
            }
            100% {
              opacity: 0;
            }
          }
        `}
      </style>
      <div className="fixed">
        {showConfetti && (
          <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          style={
                fade 
                  ? { 
                    position: "fixed", 
                    top: "0px", 
                    left: "0px", 
                    zIndex: 2, 
                    pointerEvents: "none", 
                    inset: "0px", 
                    animation: "fadeOut 2s linear" 
                  } 
                  : { 
                    position: "fixed", 
                    top: "0px", 
                    left: "0px", 
                    zIndex: 2, 
                    pointerEvents: "none", 
                    inset: "0px"
                  }
                }
        />
        )}
      </div>

      <div className="relative z-10">
        <button
          onClick={handleConfirmBooking}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
          style={{ background: themeStyles.navbarColor}}
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