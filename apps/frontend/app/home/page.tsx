import React from 'react';
import DestinationCard from './DestinationCard';

const countries: string[] = [
  'Nigeria',
  'South Africa',
  'Egypt',
  'Kenya',
  'Ghana',
  'Morocco',
  'Ethiopia',
  'Tanzania',
  'Uganda',
  'Algeria',
  'Angola',
  'Cameroon',
  'Ivory Coast',
  'Senegal',
  'Tunisia',
  'China',
  'India',
  'Japan',
];

async function getCountryData(country: string) {
  const url = `https://api.content.tripadvisor.com/api/v1/location/search?key=EA30B923BE4A4CB28EE695CDFFEB1DE7&searchQuery=${encodeURIComponent(country)}`;
  const options = { method: 'GET', headers: { accept: 'application/json' } };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    const updatedData = await Promise.all(data.data.map(async (destination: any) => {
      const imageUrl = await fetchImage(destination.location_id);
      return { ...destination, image: imageUrl };
    }));

    return updatedData;
  } catch (err) {
    console.error(`Error fetching data for ${country}:`, err);
    return [];
  }
}

async function getData() {
  try {
    const countryDataPromises = countries.map(getCountryData);
    const allCountryData = await Promise.all(countryDataPromises);

    const combinedData = allCountryData.flat();

    return { data: combinedData };
  } catch (err) {
    console.error('Error fetching country data:', err);
    return { data: [] }; 
  }
}

async function fetchImage(locationId: any) {
  const imageUrl = `https://api.content.tripadvisor.com/api/v1/location/${locationId}/photos?key=EA30B923BE4A4CB28EE695CDFFEB1DE7`;
  const options = { method: 'GET', headers: { accept: 'application/json' } };

  try {
    const response = await fetch(imageUrl, options);
    const data = await response.json();

    if (data && data.data && data.data.length > 0) {
      return data.data[0].images.large.url; 
    } else {
      return null; 
    }
  } catch (err) {
    console.error(`Error fetching image for location ${locationId}:`, err);
    return null; 
  }
}

const Home = async () => {
  const data = await getData();
  const destinations = data?.data || [];
  //console.log(destinations);
  return (
    <div className="container mx-auto mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {destinations.map((destination: any, index: number) => (
          <DestinationCard key={index} destination={destination} />
        ))}
      </div>
    </div>
  );
};

export default Home;
