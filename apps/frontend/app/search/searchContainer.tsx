"use client";
import { useEffect, useRef, useState } from 'react';
import { FaHotel, FaPlane, FaCar, FaBinoculars, FaTaxi, FaSearch, FaUser } from 'react-icons/fa';
//import { handleSearchAirports } from '.';
import { Loader } from "@googlemaps/js-api-loader";
import SearchCard from './searchCard';
import ProfileCard from './ProfileCard';
import { useTheme } from "../context/ThemeContext";
import Cookie from "js-cookie";

const SearchContainer = () => {
    const [selectedTopic, setSelectedTopic] = useState<string>('stays');
    const searchInputRef = useRef<HTMLInputElement>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const defaultImageUrl = 'https://iso.500px.com/wp-content/uploads/2014/06/W4A2827-1-1500x1000.jpg';
    const [loading, setLoading] = useState(false);
    const [searchInitiated, setSearchInitiated] = useState(false);

    useEffect(() => {
        localStorage.removeItem('searchResults');
    }, []);
    
    const handleTopicSelect = (topic: string) => {
        setSelectedTopic(topic);
        setSearchResults([]);
        setSearchTerm('');
        setSearchInitiated(false);
    };

    const handleSearch = async () => {
        if (searchInputRef.current) {
            setSearchTerm(searchInputRef.current.value);
        }
        setLoading(true);
        setSearchInitiated(true);
        try {
            let url = '';
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
            const user_id = Cookie.get("user_id")!;
            if (selectedTopic == 'profile') {
                url = `${backendUrl}/search/user?user=${encodeURIComponent(searchTerm)}&currUser=${encodeURIComponent(user_id)}`;
            } else {
                url = `${backendUrl}/search/places?textQuery=${encodeURIComponent(searchTerm)}&type=${encodeURIComponent(selectedTopic)}`
            }
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.length) {
                setSearchResults(data);
            } else {
                setSearchResults([]);
            }
            setLoading(false);

            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }

    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
      };

    const getPlaceholderText = () => {
        switch (selectedTopic) {
            case 'flights':
                return 'e.g. Airports in South Africa';
            case 'stays':
                return 'e.g. Hotels in Germany';
            case 'carRentals':
                return 'e.g. Car rentals in Spain';
            case 'attractions':
                return 'e.g. Top attractions in France';
            case 'airportTaxis':
                return 'e.g. Airport taxis in Dubai';
            case 'profile':
                return 'e.g. name or username';
        }
    };

    const { selectedTheme, setTheme, themeStyles } = useTheme();
    return (
        <div style={{background: themeStyles.background, minHeight: '100vh'}} >
            <div data-testid="searchContainer" className="search-container" style={{background: themeStyles.background}}>
                <h1 className="search-title" style={{ fontSize: '2rem' }}>Search at your Convenience!</h1>
                <p className="search-subtitle" style={{ fontSize: '1.5rem' }}>Click on an icon below to filter your search and provide better results</p>

                <div data-testid="searchOptions" className="search-button-container">
                    <button
                        data-testid="flightsButton"
                        className={`search-button ${selectedTopic === 'flights' ? 'search-button-selected' : ''}`}
                        onClick={() => handleTopicSelect('flights')}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px', cursor: 'pointer', borderRadius: '8px', border: selectedTopic === 'flights' ? `2px solid ${themeStyles.navbarColor}` : '2px solid transparent', transition: 'border 0.3s'}}
                    >
                        <FaPlane className="search-icon" style={{marginLeft: '8px', fontSize: '2rem', color: selectedTopic === 'flights' ? `${themeStyles.navbarColor}` : '#333' }}/>
                        Airports
                    </button>
                    <button
                        className={`search-button ${selectedTopic === 'stays' ? 'search-button-selected' : ''}`}
                        onClick={() => handleTopicSelect('stays')}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px', cursor: 'pointer', borderRadius: '8px', border: selectedTopic === 'stays' ? `2px solid ${themeStyles.navbarColor}` : '2px solid transparent', transition: 'border 0.3s' }}
                    >
                        <FaHotel className="search-icon" style={{ marginLeft: '8px', fontSize: '2rem', color: selectedTopic === 'stays' ? `${themeStyles.navbarColor}` : '#333' }}/>
                        Stays
                    </button>
                    <button
                        className={`search-button ${selectedTopic === 'carRentals' ? 'search-button-selected' : ''}`}
                        onClick={() => handleTopicSelect('carRentals')}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px', cursor: 'pointer', borderRadius: '8px', border: selectedTopic === 'carRentals' ? `2px solid ${themeStyles.navbarColor}` : '2px solid transparent', transition: 'border 0.3s' }}
                    >
                        <FaCar className="search-icon" style={{ marginLeft: '6px', fontSize: '2rem', color: selectedTopic === 'carRentals' ? `${themeStyles.navbarColor}` : '#333' }}/>
                        Car Rentals
                    </button>
                    <button
                        className={`search-button ${selectedTopic === 'attractions' ? 'search-button-selected' : ''}`}
                        onClick={() => handleTopicSelect('attractions')}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px', cursor: 'pointer', borderRadius: '8px', border: selectedTopic === 'attractions' ? `2px solid ${themeStyles.navbarColor}` : '2px solid transparent', transition: 'border 0.3s' }}
                    >
                        <FaBinoculars className="search-icon" style={{ marginLeft: '8px', fontSize: '2rem', color: selectedTopic === 'attractions' ? `${themeStyles.navbarColor}` : '#333' }}/>
                        Attractions
                    </button>
                    <button
                        className={`search-button ${selectedTopic === 'airportTaxis' ? 'search-button-selected' : ''}`}
                        onClick={() => handleTopicSelect('airportTaxis')}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px', cursor: 'pointer', borderRadius: '8px', border: selectedTopic === 'airportTaxis' ? `2px solid ${themeStyles.navbarColor}` : '2px solid transparent', transition: 'border 0.3s' }}
                    >
                        <FaTaxi className="search-icon"  style={{marginLeft: '8px', fontSize: '2rem', color: selectedTopic === 'airportTaxis' ? `${themeStyles.navbarColor}` : '#333' }}/>
                        Airport Taxis
                    </button>
                    <button
                        className={`search-button ${selectedTopic === 'profile' ? 'search-button-selected' : ''}`}
                        onClick={() => handleTopicSelect('profile')}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px', cursor: 'pointer', borderRadius: '8px', border: selectedTopic === 'profile' ? `2px solid ${themeStyles.navbarColor}` : '2px solid transparent', transition: 'border 0.3s' }}
                    >
                        <FaUser className="search-icon"  style={{marginLeft: '8px', fontSize: '2rem', color: selectedTopic === 'profile' ? `${themeStyles.navbarColor}` : '#333' }}/>
                        Profile
                    </button>
                </div>

                <div className="search-bar-container">
                    <input
                        data-testid="searchInput"
                        type="text"
                        placeholder={getPlaceholderText()}
                        onKeyPress={handleKeyPress}
                        className="search-input"
                        ref={searchInputRef}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button 
                        data-testid="searchButton" 
                         className="search-button-submit h-12 flex items-center justify-center"
                        onClick={handleSearch}
                    >
                        <FaSearch />
                    </button>
                </div>

                {loading && (
                    <div
                        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-blue-500 motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status" style={{background: themeStyles.background}}>
                        <span
                            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                        >Loading...</span>
                    </div>
                )}


            </div>

            {searchResults.length > 0 && (
                <div className="flex flex-col items-center gap-4 rounded-lg pt-10" style={{background: themeStyles.background}}>
                    {searchResults.map((result, index) => (
                        selectedTopic === 'profile' ? (
                            <ProfileCard key={index} profile={result} />
                        ) : (
                            <SearchCard key={index} place={result} />
                        )
                    ))}
                </div>
            )}

            {searchInitiated && !loading && searchResults.length === 0 && (
                <div className="flex justify-center items-center h-20 mt-10" style={{background: themeStyles.background}}>
                    <p className="text-gray-500 text-lg">No search results found.</p>
                </div>
            )}
        </div>
    );
};

export default SearchContainer;