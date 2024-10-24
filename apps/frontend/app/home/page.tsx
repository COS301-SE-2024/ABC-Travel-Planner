"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "./PostCard";
import Link from "next/link";
import { useTheme } from "../context/ThemeContext";
import { back } from "nock";
import Cookie from "js-cookie";
import { AiOutlineInfoCircle } from "react-icons/ai";
interface Post {
  caption: string;
  id: string;
  imageUrl: string;
  post_likes?: number;
  timestamp: number;
  user_id: string;
  profileImageUrl?: string;
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
  const [popularDestinations, setPopularDestinations] = useState<
    { image: string; place_id: string }[]
  >([]);
  const [showInfo, setShowInfo] = useState(false);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const toggleInfo = () => setShowInfo(!showInfo);
  const [showInfoIcon, setShowInfoIcon] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

     // Only show the icon when scrolling back to the top
      if (currentScrollY === 0) {
        setShowInfoIcon(true);
      } else if (currentScrollY > lastScrollY) {
        // User is scrolling down, hide the icon
        setShowInfoIcon(false);
      } else {
        // User is scrolling up, but we don't show the icon until reaching the top
        setShowInfoIcon(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const user_id = Cookie.get("user_id");

        const response = await fetch(`${backendUrl}/posts`);
        const r = await axios.post(`${backendUrl}/block/blockedUsers`, {
          user_id: user_id,
        });

        const blockedUsers = r.data;

        const r2 = await axios.post(`${backendUrl}/block/blockedBy`, {
          user_id: user_id,
        });
        const blockedBy = r2.data;

        if (!response.ok) throw new Error("Network response was not ok");
        const data: Post[] = await response.json();
        const filteredData = data.filter(
          (item) =>
            !blockedUsers.some((user: any) => user.user_id === item.user_id)
        );

        const filteredData2 = filteredData.filter(
          (item) =>
            !blockedBy.some((user: any) => user.user_id === item.user_id)
        );

        const updatedData = await Promise.all(
          filteredData2.map(async (item) => {
            const user_id = item.user_id;
            try {
              const userResponse = await fetch(
                `${backendUrl}/users/${user_id}`
              );
              if (!userResponse.ok) {
                throw new Error("Failed to fetch user profile image");
              }
              const userData = await userResponse.json();
              const imageLink = userData.profileImageUrl;
              return { ...item, profileImageUrl: imageLink };
            } catch (error) {
              console.error("Error fetching profile image:", error);
              return item;
            }
          })
        );

        setPosts(updatedData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchPopularDestinations = async () => {
      try {
        const response = await fetch(
          `${backendUrl}/google-maps/popular-destinations`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        const places = data.results;

        const imageDestinations = places.slice(0, 12).map((place: Place) => {
          if (place.photos && place.photos.length > 0) {
            const photoReference = place.photos[0].photo_reference;
            const apikey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY!;
            return {
              image: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoReference}&key=${apikey}`,
              place_id: place.place_id,
            };
          } else {
            return { image: "/Images/default.jpg" };
          }
        });

        setPopularDestinations(imageDestinations);
      } catch (error) {
        console.error("Error fetching popular destinations:", error);
      }
    };

    fetchPopularDestinations();
  }, []);

  //Theme
  const { selectedTheme, themeStyles, setTheme } = useTheme();
  return (
    <div className="w-full mt-8" style={{ minHeight: '100vh', position: 'relative' }}>
     {/* Floating Info Icon */}
     {showInfoIcon && (
        <div
          className={`fixed top-18 left-4 z-10 transition-opacity duration-300 ease-in-out ${
            showInfoIcon ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ marginTop: '16px' }} // Ensures it doesn't overlap the navbar
        >
          <button
            onClick={toggleInfo}
            className="p-2 bg-blue-500 rounded-full shadow-lg"
            style={{ background: themeStyles.navbarColor }}
          >
            <AiOutlineInfoCircle
              size={40}
              color={showInfo ? themeStyles.primaryColor : themeStyles.primaryColor}
            />
          </button>
          {showInfo && (
            <div
              className="mt-2 p-4 rounded-lg shadow-md"
              style={{
                background: themeStyles.primaryColor,
                color: themeStyles.textColor,
              }}
            >
              <p>Click on the destination stories to explore the location in detail.</p>
            </div>
          )}
        </div>
      )}

      <div className="w-full mt-8" style={{ minHeight: "100vh" }}>
        <div
          className="flex justify-center mb-4 mt-4 mx-auto max-w-md"
          style={{ background: themeStyles.primaryColor, borderRadius: "12px" }}
        >
          <h2
            className="text-4xl font-extrabold"
            style={{ color: themeStyles.textColor }}
          >
            Top Destinations
          </h2>
        </div>

        <div
          className="flex flex-row overflow-x-auto custom-scrollbar mx-auto max-w-7xl"
          style={{
            gap: "16px",
            padding: "10px 0",
            background: themeStyles.primaryColor,
            borderRadius: "12px",
          }}
        >
          {popularDestinations.map((destination, index) => (
            <div key={index} style={{ flexShrink: 0, marginRight: "16px" }}>
              <Link href={`/${destination.place_id}`} passHref>
                <div
                  style={{
                    width: "120px",
                    height: "120px",
                    position: "relative",
                  }}
                >
                  <img
                    src={destination.image}
                    alt={`Destination ${index}`}
                    className="rounded-full shadow-md gentle-pulse"
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "50%",
                      boxShadow: themeStyles.navbarColor,
                      background: themeStyles.navbarColor,
                      border: `5px solid ${themeStyles.navbarColor}`,
                    }}
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div
          className="flex justify-center mb-4 mx-auto max-w-md mt-3"
          style={{ background: themeStyles.primaryColor, borderRadius: '12px' }}
        >
          <h2
            className="text-4xl font-extrabold"
            style={{ color: themeStyles.textColor }}
          >
            Latest Posts
          </h2>
        </div>

        <div
          className="w-full max-w-screen-xl mx-auto mt-8 justify-center rounded-lg shadow-lg p-6 flex flex-col items-start space-y-4 text-left"
          style={{
            background: themeStyles.primaryColor,
            padding: "20px",
            textAlign: "center",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
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
                  post_description={post.caption || "No description available."}
                  post_likes={post.post_likes || 0}
                  timestamp={post.timestamp}
                  profileImageUrl={post.profileImageUrl}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
