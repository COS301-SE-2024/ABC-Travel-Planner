"use client"
import { Input, Button } from "@nextui-org/react";
import React, { useState } from "react";
import SearchModal from "./SearchModal";
import "./modal.css";

const radiusOptions = [
  "full",
  "lg",
  "md",
  "sm",
  "none"
];

//Input for the date of the trip
//...

//Middle section
  //Plus button
  //Dynamically add the boxes as the user clicks (if successful)
  //Done button
  //Save button

const Itinerary = () => {
  const [visible, setVisible] = useState(false);
  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);
  
  return (
    <div className="relative flex flex-col space-x-1 justify-center items-center">
      <div className="flex flex-col border border-gray-300 rounded-lg p-4 bg-white shadow-md w-[96vw] h-auto overflow-auto iteneraryInfo">
        <h1 className="mb-2 text-2xl font-bold text-gray-800 iteneraryHeader">Itinerary Items:</h1>
        <div className="flex justify-start">
          <label htmlFor="email" className="text-sm font-medium text-gray-700 emailLabel">Email:</label>
          <Input
            id="email"
            type="email"
            placeholder="Itinerary name"
            defaultValue="Default itinerary"
            className="max-w-[220px] emailInput"
          />
        </div>
        <label htmlFor="datePicker" className="text-sm font-medium text-gray-700 emailLabel">Start date of trip:</label>
        <Input
            id="date"
            type="date"
            placeholder="date"
            defaultValue=""
            className="max-w-[220px]"
          />
        <label htmlFor="datePicker" className="text-sm font-medium text-gray-700 emailLabel">End date of trip:</label>
        <Input
            id="date"
            type="date"
            placeholder="date"
            defaultValue=""
            className="max-w-[220px]"
          /> 

        <div className="flex justify-center">
          <div className="grid grid-cols-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 iteneraries-grid rounded-lg h-full sm:h-auto">
            <div className="relative border-2 border-black-500 rounded-md item-div">
              <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none closeButton">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <button className="bg-blue-500 rounded-md"></button>
            </div>

            <div className="relative border-2 border-black-500 rounded-md item-div">
              <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none closeButton">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <button className="bg-blue-500 rounded-md"></button>
            </div>
            
            <div className="relative border-2 border-black-500 rounded-md item-div">
              <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none closeButton">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <button className="bg-blue-500 rounded-md"></button>
            </div>

            <div className="relative border-2 border-black-500 rounded-md item-div">
              <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none closeButton">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <button className="bg-blue-500 rounded-md"></button>
            </div>
            
            <div className="relative border-2 rounded-md border-black-500 button-div">
              <button className="bg-blue-500 rounded-md addButton" onClick={SearchModal}>+</button>
            </div>
          </div>
        </div>

          <div className="absolute bottom-4 right-4 px-8">
            <Button className="border-2 border-black-500 rounded-md doneButton">Done</Button>
          </div>
      </div>
    </div>
  );          //The className for the div holding the buttons/divs will have to change as the itinerary grows bigger
};
  
  export default Itinerary;
  