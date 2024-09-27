'use client';
import React, { useState, useEffect } from 'react';
import FlightCard from './flightCard';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchCard from '../search/searchCard';

const Flights = () => {
  const [resultsCount, setResultsCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [flightData, setFlightData] = useState<any[]>();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || ''

  useEffect(() => {
      const fetchData = async () => {
        const start = searchParams?.get('start');
        const end = searchParams?.get('end');
        const adults = searchParams?.get('adults');
        const departureDate = searchParams?.get('date');
        const travelClass = searchParams?.get('class');

        console.log("START: " + start)
        console.log("END: " + end)
        console.log("ADULTS: " + adults)
        console.log("DEPARTURE_DATE: " + departureDate)
        console.log("TRAVEL CLASS: " + travelClass)

          try {
              const res = await fetch(`${backendUrl}/flights/offers?originLocationCode=${start}&destinationLocationCode=${end}&departureDate=${departureDate}&adults=${adults}&travelClass=${travelClass}`)
              const data = await res.json()
              console.log(data)

              setFlightData(data?.data)
              setResultsCount(data?.meta.count)
          } catch (error) {
              console.log(error)
          }

          setLoading(false)
          setSearchInitiated(false)
        };
        
        setLoading(true);
        setSearchInitiated(true);
        fetchData();

      //   if (searchTerm && topic) {
      //     setLoading(true);
      //     setSearchInitiated(true);
      //     generalSearch(searchTerm, topic);
      //   }
      // }, [searchTerm, topic]);
  }, []);

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
              <FlightCard key={index} title={item?.id}/>
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