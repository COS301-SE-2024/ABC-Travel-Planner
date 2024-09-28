'use client';
import React, { useState, useEffect } from 'react';
import FlightCard from './flightCard';
import { useRouter, useSearchParams } from 'next/navigation';

const Flights = () => {
  const [resultsCount, setResultsCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [flightData, setFlightData] = useState<any[]>();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';
  const [adultCount, setAdultCount] = useState(0);
  const [fetchCount, setFetchCount] = useState(0);
  const [dest, setDest] = useState<string[]>([])
  const [randRate, setRandRate] = useState(0.000000)
  const [eurRate, setEurRate] = useState(0.000000)

  useEffect(() => {
      const fetchData = async () => {
        const start = searchParams?.get('start');
        const end = searchParams?.get('end');
        const adults = searchParams?.get('adults');
        const departureDate = searchParams?.get('date');
        const travelClass = searchParams?.get('class');
        
        const dest:any = []

        dest?.push(end)
        dest?.push(start)

        setDest(dest)
        setAdultCount(Number(adults))

          try {
              const res = await fetch(`${backendUrl}/flights/offers?originLocationCode=${start}&destinationLocationCode=${end}&departureDate=${departureDate}&adults=${adults}&travelClass=${travelClass}&max=20`)
              const data = await res.json()
              
              setFlightData(data?.data)
              setResultsCount(data?.meta.count)
              setFetchCount((fetchCount+1))
          } catch (error) {
              console.log(error)
          }
            setLoading(false)
            setSearchInitiated(false)
        };
        
        if (fetchCount < 1 ) {
          setLoading(true);
          setSearchInitiated(true);
          fetchData();
        }
  }, [searchInitiated, loading]);

  useEffect(() => {
    const getCurrencies = async () => {
      const apiKey = process.env.NEXT_PUBLIC_OPEN_EXCHANGE_RATES_KEY
      const res = await fetch(`https://openexchangerates.org/api/latest.json?app_id=${apiKey}`)
      const data = await res.json();

      setRandRate(data?.rates?.ZAR)
      setEurRate(data?.rates?.EUR)
    }

    if (fetchCount < 1) {
      getCurrencies()
    }

  }, [])

  return (
    <div className='ml-20 mr-20 mt-16'>
      <h1 className='text-5xl font-bold text-gray-800 text-center mb-10'>Flights Available: </h1>
      {loading && (
        <div className="flex justify-center items-center h-20">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-blue-500 motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span
              className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span>
          </div>
        </div>
      )}

      {resultsCount > 0 && (
        <div className="flex flex-col gap-4 rounded-lg pt-10 pb-10" style={{ backgroundColor: 'rgba(173, 216, 230, 0.5)' }}>
          <div className="flex flex-col items-center gap-4 rounded-lg pt-10">
            {flightData?.map((item, index) => (
              <FlightCard 
                key={item?.id} 
                title={item?.itineraries[0]?.duration || 'P0'} 
                bookableSeats={item?.numberOfBookableSeats || ':'} 
                lastTicketDate={item?.lastTicketingDate || ''} 
                segments={item?.itineraries[0]?.segments}
                price={item?.price?.total}
                currency={item?.price?.currency}
                weightSupported={item?.travelerPricings[0]?.fareDetailsBySegment[0]?.includedCheckedBags?.weight}
                weightUnit={item?.travelerPricings[0]?.fareDetailsBySegment[0]?.includedCheckedBags?.weightUnit}
                adults={adultCount}
                to={dest[0]}
                from={dest[1]}
                euRate={eurRate}
                zaRate={randRate}
                />
                
            ))}
          </div>
        </div>
      )}

      {resultsCount === 0 && !loading && (
        <div className="flex flex-col items-center gap-4 rounded-lg pt-10 pb-10">
          <p className="text-gray-500 text-lg">No flights found.</p>
          <button
            onClick={() => router.back()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  );
};
export default Flights;