import { Button} from "@nextui-org/react";
import Link from 'next/link';
import React from "react";
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

  return (
    <>
    <div className="relative flex flex-col space-x-1 justify-center items-center text-center bg-neutral-300">
      <div className="flex flex-col border border-gray-300 rounded-lg bg-white shadow-md w-[96vw] h-auto iteneraryInfo itineraryItemsBackground">
      <div className="h-full w-full"> 
      <div className="flex items-center justify-center bg-slate-50 rounded-sm border-t-orange-500">
        <h1 className="mb-2 text-4xl font-medium font-['Roboto'] text-black mt-6 w-fit iteneraryHeader backdrop-filter backdrop-blur-[2px] backdrop-contrast-100 rounded-lg"  style={{  marginBottom:20 }}>Itinerary Items:</h1>
        <div className="absolute top-14 left-6 px-8 justify-center items-center">
            <BookMarkComponent />
        </div>

        <div className='mt-10 w-100 h-10'>
        <div className="absolute top-8 right-8 px-4">
        <Link href={`/booking?id=${id}`}>
          <Button className="border-2 border-black-500 rounded-md doneButton bg-sky-600">
            Done
          </Button>
        </Link>
        </div>
      </div>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 iteneraries-grid rounded-lg h-full sm:h-auto text-gray-800 ">
            <DynamicDivs id={id} location={location} destination={destination} />
        </div>
      </div>
      </div>
    </div>
  </div>
  </>
  );
};
  
export default ItineraryItems;