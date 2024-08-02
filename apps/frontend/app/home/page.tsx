"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DestinationCard from './DestinationCard';
import PostCard from './PostCard';

const popularDestinations = [
  { name: 'France', image: '/Images/france.jpg', city: 'Paris', location_id: '1', description: 'rich history, unique culture, incredible food, and pleasant weather' },
  { name: 'Italy', image: '/Images/italy.jpg', city: 'Rome', location_id: '2', description: 'Italy\'s cities exude a unique charm, distinctive character and attractions' },
  { name: 'Japan', image: '/Images/japan.jpg', city: 'Tokyo', location_id: '3', description: 'blend of modernity and tradition, vibrant culture, and advanced technology' },
  { name: 'Australia', image: '/Images/australia.jpg', city: 'Sydney', location_id: '4', description: 'iconic landmarks, beautiful beaches, and a relaxed lifestyle' },
  { name: 'Spain', image: '/Images/spain.jpg', city: 'Barcelona', location_id: '5', description: 'stunning architecture, lively streets, and delicious cuisine. Taste of beach life' },
  { name: 'USA', image: '/Images/usa.jpg', city: 'New York', location_id: '6', description: 'bustling metropolis, diverse culture, and iconic landmarks. NYC is the heart of the US' },
  { name: 'Brazil', image: '/Images/brazil.jpg', city: 'Rio de Janeiro', location_id: '7', description: 'vibrant festivals, beautiful beaches, and breathtaking landscapes' },
  { name: 'UK', image: '/Images/uk.png', city: 'London', location_id: '8', description: 'rich history, cultural diversity, and world-famous landmarks. Iconic red tour bus!' },
  { name: 'Thailand', image: '/Images/thailand.jpg', city: 'Bangkok', location_id: '9', description: 'vibrant street life, ornate temples, and stunning palaces. A relaxing and peaceful vibe' },
  { name: 'Canada', image: '/Images/canada.jpg', city: 'Toronto', location_id: '10', description: 'multicultural city, stunning skyline, and natural beauty. Eye catching lakes ' }
];

const allLocations = [
  { name: 'Eiffel Tower', city: 'Paris', image: '/Images/Paris.jpg', location_id: '1', description: 'A wrought-iron lattice tower on the Champ de Mars, known as a global cultural icon of France.' },
  { name: 'Colosseum', city: 'Rome', image: '/Images/rome.jpg', location_id: '2', description: 'An ancient amphitheater in Rome, known for its gladiatorial games and historic significance.' },
  { name: 'Tokyo Tower', city: 'Tokyo', image: '/Images/japan.jpg', location_id: '3', description: 'A communications and observation tower in the Shiba-koen district, offering panoramic views of Tokyo.' },
  { name: 'Statue of Liberty', city: 'New York', image: '/Images/us.jpg', location_id: '4', description: 'A colossal neoclassical sculpture on Liberty Island, symbolizing freedom and democracy.' },
  { name: 'Sagrada Familia', city: 'Barcelona', image: '/Images/barcelona.jpg', location_id: '5', description: 'A large unfinished Roman Catholic church designed by architect Antoni Gaudí.' },
  { name: 'Sydney Opera House', city: 'Sydney', image: '/Images/sydney.jpg', location_id: '6', description: 'A multi-venue performing arts centre at Sydney Harbour, known for its distinctive sail-like design.' },
  { name: 'Table Mountain', city: 'Cape Town', image: '/Images/south-africa.jpg', location_id: '7', description: 'A flat-topped mountain forming a prominent landmark overlooking the city of Cape Town.' },
  { name: 'Christ the Redeemer', city: 'Rio de Janeiro', image: '/Images/rio.jpg', location_id: '8', description: 'An iconic statue of Jesus Christ atop the Corcovado mountain, offering panoramic views of Rio.' },
  { name: 'Burj Khalifa', city: 'Dubai', image: '/Images/dubai.jpg', location_id: '9', description: 'The tallest structure and building in the world, known for its stunning architecture and views.' },
  { name: 'Machu Picchu', city: 'Machu Picchu', image: '/Images/machu-picchu.jpg', location_id: '10', description: 'An Incan citadel set high in the Andes Mountains in Peru, known for its stunning views and well-preserved ruins.' },
  { name: 'Uluwatu Temple', city: 'Bali', image: '/Images/bali.jpeg', location_id: '11', description: 'A Balinese sea temple located in Uluwatu, known for its stunning location and cultural significance.' },
  { name: 'Hagia Sophia', city: 'Istanbul', image: '/Images/istanbul.jpg', location_id: '12', description: 'A historic mosque and former cathedral, known for its massive dome and beautiful mosaics.' },
  { name: 'Fushimi Inari Shrine', city: 'Kyoto', image: '/Images/kyoto.jpg', location_id: '13', description: 'A Shinto shrine famous for its thousands of vermilion torii gates, which straddle a network of trails.' },
  { name: 'Rijksmuseum', city: 'Amsterdam', image: '/Images/amsterdam.jpg', location_id: '14', description: 'A Dutch national museum dedicated to arts and history in Amsterdam, known for its impressive collection.' },
  { name: 'St. Mark\'s Basilica', city: 'Venice', image: '/Images/venice.jpg', location_id: '15', description: 'A cathedral church located in Piazza San Marco, known for its Italo-Byzantine architecture and mosaics.' },
  { name: 'Notre Dame Cathedral', city: 'Paris', image: '/Images/notre-dame.jpg', location_id: '16', description: 'A medieval Catholic cathedral on the Île de la Cité in the fourth arrondissement of Paris.' },
  { name: 'Louvre Museum', city: 'Paris', image: '/Images/louvre.jpg', location_id: '17', description: 'The world\'s largest art museum and a historic monument in Paris, France. Artistic, Historical, Iconic' },
  { name: 'Champs Elysées / Arc of Triumph', city: 'Paris', image: '/Images/arc-of-triumph.jpeg', location_id: '18', description: 'One of the most famous streets in the world, and the Arc of Triumph, a symbol of French national pride.' },
];

