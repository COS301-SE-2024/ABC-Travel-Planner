"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from './PostCard';
import Link from 'next/link';

interface Post {
  caption: string;
  id: string;
  imageUrl: string;
  post_likes?: number;
  timestamp: number;
  user_id: string;
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
  const [posts, setPosts] = useState<Post[]>([]);
  const [popularDestinations, setPopularDestinations] = useState<{ image: string, place_id: string }[]>([]);
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [defaultBackground, setDefaultBackground] = useState<string>('');
  const [headerTextColor, setHeaderTextColor] = useState<string>('text-blue-1000'); // Default color

  useEffect(() => {
    const theme = localStorage.getItem('selectedTheme') || 'none';

    const themeImages: { [key: string]: string } = {
      beach: '/Images/BeachTheme.png',
      luxury: '/Images/Luxury.png',
      adventure: '/Images/Adventure.png',
      cultural: '/Images/Cultural.png',
      nature: '/Images/Nature.png',
      city: '/Images/City.png',
      romantic: '/Images/Romantic.png',
      family: '/Images/Family.png',
      wellness: '/Images/Wellness.png',
      historical: '/Images/Historical.png',
      none: '', // Default background
    };

    if (theme === 'none') {
      setBackgroundImage(''); 
      setDefaultBackground('rgba(173, 216, 230, 0.5)'); 
      setHeaderTextColor('text-blue-1000');
    } else {
      setBackgroundImage(`url(${themeImages[theme]})`);
      setDefaultBackground('');
      setHeaderTextColor('text-white');
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:4000/posts`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Post[] = await response.json();
        console.log("Post data: " + JSON.stringify(data));
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
        const response = await fetch(`http://localhost:4000/google-maps/popular-destinations`);
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);
        const places = data.results;
        if (!places) {
          throw new Error('No places found in response');
        }

        const imageDestinations = places.map((place: Place) => {
          if (place.photos && place.photos.length > 0) {
            const photoReference = place.photos[0].photo_reference;
            const apikey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY!;
            return {
              image: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoReference}&key=${apikey}`,
              place_id: place.place_id,
            };
          } else {
            return { image: '/Images/default.jpg' };
          }
        });

        setPopularDestinations(imageDestinations);
      } catch (error) {
        console.error('Error fetching popular destinations:', error);
      }
    };

    fetchPopularDestinations();
  }, []);

  return (
    
    <div
      className="w-full mt-8"
      style={{
        padding: '20px',
        backgroundColor: defaultBackground,
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundImage: backgroundImage,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="flex justify-center mb-4 mt-4">
        <h2 className={`text-4xl font-extrabold ${headerTextColor} bg-clip-text text-transparent bg-gradient-to-r from-gray-800 via-gray-900 to-blue-900 shadow-lg`}>
          Top Destinations
        </h2>
      </div>

      <div
        className={`flex flex-row overflow-x-auto w-full custom-scrollbar ${backgroundImage ? '' : 'bg-gradient-to-r from-pink-200 via-green-200 to-blue-200'}`}
        style={{
          gap: '16px',
          padding: '10px 0',
        }}
      >
        {popularDestinations.map((destination, index) => (
          <div key={index} style={{ flex: '1 0 auto', position: 'relative', width: '120px', height: '120px' }}>
            <Link href={`/${destination.place_id}`} passHref>
              <img
                src={destination.image}
                alt={`Destination ${index}`}
                className="rounded-full shadow-md gentle-pulse"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '50%',
                  border: '5px solid',
                  borderColor: 'rgba(255, 0, 150, 0.7) rgba(0, 255, 255, 0.7) rgba(255, 255, 0, 0.7) rgba(0, 255, 0, 0.7)',
                }}
              />
            </Link>
          </div>
        ))}
      </div>
      <div className="flex justify-center mb-4 mt-4">
        <h2 className={`text-4xl font-extrabold ${headerTextColor} bg-clip-text text-transparent bg-gradient-to-r from-gray-800 via-gray-900 to-blue-900 shadow-lg`}>
          Latest Posts
        </h2>
      </div>
      <div
        className={`w-full mt-8 justify-center rounded-lg shadow-lg p-6 flex flex-col items-start space-y-4 text-left ${backgroundImage ? '' : 'bg-gradient-to-r from-pink-200 via-green-200 to-blue-200'}`}
        style={{
          padding: '20px',
          textAlign: 'center',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div className="flex justify-center flex-col w-3/4 mx-auto">
          <div className="flex justify-center items-center flex-wrap gap-4">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post_id={post.id}
                user_id={post.user_id}
                image_url={post.imageUrl}
                post_description={post.caption || 'No description available.'}
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