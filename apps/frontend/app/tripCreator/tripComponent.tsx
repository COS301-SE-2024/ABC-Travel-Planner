"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { getItineraryImage } from '../itinerary';
import {
  FaMapMarkerAlt,
  FaStar,
  FaArrowLeft,
  FaSave,
  FaMoneyBill,
  FaGlobe,
  FaPlane,
} from "react-icons/fa";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTheme } from "../context/ThemeContext";
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
  dates?: any
}

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.05)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const spinnerStyle: React.CSSProperties = {
  width: '50px',
  height: '50px',
  border: '8px solid white',
  borderTop: '8px solid blue',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
};

const spinnerAnimation = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`;

const TripComponent: React.FC = () => {
  const { selectedTheme, setTheme, themeStyles } = useTheme();
  const [searchResults, setSearchResults] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showCalendar, setShowCalendar] = useState<{ [key: string]: boolean }>({});
  const [selectedDates, setSelectedDates] = useState<{ [key: string]: Date[] }>({});
  const [showModal, setShowModal] = useState(false);
  const [itineraryLoading, setItineraryLoading] = useState(false);
  const searchParams = useSearchParams();
  const country = searchParams?.get("country");
  const reason = searchParams?.get("reason");
  const interest = searchParams?.get("interests");
  const router = useRouter();


  useEffect(() => {
    if (initialLoading) {
      setInitialLoading(false);
    } else {
      const generalSearch = async (
        country: string,
        interest: string,
        reason: string,
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
            )}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          if (data.places) {
            setSearchResults(data.places);
            localStorage.setItem("searchResults", JSON.stringify(data.places));
            console.log("Fetched places:", JSON.stringify(data.places));
          } else {
            setSearchResults([]);
          }
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      const storedResults = localStorage.getItem("searchResults");
      if (storedResults) {
        const parsedResults = JSON.parse(storedResults);
        setSearchResults(parsedResults);
        setLoading(false);
        return;

      }
      if (country && interest && reason) {
        setLoading(true);
        generalSearch(country, interest, reason);
      }
    }
  }, [initialLoading]);



  const sendToItineraryPage = async () => {
    setItineraryLoading(true);
    const user_id = Cookies.get("user_id");
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const image = await getItineraryImage(country as string);
    const newI = await axios.post(`${backendUrl}/itinerary/create`, { name: `Your Generated Trip to ${country}`, location: country, user_id: user_id, imageUrl: image });
    const promise = searchResults.map(async (item) => {
      let address = item.plusCode ? item.plusCode.compoundCode : 'Unknown Address';
      const location = extractLocation(address);
      const dates = item.dates && item.dates.length > 0 ? item.dates : [];
      const newItem = await axios.post(`${backendUrl}/itinerary-items/add`, {
        user_id: user_id, item_name: item.displayName, item_type: item.type,
        location: location.country, itinerary_id: newI.data, destination: item.formattedAddress, image_url: item.firstPhotoUrl, price: item.price, date: dates
      });
    });
    await Promise.all(promise);
    setItineraryLoading(false);
    router.push("/itinerary");
  };

  const handleMoreInfo = (item: Place) => {
    router.push(`/${item.id}`);
  };

  function extractLocation(fullString: string) {
    const parts = fullString.split(/,|\s+/);
    const city = parts.slice(1, -1).join(' ');
    const country = parts[parts.length - 1];
    return { city, country };
  }

  const goBackToItinerary = () => {
    setShowModal(true);
  };

  const confirmGoBack = () => {
    setShowModal(false);
    localStorage.removeItem("searchResults");
    router.push("/itinerary");
  };

  const cancelGoBack = () => {
    setShowModal(false);
  };

  // Filter results based on the selected category
  const filteredResults = selectedCategory === "all"
    ? searchResults
    : searchResults.filter(item => {
      return (
        (selectedCategory === "attractions" && item.type === "attractions") ||
        (selectedCategory === "stays" && item.type === "stays") ||
        (selectedCategory === "carRentals" && item.type === "carRentals") ||
        (selectedCategory === "airportTaxis" && item.type === "airportTaxis")
      );
    });

  const toggleCalendar = (id: string) => {
    setShowCalendar(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const handleDateChange = (id: string, dates: [Date | null, Date | null] | Date | null) => {
    if (Array.isArray(dates)) {
      const [start, end] = dates;
      const validDates = [start, end].filter(date => date !== null) as Date[];
      const formattedDates = validDates.map(date => new Date(date.toISOString().slice(0, 10)));

      setSelectedDates(prevDates => ({
        ...prevDates,
        [id]: formattedDates
      }));

      // Update the corresponding item in searchResults with the formatted dates
      setSearchResults(prevResults =>
        prevResults.map(item =>
          item.id === id ? { ...item, dates: formattedDates } : item
        )
      );
    } else if (dates instanceof Date) {
      const formattedDate = new Date(dates.toISOString().slice(0, 10));

      setSelectedDates(prevDates => ({
        ...prevDates,
        [id]: [formattedDate]
      }));

      // Update the corresponding item in searchResults with the formatted date
      setSearchResults(prevResults =>
        prevResults.map(item =>
          item.id === id ? { ...item, dates: [formattedDate] } : item
        )
      );
    }

    console.log(JSON.stringify(searchResults));
  };



  const formatDates = (dates: Date[] | undefined) => {
    if (dates && dates.length > 0) {
      return dates.map(date => {
        if (date instanceof Date && !isNaN(date.getTime())) {
          return date.toLocaleDateString();
        }
        return "";
      }).join(" - ");
    }
    return "No dates selected";
  };

  return (
    <div className=" p-5 bg-blue-200" style={{ backgroundColor: themeStyles.primaryColor}}>
      <div className="flex justify-center items-center min-h-screen " style={{ backgroundColor: themeStyles.primaryColor}}>
        <div className="relative p-8 rounded-lg shadow-xl bg-white bg-opacity-90">
          <h2 className="text-4xl font-bold text-center mb-6 text-blue-700 flex items-center justify-center"  style={{ color: themeStyles.textColor}} >
            Your Trip to {country}
            <FaPlane className="text-blue-700 ml-2 mr-2"   style={{ color: themeStyles.textColor}} />
            <FaGlobe className="text-blue-700 mr-2"   style={{ color: themeStyles.textColor}}/>
          </h2>

          <div className="flex justify-center mb-6">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-lg mx-2`}
              style={{
                backgroundColor: selectedCategory === "all" ? themeStyles.primaryColor : 'rgba(229, 231, 235, 1)', // Adjust the gray color if needed
                color: themeStyles.textColor,
              }}
            >
              All
            </button>
            <button
  onClick={() => setSelectedCategory("attractions")}
  className={`px-4 py-2 rounded-lg mx-2`}
  style={{
    backgroundColor: selectedCategory === "attractions" ? themeStyles.primaryColor : 'rgba(229, 231, 235, 1)', // Adjust the gray color if needed
    color: selectedCategory === "attractions" ? 'white' : themeStyles.textColor,
  }}
