
"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const DestinationPage = () => {
  const router = useRouter();
  const { locationId } = router.query;
  const [destinationData, setDestinationData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!locationId) return;

      const url = `https://api.content.tripadvisor.com/api/v1/location/${locationId}?key=EA30B923BE4A4CB28EE695CDFFEB1DE7`;
      const options = { method: 'GET', headers: { accept: 'application/json' } };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setDestinationData(data);
      } catch (error) {
        console.error(`Error fetching destination data for locationId ${locationId}:`, error);
        setDestinationData(null);
      }
    };

    fetchData();
  }, [locationId]);

  return (
    <div>
      <h1>Destination Page</h1>
      <p>Location ID: {locationId}</p>
      {destinationData ? (
        <>
          <p>Destination Name: {destinationData.name}</p>
          {/* Render other destination details here */}
        </>
      ) : (
        <p>Loading destination data...</p>
      )}
    </div>
  );
};

export default DestinationPage;
