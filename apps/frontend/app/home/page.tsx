import React from 'react';
import DestinationCard from './DestinationCard';

const popularDestinations = [
  { name: 'France', image: '/Images/france.jpg' },
  { name: 'Italy', image: '/Images/italy.jpg' },
  { name: 'Japan', image: '/Images/japan.jpg' },
  { name: 'United States', image: '/Images/usa.jpg' },
  { name: 'Spain', image: '/Images/spain1.jpg' },
  { name: 'Australia', image: '/Images/australia.jpg' },
  { name: 'South Africa', image: '/Images/SA.jpeg' },
  { name: 'Brazil', image: '/Images/brazil.jpg' },
  { name: 'United Arab Emirates', image: '/Images/uae.jpeg' },
  { name: 'Peru', image: '/Images/peru.jpg' },
  { name: 'Indonesia', image: '/Images/indonesia.jpeg' },
  { name: 'Turkey', image: '/Images/turkey1.jpg' },
  { name: 'Netherlands', image: '/Images/netherlands.jpg' },
  { name: 'Japan', image: '/Images/japan.jpg' },
  { name: 'Italy', image: '/Images/italy.jpg' },
];


const allLocations = [
  { name: 'Paris', image: '/Images/Paris.jpg', description: 'The capital city of France, known for its art, fashion, gastronomy, and culture.' },
  { name: 'Rome', image: '/Images/rome.jpg', description: 'The capital city of Italy, known for its ancient ruins, art, and architecture.' },
  { name: 'Tokyo', image: '/Images/japan.jpg', description: 'The capital city of Japan, known for its skyscrapers, pop culture, and technology.' },
  { name: 'New York City', image: '/Images/us.jpg', description: 'The largest city in the United States, known for its culture, art, and entertainment.' },
  { name: 'Barcelona', image: '/Images/barcelona.jpg', description: 'The capital city of Catalonia, known for its art, architecture, and vibrant culture.' },
  { name: 'Sydney', image: '/Images/sydney.jpg', description: 'The capital city of New South Wales, known for its opera house, beaches, and vibrant culture.' },
  { name: 'Cape Town', image: '/Images/south-africa.jpg', description: 'The legislative capital of South Africa, known for its harbor, beaches, and mountains.' },
  { name: 'Rio de Janeiro', image: '/Images/rio.jpg', description: 'The second-most populous city in Brazil, known for its beaches, carnivals, and music.' },
  { name: 'Dubai', image: '/Images/dubai.jpg', description: 'The largest and most populous city in the United Arab Emirates, known for its modern architecture, luxury shopping, and vibrant nightlife.' },
  { name: 'Machu Picchu', image: '/Images/machu-picchu.jpg', description: 'An Incan citadel set high in the Andes Mountains in Peru, known for its stunning views and well-preserved ruins.' },
  { name: 'Bali', image: '/Images/bali.jpeg', description: 'An Indonesian island known for its forested volcanic mountains, iconic rice paddies, beaches, and coral reefs.' },
  { name: 'Istanbul', image: '/Images/istanbul.jpg', description: 'The largest city in Turkey, known for its historic sites, vibrant culture, and stunning architecture.' },
  { name: 'Kyoto', image: '/Images/kyoto.jpg', description: 'The capital city of Kyoto Prefecture in Japan, known for its classical Buddhist temples, as well as gardens, imperial palaces, Shinto shrines, and traditional wooden houses.' },
  { name: 'Amsterdam', image: '/Images/amsterdam.jpg', description: 'The capital city of the Netherlands, known for its artistic heritage, elaborate canal system, and narrow houses with gabled facades.' },
  { name: 'Venice', image: '/Images/venice.jpg', description: 'A city in northeastern Italy, known for its canals, bridges, and beautiful architecture.' },
];


const Home = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="container mx-auto mt-8 bg-gray-300 rounded-lg p-4" style={{ marginTop: '40px' }}>
        <div className="flex justify-end mb-4">
          <button className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">
            Search
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-4">Popular Destinations</h2>
        <div className="flex overflow-x-auto pb-4" style={{ WebkitOverflowScrolling: 'touch' }}>
          {popularDestinations.map((destination, index) => (
            <div key={index} className="w-64 flex-shrink-0 mr-4" style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', transition: 'transform 0.3s ease' }}>
              <DestinationCard destination={destination} />
            </div>
          ))}
        </div>
      </div>
      <div className="my-8"></div> {/* Space between containers */}
      <div className="container mx-auto mt-8 bg-gray-200 rounded-lg p-4">
        <h2 className="text-2xl font-bold my-4">All Locations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" style={{ maxHeight: '500px', overflowY: 'scroll' }}>
          {allLocations.map((destination, index) => (
            <div key={index} className="destination-card" style={{ backgroundColor: 'white' }}>
              <DestinationCard destination={destination} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

