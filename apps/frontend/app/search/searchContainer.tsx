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
    const handleTopicSelect = (topic: string) => {
        setSelectedTopic(topic);
    };



    const handleSearchStays = async (destination: string) => {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
        const loader = new Loader({
            apiKey: `${apiKey}`,
            version: "weekly",
            // Add additional options here as needed
        });

        loader.load().then(async () => {
            // Google Maps API is loaded and ready to use
            const { Place } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary;
            const request = {
                textQuery: destination,
                fields: ['*'],
                //includedType: 'restaurant',
                // locationBias: { lat: 37.4161493, lng: -122.0812166 },
                // isOpenNow: true,
                // language: 'en-US',
                maxResultCount: 1,
                // minRating: 3.2,
                // region: 'us',
                // useStrictTypeFiltering: false,
            };

            const { places } = await Place.searchByText(request);
            setSearchResults(places);
            if (places.length) {
                console.log(JSON.stringify(places));
            }
        });
    };

    const handleSearch = async () => {
        if (searchInputRef.current) {
            setSearchTerm(searchInputRef.current.value);
        }

        if (selectedTopic === 'flights') {
            handleSearchAirports(searchTerm);
        } else if (selectedTopic === 'stays') {
            handleSearchStays(searchTerm);
        }


    };

    return (
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

            {searchResults.length > 0 && (
                <div className="flex flex-col gap-4 rounded-lg pt-10">
                    {searchResults.map((result, index) => (
                        <SearchCard key={index} place={result} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchContainer;