"use client"
import React from 'react';
import { FaEnvelope, FaPhone, FaQuestionCircle, FaVideo, FaPlane } from 'react-icons/fa';
import ClearLocalStorage from './clearLocalStorage';
import { useTheme } from "../context/ThemeContext";

const Help = () => {
  const { selectedTheme, themeStyles, setTheme } = useTheme();
  // Mock data for FAQs
  const faqs = [
    { question: 'How do I book a flight?', answer: 'To book a flight, go to the Flights section in the Search page, Type anything related to your flight preference.' },
    { question: 'Can I cancel my booking?', answer: 'Not directly through us, you will have to cancel with the airline.' },
    { question: 'Are there any hidden fees?', answer: 'No, we do not have any hidden fees. The price you see is the price you pay.' },
    { question: 'What payment methods do you accept?', answer: 'We accept credit/debit cards and EFT transfer for booking payments.' },
    { question: 'How can I contact customer support?', answer: 'You can contact customer support by sending an email or phoning us with the details below.' },
    { question: 'Do you offer travel insurance?', answer: 'No, we do not offer travel insurance.' },
    { question: 'Are meals included in my booking?', answer: 'Meals strictly depend on who where you book.' },
    { question: 'Do I need a passport for international travel?', answer: 'Yes, you will need a valid passport for international travel. Make sure to check passport validity requirements for your destination.' },
  ];
  

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold items-center text-center pt-10">Help Centre </h1>
      <div className="rounded-lg shadow-md p-6 mb-6 text-center items-center" style={{ background: themeStyles.primaryColor, padding: '20px' }}>
        <div className="flex justify-center">
          <h2 className="text-2xl font-bold mb-4 flex items-center text-center">Steps to Book a Trip <FaPlane className="ml-2" /></h2>
        </div>
        <ol className="list-decimal list-inside text-left pl-10">
          <li>Go to the Itinerary tab.</li>
          <li>Click on &quot;Add Itinerary&quot; and name your trip and location.</li>
          <li>Search for flights, stays, car rentals, attractions, or airport taxis you want to add.</li>
          <li>Add your selected options to the created itinerary.</li>
          <li> You will be prompted to confirm your booking. A confirmation email will be sent to you.</li>
        </ol>
      </div>

      <div className="rounded-lg shadow-md p-6 mb-6" style={{ backgroundColor: themeStyles.primaryColor, padding: '20px', width: '100%' }}>
  <div className="flex justify-center">
    <h2 className="text-2xl font-bold mb-4 flex items-center text-center">Frequently Asked Questions <FaQuestionCircle className="ml-2" /></h2>
  </div>
  <ol className="list-decimal text-left pl-10"> {/* Added pl-4 for left padding */}
    {faqs.map((faq, index) => (
      <li key={index} className="mb-4">
        <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
        <p className="text-gray-700">{faq.answer}</p>
      </li>
    ))}
  </ol>
</div>

      <div className="rounded-lg shadow-md p-6 mb-6" style={{background: themeStyles.primaryColor, padding: '20px' }}>
        <div className="flex justify-center">
          <h2 className="text-2xl font-bold mb-4 flex items-center text-center">Contact Us <FaEnvelope className="ml-2" /></h2>
        </div>
        <p className="text-gray-700">If you have any other questions or need assistance, please contact our customer support team:</p>
        <p className="text-gray-700">
          Email: <FaEnvelope className="inline-block" /><a className="text-blue-500" href="mailto:abctravel@gmail.com"> abctravel@gmail.com</a><br />
          Phone:<FaPhone className="inline-block" /> <a className="text-blue-500" href="tel:+1814562345661"> 0814562345 </a>or<a className="text-blue-500" href="tel:+1713452668"> 0713452668</a>
        </p>
      </div>

      <div className="rounded-lg shadow-md p-6 mb-6 text-center" style={{ background: themeStyles.primaryColor, padding: '20px' }}>
        <div className="flex justify-center">
          <h2 className="text-2xl font-bold mb-4 flex items-center text-center">Need more information? Watch Me! <FaVideo className="ml-2" /></h2>
        </div>
        <div className="flex justify-center">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/46T9_IJYGF0"
            title="ABC Travel Planner Video"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <ClearLocalStorage />

    </div>
  );
};

export default Help;
