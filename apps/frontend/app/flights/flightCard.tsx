"use client";
import React, { useEffect, useState, useRef } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/navigation';
import PopupMessage  from '../utils/PopupMessage';

interface SegmentType {
  departure: {
    iataCode: string,
    terminal: string,
    at: string            //Time
  },
  arrival: {
    iataCode: string,
    terminal: string, 
    at: string
  },
  duration: string,
}

interface FlightCardProps {
  title: string,
  bookableSeats: number,
  lastTicketDate: string,
  segments: SegmentType[],
  price: string,
  currency: string,
  weightSupported: string,
  weightUnit: string
}

export const formatSegments = (segments: SegmentType[]) => {
  segments.forEach((item) => {
    console.log(JSON.stringify(item))
  })
}

export const getWeightColor = (weight: number) => {
  if (weight >= 25) {
    return 'bg-green-500';
  } else if (weight >= 20) {
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

const FlightCard: React.FC<FlightCardProps> = ({
    title, 
    bookableSeats,
    lastTicketDate,
    segments,
    price,
    currency,
    weightSupported,
    weightUnit
  }) => {
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
    // getCurrencies();
  }, [doneLoading]);

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
              <h1 className="text-4xl font-bold mb-2 text-blue-500">{title}</h1>
            </div>
            <p className="text-gray-700 text-lg font-semibold">{lastTicketDate}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-600 inline-block pr-2">{bookableSeats}</p>
            <div className={`rounded-full ${getWeightColor(Number(weightSupported))} text-white px-2 py-2 text-sm font-semibold inline-block`}>
              {`${weightSupported} ${weightUnit}`}
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
              </div>
              <div className="text-right">
                <p className="text-3xl text-blue-500 font-semibold">R {price}</p>
                <p className="text-blue-500 text-sm">TYPE</p>
                <p className="text-blue-500 text-sm">Rates and taxes included</p>
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