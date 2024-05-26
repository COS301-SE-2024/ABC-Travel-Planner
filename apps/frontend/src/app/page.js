// Home.js
import React from 'react';
import '../styles/globals.css';

const destinations = [
    {
      title: 'Paris, France',
      country: 'France',
      image: '/Images/Paris.jpg',
      description: 'Paris, the capital of France, is a major European city and a global center for art, fashion, gastronomy, and culture. Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine. Beyond such landmarks as the Eiffel Tower and the 12th-century, Gothic Notre-Dame cathedral, the city is known for its cafe culture and designer boutiques along the Rue du Faubourg Saint-Honoré.',
      rating: 5, // out of 5
    },
    {
      title: 'Madrid, Spain',
      country: 'Spain',
      image: '/Images/spain.jpg',
      description: 'Madrid, the capital of Spain, is a cosmopolitan city that offers a unique blend of modernity and tradition. Known for its rich cultural heritage, world-class art museums, and vibrant nightlife, Madrid is a must-visit destination for travelers.',
      rating: 4, // out of 5
  },
  {
      title: 'Rome, Italy',
      country: 'Italy',
      image: '/Images/rome.jpg',
      description: 'Rome, the capital of Italy, is a city with over 2,500 years of history. It is home to iconic landmarks such as the Colosseum, the Roman Forum, and the Vatican City. Known for its rich history, art, architecture, and cuisine, Rome is a fascinating destination for travelers.',
      rating: 5, // out of 5
  },
  {
      title: 'New York City, USA',
      country: 'USA',
      image: '/Images/us.jpg',
      description: 'New York City, often simply called New York, is the most populous city in the United States. It is known for its iconic landmarks such as the Statue of Liberty, Times Square, and Central Park. With its diverse culture, vibrant arts scene, and bustling streets, New York City offers a unique experience to visitors.',
      rating: 5, // out of 5
  },
  {
      title: 'Tokyo, Japan',
      country: 'Japan',
      image: '/Images/japan.jpg',
      description: 'Tokyo, the capital of Japan, is a bustling metropolis that blends modernity with tradition. Known for its high-tech innovations, vibrant pop culture, and traditional temples and shrines, Tokyo offers a unique and exciting experience for travelers.',
      rating: 4, // out of 5
  },
  {
      title: 'Mumbai, India',
      country: 'India',
      image: '/Images/india.jpg',
      description: 'Mumbai, formerly known as Bombay, is the largest city in India and is known for its vibrant culture, rich history, and stunning architecture. From the iconic Gateway of India to the bustling markets of Colaba, Mumbai offers a unique blend of old-world charm and modernity.',
      rating: 4, // out of 5
  },
  {
      title: 'Istanbul, Turkey',
      country: 'Turkey',
      image: '/Images/turkey.jpg',
      description: 'Istanbul, Turkey\'s largest city, is located on the country\'s western border. It is known for its historic sites, including the Hagia Sophia, Topkapi Palace, and Blue Mosque. Istanbul is a melting pot of cultures, blending influences from Europe and Asia.',
      rating: 4, // out of 5
  },
  {
      title: 'Cape Town, South Africa',
      country: 'South Africa',
      image: '/Images/south-africa.jpg',
      description: 'Cape Town, located in South Africa, is known for its stunning natural beauty, diverse culture, and rich history. From the iconic Table Mountain to the vibrant waterfront, Cape Town offers a unique and unforgettable experience for travelers.',
      rating: 5, // out of 5
  },
  {
      title: 'Berlin, Germany',
      country: 'Germany',
      image: '/Images/germany.jpg',
      description: 'Berlin, the capital of Germany, is known for its rich history, diverse architecture, and vibrant arts scene. From the iconic Brandenburg Gate to the Berlin Wall Memorial, Berlin offers a blend of old-world charm and modernity.',
      rating: 4, // out of 5
  },
];


const Home = () => {
  return (
      <div className="container mt-8">
          <div className="row">
              {destinations.map((destination, index) => (
                  <div key={index} className="col-md-4">
                      <div className="card">
                          <img src={destination.image} className="card-img-top" alt={destination.title} />
                          <div className="card-body">
                              <h5 className="card-title">{destination.title}</h5>
                              <h6 className="card-subtitle mb-2 text-muted">{destination.country}</h6>
                              <p className="card-text">{destination.description}</p>
                              <div className="rating">
                                  {Array.from({ length: destination.rating }, (_, i) => (
                                      <span key={i} className="fa fa-star checked"></span>
                                  ))}
                              </div>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      </div>
  );
};

export default Home;
