// Home.js
import React from 'react';
//import '../styles/globals.css';

async function getData() {
  const url = 'https://api.content.tripadvisor.com/api/v1/location/search?key=EA30B923BE4A4CB28EE695CDFFEB1DE7&searchQuery=South%20Africa';
  const options = { method: 'GET', headers: { accept: 'application/json' } };

  try {
    const response = await fetch(url, options);
    return response.json();
  } catch (err) {
    console.error(err);
  }

}
// const destinations = [
//   {
//     title: 'Paris, France',
//     country: 'France',
//     image: '/Images/Paris.jpg',
//     description: 'Paris, the capital of France, is a major European city and a global center for art, fashion, gastronomy, and culture. Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine. Beyond such landmarks as the Eiffel Tower and the 12th-century, Gothic Notre-Dame cathedral, the city is known for its cafe culture and designer boutiques along the Rue du Faubourg Saint-Honoré.',
//     rating: 5, // out of 5
//   },
//   {
//     title: 'Madrid, Spain',
//     country: 'Spain',
//     image: '/Images/spain.jpg',
//     description: 'Madrid, the capital of Spain, is a cosmopolitan city that offers a unique blend of modernity and tradition. Known for its rich cultural heritage, world-class art museums, and vibrant nightlife, Madrid is a must-visit destination for travelers.',
//     rating: 4, // out of 5
//   },
//   {
//     title: 'Rome, Italy',
//     country: 'Italy',
//     image: '/Images/rome.jpg',
//     description: 'Rome, the capital of Italy, is a city with over 2,500 years of history. It is home to iconic landmarks such as the Colosseum, the Roman Forum, and the Vatican City. Known for its rich history, art, architecture, and cuisine, Rome is a fascinating destination for travelers.',
//     rating: 5, // out of 5
//   },
//   {
//     title: 'New York City, USA',
//     country: 'USA',
//     image: '/Images/us.jpg',
//     description: 'New York City, often simply called New York, is the most populous city in the United States. It is known for its iconic landmarks such as the Statue of Liberty, Times Square, and Central Park. With its diverse culture, vibrant arts scene, and bustling streets, New York City offers a unique experience to visitors.',
//     rating: 5, // out of 5
//   },
//   {
//     title: 'Tokyo, Japan',
//     country: 'Japan',
//     image: '/Images/japan.jpg',
//     description: 'Tokyo, the capital of Japan, is a bustling metropolis that blends modernity with tradition. Known for its high-tech innovations, vibrant pop culture, and traditional temples and shrines, Tokyo offers a unique and exciting experience for travelers.',
//     rating: 4, // out of 5
//   },
//   {
//     title: 'Mumbai, India',
//     country: 'India',
//     image: '/Images/india.jpg',
//     description: 'Mumbai, formerly known as Bombay, is the largest city in India and is known for its vibrant culture, rich history, and stunning architecture. From the iconic Gateway of India to the bustling markets of Colaba, Mumbai offers a unique blend of old-world charm and modernity.',
//     rating: 4, // out of 5
//   },
//   {
//     title: 'Istanbul, Turkey',
//     country: 'Turkey',
//     image: '/Images/turkey.jpg',
//     description: 'Istanbul, Turkey\'s largest city, is located on the country\'s western border. It is known for its historic sites, including the Hagia Sophia, Topkapi Palace, and Blue Mosque. Istanbul is a melting pot of cultures, blending influences from Europe and Asia.',
//     rating: 4, // out of 5
//   },
//   {
//     title: 'Cape Town, South Africa',
//     country: 'South Africa',
//     image: '/Images/south-africa.jpg',
//     description: 'Cape Town, located in South Africa, is known for its stunning natural beauty, diverse culture, and rich history. From the iconic Table Mountain to the vibrant waterfront, Cape Town offers a unique and unforgettable experience for travelers.',
//     rating: 5, // out of 5
//   },
//   {
//     title: 'Berlin, Germany',
//     country: 'Germany',
//     image: '/Images/germany.jpg',
//     description: 'Berlin, the capital of Germany, is known for its rich history, diverse architecture, and vibrant arts scene. From the iconic Brandenburg Gate to the Berlin Wall Memorial, Berlin offers a blend of old-world charm and modernity.',
//     rating: 4, // out of 5
//   },
// ];


const Home = async () => {
  const data = await getData();
  const destinations = data?.data || [];
  console.log(destinations);
  return (
    <div className="container mx-auto mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {destinations.map((destination: any, index: number) => (
          <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg">
            {/* <img src={destination.image} className="w-full" alt={destination.title} /> */}
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{destination.name}</div>
              <div className="flex justify-center items-center mb-2">
                {Array.from({ length: destination.rating }, (_, i) => (
                  <svg key={i} className="w-6 h-6 fill-current text-yellow-500 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 2c-.3 0-.6.1-.8.4l-4.2 6.4-6.3.9c-.4.1-.6.5-.5.9.1.3.4.6.8.6h7.2l2.6 6.8c.1.2.3.3.5.3s.4-.1.5-.3l2.6-6.8h7.2c.4 0 .7-.3.8-.6.1-.4-.1-.8-.5-.9l-6.3-.9-4.2-6.4c-.2-.4-.5-.5-.8-.5z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 text-base">{destination.address_obj.address_string}</p>
            </div>
            <div className="px-6 py-4">
              <div className="flex justify-between items-center">

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Home;


