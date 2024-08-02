"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaHeart, FaBookmark } from "react-icons/fa";

const ViewItinerary = ({ params }: { params: { itineraryName: string } }) => {
  const router = useRouter();
  const { itineraryName } = params;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const images = [
    { src: "/images/aquarium.jpg", label: "Dubai Aquarium and Underwater Zoo with Penguin Cove" },
    { src: "/images/BurjK.jpg", label: "Burj Khalifa: inside the world's tallest building" },
    { src: "/images/atlantis.jpg", label: "Atlantis Water park" },
  ];

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleLikeClick = () => {
    setLiked(!liked);
    console.log("Liked:", !liked);
  };

  const handleBookmarkClick = () => {
    setBookmarked(!bookmarked);
    console.log("Bookmarked:", !bookmarked);
  };

  return (
    <div className="view-itinerary-page">
      <header className="view-itinerary-header">
        <button onClick={() => router.push("/account")} className="back-button">
          <FaArrowLeft /> Back
        </button>
        <h1>{itineraryName}</h1>
      </header>

      <div className="slider-container">
      {/* The Trip name and location needs to go here  */}
        <h2 className="slider-heading">Dubai - December Holiday Trip</h2>  
        <div className="image-slider">
          <button onClick={goToPreviousImage} className="slider-button prev">
            <FaArrowLeft />
          </button>
          <div className="slider-content">
            <div className="image-wrapper">
              <img
                src={images[currentImageIndex].src}
                alt="Itinerary"
                className="slider-image"
              />
            </div>
            <p className="image-label">{images[currentImageIndex].label}</p>
          </div>
          <button onClick={goToNextImage} className="slider-button next">
            <FaArrowRight />
          </button>
        </div>

        <div className="slider-icons">
          <FaBookmark
            className={`icon bookmark-icon ${bookmarked ? "active-bookmarked" : ""}`}
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

    </div>
  );
};

export default ViewItinerary;