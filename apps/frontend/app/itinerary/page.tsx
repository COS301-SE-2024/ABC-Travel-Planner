import { Input, Button, Link } from "@nextui-org/react";
import React from "react";
import SearchModal from "./SearchModal";
import BookMarkComponent from "./BookMarkComponent";
import DynamicDivs from "./DynamicDivs"
import "./modal.css";

const Itinerary = () => {

{/* <div className="grid grid-cols-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 iteneraries-grid rounded-lg h-full sm:h-auto">
            <div className="relative border-2 border-black-500 rounded-md bg-gray-200 item-div">
              <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none closeButton">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <button className="bg-blue-500 rounded-md"></button>
            </div>

            <div className="relative border-2 border-black-500 rounded-md bg-gray-200 item-div">
              <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none closeButton">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <button className="bg-gray-500 rounded-md"></button>
            </div>
            
            <div className="relative border-2 border-black-500 rounded-md bg-gray-200 item-div">
              <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none closeButton">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <button className="bg-blue-500 rounded-md"></button>
            </div>

            <div className="relative border-2 border-black-500 rounded-md bg-gray-200 item-div">
              <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none closeButton">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <button className="bg-blue-500 rounded-md"></button>
            </div>

            <div className="relative border-2 border-black-500 rounded-md bg-gray-200 item-div">
              <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none closeButton">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <button className="bg-blue-500 rounded-md"></button>
            </div>

            <div className="relative border-2 border-black-500 rounded-md bg-gray-200 item-div">
              <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none closeButton">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <button className="bg-blue-500 rounded-md"></button>
            </div>

            <div className="relative border-2 border-black-500 rounded-md bg-gray-200 item-div">
              <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none closeButton">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <button className="bg-blue-500 rounded-md"></button>
            </div>

            <div className="relative border-2 border-black-500 rounded-md bg-gray-200 item-div">
              <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none closeButton">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <button className="bg-blue-500 rounded-md"></button>
            </div> */}

  return (
    <div className="relative flex flex-col space-x-1 justify-center items-center">
    <div className="flex flex-col border border-gray-300 rounded-lg p-4 bg-white shadow-md w-[96vw] h-auto iteneraryInfo">
      <h1 className="mb-2 text-2xl font-bold text-gray-800 iteneraryHeader "  style={{ fontSize: '2rem', marginBottom:20 }}>Itinerary Items:</h1>
      <div className="shadow-md p-4 rounded-lg bg-gray-200">
      <form >
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
            <DynamicDivs />
            
            <div className="relative rounded-md border-black-500 button-div">
              <SearchModal/>
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 right-4 px-12">
          <Link href='/booking'>
            <Button className="border-2 border-black-500 rounded-md doneButton bg-blue-700">
              Done
            </Button>
          </Link>
        </div>

        <div className="absolute bottom-4 left-4 px-8 justify-center items-center">
            <BookMarkComponent />
        </div>
      </div>
    
  );
};
  
export default Itinerary;