"use client"
import React, { useState } from 'react';

interface ImageSliderProps {
  favouriteDestinations: any;
}
const images = [
  {
    src: '/Images/india.jpg',
    label: 'India',
    description: 'Discover the rich culture and history of India.',
  },
  {
    src: '/Images/japan.jpg',
    label: 'Japan',
    description: 'Explore the beautiful landscapes and traditions of Japan.',
  },
  {
    src: '/Images/spain.jpg',
    label: 'Spain',
    description: 'Experience the vibrant culture and cuisine of Spain.',
  },
  {
    src: '/Images/rome.jpg',
    label: 'Rome',
    description: 'Visit the ancient ruins and historical sites of Rome.',
  },
  {
    src: '/Images/us.jpg',
    label: 'United States',
    description: 'Discover the diverse landscapes and attractions of the US.',
  },
];

const ImageSlider: React.FC<ImageSliderProps> = ({ favouriteDestinations }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % favouriteDestinations.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? favouriteDestinations.length - 1 : prevIndex - 1));
  };

  return (
    <div className="image-slider-container">
    <div className="image-slider">
      <div className="image-label">{favouriteDestinations[currentIndex].name}</div>
      <div className="image-container">
        <img
          src={favouriteDestinations[currentIndex].image}
          alt={`Slide ${currentIndex}`}
          className="active"
        />
      </div>
      <div className="image-description">{favouriteDestinations[currentIndex].address_obj.address_string}</div>
      <div className="navigation-buttons">
        <button className="prev" onClick={goToPrevSlide}>&#10094; </button>
        <button className="next" onClick={goToNextSlide}>&#10095;</button>
      </div>
    </div>
  </div>
  );
};

export default ImageSlider;