interface Post {
  id: string;
  image_id?: string;
  image_url?: string;
  post_title?: string;
  post_description?: string;
  post_likes?: number;
  location_id?: string;
  timestamp: number;
}

interface Place {
  name: string;
  photos?: {
    photo_reference: string;
  }[];
  formatted_address: string;
  place_id: string;
  types: string[];
}


const Home = () => {
  const [tab, setTab] = useState('For You');
  const [posts, setPosts] = useState<Post[]>([]);
  const [popularDestinations, setPopularDestinations] = useState<{ image: string }[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // const response = await fetch(`${process.env.BACKEND_URL}/posts`);
        const response = await fetch(`http://localhost:4000/posts`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Post[] = await response.json();
        
        //Images...
        data.forEach(async element => {
          console.log("Image ID: " + element.id)
          const imageUrl = await fetch(`http://localhost:4000/images?id=${element.id}`)
          const data = await imageUrl.text();

          //Check for png & jpg's
          if (JSON.parse(data).url) {
            element.image_url = JSON.parse(data).url;
          } else element.image_url = data;

        });
        
        console.log(data); // Log the fetched data for debugging
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchPopularDestinations = async () => {
      try {
        // const response = await fetch(`${process.env.BACKEND_URL}/google-maps/popular-destinations`);
        const response = await fetch(`http://localhost:4000/google-maps/popular-destinations`);

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Full Response:', data); // Log the entire response
        const places = data.results;
        if (!places) {
          throw new Error('No places found in response');
        }
    
        const imageDestinations = places.map((place: Place) => {
          
          if (place.photos && place.photos.length > 0)
          {
            console.log(place.photos[0].photo_reference);
            return {
              
              image: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
            };
          } else {
            return { image: '/Images/default.jpg' };
          }
        });
    
        console.log('Image Destinations:', imageDestinations);
        setPopularDestinations(imageDestinations);
      } catch (error) {
        console.error('Error fetching popular destinations:', error);
      }
    };
    
  
    fetchPopularDestinations();
  }, []);

  return (
    <div className="flex flex-row">
      <div className="w-1/2 mt-8" style={{ padding: '20px', backgroundColor: 'rgba(173, 216, 230, 0.5)', overflowY: 'auto', height: '100vh', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Top Destinations for Your Next Holiday</h2>
        <div className="flex flex-col space-y-4">
          {popularDestinations.map((destination, index) => (
            <img key={index} src={destination.image} alt={`Destination ${index}`} className="rounded-lg shadow-md" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
          ))}
        </div>
      </div>

      <div className="w-full mt-8 justify-center" style={{ backgroundColor: 'rgba(173, 216, 230, 0.5)', padding: '20px', textAlign: 'center', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <div className="flex justify-center flex-col w-3/4 mx-auto">
          <div className="flex justify-center mb-4 mt-4">
            <button
              className={`px-4 py-2 ${tab === 'For You' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded-tl-md rounded-bl-md transition duration-300 ease-in-out transform hover:scale-105`}
              onClick={() => setTab('For You')}
            >
              For You
            </button>
            <button
              className={`px-4 py-2 ${tab === 'Following' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded-tr-md rounded-br-md transition duration-300 ease-in-out transform hover:scale-105`}
              onClick={() => setTab('Following')}
            >
              Following
            </button>
          </div>
          <div className="flex justify-center items-center flex-wrap space-x-4 space-y-4">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post_id={post.id}
                image_url={post.image_url}
                post_title={post.post_title || 'Untitled'}
                post_description={post.post_description || 'No description available.'}
                post_likes={post.post_likes || 0}
                timestamp={post.timestamp}
                />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
