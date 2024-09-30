"use client";
import React, { useEffect, useState, useRef } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/navigation';
import './flights.css'
import combobox_values from '../itinerary-items/combobox.json'
import Cookie from 'js-cookie'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import app from "@/libs/firebase/firebase";
import { insertRecord } from '../utils/functions/insertRecord';
import { useTheme } from '../context/ThemeContext';

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
  weightUnit: string,
  adults: number,
  to: string,
  from: string,
  euRate: number,
  zaRate: number
}

export const getSeatsColor = (available: number, adults: number) => {
  const ratio = ((available - adults) / available) * 100
  if ( ratio >= 50 ) {
    return '';
  } else if (ratio >= 25) {
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
    weightUnit,
    adults,
    to,
    from,
    euRate,
    zaRate
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
  const [segmentString, setSegmentString] = useState('');
  const [segmentStringArr, setSegmentStringArr] = useState<string[]>([])
  const [startAirport, setStartAirport] = useState('');
  const [endAirport, setEndAirport] = useState('');
  const { selectedTheme, themeStyles, setTheme } = useTheme();

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
    
    if (doneLoading != true) {
      loadingScreen();
    }
  }, [doneLoading]);

  useEffect(() => {
    if (segmentString === '') {
      let stringArr: {to: string, from: string, duration: string}[] = []
      segments.forEach((item, index) => {
          stringArr.push({to: item.departure.iataCode, from: item.arrival.iataCode, duration: item.duration.substring(2, item.duration.length-1)});
      })

      //Remove duplicates...
      const newArr: {to: string, from: string, duration: string}[] = [...new Set(stringArr)]
      const airportNames: string[] = []
      
      combobox_values.forEach((item) => {
        newArr.forEach((arrItem) => {

          const start = arrItem.from
          const end = arrItem.to
          if (item.iata_code === start || item.iata_code === end) {
            
            if (startAirport === '' || endAirport === '') {
              if (from === item.iata_code) {
                setStartAirport(item.airport_name)
              }
  
              if (to === item.iata_code) {
                setEndAirport(item.airport_name)
              }
            }

            airportNames.push(`${item.airport_name} - ${item.country}`)
          }
        })
      })

      const newAirportNames = [...new Set(airportNames)]
      setSegmentStringArr(newAirportNames)
    }
    
  }, [])

  const uploadItem = async () => {
    if (!uploaded) {
      const id = JSON.parse(localStorage.getItem('id') as string).id;
      const location = JSON.parse(localStorage.getItem('location') as string).location;
      
      const storage = getStorage(app);
      const storageRef = ref(storage, `locations/flight.svg`);
      const url = await getDownloadURL(storageRef);

      const userId = Cookie.get('user_id') ?? 'User1';
      const itemTitle = startAirport ?? 'NONAME';
      const itemType = 'Flight' ?? 'NOTYPE';
      const address = startAirport ?? 'DEFAULT ADDRESS'
      const image_url = url ?? 'PHOTO URL'
      const uploadPrice = Number(((Number(price) * zaRate) * (1 / euRate)).toFixed(2));
      const dates = [new Date()];

        const uploadDetails = {
          user_id: userId,
          item_name: itemTitle,
          item_type: itemType,
          price: uploadPrice,
          date: dates,
          location,
          itinerary_id: id,
          destination: address,
          image_url
        }
  
        try {
          setIsUploading(true);
          await insertRecord(uploadDetails);
          setIsUploading(false);
          router.push(`/itinerary-items?id=${id}&location=${location}`)
          // return response.status;
        } catch (error) {
          console.error(error)
        } 
    }
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
              <h1 className="text-4xl font-bold mb-2 text-blue-500" style={{ color: themeStyles.textColor }}>Flight offer: {title.substring(2,title.length)}</h1>
            </div>
            {
              segmentStringArr.map((airport, idx) => (
                <p key={idx} className="text-blue-500 text-md font-medium" style={{ color: themeStyles.textColor }}>{airport || ''}</p>
              ))
            }
          </div>
          <div className="text-right">
            {
              startAirport != '' ?
              <>
                <p className="text-gray-600 inline-block pr-2 mb-2">Flying from:</p>
                <div className={`rounded-full bg-green-500 text-white px-2 py-2 text-sm mb-2 font-semibold inline-block`}>
                  {startAirport}
                </div>
              </>
              :
              <div></div>
            }
           
            {
              endAirport != '' ? 
              <>
                <br />
                <p className="text-gray-600 inline-block pr-2">Flying to:</p>
                <div className={`rounded-full bg-green-500 text-white px-2 py-2 text-sm font-semibold inline-block`}>
                  {endAirport}
                </div>
              </>
             :
            <div></div>
            }
           
          </div>
        </div>
        <div className='flex flex-row justify-start items-start mt-4'>
          <div style={{ cursor: 'pointer', objectFit: 'cover', width: '400px', height: '250px', borderRadius: '10px' }} className='flightImage' onClick={uploadItem}>
          </div>
          <div className="w-2/3 pl-4 overflow-hidden">
            <div ref={infoRef}>
              <div style={{ cursor: 'pointer' }} onClick={uploadItem}>
              </div>
            </div>
            <div className={`flex justify-between self-end static`} ref={priceRef} style={{ marginTop: `${marginTop}px` }}>
              <div className="mt-4 flex flex-col items-start space-y-4">
              </div>
              <div className="text-right absolute bottom-0 right-4 px-4 py-6">
                <p className="text-3xl text-blue-500 font-semibold" style={{ color: themeStyles.textColor }}>R {((Number(price) * zaRate) * (1 / euRate)).toFixed(2)}</p>
                {
                  weightSupported != null ? 
                  <p className='text-blue-500 text-sm' style={{ color: themeStyles.textColor }}>Supported luggage weight : {`${weightSupported} ${weightUnit}`}</p> :
                  <p></p>
                }
                <p className="text-blue-500 text-sm" style={{ color: themeStyles.textColor }}>{bookableSeats} seats available</p>
                <p className="text-blue-500 text-sm" style={{ color: themeStyles.textColor }}>Last ticket date: {lastTicketDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div data-testid="trigger-state" className='invisible'>{trigger.toString()}</div>
      </>
  );
};

export default FlightCard;