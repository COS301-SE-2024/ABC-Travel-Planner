"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaHeart,
  FaBookmark,
  FaInfoCircle,
  FaMoneyBillWave,
  FaCalendarAlt,
} from "react-icons/fa";
import Cookie from "js-cookie";
import BackButton from "../[locationId]/BackButton";
import { FaLocationPin } from "react-icons/fa6";
import { useTheme } from "../context/ThemeContext";
const ViewItinerary = ({
  searchParams,
}: {
  searchParams: {
    itineraryName?: string;
    itineraryId?: string;
    myItinerary?: string;
    prev?: string;
  };
}) => {
  const router = useRouter();
  const { itineraryName, itineraryId, myItinerary, prev } = searchParams;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const [images, setImages] = useState<any>([]);

  const fetchItems = async () => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const u = await axios.post(`${backendUrl}/itinerary/getItineraryOwner`, {
      itinerary_id: itineraryId,
    });

    const response = await fetch(
      `${backendUrl}/itinerary-items/${itineraryId}/${u.data}`
    );
    const data = await response.json();
    setImages(data);

    const user_id = Cookie.get("user_id");
    const res = await axios.post(`${backendUrl}/itinerary/userLikesItinerary`, {
      user_id,
      itinerary_id: itineraryId,
    });
    setLiked(res.data);

    const res2 = await axios.post(
      `${backendUrl}/itinerary/userSavedItinerary`,
      {
        user_id,
        itinerary_id: itineraryId,
      }
    );
    setBookmarked(res2.data);
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleLikeClick = async () => {
    setLiked((prev) => !prev);
    const user_id = Cookie.get("user_id");
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (liked) {
      await axios.post(`${backendUrl}/itinerary/unlikeItinerary`, {
        user_id,
        itinerary_id: itineraryId,
      });
    } else {
      await axios.post(`${backendUrl}/itinerary/likeItinerary`, {
        user_id,
        itinerary_id: itineraryId,
      });
    }
  };

  const handleBookmarkClick = async () => {
    setBookmarked((prev) => !prev);
    const user_id = Cookie.get("user_id");
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    if (bookmarked) {
      await axios.post(`${backendUrl}/itinerary/unsaveItinerary`, {
        user_id,
        itinerary_id: itineraryId,
      });
    } else {
      await axios.post(`${backendUrl}/itinerary/saveItinerary`, {
        user_id,
        itinerary_id: itineraryId,
      });
    }
  };
  useEffect(() => {
    fetchItems();
  }, []);

  const { selectedTheme, setTheme, themeStyles } = useTheme();
  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="pl-8 pt-6">
        <button
          style={{
            backgroundColor: themeStyles.navbarColor,
            padding: "10px 20px",
            borderRadius: "5px",
            display: "inline-flex",
            alignItems: "center",
            color: "white",
          }}
        >
          <a
            href={`../${prev}`}
            style={{
              display: "flex",
              alignItems: "center",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <FaArrowLeft style={{ marginRight: "8px" }} />
            {"Back"}
          </a>
        </button>
      </div>

      <div
        className="view-itinerary-page"
        style={{ color: themeStyles.textColor }}
      >
        {images.length > 0 ? (
          <div
            className="w-full max-w-2xl mx-auto bg-blue-100 shadow-lg rounded-lg overflow-hidden"
            style={{ backgroundColor: themeStyles.primaryColor }}
          >
            <h2
              className="text-2xl font-bold text-gray-800 p-4 text-center"
              style={{ color: themeStyles.textColor }}
            >
              {itineraryName}
            </h2>
            <div className="relative flex items-center justify-between">
              <button
                onClick={goToPreviousImage}
                className="absolute left-1 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
                style={{ background: themeStyles.textColor }}
              >
                <FaArrowLeft />
              </button>
              <div className="flex items-center justify-center w-full">
                <div
                  className="text-left p-4"
                  style={{ color: themeStyles.textColor }}
                >
                  <img
                    src={images[currentImageIndex].image_url}
                    alt="Itinerary"
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                  <p
                    style={{ color: themeStyles.textColor }}
                    className="text-xl font-semibold  text-center"
                  >
                    {images[currentImageIndex].item_name}
                  </p>
                  <div className="flex items-center mt-2">
                    <FaLocationPin className="text-gray-600 mr-2" />
                    <p
                      className="text-gray-600"
                      style={{ color: themeStyles.textColor }}
                    >
                      {images[currentImageIndex].destination}
                    </p>
                  </div>
                  <div className="flex items-center mt-2">
                    <FaMoneyBillWave className="text-green-500 mr-2" />
                    <p
                      className="text-gray-600"
                      style={{ color: themeStyles.textColor }}
                    >
                      Price: R{images[currentImageIndex].price}
                    </p>
                  </div>
                  {images[currentImageIndex].date.length !== 0 && (
                    <div className="flex items-center mt-2">
                      <FaCalendarAlt className="text-blue-500 mr-2" />
                      <p
                        className="text-gray-600"
                        style={{ color: themeStyles.textColor }}
                      >
                        Date:{" "}
                        {images[currentImageIndex].date.length === 1
                          ? images[currentImageIndex].date[0].substring(0, 10)
                          : images[currentImageIndex].date[0].substring(0, 10) +
                            "  -  " +
                            images[currentImageIndex].date[
                              images[currentImageIndex].date.length - 1
                            ].substring(0, 10)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={goToNextImage}
                className="absolute right-1 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
                style={{ background: themeStyles.textColor }}
              >
                <FaArrowRight />
              </button>
            </div>

            <div className="flex justify-center space-x-4 p-4">
              {myItinerary === "false" && (
                <FaBookmark
                  className={`icon bookmark-icon ${
                    bookmarked ? "active-bookmarked" : ""
                  }`}
                  title="Bookmark"
                  onClick={handleBookmarkClick}
                />
              )}
              <FaHeart
                className={`icon heart-icon ${liked ? "active-liked" : ""}`}
                title="Like"
                onClick={handleLikeClick}
              />
            </div>
          </div>
        ) : (
          <div className="text-center p-8">
            <h2
              className="text-xl font-semibold text-gray-700"
              style={{ color: themeStyles.textColor }}
            >
              No items found in this itinerary
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewItinerary;
