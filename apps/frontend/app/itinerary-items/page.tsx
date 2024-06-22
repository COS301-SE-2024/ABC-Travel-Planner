
import { Input, Button, Link } from "@nextui-org/react";
import React from "react";
import SearchModal from "./SearchModal";
import BookMarkComponent from "./BookMarkComponent";


import "./modal.css";
import DynamicDivs from "./DynamicDivs";

const getCoordinates = async (location: string) => {
  const encodedAddress = encodeURIComponent(location);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK') {
      const location = data.results[0].geometry.location;
      console.log(`Latitude: ${location.lat}, Longitude: ${location.lng}`);
    } else {
      console.error(`Error: ${data.status}`);
    }
  } catch (error) {
    console.error('Error fetching geocode data:', error);
  }
};

const ItineraryItems = async ({ searchParams }: { searchParams: { id?: any; location?: string; destination?: any } }) => {
  const { location, id, destination } = searchParams;
  console.log(destination);
    
  return (
    <div className="relative flex flex-col space-x-1 justify-center items-center">
    <div className="flex flex-col border border-gray-300 rounded-lg p-4 bg-white shadow-md w-[96vw] h-auto iteneraryInfo">
      <h1 className="mb-2 text-2xl font-bold text-gray-800 iteneraryHeader "  style={{ fontSize: '2rem', marginBottom:20 }}>Itinerary Items:</h1>
      <div className="shadow-md p-4 rounded-lg bg-gray-200" style ={{backgroundColor: 'rgba(173, 216, 230, 0.5)'}}>
      <form >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-800">Start Date of Trip</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              className="mt-1 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm outline-none"
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-800">End Date of Trip</label>
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
        <div className="grid grid-cols-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 iteneraries-grid rounded-lg h-full sm:h-auto text-gray-800">
            <DynamicDivs />
        </div>
      </div>
      
      <div className="absolute bottom-4 right-4 px-4">
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
  </div>
  );
};
  
  export default ItineraryItems;