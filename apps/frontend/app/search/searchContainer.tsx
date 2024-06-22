"use client";
import { useEffect, useRef, useState } from 'react';
import { FaHotel, FaPlane, FaCar, FaBinoculars, FaTaxi, FaSearch } from 'react-icons/fa';
import { handleSearchAirports } from '.';
import { Loader } from "@googlemaps/js-api-loader";
import SearchCard from './searchCard';

const SearchContainer = () => {
    const [selectedTopic, setSelectedTopic] = useState<string>('');
    const searchInputRef = useRef<HTMLInputElement>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const handleTopicSelect = (topic: string) => {
        setSelectedTopic(topic);
        setSearchResults([]);
    };

    const constructImageUrl = (photoName: string, apiKey: string, maxHeight = 429, maxWidth = 612) => {
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
                maxResultCount: 5,
                // minRating: 3.2,
                // region: 'us',
                // useStrictTypeFiltering: false,
            };

            const { places } = await Place.searchByText(request);
            setSearchResults(places);
            if (places.length) {
                const detailedPlaces = await Promise.all(places.map(async (place) => {
                    const detailedPlace = await fetchPlaceDetails(place.id);

                    const firstPhotoUrl = detailedPlace.photos.length > 0 ?
                        constructImageUrl(detailedPlace.photos[0].name, apiKey as string) :
                        null;
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
            }else {
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
                maxResultCount: 5,
                // minRating: 3.2,
                // region: 'us',
                // useStrictTypeFiltering: false,
            };

            const { places } = await Place.searchByText(request);
            setSearchResults(places);
            if (places.length) {
                const detailedPlaces = await Promise.all(places.map(async (place) => {
                    const detailedPlace = await fetchPlaceDetails(place.id);

                    const firstPhotoUrl = detailedPlace.photos.length > 0 ?
                        constructImageUrl(detailedPlace.photos[0].name, apiKey as string) :
                        null;
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
                maxResultCount: 5,
                // minRating: 3.2,
                // region: 'us',
                useStrictTypeFiltering: false,
            };

            const { places } = await Place.searchByText(request);
            setSearchResults(places);
            if (places.length) {
                const detailedPlaces = await Promise.all(places.map(async (place) => {
                    const detailedPlace = await fetchPlaceDetails(place.id);

                    const firstPhotoUrl = detailedPlace.photos.length > 0 ?
                        constructImageUrl(detailedPlace.photos[0].name, apiKey as string) :
                        null;
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
            }else {
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
                maxResultCount: 5,
                // minRating: 3.2,
                // region: 'us',
                // useStrictTypeFiltering: false,
            };

            const { places } = await Place.searchByText(request);
            setSearchResults(places);
            if (places.length) {
                const detailedPlaces = await Promise.all(places.map(async (place) => {
                    const detailedPlace = await fetchPlaceDetails(place.id);

                    const firstPhotoUrl = detailedPlace.photos.length > 0 ?
                        constructImageUrl(detailedPlace.photos[0].name, apiKey as string) :
                        null;
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

    const handleSearch = async () => {
        if (searchInputRef.current) {
            setSearchTerm(searchInputRef.current.value);
        }
        setLoading(true);
        if (selectedTopic === 'flights') {
            handleSearchAirports(searchTerm);
        } else if (selectedTopic === 'stays') {
            handleSearchStays(searchTerm);
        } else if (selectedTopic === 'carRentals') {
            handleSearchCarRentals(searchTerm);
        } else if (selectedTopic === 'attractions') {
            handleSearchAttractions(searchTerm);
        } else if (selectedTopic === 'airportTaxis') {
            handleSearchAirportTaxis(searchTerm);
        }

    };

    return (
        <div>
            <div className="search-container">
                <h1 className="search-title" style={{ fontSize: '2rem' }}>Search at your Convenience!</h1>
                <p className="search-subtitle" style={{ fontSize: '1.5rem' }}>Click on an icon below to filter your search and provide better results</p>

                <div className="search-button-container">
                    <button
                        className={`search-button ${selectedTopic === 'flights' ? 'search-button-selected' : ''}`}
                        onClick={() => handleTopicSelect('flights')}
                    >
                        <FaPlane className="search-icon" />
                        Flights
                    </button>
                    <button
                        className={`search-button ${selectedTopic === 'stays' ? 'search-button-selected' : ''}`}
                        onClick={() => handleTopicSelect('stays')}
                    >
                        <FaHotel className="search-icon" />
                        Stays
                    </button>
                    <button
                        className={`search-button ${selectedTopic === 'carRentals' ? 'search-button-selected' : ''}`}
                        onClick={() => handleTopicSelect('carRentals')}
                    >
                        <FaCar className="search-icon" />
                        Car Rentals
                    </button>
                    <button
                        className={`search-button ${selectedTopic === 'attractions' ? 'search-button-selected' : ''}`}
                        onClick={() => handleTopicSelect('attractions')}
                    >
                        <FaBinoculars className="search-icon" />
                        Attractions
                    </button>
                    <button
                        className={`search-button ${selectedTopic === 'airportTaxis' ? 'search-button-selected' : ''}`}
                        onClick={() => handleTopicSelect('airportTaxis')}
                    >
                        <FaTaxi className="search-icon" />
                        Airport Taxis
                    </button>
                </div>

                {selectedTopic && (
                    <div className="search-bar-container">
                        <input
                            type="text"
                            placeholder={`Search for ${selectedTopic}`}
                            className="search-input"
                            ref={searchInputRef}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="search-button-submit" onClick={handleSearch}>
                            <FaSearch />
                        </button>
                    </div>
                )}

                {loading && (
                    <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-blue-500 motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status">
                    <span
                      className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                      >Loading...</span>
                  </div>
                )}


            </div>

            {searchResults.length > 0 && (
                <div className="flex flex-col items-center gap-4 rounded-lg pt-10">
                    {searchResults.map((result, index) => (
                        <SearchCard key={index} place={result} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchContainer;