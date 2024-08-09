"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Cookie from 'js-cookie';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/navigation';

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
    case 'stays':
      return 'per night';
    case 'attractions':
      return 'per ticket';
    case 'carRental':
      return 'per day';
    case 'airportTaxis':
      return 'per ride';
    default:
      return 'Price not available';
  }
};

export const generatePrice = (id: string, type: string, country: string) => {
  let basePrice;
  switch (type) {
    case 'stays':
      basePrice = 100;
      break;
    case 'attractions':
      basePrice = 50;
      break;
    case 'carRental':
      basePrice = 70;
      break;
    case 'airportTaxis':
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
  const router = useRouter();
  
  useEffect(() => {
    const loadingScreen = async () => {
        await new Promise(resolve => setTimeout(resolve, 2800));
        setDoneLoading(true);
      };
  
    loadingScreen();
    }, [doneLoading]);
  
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
          const response = await fetch('http://localhost:4000/itinerary-items/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(uploadDetails)
            });
  
            console.log("Response from server: ", JSON.stringify(response));
            const id =  JSON.parse(localStorage.getItem('id') as string)?.id ?? 0
            const location = JSON.parse(localStorage.getItem('location') as string)?.location ?? 'default'
            const destination =  JSON.stringify(place)
            const dates =  selectedDates.length == 0 ? JSON.stringify([]) : JSON.stringify(selectedDates)
            setIsUploading(false);
            router.push(`/itinerary-items?id=${id}&location=${location}&destination=${destination}&dates=${dates}`)

        } catch (error) {
            console.error("Error uploading item:", error);
        }
    }
  }

  //   const handleSelectDates = (dates: (Date | null)[]) => {
  //     setSelectedDates(dates.filter((date) => date !== null) as Date[]);
  //     setShowCalendar(false);
  // };
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

  const cityCountry = addressParts.slice(-2).map((part: string) => part.trim()).join(', ');
  const price = generatePrice(place.id, place.type, location.country);

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
            <h1 className="text-4xl font-bold mb-2 text-blue-500">{place.displayName}</h1>
          </div>
          <p className="text-gray-700 text-lg font-semibold">{`${location.city} ${location.country}`}</p>
        </div>
        <div className="text-right">
          <p className="text-gray-600 inline-block pr-2">{`${place.userRatingCount} reviews `}</p>
          <div className={`rounded-full ${getRatingColor(place.rating)} text-white px-2 py-2 text-sm font-semibold inline-block`}>
            {place.rating}
          </div>
        </div>
      </div>
      <div className='flex flex-row justify-start items-start mt-4'>
        <Link onClick={uploadItem}
          href={{
            pathname: '/itinerary-items',
            query: {
              id: JSON.parse(localStorage.getItem('id') as string)?.id ?? 0,
              location: JSON.parse(localStorage.getItem('location') as string)?.location ?? 'default',
              destination: JSON.stringify(place),
              dates: selectedDates.length == 0 ? JSON.stringify([]) : JSON.stringify(selectedDates)
            },
          }}
          className="w-1/3"
        >
          <img
            src={`${place.firstPhotoUrl}`}
            alt={place.displayName}
            className="rounded-lg object-cover cursor-pointer"
          />
        </Link>
        <div className="w-2/3 pl-4 overflow-hidden">
          <Link onClick={uploadItem}
            href={{
              pathname: '/itinerary-items',
              query: {
                id: JSON.parse(localStorage.getItem('id') as string)?.id ?? 0,
                location: JSON.parse(localStorage.getItem('location') as string)?.location ?? 'default',
                destination: JSON.stringify(place),
                dates: selectedDates.length == 0 ? JSON.stringify([]) : JSON.stringify(selectedDates)
              },
            }}
          >
            {place.goodForChildren && (
              <div className="mt-2">
                <div className="inline-block bg-green-500 text-white text-sm font-bold rounded-full px-3 py-1">
                  Good for families with children
                </div>
              </div>
            )}
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
          </Link>

          <div className="mt-4 flex justify-between items-end">
          <div className="mt-4 flex flex-col items-start space-y-4">
    <button
        onClick={() => setShowCalendar(!showCalendar)}
        className="bg-blue-500 text-white rounded-md px-4 py-2"
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
              <p className="text-3xl text-blue-500 font-semibold">ZAR {place.price}</p>
              <p className="text-blue-500 text-sm">{getPricePlaceholder(place.type)}</p>
              <p className="text-blue-500 text-sm">Tax and rates included</p>
            </div>
          </div>
        </div>
      </div>
    </div></>
  );
};

export default FilterCard;