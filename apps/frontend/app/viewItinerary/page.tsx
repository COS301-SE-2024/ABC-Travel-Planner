"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight, FaHeart, FaBookmark } from "react-icons/fa";
import Cookie from "js-cookie";

const ViewItinerary = ({
  searchParams,
}: {
  searchParams: { itineraryName?: string; itineraryId?: string };
}) => {
  const router = useRouter();
  const { itineraryName, itineraryId } = searchParams;
  console.log(itineraryName, itineraryId);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const [images, setImages] = useState<any>([]);

  const fetchItems = async () => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const response = await axios.post(
      `${backendUrl}/itinerary/getItineraryItems`,
      {
        itinerary_id: itineraryId,
      }
    );
    setImages(response.data);

    const user_id = Cookie.get("user_id");
    const res = await axios.post(`${backendUrl}/itinerary/userLikesItinerary`, {
      user_id,
      itinerary_id: itineraryId,
    });
    setLiked(res.data);
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleLikeClick = async() => {
    setLiked((prev)=>!prev);
    const user_id = Cookie.get("user_id");
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await axios.post(`${backendUrl}/itinerary/userLikesItinerary`, {
      user_id,
      itinerary_id: itineraryId,
    }

    )
    if(res.data)
      {
        await axios.post(
          `${backendUrl}/itinerary/unlikeItinerary`,
          {
            user_id,
            itinerary_id: itineraryId,
          }
        );
        
      }
      else{
    await axios.post(
      `${backendUrl}/itinerary/likeItinerary`,
      {
        user_id,
        itinerary_id: itineraryId,
      }
    );
  }

    
  };

  const handleBookmarkClick = () => {
    setBookmarked((prev)=>!prev);
    console.log("Bookmarked:", !bookmarked);
  };
  useEffect(() => {
    fetchItems();
  }, []);
  return (
    <div className="view-itinerary-page">
      <header className="view-itinerary-header">
        <button onClick={() => router.push("/account")} className="back-button">
          <FaArrowLeft /> Back
        </button>
        <h1>{itineraryName}</h1>
      </header>
      {images.length > 0 && (
        <div className="slider-container">
          {/* The Trip name and location needs to go here  */}
          <h2 className="slider-heading">{itineraryName}</h2>
          <div className="image-slider">
            <button onClick={goToPreviousImage} className="slider-button prev">
              <FaArrowLeft />
            </button>
            <div className="slider-content">
              <div className="image-wrapper">
                <img
                  src={images[currentImageIndex].imageUrl}
                  alt="Itinerary"
                  className="slider-image"
                />
              </div>
              <p className="image-label">
                {images[currentImageIndex].item_name}
              </p>
            </div>
            <button onClick={goToNextImage} className="slider-button next">
              <FaArrowRight />
            </button>
          </div>

          <div className="slider-icons">
            <FaBookmark
              className={`icon bookmark-icon ${
                bookmarked ? "active-bookmarked" : ""
              }`}
              title="Bookmark"
              onClick={handleBookmarkClick}
            />
            <FaHeart
              className={`icon heart-icon ${liked ? "active-liked" : ""}`}
              title="Like"
              onClick={handleLikeClick}
            />
          </div>
        </div>
      )}

      {images.length === 0 && (
        <div>
          <h2>No items found in this itinerary</h2>
        </div>
      )}
    </div>
  );
};

export default ViewItinerary;
