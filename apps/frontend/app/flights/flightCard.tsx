"use client";
import Link from 'next/link';
import React, { useEffect, useState, useRef } from 'react';
import Cookie from 'js-cookie';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/navigation';
import { insertRecord } from '../utils/functions/insertRecord';
import PopupMessage  from '../utils/PopupMessage';

interface FlightCardProps {

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

const FlightCard: React.FC<FlightCardProps> = () => {
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
    // const destination = flight;
    // console.log("TYPE: " + typeof destination);

    // if (!uploaded && destination) {
    //   const id = JSON.parse(localStorage.getItem('id') as string).id;
    //   const location = JSON.parse(localStorage.getItem('location') as string).location;
    //   const objectToUpload = place;
    //   console.log("object: " + JSON.stringify(objectToUpload));

    //   const userId = Cookie.get('user_id') ?? 'User1';
    //   const itemTitle = objectToUpload.displayName ?? 'NONAME';
    //   const itemType = objectToUpload.type ?? 'NOTYPE';
    //   const address = objectToUpload.formattedAddress ?? 'DEFAULT ADDRESS'
    //   const image_url = objectToUpload.firstPhotoUrl ?? 'PHOTO URL'
    //   const price = objectToUpload.price;
    //   const dates = selectedDates;

    //   //No dates selected... Don't upload
    //   if (dates.length === 0) {
    //     datesEmpty()
    //   } else {
    //     const uploadDetails = {
    //       user_id: userId,
    //       item_name: itemTitle,
    //       item_type: itemType,
    //       price: price,
    //       date: dates,
    //       location,
    //       itinerary_id: id,
    //       destination: address,
    //       image_url
    //     }
  
    //     console.log("Going to upload to db...")
    //     console.log(uploadDetails)
  
    //     try {
    //       setIsUploading(true);
    //       await insertRecord(uploadDetails);
    //       setIsUploading(false);
    //       router.push(`/itinerary-items?id=${id}&location=${location}&destination=${destination}&dates=${dates}`)
    //       // return response.status;
    //     } catch (error) {
    //     }
    //   }
    // }
  }

  function extractLocation(fullString: string) {
    const parts = fullString.split(/,|\s+/);

    const city = parts.slice(1, -1).join(' ');
    const country = parts[parts.length - 1];

    return { city, country };
  }

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
              <h1 className="text-4xl font-bold mb-2 text-blue-500">FLIGHT TITLE</h1>
            </div>
            <p className="text-gray-700 text-lg font-semibold">{`CITY & COUNTRY`}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-600 inline-block pr-2">{`RATING  `}</p>
            <div className={`rounded-full ${getRatingColor(4.6)} text-white px-2 py-2 text-sm font-semibold inline-block`}>
              {4.6}
            </div>
          </div>
        </div>
        <div className='flex flex-row justify-start items-start mt-4'>
          <div style={{ cursor: 'pointer' }} onClick={uploadItem}>
            <img
              ref={imageRef}
              src={`defaultImageUrl`}
              alt={`defaultImageUrl`}
              style={{ objectFit: 'cover', width: '400px', height: '250px' }}
              className="rounded-lg cursor-pointer"
            />
          </div>
          <div className="w-2/3 pl-4 overflow-hidden">
            <div ref={infoRef}>
              <div style={{ cursor: 'pointer' }} onClick={uploadItem}>
              </div>
            </div>
            <div className={`flex justify-between self-end`} ref={priceRef} style={{ marginTop: `${marginTop}px` }}>
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
                <p className="text-3xl text-blue-500 font-semibold">PRICE</p>
                <p className="text-blue-500 text-sm">TYPE</p>
                <p className="text-blue-500 text-sm">Tax and rates included</p>
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

export default FlightCard;