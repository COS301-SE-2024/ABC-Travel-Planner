"use client";
import Link from 'next/link';
import React, { useEffect, useState, useRef } from 'react';
import Cookie from 'js-cookie';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/navigation';
import { insertRecord } from '../utils/functions/insertRecord';
import PopupMessage  from '../utils/PopupMessage';
import { useTheme } from '../context/ThemeContext';

interface FilterCardProps {
  place: any;
}

export const getRatingColor = (rating: number) => {
  if (rating >= 4) {
    return 'bg-green-500';
  } else if (rating >= 3) {
    return 'bg-yellow-500';
  } else {
    return 'bg-red-500';
  }
};

export const getPricePlaceholder = (type: string) => {
  switch (type) {
    case 'Hotels':
      return 'per night';
    case 'Attractions':
      return 'per ticket';
    case 'Car Rentals':
      return 'per day';
    case 'Car Rentals':
      return 'per ride';
  }
};

export const generatePrice = (id: string, type: string, country: string) => {
  let basePrice;
  switch (type) {
    case 'Hotels':
      basePrice = 100;
      break;
    case 'Attractions':
      basePrice = 50;
      break;
    case 'Car Rentals':
      basePrice = 70;
      break;
    case 'Car Rentals':
      basePrice = 40;
      break;
    default:
      basePrice = 100;
  }

  let countryMultiplier;
  switch (country) {
    case 'Africa':
      countryMultiplier = 1;
      break;
    case 'USA':
      countryMultiplier = 1.2;
      break;
    case 'UK':
      countryMultiplier = 1.3;
      break;
    default:
      countryMultiplier = 1.1;
  }

  const seed = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const randomMultiplier = 1 + (seed % 100) / 1000;

  return Math.round(basePrice * countryMultiplier * randomMultiplier * 18); // Assuming 1 USD = 18 ZAR
};

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

