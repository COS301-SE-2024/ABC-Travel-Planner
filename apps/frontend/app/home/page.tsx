import React from 'react';
import DestinationCard from './DestinationCard';
import Image from 'next/image';
import getReviews from './getReviews'

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
  'Tunisia',];
  // 'China',
  // 'India',
  // 'Japan',
  
  let reviewHash: any = {};

async function getCountryData(country: string) {
  const url = `https://api.content.tripadvisor.com/api/v1/location/search?key=A3B74876C98B4350AD1788B581E6F381&searchQuery=${encodeURIComponent(country)}`;
  const options = { method: 'GET', headers: { accept: 'application/json' } };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    const updatedData = await Promise.all(data.data.map(async (destination: any) => {
      const [detailedData, imageUrl] = await Promise.all([
        getDetailedData(destination.location_id),
        fetchImage(destination.location_id)
      ]);
      if (detailedData) {
        //const imageUrl = await fetchImage(destination.location_id);
        return {
          ...detailedData,
          image: imageUrl,
        };
      }
      return null;
    }));

    return updatedData.filter((destination: any) => destination !== null && !destination.error);
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

async function getDetailedData(locationId: any) {
  const url = `https://api.content.tripadvisor.com/api/v1/location/${locationId}/details?key=A3B74876C98B4350AD1788B581E6F381`;
  const options = { method: 'GET', headers: { accept: 'application/json' } };
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (data) {
      return data;
    } else {
      return null;
    }

  } catch (err) {
    console.error(`Error fetching image for location ${locationId}:`, err);
    return null;
  }

}

async function fetchImage(locationId: any) {
  const imageUrl = `https://api.content.tripadvisor.com/api/v1/location/${locationId}/photos?key=A3B74876C98B4350AD1788B581E6F381`;
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

async function getAllReviews(destinations: any) {
  try {
    const updatedData = await Promise.all(destinations.map(async (destination: any) => {
      const reviews = await getReviews(destination.location_id);
      if (reviews) {
        //const imageUrl = await fetchImage(destination.location_id);
        reviewHash[destination.location_id] = reviews;
        console.log("Review Hash: " + JSON.stringify(reviewHash[destination.location_id]))
        return {
          ...reviews,
        };
      }
      return null;
    }));

    return updatedData.filter((destination: any) => destination !== null && !destination.error);
  } catch (err) {
    console.error(`Error fetching data:`, err);
    return [];
  }
}

const Home = async () => {
  const data = await getData();
  const destinations = data?.data || [];
  // const allReviews = await getAllReviews(destinations);
  // console.log("all reviews " + JSON.stringify(reviewHash));
  //console.log(destinations);
  return (
    <div className="container mx-auto mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {destinations.map(async (destination: any, index: number) => (
          <DestinationCard key={index} destination={destination} review={getReviews(destination.location_id)} />
        ))}
      </div>
    </div>
  );
};

export default Home;

