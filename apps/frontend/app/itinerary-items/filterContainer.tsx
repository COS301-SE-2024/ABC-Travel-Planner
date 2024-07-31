"use client";
import { useEffect, useRef, useState } from 'react';
import { FaHotel, FaPlane, FaCar, FaBinoculars, FaTaxi, FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import SearchCard from '../search/searchCard';

const FilterContainer = () => {
    const [selectedTopic, setSelectedTopic] = useState<string>('');
    const searchInputRef = useRef<HTMLInputElement>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const handleTopicSelect = (topic: string) => {
        setSelectedTopic(topic);
        setSearchResults([]);
    };
    // const id = 25;//sample 
    const id = localStorage.getItem('id') as string
    const actualId = JSON.parse(id).id
    console.log(actualId)

    const handleSearch = async () => {
        router.push(`/filter?id=${actualId}&topic=${selectedTopic}&term=${searchInputRef.current?.value}`);

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

            {/* {searchResults.length > 0 && (
                <div className="flex flex-col items-center gap-4 rounded-lg pt-10">
                    {searchResults.map((result, index) => (
                        <SearchCard key={index} place={result} />
                    ))}
                </div>
            )} */}
        </div>
    );
};

export default FilterContainer;