const FilterCard: React.FC<FilterCardProps> = ({ place }) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [doneLoading, setDoneLoading] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const router = useRouter();
  const imageRef = useRef<HTMLImageElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const [marginTop, setMarginTop] = useState(0);

  useEffect(() => {
    const adjustMargin = () => {
      if (imageRef.current && infoRef.current && priceRef.current) {
        const imageHeight = 250;
        const infoHeight = infoRef.current.offsetHeight;
        const priceHeight = priceRef.current.offsetHeight;
        // Calculate the margin needed to align the div to the bottom of the image
        const newMargin = imageHeight - (infoHeight + priceHeight);
        setMarginTop(newMargin > 0 ? newMargin : 0); // Set margin to 0 if it would go negative
      }
    };

    adjustMargin();
    window.addEventListener('resize', adjustMargin);

    return () => window.removeEventListener('resize', adjustMargin);
  }, []);

  useEffect(() => {
    const loadingScreen = async () => {
      await new Promise(resolve => setTimeout(resolve, 2800));
      setDoneLoading(true);
    };

    loadingScreen();
  }, [doneLoading]);

  const datesEmpty = () => {
    setTrigger(true);
    setTimeout(() => {
        setTrigger(false);
    }, 2000);
  }

  const uploadItem = async () => {
    const destination = place;
    console.log("TYPE: " + typeof destination);

    if (!uploaded && destination) {
      const id = JSON.parse(localStorage.getItem('id') as string).id;
      const location = JSON.parse(localStorage.getItem('location') as string).location;
      const objectToUpload = place;
      console.log("object: " + JSON.stringify(objectToUpload));

      const userId = Cookie.get('user_id') ?? 'User1';
      const itemTitle = objectToUpload.displayName ?? 'NONAME';
      const itemType = objectToUpload.type ?? 'NOTYPE';
      const address = objectToUpload.formattedAddress ?? 'DEFAULT ADDRESS'
      const image_url = objectToUpload.firstPhotoUrl ?? 'PHOTO URL'
      const price = objectToUpload.price;
      const dates = selectedDates;

      //No dates selected... Don't upload
      if (dates.length === 0) {
        datesEmpty()
      } else {
        const uploadDetails = {
          user_id: userId,
          item_name: itemTitle,
          item_type: itemType,
          price: price,
          date: dates,
          location,
          itinerary_id: id,
          destination: address,
          image_url
        }
  
        console.log("Going to upload to db...")
        console.log(uploadDetails)
  
        try {
          setIsUploading(true);
          await insertRecord(uploadDetails);
          setIsUploading(false);
          router.push(`/itinerary-items?id=${id}&location=${location}&destination=${destination}&dates=${dates}`)
          // return response.status;
        } catch (error) {
        }
      }
    }
  }

  function extractLocation(fullString: string) {
    const parts = fullString.split(/,|\s+/);

    const city = parts.slice(1, -1).join(' ');
    const country = parts[parts.length - 1];

    return { city, country };
  }

  let availableDates = ['2024-06-01', '2024-06-02', '2024-06-03'];
  const numRooms = null;
  let address = place.plusCode ? place.plusCode.compoundCode : 'Unknown Address';
  const location = extractLocation(address);
  const addressParts = address.split(',');
  let ratingNum = place.rating;
  ratingNum = ratingNum.toFixed(1);
  const cityCountry = addressParts.slice(-2).map((part: string) => part.trim()).join(', ');
  const price = generatePrice(place.id, place.type, location.country);
  const { selectedTheme, themeStyles, setTheme } = useTheme();

  return (
    <><div>
      {!doneLoading && (
        <div style={overlayStyle}>
          <div style={spinnerStyle}></div>
        </div>
      )}
    </div>

      <div>
        {isUploading && (
          <div style={overlayStyle}>
            <div style={spinnerStyle}></div>
          </div>
        )}
      </div>

      <div className="relative w-[70%] mx-auto bg-white rounded-lg shadow-md p-4 h-120" >
        <div className="flex justify-between">
          <div className="w-1/2 pr-4">
            <div style={{ cursor: 'pointer' }} onClick={uploadItem}>
              <h1 className="text-4xl font-bold mb-2 text-blue-500" style={{ color: themeStyles.textColor }}>{place.displayName}</h1>
            </div>
            <p className="text-gray-700 text-lg font-semibold">{`${location.city} ${location.country}`}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-600 inline-block pr-2">{`${place.userRatingCount} reviews `}</p>
            <div className={`rounded-full ${getRatingColor(place.rating)} text-white px-2 py-2 text-sm font-semibold inline-block`}>
              {ratingNum}
            </div>
          </div>
        </div>
        <div className='flex flex-row justify-start items-start mt-4'>
          <div style={{ cursor: 'pointer' }} onClick={uploadItem}>
            <img
              ref={imageRef}
              src={`${place.firstPhotoUrl}`}
              alt={place.displayName}
              style={{ objectFit: 'cover', width: '400px', height: '250px' }}
              className="rounded-lg cursor-pointer"
            />
          </div>
          <div className="w-2/3 pl-4 overflow-hidden">
            <div ref={infoRef}>
              <div style={{ cursor: 'pointer' }} onClick={uploadItem}>
                {place.goodForChildren && (
                  <div className="mt-2">
                    <div className="inline-block bg-green-500 text-white text-sm font-bold rounded-full px-3 py-1">
                      Good for families with children
                    </div>
                  </div>
                )}
              </div>
              <p className="text-gray-800 mt-4">{place.editorialSummary ? place.editorialSummary : ""}</p>
              {place.paymentOptions?.acceptsCreditCards && (
                <div className="mt-2 flex items-center text-green-600 text-sm">
                  <svg className="w-5 h-5 mr-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0zm5 7.5l-6 6-3-3 1.414-1.414L9 10.672l4.586-4.586L15 7.5z" />
                  </svg>
                  Accepts Credit Cards
                </div>
              )}
              {numRooms && (
                <div className="mt-2 flex items-center text-red-500 text-sm">
                  {`Only ${numRooms} rooms available at this price`}
                </div>
              )}
            </div>
            <div className={`flex justify-between self-end`} ref={priceRef} style={{ marginTop: `${marginTop}px` }}>
              <div className="mt-4 flex flex-col items-start space-y-4">
                <button
                  onClick={() => setShowCalendar(!showCalendar)}
                  className="bg-blue-500 text-white rounded-md px-4 py-2"
                  style={{ background: themeStyles.navbarColor }}
                >
                  Select Dates
                </button>

                {showCalendar && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-4 w-80 shadow-lg">
                      <DatePicker
                        selected={null}
                        onChange={(date) => {
                          if (date) {
                            setSelectedDates((prevDates) => {
                              const isAlreadySelected = prevDates.some(
                                (d) => d.getTime() === date.getTime()
                              );
                              if (isAlreadySelected) {
                                return prevDates.filter(
                                  (d) => d.getTime() !== date.getTime()
                                );
                              } else {
                                return [...prevDates, date];
                              }
                            });
                          }
                        }}
                        inline
                        highlightDates={selectedDates}
                        isClearable={false}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select dates"
                        className="block w-full bg-white border border-gray-300 rounded-md shadow-sm text-lg"
                      />
                      <button
                        onClick={() => setShowCalendar(false)}
                        className="bg-blue-500 text-white rounded-md px-4 py-2 mt-4 w-full"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                )}

                {selectedDates.length > 0 && (
                  <div className="bg-white rounded-md py-3 px-4 mt-1 shadow-sm">
                    {selectedDates.map((date, index) => (
                      <p key={index} className="text-blue-400 text-xl font-semibold">
                        Selected Date: {date.toLocaleDateString()}
                      </p>
                    ))}
                  </div>
                )}
              </div>
              <div className="text-right">
                <p className="text-3xl text-blue-500 font-semibold" style={{ color: themeStyles.textColor }}>ZAR {place.price}</p>
                <p className="text-blue-500 text-sm" style={{ color: themeStyles.textColor }}>{getPricePlaceholder(place.type)}</p>
                <p className="text-blue-500 text-sm" style={{ color: themeStyles.navbarColor }}>Rates and taxes included</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PopupMessage msg={"Please select a date!"} trigger={trigger} />
      <div data-testid="trigger-state" className='invisible'>{trigger.toString()}</div>
      </>
  );
};

export default FilterCard;