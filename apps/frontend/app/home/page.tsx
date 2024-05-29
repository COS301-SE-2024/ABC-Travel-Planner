import React from 'react';

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

    // Flatten the array of arrays
    const combinedData = allCountryData.flat();

    return { data: combinedData };
  } catch (err) {
    console.error('Error fetching country data:', err);
    return { data: [] }; // Return an empty array in case of an error
  }
}

async function fetchImage(locationId: any) {
  const imageUrl = `https://api.content.tripadvisor.com/api/v1/location/${locationId}/photos?key=EA30B923BE4A4CB28EE695CDFFEB1DE7`;
  const options = { method: 'GET', headers: { accept: 'application/json' } };

  try {
    const response = await fetch(imageUrl, options);
    const data = await response.json();

    if (data && data.data && data.data.length > 0) {
      return data.data[0].images.large.url; // Use the first image's medium URL
    } else {
      return null; // No image available
    }
  } catch (err) {
    console.error(`Error fetching image for location ${locationId}:`, err);
    return null; // Return null if there's an error
  }
}

const Home = async () => {
  const data = await getData();
  const destinations = data?.data || [];
  console.log(destinations);
  return (
    <div className="container mx-auto mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {destinations.map((destination: any, index: number) => (
          <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg">
            <img src={destination.image} className="w-full h-48 object-cover" alt={destination.name} /> 
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{destination.name}</div>
              <div className="flex justify-center items-center mb-2">
                {Array.from({ length: destination.rating }, (_, i) => (
                  <svg key={i} className="w-6 h-6 fill-current text-yellow-500 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 2c-.3 0-.6.1-.8.4l-4.2 6.4-6.3.9c-.4.1-.6.5-.5.9.1.3.4.6.8.6h7.2l2.6 6.8c.1.2.3.3.5.3s.4-.1.5-.3l2.6-6.8h7.2c.4 0 .7-.3.8-.6.1-.4-.1-.8-.5-.9l-6.3-.9-4.2-6.4c-.2-.4-.5-.5-.8-.5z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 text-base">{destination.address_obj.address_string}</p>
            </div>
            <div className="px-6 py-4">
              <div className="flex justify-between items-center">

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
