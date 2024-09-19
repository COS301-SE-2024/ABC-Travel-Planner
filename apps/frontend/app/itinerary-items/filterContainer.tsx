"use client";
import { useEffect, useRef, useState } from 'react';
import { FaHotel, FaPlane, FaCar, FaBinoculars, FaTaxi, FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

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
    //console.log(actualId)

    const handleSearch = async () => {
        router.push(`/filter?id=${actualId}&topic=${selectedTopic}&term=${searchInputRef.current?.value}`);

    };

    return (
        <div>
        <div  style={{alignContent:'center' ,height: '100%', maxHeight:'500px', width: '100%', maxWidth: '900px', margin: '0 auto', padding: '40px', backgroundColor: 'white' }}>
            <h1  style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '15px', color: '#333' }}>Search at your Convenience!</h1>
            <p  style={{ fontSize: '1.25rem', textAlign: 'center', marginBottom: '25px', color: '#666' }}>Click on an icon below to filter your search and provide better results</p>
    
            <div  style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '25px' }}>
                <button
                    className={`search-button ${selectedTopic === 'flights' ? 'search-button-selected' : ''}`}
                    onClick={() => handleTopicSelect('flights')}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px', cursor: 'pointer', borderRadius: '8px', border: selectedTopic === 'flights' ? '2px solid #007BFF' : '2px solid transparent', transition: 'border 0.3s' }}
                >
                    <FaPlane className="search-icon" style={{marginLeft: '8px', fontSize: '2rem', color: selectedTopic === 'flights' ? '#007BFF' : '#333' }} />
                    <span style={{ marginTop: '5px', fontSize: '1rem', color: selectedTopic === 'flights' ? '#007BFF' : '#333' }}>Flights</span>
                </button>
                <button
                    className={`search-button ${selectedTopic === 'stays' ? 'search-button-selected' : ''}`}
                    onClick={() => handleTopicSelect('stays')}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px', cursor: 'pointer', borderRadius: '8px', border: selectedTopic === 'stays' ? '2px solid #007BFF' : '2px solid transparent', transition: 'border 0.3s' }}
                >
                    <FaHotel className="search-icon" style={{ marginLeft: '8px', fontSize: '2rem', color: selectedTopic === 'stays' ? '#007BFF' : '#333' }} />
                    <span style={{ marginTop: '5px', fontSize: '1rem', color: selectedTopic === 'stays' ? '#007BFF' : '#333' }}>Stays</span>
                </button>
                <button
                    className={`search-button ${selectedTopic === 'carRentals' ? 'search-button-selected' : ''}`}
                    onClick={() => handleTopicSelect('carRentals')}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px', cursor: 'pointer', borderRadius: '8px', border: selectedTopic === 'carRentals' ? '2px solid #007BFF' : '2px solid transparent', transition: 'border 0.3s' }}
                >
                    <FaCar className="search-icon" style={{ marginLeft: '6px', fontSize: '2rem', color: selectedTopic === 'carRentals' ? '#007BFF' : '#333' }} />
                    <span style={{ marginTop: '5px', fontSize: '1rem', color: selectedTopic === 'carRentals' ? '#007BFF' : '#333' }}>Car Rentals</span>
                </button>
                <button
                    className={`search-button ${selectedTopic === 'attractions' ? 'search-button-selected' : ''}`}
                    onClick={() => handleTopicSelect('attractions')}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px', cursor: 'pointer', borderRadius: '8px', border: selectedTopic === 'attractions' ? '2px solid #007BFF' : '2px solid transparent', transition: 'border 0.3s' }}
                >
                    <FaBinoculars className="search-icon" style={{ marginLeft: '8px', fontSize: '2rem', color: selectedTopic === 'attractions' ? '#007BFF' : '#333' }} />
                    <span style={{ marginTop: '5px', fontSize: '1rem', color: selectedTopic === 'attractions' ? '#007BFF' : '#333' }}>Attractions</span>
                </button>
                <button
                    className={`search-button ${selectedTopic === 'airportTaxis' ? 'search-button-selected' : ''}`}
                    onClick={() => handleTopicSelect('airportTaxis')}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px', cursor: 'pointer', borderRadius: '8px', border: selectedTopic === 'airportTaxis' ? '2px solid #007BFF' : '2px solid transparent', transition: 'border 0.3s' }}
                >
                    <FaTaxi className="search-icon" style={{marginLeft: '8px', fontSize: '2rem', color: selectedTopic === 'airportTaxis' ? '#007BFF' : '#333' }} />
                    <span style={{ marginTop: '5px', fontSize: '1rem', color: selectedTopic === 'airportTaxis' ? '#007BFF' : '#333' }}>Airport Taxis</span>
                </button>
            </div>
    
            {selectedTopic && (
                <div  style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                    <input
                        type="text"
                        placeholder={`Search for ${selectedTopic}`}
                        className="search-input"
                        ref={searchInputRef}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: '70%', padding: '12px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ccc', boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)' }}
                    />
                    <button  onClick={handleSearch} style={{ marginLeft: '10px', padding: '12px 20px', fontSize: '1rem', borderRadius: '8px', backgroundColor: '#007BFF', color: 'white', border: 'none', cursor: 'pointer' }}>
                        <FaSearch />
                    </button>
                </div>
            )}
    
            {loading && (
                <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-blue-500 motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                >
                    <span
                        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                    >Loading...</span>
                </div>
            )}
        </div>
    </div>
    
    );
};

export default FilterContainer;