import React from 'react';
import DestinationCard from './destinationsCard';
import createSupabaseServerClient from '@/libs/supabase/server';
import { createClient } from '../utils/supabase/client';
import readUser from '@/libs/actions';
import ImageSlider from './ImageSlider';
const countries: string[] = [
  'Nigeria',];
  // 'South Africa',
  // 'Egypt',
  // 'Kenya',
  // 'Ghana',
  // 'Morocco',
  // 'Ethiopia',
  // 'Tanzania',
//   'Uganda',
//   'Algeria',
//   'Angola',
//   'Cameroon',
//   'Ivory Coast',
//   'Senegal',
//   'Tunisia',
//   'China',
//   'India',
//   'Japan',
//   'South Korea',
//   'Indonesia',
//   'Pakistan',
//   'Bangladesh',
//   'Vietnam',
//   'Philippines',
//   'Thailand',
//   'Malaysia',
//   'Singapore',
//   'Nepal',
//   'Sri Lanka',
//   'Myanmar',
//   'Germany',
//   'France',
//   'United Kingdom',
//   'Italy',
//   'Spain',
//   'Netherlands',
//   'Sweden',
//   'Norway',
//   'Denmark',
//   'Finland',
//   'Poland',
//   'Belgium',
//   'Austria',
//   'Switzerland',
//   'Greece',
//   'United States',
//   'Canada',
//   'Mexico',
//   'Cuba',
//   'Jamaica',
//   'Haiti',
//   'Dominican Republic',
//   'Guatemala',
//   'Honduras',
//   'El Salvador',
//   'Costa Rica',
//   'Panama',
//   'Belize',
//   'Nicaragua',
//   'Barbados',
//   'Brazil',
//   'Argentina',
//   'Colombia',
//   'Chile',
//   'Peru',
//   'Venezuela',
//   'Ecuador',
//   'Bolivia',
//   'Paraguay',
//   'Uruguay',
//   'Guyana',
//   'Suriname',
//   'French Guiana',
//   'Falkland Islands',
//   'South Georgia and the South Sandwich Islands',
//   'Australia',
//   'New Zealand',
//   'Fiji',
//   'Papua New Guinea',
//   'Samoa',
//   'Tonga',
//   'Vanuatu',
//   'Solomon Islands',
//   'Micronesia',
//   'Palau',
//   'Nauru',
//   'Kiribati',
//   'Marshall Islands',
//   'Tuvalu',
//   'New Caledonia',
// ];

interface favouriteHash {
  [key: string]: boolean;
}

let favouritedHash: favouriteHash = {};
let favouriteObjects: any[] = [];
const supabase = createClient();

async function getCountryData(country: string) {
  const url = `https://api.content.tripadvisor.com/api/v1/location/search?key=E2F7795203BC41B981DFD021E4C97B4B&searchQuery=${encodeURIComponent(country)}`;
  const options = { method: 'GET', headers: { accept: 'application/json' } };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const filteredData = data.data.filter((destination: any) => destination.name === destination.address_obj.address_string);

    const updatedData = await Promise.all(filteredData.map(async (destination: any) => {
      const [detailedData, imageUrl] = await Promise.all([
        getDetailedData(destination.location_id),
        fetchImage(destination.location_id)
      ]);
      if (detailedData) {
        //const imageUrl = await fetchImage(destination.location_id);
        return {
          ...detailedData,
          image: imageUrl,
          isFavourite: favouritedHash[destination.location_id] || false,
        };
      }
      return null;
    }));

    return updatedData.filter((destination: any) => destination !== null);
  } catch (err) {
    console.error(`Error fetching data for ${country}:`, err);
    return [];
  }
}

async function getDetailedData(locationId: any) {
  const url = `https://api.content.tripadvisor.com/api/v1/location/${locationId}/details?key=E2F7795203BC41B981DFD021E4C97B4B`;
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
  const imageUrl = `https://api.content.tripadvisor.com/api/v1/location/${locationId}/photos?key=E2F7795203BC41B981DFD021E4C97B4B`;
  const options = { method: 'GET', headers: { accept: 'application/json' } };

  try {
    const response = await fetch(imageUrl, options);
    const data = await response.json();

    if (data && data.data && data.data.length > 0) {
      if (data.data[0].images.original?.url) {
        return data.data[0].images.original.url;
      } else if (data.data[0].images.large?.url) {
        return data.data[0].images.large.url;
      } else if (data.data[0].images.small?.url) {
        return data.data[0].images.small.url;
      }
      //return data.data[0].images.original.url;
    } else {
      return null;
    }

  } catch (err) {
    console.error(`Error fetching image for location ${locationId}:`, err);
    return null;
  }
}

async function isFavourited() {
  const currUser = await readUser();
  const user = JSON.parse(currUser);
  //console.log(user?.data?.user?.id);
  const { data, error } = await supabase.from('favourite_destinations').select('destination_object').eq('user_id', `${user?.data?.user?.id}`).eq('status', true);
  // const { data: destinationObject, error: dError } = await supabase.from('favourite_destinations').select('destination_object').eq('user_id', `${user?.data?.user?.id}`).eq('status', true);
  //console.log(JSON.stringify(data));
  favouritedHash = {};
  if (data && data.length > 0) {
    data.forEach((favourite: any) => {
      favouritedHash[favourite.destination_object.location_id] = true;
      favouriteObjects.push(favourite.destination_object);
    });
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
  const favouriteData = await isFavourited();
  console.log(favouritedHash);
  const data = await getData();
  const destinations = data?.data || [];
  console.log(destinations);

  return (
    <div className="container">
      <h1 className="title" style={{ fontSize: '2rem' }}>Keep your favorite destinations close by!</h1>
      <h2 className="title" style={{ fontSize: '1.5rem' }}>My Favourites</h2>
      { favouriteObjects.length > 0 ? <ImageSlider favouriteDestinations={favouriteObjects} /> : <p>No favourite destinations yet!</p>}
      <h2 className="title" style={{ fontSize: '1.5rem' }}>Top destinations</h2>
      <div className="cardContainer">
        {destinations.map((destination, index) => (
          <DestinationCard key={destination.location_id} destination={destination} />
        ))}
      </div>
    </div>
  );
};


export default Destinations;