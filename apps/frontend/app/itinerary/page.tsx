"use client"
import { Input, Button } from "@nextui-org/react";
import { CgBookmark } from "react-icons/cg";

import React, { useState } from "react";
import SearchModal from "./SearchModal";
import "./modal.css";

  //Save button

const Itinerary = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [size, setSize] = useState('md');

  // const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', 'full'];

  const handleOpen = () => {
    // setSize(size);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative flex flex-col space-x-1 justify-center items-center">
    <div className="flex flex-col border border-gray-300 rounded-lg p-4 bg-white shadow-md w-[96vw] h-auto iteneraryInfo">
      <h1 className="mb-2 text-2xl font-bold text-gray-800 iteneraryHeader "  style={{ fontSize: '2rem', marginBottom:20 }}>Itinerary Items:</h1>
      <div className="shadow-md p-4 rounded-lg bg-blue-200">
      <form >
        <div className="mb-4">
          <label htmlFor="tripName" className="block text-sm font-medium text-gray-700" >Trip Name</label>
          <input
            type="text"
            id="tripName"
            name="tripName"
            className="mt-1 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm outline-none" 
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date of Trip</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              className="mt-1 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm outline-none"
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date of Trip</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              className="mt-1 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm outline-none"
            />
          </div>
        </div>

      </form>
      </div>
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
            
          <div className="relative rounded-md border-black-500 button-div">
            <Button className="bg-blue-500 rounded-md addButton" key="md" onClick={handleOpen}>+</Button>
            <SearchModal isOpen={isOpen} onClose={handleClose}/>
          </div>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 px-12">
        <Button className="border-2 border-black-500 rounded-md doneButton bg-blue-700">
          Done
        </Button>
      </div>



        <div className="absolute bottom-4 left-4 px-8 justify-center items-center">
          <button className="p-1 border-2 border-black-500 rounded-md flex space-x-2 saveButton">
            <CgBookmark />
          </button>
        </div>
      </div>
    </div>
  );
};
  
  export default Itinerary;