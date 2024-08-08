"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  FaMapMarkerAlt,
  FaStar,
  FaArrowLeft,
  FaSave,
  FaMoneyBill,
  FaGlobe,
  FaPlane,
} from "react-icons/fa";

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
  const [searchResults, setSearchResults] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const searchParams = useSearchParams();
  const country = searchParams?.get("country");
  const reason = searchParams?.get("reason");
  const interest = searchParams?.get("interests");
  const wantCarRental = searchParams?.get("wantCarRental") === 'true';

  useEffect(() => {
    if (initialLoading) {
      setInitialLoading(false);
    } else {
      const generalSearch = async (
        country: string,
        interest: string,
        reason: string,
        wantCarRental: boolean
      ) => {
        try {
          const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
          const response = await fetch(
            `${backendUrl}/itinerary-creator/itinerary?country=${encodeURIComponent(
              country
            )}&reason=${encodeURIComponent(
              reason
            )}&interests=${encodeURIComponent(
              interest
            )}&wantCarRental=${encodeURIComponent(wantCarRental)}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          if (data.places) {
            setSearchResults(data.places);
            console.log("Fetched places:", JSON.stringify(data.places));
          } else {
            setSearchResults([]);
          }
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      if (country && interest && reason) {
        setLoading(true);
        generalSearch(country, interest, reason, wantCarRental);
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
    alert(
      "Are you sure you want to go back to the itinerary page? The generated itinerary will be lost."
    );
    router.push("/itinerary");
  };

  // Filter results based on the selected category
  const filteredResults = selectedCategory === "all"
    ? searchResults
    : searchResults.filter(item => {
        return (
          (selectedCategory === "attractions" && item.type === "attractions") ||
          (selectedCategory === "stays" && item.type === "stays") ||
          (selectedCategory === "carRentals" && item.type === "carRentals")
        );
      });

  return (
    <div
      style={{
        marginTop: "40px",
        padding: "20px",
        backgroundColor: "rgba(173, 216, 230, 0.5)",
      }}
    >
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
        <div
          className="relative p-8 rounded-lg shadow-xl"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
        >
          <h2 className="text-4xl font-bold text-center mb-6 text-blue-700 flex items-center justify-center">
            Your Trip to {country}
            <FaPlane className="text-blue-700 ml-2 mr-2" />
            <FaGlobe className="text-blue-700 mr-2" />
          </h2>

          <div className="flex justify-center mb-6">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-lg mx-2 ${selectedCategory === "all" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedCategory("attractions")}
              className={`px-4 py-2 rounded-lg mx-2 ${selectedCategory === "attractions" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
            >
              Attractions
            </button>
            <button
              onClick={() => setSelectedCategory("stays")}
              className={`px-4 py-2 rounded-lg mx-2 ${selectedCategory === "stays" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
            >
              Stays
            </button>
            <button
              onClick={() => setSelectedCategory("carRentals")}
              className={`px-4 py-2 rounded-lg mx-2 ${selectedCategory === "carRentals" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
            >
              Car Rentals
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {filteredResults.length > 0 ? (
              filteredResults.map((item: Place, index: any) => (
                <div
                  key={index}
                  onClick={() => handleMoreInfo(item)}
                  className="relative flex flex-col items-center bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl"
                >
                  <div
                    className="absolute inset-0 rounded-lg border-4"
                    style={{
                      borderImage: "linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet) 1",
                      borderRadius: "12px", // Rounded corners for the border
                      pointerEvents: "none", // Make sure this div doesn't capture any clicks
                    }}
                  />
                  <img
                    className="w-full h-40 object-cover rounded-lg"
                    src={item.firstPhotoUrl}
                    alt={item.displayName}
                  />
                  <div className="p-4 text-center">
                    <h3 className="text-2xl font-semibold text-blue-600">
                      {item.displayName}
                    </h3>
                    <p className="text-gray-600">{item.editorialSummary}</p>
                    <div className="flex justify-center items-center mt-2">
                      <FaStar className="text-yellow-500 mr-1" />
                      <p className="text-gray-800 font-medium">{item.rating}</p>
                    </div>
                    <div className="flex justify-center items-center mt-2">
                      <FaMoneyBill className="text-green-600 mr-1" />
                      <p className="text-gray-800 font-medium">R{item.price}</p>
                    </div>
                    <div className="flex justify-center items-center mt-2">
                      <FaMapMarkerAlt className="text-red-600 mr-1" />
                      <p className="text-gray-600">{item.formattedAddress}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No results found</p>
            )}
          </div>
          <div className="absolute bottom-4 right-4 flex space-x-4">
            <button
              onClick={goBackToItinerary}
              className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Back to Itinerary
            </button>
            <button
              onClick={sendToItineraryPage}
              className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-colors"
            >
              <FaSave className="mr-2" />
              Save Itinerary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripComponent;
