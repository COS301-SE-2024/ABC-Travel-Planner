"use client";
import { useState } from 'react';
import { Link } from '@nextui-org/react'
import { FaHotel, FaPlane, FaCar, FaBinoculars, FaTaxi, FaSearch } from 'react-icons/fa';

const Search = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>('');

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
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
          />
          <Link href='/filter'>
            <button className="search-button-submit">
              <FaSearch />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Search;