"use client";
import React, { useState } from 'react';
import {  FaBookmark } from 'react-icons/fa';


const Destinations = () => {
  const [destinations, setDestinations] = useState([
    {
      name: 'Paris',
      country: 'France',
      description: 'Explore the romantic city of Paris.',
      isFavorite: false,
      image: '/Images/Paris.jpg',
    },
    {
      name: 'Tokyo',
      country: 'Japan',
      description: 'Experience the vibrant culture of Tokyo.',
      isFavorite: false,
      image: '/Images/japan.jpg',
    },
    {
      name: 'India',
      country: 'India',
      description: 'Discover the rich culture and diversity of India.',
      isFavorite: false,
      image: '/Images/india.jpg',
    },
    {
      name: 'Germany',
      country: 'Germany',
      description: 'Experience the blend of history and modernity in Germany.',
      isFavorite: false,
      image: '/Images/germany.jpg',
    },
    {
      name: 'Dubai',
      country: 'United Arab Emirates',
      description: 'Explore the luxurious city of Dubai.',
      isFavorite: false,
      image: '/Images/dubai.jpg',
    },
    {
      name: 'Denmark',
      country: 'Denmark',
      description: 'Experience the charm of Denmark.',
      isFavorite: false,
      image: '/Images/denmark.jpg',
    },
    {
      name: 'Columbia',
      country: 'Colombia',
      description: 'Discover the beauty of Colombia.',
      isFavorite: false,
      image: '/Images/colombia.jpg',
    },
    {
      name: 'Rome',
      country: 'Italy',
      description: 'Explore the ancient history of Rome.',
      isFavorite: false,
      image: '/Images/rome.jpg',
    },
    {
      name: 'New York City',
      country: 'USA',
      description: 'Experience the bustling life of New York City.',
      isFavorite: false,
      image: '/Images/us.jpg',
    },
    {
      name: 'Miami',
      country: 'USA',
      description: 'Relax and enjoy the vibrant culture of Miami.',
      isFavorite: false,
      image: '/Images/miami.jpg',
    },
  ]);

  const handleFavoriteClick = (index: number) => {
    const updatedDestinations = [...destinations];
    updatedDestinations.unshift(updatedDestinations.splice(index, 1)[0]);
    updatedDestinations[0].isFavorite = !updatedDestinations[0].isFavorite;
    setDestinations(updatedDestinations);
  };

  return (
    <div className="container">
      <h1 className="title" style={{ fontSize: '2rem' }}>Keep your favorite destinations close by!</h1>
      

      <div className="cardContainer">
        {destinations.map((destination, index) => (
          <div key={index} className="card">
            <img src={destination.image} alt={destination.name} className="image" />
            <h2>{destination.name}</h2>
            <p>{destination.description}</p>
            <p>Country: {destination.country}</p>
            <button
              onClick={() => handleFavoriteClick(index)}
              className="favoriteButton"
            >
              {destination.isFavorite ? <FaBookmark style={{ color: 'yellow' }} /> : <FaBookmark />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Destinations;

