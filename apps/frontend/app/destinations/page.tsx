import React from 'react';
import DestinationCard from './destinationsCard';

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
  'South Korea',
  'Indonesia',
  'Pakistan',
  'Bangladesh',
  'Vietnam',
  'Philippines',
  'Thailand',
  'Malaysia',
  'Singapore',
  'Nepal',
  'Sri Lanka',
  'Myanmar',
  'Germany',
  'France',
  'United Kingdom',
  'Italy',
  'Spain',
  'Netherlands',
  'Sweden',
  'Norway',
  'Denmark',
  'Finland',
  'Poland',
  'Belgium',
  'Austria',
  'Switzerland',
  'Greece',
  'United States',
  'Canada',
  'Mexico',
  'Cuba',
  'Jamaica',
  'Haiti',
  'Dominican Republic',
  'Guatemala',
  'Honduras',
  'El Salvador',
  'Costa Rica',
  'Panama',
  'Belize',
  'Nicaragua',
  'Barbados',
  'Brazil',
  'Argentina',
  'Colombia',
  'Chile',
  'Peru',
  'Venezuela',
  'Ecuador',
  'Bolivia',
  'Paraguay',
  'Uruguay',
  'Guyana',
  'Suriname',
  'French Guiana',
  'Falkland Islands',
  'South Georgia and the South Sandwich Islands',
  'Australia',
  'New Zealand',
  'Fiji',
  'Papua New Guinea',
  'Samoa',
  'Tonga',
  'Vanuatu',
  'Solomon Islands',
  'Micronesia',
  'Palau',
  'Nauru',
  'Kiribati',
  'Marshall Islands',
  'Tuvalu',
  'New Caledonia',
];

async function getCountryData(country: string) {
  const url = `https://api.content.tripadvisor.com/api/v1/location/search?key=EA30B923BE4A4CB28EE695CDFFEB1DE7&searchQuery=${encodeURIComponent(country)}`;
  const options = { method: 'GET', headers: { accept: 'application/json' } };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    const updatedData = await Promise.all(data.data.map(async (destination: any) => {
      const imageUrl = await fetchImage(destination.location_id);
      return { ...destination, image: imageUrl, isFavourite: false};
    }));

    return updatedData.filter((destination: any) => destination.name === country);
    //return updatedData;
  } catch (err) {
    console.error(`Error fetching data for ${country}:`, err);
    return [];
  }
}

async function fetchImage(locationId: any) {
  const imageUrl = `https://api.content.tripadvisor.com/api/v1/location/${locationId}/photos?key=EA30B923BE4A4CB28EE695CDFFEB1DE7`;
  const options = { method: 'GET', headers: { accept: 'application/json' } };

  try {
    const response = await fetch(imageUrl, options);
    const data = await response.json();

    if (data && data.data && data.data.length > 0) {
      return data.data[0].images.original.url; 
    } else {
      return null; 
    }

  } catch (err) {
    console.error(`Error fetching image for location ${locationId}:`, err);
    return null;
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

const Destinations = async () => {
  const data = await getData();
  const destinations = data?.data || [];
  console.log(destinations);

  return (
    <div className="container">
      <h1 className="title" style={{ fontSize: '2rem' }}>Keep your favorite destinations close by!</h1>
      <div className="cardContainer">
        {destinations.map((destination, index) => (
          <DestinationCard key={destination.location_id} destination={destination} />
        ))}
      </div>
    </div>
  );
};


export default Destinations;

