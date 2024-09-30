'use client';
import React, { useState, useEffect } from 'react';
import FilterCard from './filterCard';
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader } from "@googlemaps/js-api-loader";
import SearchCard from '../search/searchCard';
//import { handleSearchAirports } from '../search/index';


const Filter = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchInitiated, setSearchInitiated] = useState(false);

  const topic = searchParams?.get('topic');
  const searchTerm = searchParams?.get('term');
  const defaultImageUrl = 'https://iso.500px.com/wp-content/uploads/2014/06/W4A2827-1-1500x1000.jpg';
  const constructImageUrl = (photoName: string, apiKey: string, maxHeight = 400, maxWidth = 500) => {
    return `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=${maxHeight}&maxWidthPx=${maxWidth}&key=${apiKey}`;
  };


  const fetchPlaceDetails = async (placeId: string) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    const url = `https://places.googleapis.com/v1/places/${placeId}`;
    const fieldMask = 'id,displayName,photos';

    const headers = {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': `${apiKey}`,
      'X-Goog-FieldMask': fieldMask,
    };

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: headers,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error;
    }
  };

  const handleSearchStays = async (destination: string) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    const loader = new Loader({
      apiKey: `${apiKey}`,
      version: "weekly",
    });

    loader.load().then(async () => {
      const { Place } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary;
      const request = {
        textQuery: destination,
        fields: ['accessibilityOptions', 'id', 'displayName', 'formattedAddress', 'paymentOptions', 'plusCode', 'priceLevel', 'rating', 'types', 'userRatingCount', 'websiteURI', 'editorialSummary', 'isGoodForChildren'],
        includedType: 'lodging',
        // locationBias: { lat: 37.4161493, lng: -122.0812166 },
        // isOpenNow: true,
        // language: 'en-US',
        maxResultCount: 15,
        // minRating: 3.2,
        // region: 'us',
        // useStrictTypeFiltering: false,
      };

      const { places } = await Place.searchByText(request);
      setSearchResults(places);
      if (places.length) {
        const detailedPlaces = await Promise.all(places.map(async (place) => {
          const detailedPlace = await fetchPlaceDetails(place.id);
          
          const firstPhotoUrl = detailedPlace.photos && detailedPlace.photos.length > 0 ?
            constructImageUrl(detailedPlace.photos[0].name, apiKey as string) :
            defaultImageUrl;
          console.log('First Photo URL:', firstPhotoUrl);

          return {
            ...place,
            photos: detailedPlace.photos,
            firstPhotoUrl: firstPhotoUrl,
            type: "stays"
          };
        }));

        setSearchResults(detailedPlaces);
        console.log('Detailed Places:', detailedPlaces);
      } else {
        setSearchResults([]);
      }
      setLoading(false);
    });
  };

  const handleSearchAttractions = async (destination: string) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    const loader = new Loader({
      apiKey: `${apiKey}`,
      version: "weekly",
    });

    loader.load().then(async () => {
      const { Place } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary;
      const request = {
        textQuery: destination,
        fields: ['accessibilityOptions', 'id', 'displayName', 'formattedAddress', 'paymentOptions', 'plusCode', 'priceLevel', 'rating', 'types', 'userRatingCount', 'websiteURI', 'editorialSummary', 'isGoodForChildren'],
        //includedType: 'restaurant',
        // locationBias: { lat: 37.4161493, lng: -122.0812166 },
        // isOpenNow: true,
        // language: 'en-US',
        maxResultCount: 15,
        // minRating: 3.2,
        // region: 'us',
        // useStrictTypeFiltering: false,
      };

      const { places } = await Place.searchByText(request);
      setSearchResults(places);
      if (places.length) {
        const detailedPlaces = await Promise.all(places.map(async (place) => {
          const detailedPlace = await fetchPlaceDetails(place.id);

          const firstPhotoUrl = detailedPlace.photos && detailedPlace.photos.length > 0 ?
            constructImageUrl(detailedPlace.photos[0].name, apiKey as string) :
            defaultImageUrl;
          console.log('First Photo URL:', firstPhotoUrl);

          return {
            ...place,
            photos: detailedPlace.photos,
            firstPhotoUrl: firstPhotoUrl,
            type: "attractions"
          };
        }));

        setSearchResults(detailedPlaces);
        console.log('Detailed Places:', detailedPlaces);
      } else {
        setSearchResults([]);
      }
      setLoading(false);
    });
  };

  const handleSearchCarRentals = async (destination: string) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    const loader = new Loader({
      apiKey: `${apiKey}`,
      version: "weekly",
    });

    loader.load().then(async () => {
      const { Place } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary;
      const request = {
        textQuery: destination,
        fields: ['accessibilityOptions', 'id', 'displayName', 'formattedAddress', 'paymentOptions', 'plusCode', 'priceLevel', 'rating', 'types', 'userRatingCount', 'websiteURI', 'editorialSummary', 'isGoodForChildren'],
        includedType: 'car_rental',
        // locationBias: { lat: 37.4161493, lng: -122.0812166 },
        // isOpenNow: true,
        // language: 'en-US',
        maxResultCount: 15,
        // minRating: 3.2,
        // region: 'us',
        useStrictTypeFiltering: false,
      };

      const { places } = await Place.searchByText(request);
      setSearchResults(places);
      if (places.length) {
        const detailedPlaces = await Promise.all(places.map(async (place) => {
          const detailedPlace = await fetchPlaceDetails(place.id);

          const firstPhotoUrl = detailedPlace.photos && detailedPlace.photos.length > 0 ?
            constructImageUrl(detailedPlace.photos[0].name, apiKey as string) :
            defaultImageUrl;
          console.log('First Photo URL:', firstPhotoUrl);

          return {
            ...place,
            photos: detailedPlace.photos,
            firstPhotoUrl: firstPhotoUrl,
            type: "carRental"
          };
        }));

        setSearchResults(detailedPlaces);
        console.log('Detailed Places:', detailedPlaces);
      } else {
        setSearchResults([]);
      }
      setLoading(false);
    });
  };

  const handleSearchAirportTaxis = async (destination: string) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    const loader = new Loader({
      apiKey: `${apiKey}`,
      version: "weekly",
    });

    loader.load().then(async () => {
      const { Place } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary;
      const request = {
        textQuery: destination,
        fields: ['accessibilityOptions', 'id', 'displayName', 'formattedAddress', 'paymentOptions', 'plusCode', 'priceLevel', 'rating', 'types', 'userRatingCount', 'websiteURI', 'editorialSummary', 'isGoodForChildren'],
        //includedType: 'taxi_stand',
        // locationBias: { lat: 37.4161493, lng: -122.0812166 },
        // isOpenNow: true,
        // language: 'en-US',
        maxResultCount: 15,
        // minRating: 3.2,
        // region: 'us',
        // useStrictTypeFiltering: false,
      };

      const { places } = await Place.searchByText(request);
      setSearchResults(places);
      if (places.length) {
        const detailedPlaces = await Promise.all(places.map(async (place) => {
          const detailedPlace = await fetchPlaceDetails(place.id);

          const firstPhotoUrl = detailedPlace.photos && detailedPlace.photos.length > 0 ?
            constructImageUrl(detailedPlace.photos[0].name, apiKey as string) :
            defaultImageUrl;
          console.log('First Photo URL:', firstPhotoUrl);

          return {
            ...place,
            photos: detailedPlace.photos,
            firstPhotoUrl: firstPhotoUrl,
            type: "airportTaxis"
          };
        }));

        setSearchResults(detailedPlaces);
        console.log('Detailed Places:', detailedPlaces);
      } else {
        setSearchResults([]);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    const generalSearch = async (searchT: string, t: string) => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        const response = await fetch(`${backendUrl}/search/places?textQuery=${encodeURIComponent(searchT)}&type=${encodeURIComponent(t)}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.length) {
          setSearchResults(data);
          console.log(JSON.stringify(data));
        } else {
          setSearchResults([]);
        }
        setLoading(false);

        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  

    if (searchTerm && topic) {
      setLoading(true);
      setSearchInitiated(true);
      generalSearch(searchTerm, topic);
    }
  }, [searchTerm, topic]);

  return (
    <div className='ml-20 mr-20 mt-16 minHeight:100vh'>
      <h1 className='text-5xl font-bold text-gray-800 text-center mb-10'>Select a Destination</h1>
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
      {searchResults.length > 0 && (
        <div className="flex flex-col gap-4 rounded-lg pt-10 pb-10" style={{ backgroundColor: 'rgba(173, 216, 230, 0.5)' }}>
          <div className="flex flex-col items-center gap-4 rounded-lg pt-10">
            {searchResults.map((result, index) => (
              <FilterCard key={index} place={result} />
            ))}
          </div>
        </div>
      )}

      {searchResults.length === 0 && !loading && (
        <div className="flex flex-col items-center gap-4 rounded-lg pt-10 pb-10">
          <p className="text-gray-500 text-lg">No search results found.</p>
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

export default Filter;