"use client";
import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import ItineraryComponent from "./itineraryComponent";
import { createItinerary, getItineraries, getItineraryImage } from ".";
import axios from "axios";
import Cookies from "js-cookie";
import Link from 'next/link';
import { useTheme } from "../context/ThemeContext";
const Itinerary = () => {
  const [itineraries, setItineraries] = useState<any>([]);
  const [showModal, setShowModal] = useState(false);
  const [itineraryName, setItineraryName] = useState("");
  const [location, setLocation] = useState("");
  //Trip creator
  const [showTripCreatorModal, setShowTripCreatorModal] = useState(false);
  const [country, setCountry] = useState("");
  const [selectedReasons, setSelectedReasons] = useState<string>("");
  const [interests, setInterests] = useState("");
  const [attractions, setAttractions] = useState("");
  const [carRental, setCarRental] = useState(false);
  const [tripGenerated, setTripGenerated] = useState(false);

  const openTripCreatorModal = () => setShowTripCreatorModal(true);
  const closeTripCreatorModal = () => {
    setShowTripCreatorModal(false);
    setCountry("");
    setSelectedReasons("")
    setInterests("");
    setAttractions("");
    setTripGenerated(false);
  };

  const handleCreateTrip = async (e: any) => {
    e.preventDefault();
    setTripGenerated(true);

    closeTripCreatorModal();
  };

  const handleToggleReason = (reason: string) => {
    setSelectedReasons(reason);
  };
  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setItineraryName("");
    setLocation("");
  };

  const handleAddItinerary = async (e: any) => {
    e.preventDefault();
    const user_id = Cookies.get("user_id");
    const imageUrl = await getItineraryImage(location);
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    await axios.post(`${backendUrl}/itinerary/create`, { name: itineraryName, location, user_id, imageUrl });

    fetchItineraries();


    closeModal();
  };

  const fetchItineraries = async () => {
    const user_id = Cookies.get("user_id");
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const temp = await axios.post(`${backendUrl}/itinerary/getItineraries`, { user_id: user_id });

    const itineraries = temp?.data?.map((itinerary: any) => {
      return (
        <ItineraryComponent
          key={itinerary.id}
          id={itinerary.id}
          name={itinerary.name}
          location={itinerary.location}
          image={itinerary.imageUrl}
          fetchItineraries={fetchItineraries}
          shared={itinerary.shared}
        />
      );
    });
    setItineraries(itineraries);
  };

  useEffect(() => {
    localStorage.removeItem('searchResults');
    fetchItineraries();
  }, []);
  const { selectedTheme, setTheme, themeStyles } = useTheme();
  return (
    <div className="flex flex-col items-center m-4 mt-20">
      <div className="p-8 mt-4 w-full rounded-lg bg-blue-50 shadow-xl" style={{background: themeStyles.primaryColor}}>
        <div className="flex justify-between items-center mb-8">
          <h1 data-testid="itinerariesTitle" className="text-4xl font-bold text-gray-800" style={{ color: themeStyles.textColor}}>My Itineraries</h1>
          <div className="flex space-x-2">
            <button
              data-testid="addItineraryButton"
              aria-label="Add Itinerary"
              onClick={openModal}
              className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ background: themeStyles.navbarColor}}
           >
              <FaPlus className="mr-2" />
              Add Itinerary
            </button>
            <button
              aria-label="Trip Creator"
              onClick={openTripCreatorModal}
              className="flex items-center px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 ml-2"
              style={{ background: themeStyles.textColor}}
            >
              <FaPlus className="mr-2" />
              Itinerary Creator
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {itineraries}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-gray-800 bg-opacity-50">
          <div className="relative w-full max-w-lg mx-auto my-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Modal Header */}
              <div className="flex justify-between items-center px-6 py-4 bg-blue-600 text-white" style={{ background: themeStyles.navbarColor}}>
                <h3 className="text-xl font-semibold place-self-center" >
                  Add New Itinerary
                </h3>
                <button
                  className="text-gray-300 hover:text-gray-300 focus:outline-none"
                  onClick={closeModal}
                  style={{ background: themeStyles.navbarColor}} 
                >
                  &#215;
                </button>
              </div>
              <form data-testid="ItineraryForm" onSubmit={handleAddItinerary} className="p-6">
                <div className="mb-4">
                  <label
                    htmlFor="itineraryName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name:
                  </label>
                  <input
                    data-testid="itineraryNameInput"
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
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Location:
                  </label>
                  <input
                    data-testid="locationInput"
                    type="text"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
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
                    data-testid="addItinerarySubmit"
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ background: themeStyles.navbarColor}}
                  >
                    Add Itinerary
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Trip Creator Modal */}
      {showTripCreatorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-gray-800 bg-opacity-50">
          <div className="relative w-full max-w-lg mx-auto my-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">

              <div className="flex justify-between items-center px-6 py-4 bg-green-600 text-white">
                <h3 className="text-xl font-semibold place-self-center">Trip Creator</h3>
                <button className="text-gray-300 hover:text-gray-300 focus:outline-none" onClick={closeTripCreatorModal}>
                  &#215;
                </button>
              </div>
              <form onSubmit={handleCreateTrip} className="p-6">
                <div className="mb-4">
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country/City:</label>
                  <input
                    type="text"
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g. Cape Town South Africa"
                    required
                    className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Reason for Travel:</label>
                  <div className="flex flex-wrap">
                    {["Vacation", "Leisure", "Adventure", "Business", "Research", "Other"].map((reasonOption) => (
                      <button
                        key={reasonOption}
                        onClick={() => handleToggleReason(reasonOption)}
                        className={`mr-2 mb-2 px-4 py-2 text-sm font-medium rounded-full ${selectedReasons === reasonOption ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"
                          } hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500`}
                      >
                        {reasonOption}
                      </button>
                    ))}

                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="interests" className="block text-sm font-medium text-gray-700">Interests:</label>
                  <input
                    type="text"
                    id="interests"
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                    placeholder="e.g. music, theatre"
                    required
                    className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green                     focus:border-green-500 block w-full p-2.5"
                  />
                </div>

                <div className="flex justify-end">
                  <button type="button" onClick={closeTripCreatorModal} className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500">Cancel</button>
                  <Link
                    href={{
                      pathname: '/tripCreator',
                      query: {
                        country: country,
                        reason: selectedReasons,
                        interests: interests,
                      },
                    }}
                  >
                    <button
                      data-testid="createTripSubmit"
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                      style={{ background: themeStyles.textColor}}
                    >
                      Create Trip
                    </button>
                  </Link>
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
