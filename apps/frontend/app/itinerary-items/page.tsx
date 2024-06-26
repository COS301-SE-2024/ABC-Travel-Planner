//"use server"
import { Input, Button, Link } from "@nextui-org/react";
import React from "react";
import SearchModal from "./SearchModal";
import BookMarkComponent from "./BookMarkComponent";
import TempStorage from "./TempStorage"
import createSupabaseServerClient from '../../libs/supabase/server';
import "./modal.css";
import DynamicDivs from "./DynamicDivs";

// export const dynamic = 'force-dynamic'

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

// const getServerData = async(id: any) => {
//   const supabase = await createSupabaseServerClient();
//   const { data: ItineraryItemsData, error: ItineraryItemsErr } = await supabase
//       .from('Itinerary-Items')
//       .select("*")
//       .eq('Itinerary_ID', id)
  
//   if (ItineraryItemsErr) {
//     console.log("ERR: " + JSON.stringify(ItineraryItemsErr))
//   } else if (ItineraryItemsData) {
//     console.log("Data:\n\n" + JSON.stringify(ItineraryItemsData))
//     return ItineraryItemsData
//   } else {
//     console.log("ERR & DATA is null")
//   }
    
//     return []
//     // return ItineraryItemsData
// }

const ItineraryItems = async ({ searchParams }: { searchParams: { id?: any; location?: string; destination?: any } }) => {
  const { location, id, destination } = searchParams;
  console.log("Location: " + location);
  console.log("ID: " + id);
  
  if (destination) {
    const obj = JSON.parse(destination)
    const itemTitle = obj.Fg?.displayName ?? obj.displayName
    const itemType = obj.type
    const firstPhotoUrl = obj.firstPhotoUrl
    const location = obj.Fg?.formattedAddress ?? obj.formattedAddress

    console.log("Destination: " + obj);
    console.log("====================")
    console.log("id: " + obj.id)
    console.log("firstPhotoUrl: " + obj.firstPhotoUrl)
    console.log("Type: " + obj.type)
    console.log("Title (displayName): " + obj.Fg?.displayName)


    // console.log("DOES THE RECORD ALREADY EXIST?" + JSON.stringify(existsData))
  }

  // const serverData = await getServerData(id)
  // console.log("SERVER DATA: " + serverData)

  return (
    <>
    <TempStorage id={id} location={location} Item_Title={(destination && (JSON.parse(destination).Fg?.displayName ?? JSON.parse(destination).displayName)) ?? null} Item_Type={(destination && JSON.parse(destination).type) ?? null} destination={(destination && (JSON.parse(destination).Fg?.formattedAddress ?? JSON.parse(destination).formattedAddress)) ?? null} image_url={(destination && JSON.parse(destination).firstPhotoUrl) ?? null}/>
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
        <div className="grid grid-cols-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 iteneraries-grid rounded-lg h-full sm:h-auto text-gray-800">
            {/* <DynamicDivs data={serverData} /> */}
            <DynamicDivs image_url={(destination && JSON.parse(destination).firstPhotoUrl) ?? null} />
        </div>
      </div>
      
      <div className='mt-10 w-100 h-10'>
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
  </div>
  </>
  );
};
  
export default ItineraryItems;