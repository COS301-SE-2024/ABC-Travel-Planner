"use client";
import { useEffect, useRef, useState } from 'react';
import { FaHotel, FaPlane, FaCar, FaBinoculars, FaTaxi, FaSearch, FaUser} from 'react-icons/fa';
//import { handleSearchAirports } from '.';
import { Loader } from "@googlemaps/js-api-loader";
import SearchCard from './searchCard';
import ProfileCard from './ProfileCard';

const mockProfiles = [
    { id: 1, name: 'John Doe', imageUrl: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Jane Smith', imageUrl: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Emily Johnson', imageUrl: 'https://via.placeholder.com/150' },
];
const SearchContainer = () => {
    const [selectedTopic, setSelectedTopic] = useState<string>('');
    const searchInputRef = useRef<HTMLInputElement>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const defaultImageUrl = 'https://iso.500px.com/wp-content/uploads/2014/06/W4A2827-1-1500x1000.jpg';
    const [loading, setLoading] = useState(false);
    const handleTopicSelect = (topic: string) => {
        setSelectedTopic(topic);
        setSearchResults([]);
        setSearchTerm('');
    };

    const handleSearch = async () => {
        if (searchInputRef.current) {
            setSearchTerm(searchInputRef.current.value);
        }
        setLoading(true);
        try {
            let url = '';
            if(selectedTopic == 'profile'){
                url = `http://localhost:4000/search/user?user=${encodeURIComponent(searchTerm)}`;
            }else{
                url = `http://localhost:4000/search/places?textQuery=${encodeURIComponent(searchTerm)}&type=${encodeURIComponent(selectedTopic)}`
            }
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if(data.length){
                setSearchResults(data);
                console.log(JSON.stringify(data));
            }else{
                setSearchResults([]);
            }
            setLoading(false);
            
            return data;
          } catch (error) {
            console.error('Error fetching data:', error);
          }

    };

    return (
        <div>
            <div data-testid="searchContainer" className="search-container">
                <h1 className="search-title" style={{ fontSize: '2rem' }}>Search at your Convenience!</h1>
                <p className="search-subtitle" style={{ fontSize: '1.5rem' }}>Click on an icon below to filter your search and provide better results</p>

                <div data-testid="searchOptions" className="search-button-container">
                    <button
                        data-testid="flightsButton"
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
                    <button
                        className={`search-button ${selectedTopic === 'profile' ? 'search-button-selected' : ''}`}
                        onClick={() => handleTopicSelect('profile')}
                    >
                        <FaUser className="search-icon" />
                        Profile
                    </button>
                </div>

                {selectedTopic && (
                    <div className="search-bar-container">
                        <input
                            data-testid="searchInput"
                            type="text"
                            placeholder={`Search for ${selectedTopic}`}
                            className="search-input"
                            ref={searchInputRef}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button data-testid="searchButton" className="search-button-submit" onClick={handleSearch}>
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
                    <div key={index}>
                        {selectedTopic === 'profile' ? (
                            <ProfileCard profile={result} />
                        ) : (
                            <SearchCard place={result} />
                        )}
                    </div>
                ))}
            </div>
)}

        </div>
    );
};

export default SearchContainer;