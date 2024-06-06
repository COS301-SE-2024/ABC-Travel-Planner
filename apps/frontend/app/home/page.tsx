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
  { name: 'Eiffel Tower', city: 'Paris', image: '/Images/Paris.jpg', description: 'A wrought-iron lattice tower on the Champ de Mars, known as a global cultural icon of France. Experience like none other.' },
  { name: 'Colosseum', city: 'Rome', image: '/Images/rome.jpg', description: 'An ancient amphitheater in Rome, known for its gladiatorial games and historic significance. Talk of the city.' },
  { name: 'Tokyo Tower', city: 'Tokyo', image: '/Images/japan.jpg', description: 'A communications and observation tower in the Shiba-koen district, offering panoramic views of Tokyo.' },
  { name: 'Statue of Liberty', city: 'New York City', image: '/Images/us.jpg', description: 'A colossal neoclassical sculpture on Liberty Island, symbolizing freedom and democracy.' },
  { name: 'Sagrada Familia', city: 'Barcelona', image: '/Images/barcelona.jpg', description: 'A large unfinished Roman Catholic church designed by architect Antoni Gaudí.' },
  { name: 'Sydney Opera House', city: 'Sydney', image: '/Images/sydney.jpg', description: 'A multi-venue performing arts centre at Sydney Harbour, known for its distinctive sail-like design.' },
  { name: 'Table Mountain', city: 'Cape Town', image: '/Images/south-africa.jpg', description: 'A flat-topped mountain forming a prominent landmark overlooking the city of Cape Town.' },
  { name: 'Christ the Redeemer', city: 'Rio de Janeiro', image: '/Images/rio.jpg', description: 'An iconic statue of Jesus Christ atop the Corcovado mountain, offering panoramic views of Rio.' },
  { name: 'Burj Khalifa', city: 'Dubai', image: '/Images/dubai.jpg', description: 'The tallest structure and building in the world, known for its stunning architecture and views.' },
  { name: 'Machu Picchu', city: 'Machu Picchu', image: '/Images/machu-picchu.jpg', description: 'An Incan citadel set high in the Andes Mountains in Peru, known for its stunning views and well-preserved ruins.' },
  { name: 'Uluwatu Temple', city: 'Bali', image: '/Images/bali.jpeg', description: 'A Balinese sea temple located in Uluwatu, known for its stunning location and cultural significance. Beauty at its finest.' },
  { name: 'Hagia Sophia', city: 'Istanbul', image: '/Images/istanbul.jpg', description: 'A historic mosque and former cathedral, known for its massive dome and beautiful mosaics. Spiritual experience!' },
  { name: 'Fushimi Inari Shrine', city: 'Kyoto', image: '/Images/kyoto.jpg', description: 'A Shinto shrine famous for its thousands of vermilion torii gates, which straddle a network of trails.Beauty of the buildings.' },
  { name: 'Rijksmuseum', city: 'Amsterdam', image: '/Images/amsterdam.jpg', description: 'A Dutch national museum dedicated to arts and history in Amsterdam, known for its impressive collection.' },
  { name: 'St. Mark\'s Basilica', city: 'Venice', image: '/Images/venice.jpg', description: 'A cathedral church located in Piazza San Marco, known for its Italo-Byzantine architecture and mosaics.' },
];



const Home = () => {
  return (
    <div className="flex flex-col items-center" style={{ paddingBottom: '20px', marginBottom: '20px' }}>
      <div className="container mx-auto mt-8 bg-gray-300 rounded-lg p-4" style={{ marginTop: '40px' }}>
        <div className="flex justify-end mb-4">
        <select className="bg-blue-600 text-white font-bold py-2 px-4 rounded" >
        <option value="" disabled selected>Select a country</option>
        {popularDestinations.map((location, index) => (
          <option key={index} value={location.name}>
            {location.name}
          </option>
        ))}
      </select>
        </div>
        <h2 className="text-2xl font-bold mb-4">Top destinations for your next holiday</h2>
        <div className="flex overflow-x-auto pb-4" style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'thin', scrollbarColor: '#888 #f1f1f1' }}>
          {popularDestinations.map((destination, index) => (
            <div key={index} className="w-64 flex-shrink-0 mr-4" style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', transition: 'transform 0.3s ease' }}>
              <DestinationCard destination={destination} />
            </div>
          ))}
        </div>
      </div>
      <div className="my-8"></div> {/* Space between containers */}
      <div className="container mx-auto mt-8 bg-gray-300 rounded-lg p-4">
        <h2 className="text-2xl font-bold my-4">More to explore</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" style={{ maxHeight: '500px', overflowY: 'scroll', scrollbarWidth: 'thin', scrollbarColor: '#888 #f1f1f1' }}>
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