>
  Attractions
</button>

<button
  onClick={() => setSelectedCategory("stays")}
  className={`px-4 py-2 rounded-lg mx-2`}
  style={{
    backgroundColor: selectedCategory === "stays" ? themeStyles.primaryColor : 'rgba(229, 231, 235, 1)', // Adjust the gray color if needed
    color: selectedCategory === "stays" ? 'white' : themeStyles.textColor,
  }}
>
  Stays
</button>

<button
  onClick={() => setSelectedCategory("carRentals")}
  className={`px-4 py-2 rounded-lg mx-2`}
  style={{
    backgroundColor: selectedCategory === "carRentals" ? themeStyles.primaryColor : 'rgba(229, 231, 235, 1)', // Adjust the gray color if needed
    color: selectedCategory === "carRentals" ? 'white' : themeStyles.textColor,
  }}
>
  Car Rentals
</button>

<button
  onClick={() => setSelectedCategory("airportTaxis")}
  className={`px-4 py-2 rounded-lg mx-2`}
  style={{
    backgroundColor: selectedCategory === "airportTaxis" ? themeStyles.primaryColor : 'rgba(229, 231, 235, 1)', // Adjust the gray color if needed
    color: selectedCategory === "airportTaxis" ? 'white' : themeStyles.textColor,
  }}
