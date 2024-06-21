"use client";
import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import ItineraryComponent from "./itineraryComponent";
import { createItinerary } from ".";
import { getItineraries } from ".";

const Itinerary = () => {
  const [itineraries, setItineraries] = useState([]); // [itinerary1, itinerary2, ...
  const [isSet, setIsSet] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [itineraryName, setItineraryName] = useState("");
  const [city, setCity] = useState("");

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setItineraryName("");
    setCity("");
  };

  const handleAddItinerary = async (e) => {
    e.preventDefault();
    // Handle adding itinerary logic here (e.g., API call)
    console.log("Adding itinerary:", { itineraryName, city });
    const data = await createItinerary(itineraryName, city);

    console.log("Itinerary created:", data);

    closeModal();
  };

  useEffect(() => {
    const fetchItineraries = async () => {
      if (!isSet) {
        setIsSet(true);
      } else {
        const temp = await getItineraries();
        console.log("Itineraries:", temp);
      }
    };
    fetchItineraries();
  }, [isSet]);

  return (
    <div className="flex flex-col items-center m-4">
      <div className="p-8 mt-4 w-full rounded-lg bg-blue-50 shadow-xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">My Itineraries</h1>
          <button
            aria-label="Add Itinerary"
            onClick={openModal}
            className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <FaPlus className="mr-2" />
            Add Itinerary
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <ItineraryComponent
            name="Trip to Paris"
            location="Paris, France"
            image="/images/paris.jpg"
          />

          {/* Additional itinerary components can be added here */}
        </div>
      </div>

      {/* Modal for adding new itinerary */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-gray-800 bg-opacity-50">
          <div className="relative w-full max-w-lg mx-auto my-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Modal Header */}
              <div className="flex justify-between items-center px-6 py-4 bg-blue-600 text-white">
                <h3 className="text-xl font-semibold place-self-center">
                  Add New Itinerary
                </h3>
                <button
                  className="text-gray-300 hover:text-gray-300 focus:outline-none"
                  onClick={closeModal}
                >
                  &#215;
                </button>
              </div>
              {/* Modal Body */}
              <form onSubmit={handleAddItinerary} className="p-6">
                <div className="mb-4">
                  <label
                    htmlFor="itineraryName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name:
                  </label>
                  <input
                    type="text"
                    id="itineraryName"
                    value={itineraryName}
                    onChange={(e) => setItineraryName(e.target.value)}
                    required
                    className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City:
                  </label>
                  <input
                    type="text"
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Add Itinerary
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Itinerary;
