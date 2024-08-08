"use client"
import React, { useEffect, useState } from "react";
import { useSearchParams,useRouter } from "next/navigation";

export interface Place {
  formattedAddress: string;
  displayName: string;
  editorialSummary: string;
  userRatingCount: number;
  plusCode: any;
  id: string;
  rating: number;
  accessibilityOptions: any;
  paymentOptions: any;
  goodForChildren: boolean;
  firstPhotoUrl: string;
  type: string;
  price: number;
}

const TripComponent: React.FC = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const searchParams = useSearchParams();
  const country = searchParams?.get('country');
  const reason = searchParams?.get('reason');
  const interest = searchParams?.get('interests');
  const wantCarRental = searchParams?.get('wantCarRental') as string;
  useEffect(() => {
    if(initialLoading){
      setInitialLoading(false);
    }else{
      const generalSearch = async (country: string, interest: string, reason: string ) => {
        try {
          const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
          const response = await fetch(`${backendUrl}/itinerary-creator/itinerary?country=${encodeURIComponent(country)}&reason=${encodeURIComponent(reason)}&interests=${encodeURIComponent(interest)}&wantCarRental=${encodeURIComponent(wantCarRental)}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          if (data.places) {
            setSearchResults(data.places);
            console.log(JSON.stringify(data));
          } else {
            setSearchResults([]);
          }
          setLoading(false);
  
          return data;
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
  
      if (country && interest && reason) {
        setLoading(true);
        generalSearch(country, interest, reason);
      }
    }
  }, [initialLoading]);

const router = useRouter();

  const handleMoreInfo = (item: Place) => {
    router.push(`/${item.id}`);
  };

  const sendToItineraryPage = () => {
    alert("Navigating to the itinerary page...");
    // Add logic to navigate to the itinerary page
  };

  const goBackToItinerary = () => {
    alert("Are you sure you want to go back to the itinerary page? The generated itinerary will be lost.");
    router.push("/itinerary");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div
        className="relative p-8 rounded-lg shadow-lg"
        style={{ backgroundColor: "rgba(173, 216, 230, 0.5)" }}
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          Your Generated Trip to {country}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {searchResults.map((item : Place, index: any) => (
            <div
              key={index}
              onClick={() => handleMoreInfo(item)}
              className="flex flex-col items-center bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
            >
              <img
                className="w-full h-32 object-cover"
                src={item.firstPhotoUrl}
                alt={item.displayName}
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold">{item.displayName}</h3>
                <p className="text-gray-600">{item.editorialSummary}</p>
                <p className="text-gray-800 mt-2 font-medium">{item.price}</p>
                <p className="text-gray-600">{item.formattedAddress}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-4 right-4 flex space-x-4">
          <button
            onClick={goBackToItinerary}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 transition-colors"
          >
            Back to Itinerary
          </button>
          <button
            onClick={sendToItineraryPage}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
          >
            Save Itinerary
          </button>
        </div>
      </div>
    </div>
  );
};
export default TripComponent;