>
  Airport Taxis
</button>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {loading ? (
              <p className="text-gray-600">Results loading...</p>
            ) : (
              filteredResults.map((item: Place, index: any) => (
                <div
                  key={index}
                  className="relative flex flex-col bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl"
                  onClick={() => handleMoreInfo(item)}
                >
                  <div
                    className="absolute inset-0 rounded-lg border-4"
                    style={{
                      borderImage: "linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet) 1",
                      borderRadius: "12px",
                      pointerEvents: "none",
                    }}
                  />
                  <img
                    className="w-full h-40 object-cover rounded-lg"
                    src={item.firstPhotoUrl}
                    alt={item.displayName}
                  />
                  <div className="flex flex-col p-4 text-center flex-1">
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
                      <p className="text-gray-800">{item.formattedAddress}</p>
                    </div>

                    <div className="flex flex-col flex-1 justify-between">
                      <div className="flex-grow">
                        {/* Content above the button */}
                      </div>
                      <div className="flex justify-center mb-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCalendar(item.id);
                          }}
                          className="px-4 py-2 bg-blue-500 text-white rounded-full flex items-center"
                        >
                          Select Dates
                        </button>
                      </div>
                      {showCalendar[item.id] && (
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-white p-4 rounded-b-lg border-t-2 border-gray-300 shadow-lg"
                          onClick={(e) => e.stopPropagation()} // Prevents the calendar click from propagating
                        >
                          <DatePicker
                            selected={selectedDates[item.id]?.[0] || null}
                            onChange={(date) => handleDateChange(item.id, date)}
                            startDate={selectedDates[item.id]?.[0]}
                            endDate={selectedDates[item.id]?.[1]}
                            selectsRange
                            inline
                          />
                          <div className="text-center mt-2">
                            <p>{formatDates(selectedDates[item.id])}</p>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleCalendar(item.id);
                              }}
                              className="mt-2 px-4 py-2 bg-green-500 text-white rounded-full"
                            >
                              Done
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
              
            )}
          </div>

          <div className="flex justify-center">
            <button
              className="bg-blue-500 text-white rounded-lg py-2 px-4 focus:outline-none flex items-center mr-2"
              style={{ backgroundColor: themeStyles.navbarColor}}
              onClick={goBackToItinerary}
            >
              <FaArrowLeft className="mr-2" /> Go Back
            </button>
            <button
              className="bg-green-500 text-white rounded-lg py-2 px-4 focus:outline-none flex items-center"
              style={{ backgroundColor: themeStyles.textColor}}
              onClick={sendToItineraryPage}
            >
              <FaSave className="mr-2" /> Save Trip
            </button>
          </div>

          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">
                  Are you sure you want to go back? Your changes will not be saved.
                </h3>
                <div className="flex justify-end">
                  <button
                    className="bg-gray-500 text-white rounded-lg py-2 px-4 mr-2"
                    onClick={cancelGoBack}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-red-500 text-white rounded-lg py-2 px-4"
                    onClick={confirmGoBack}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
          <div>
      {itineraryLoading && (
        <div style={overlayStyle}>
          <div style={spinnerStyle}></div>
        </div>
      )}
    </div>
        </div>
      </div>
    </div>
  );

};

export default TripComponent;
