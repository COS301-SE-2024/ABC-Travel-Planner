"use client"
import React from "react";
import { useRouter } from "next/navigation";

const TripComponent: React.FC = () => {

const router = useRouter();
  const itineraryItems = [
    {
      name: "Attraction 1",
      image: "/Images/attraction1.jpg",
      summary: "A brief description of the attraction.",
      price: "$50",
      address: "123 Attraction St, City, Country",
    },
    {
      name: "Hotel 2",
      image: "/Images/hotel1.jpg",
      summary: "A brief description of the hotel.",
      price: "$150/night",
      address: "456 Hotel Blvd, City, Country",
    },
    {
      name: "Airport Taxi 1",
      image: "/Images/taxi.jpg",
      summary: "Convenient airport taxi service.",
      price: "$30",
      address: "Airport, City, Country",
    },
    {
      name: "Restaurant 1",
      image: "/Images/rest1.jpg",
      summary: "A brief description of the restaurant.",
      price: "$40",
      address: "789 Restaurant Rd, City, Country",
    },
    {
      name: "Attraction 2",
      image: "/Images/attraction2.jpg",
      summary: "A brief description of the attraction.",
      price: "$50",
      address: "123 Attraction St, City, Country",
    },
    {
      name: "Hotel 2",
      image: "/Images/hotel1.jpg",
      summary: "A brief description of the hotel.",
      price: "$150/night",
      address: "456 Hotel Blvd, City, Country",
    },
    {
      name: "Airport Taxi 2",
      image: "/Images/taxi2.jpeg",
      summary: "Convenient airport taxi service.",
      price: "$30",
      address: "Airport, City, Country",
    },
    {
      name: "Restaurant 2",
      image: "/Images/rest2.jpg",
      summary: "A brief description of the restaurant.",
      price: "$40",
      address: "789 Restaurant Rd, City, Country",
    },
    // Add more items as needed
  ];

  const handleMoreInfo = (item: typeof itineraryItems[0]) => {
    alert(`More info about ${item.name}`);
    // Add logic to navigate or show more details about the clicked item
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
          Your Generated Trip to USA
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {itineraryItems.map((item, index) => (
            <div
              key={index}
              onClick={() => handleMoreInfo(item)}
              className="flex flex-col items-center bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
            >
              <img
                className="w-full h-32 object-cover"
                src={item.image}
                alt={item.name}
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-gray-600">{item.summary}</p>
                <p className="text-gray-800 mt-2 font-medium">{item.price}</p>
                <p className="text-gray-600">{item.address}</p>
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