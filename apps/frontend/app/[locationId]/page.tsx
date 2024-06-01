"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const DestinationPage = () => {
  const { locationId } = useParams();
  console.log("Location ID:", locationId);
  const [destinationData, setDestinationData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!locationId) return;

      const url = `https://api.content.tripadvisor.com/api/v1/location/${locationId}?key=EA30B923BE4A4CB28EE695CDFFEB1DE7`;
      const options = { method: 'GET', headers: { accept: 'application/json' } };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log("Fetched data:", data);
        setDestinationData(data);
      } catch (error) {
        console.error(`Error fetching destination data for locationId ${locationId}:`, error);
        setDestinationData(null);
      }
    };

    fetchData();
  }, [locationId]);

  if (!locationId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Destination Page</h1>
      <p className="mb-2">Location ID: {locationId}</p>
      {destinationData ? (
        <div className="rounded shadow-lg p-4">
          <img src={destinationData.photo.images.large.url} alt={destinationData.name} className="w-full h-64 object-cover rounded mb-4" />
          <h2 className="text-xl font-bold mb-2">{destinationData.name}</h2>
          <p className="text-gray-700 mb-2">{destinationData.address_obj.address_string}</p>
          <div className="flex items-center mb-4">
            {Array.from({ length: destinationData.rating }, (_, i) => (
              <svg key={i} className="w-6 h-6 fill-current text-yellow-500 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 2c-.3 0-.6.1-.8.4l-4.2 6.4-6.3.9c-.4.1-.6.5-.5.9.1.3.4.6.8.6h7.2l2.6 6.8c.1.2.3.3.5.3s.4-.1.5-.3l2.6-6.8h7.2c.4 0 .7-.3.8-.6.1-.4-.1-.8-.5-.9l-6.3-.9-4.2-6.4c-.2-.4-.5-.5-.8-.5z" />
              </svg>
            ))}
          </div>
          <p className="text-gray-700">{destinationData.description}</p>
        </div>
      ) : (
        <p>Loading destination data...</p>
      )}
    </div>
  );
};

export default DestinationPage;
