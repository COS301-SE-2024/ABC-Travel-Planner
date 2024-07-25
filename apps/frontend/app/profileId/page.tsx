"use client";

import { FaMapMarkerAlt, FaRegCalendarAlt } from "react-icons/fa";
import { useState } from "react";

const Profile = () => {
  const [profileDetails, setProfileDetails] = useState<{
    name: string;
    surname: string;
    email: string;
  }>({ name: "", surname: "", email: "" });

  const [profileImage, setProfileImage] = useState("/Images/profile.jpg"); // Default image path
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false); // State for follow button

  const followers = [
    { username: "follower1", profilePic: "/Images/profile.jpg" },
    { username: "follower2", profilePic: "/Images/profile2.png" },
    { username: "follower3", profilePic: "/Images/profile.jpg" },
    { username: "follower4", profilePic: "/Images/profile2.png" },
    { username: "follower5", profilePic: "/Images/profile.jpg" },
    { username: "follower6", profilePic: "/Images/profile2.png" },
  ];

  const following = [
    { username: "following1", profilePic: "/Images/profile.jpg" },
    { username: "following2", profilePic: "/Images/profile2.png" },
    { username: "following3", profilePic: "/Images/profile.jpg" },
    { username: "following4", profilePic: "/Images/profile2.png" },
    { username: "following5", profilePic: "/Images/profile.jpg" },
    { username: "following6", profilePic: "/Images/profile2.png" },
  ];

  const itineraries = [
    { name: "Bali", image: "/images/bali.jpeg" },
    { name: "Dubai", image: "/images/dubai.jpg" },
    { name: "France", image: "/images/france.jpg" },
    { name: "Bali", image: "/images/bali.jpeg" },
    { name: "Dubai", image: "/images/dubai.jpg" },
    { name: "France", image: "/images/france.jpg" },
    { name: "Bali", image: "/images/bali.jpeg" },
    { name: "Dubai", image: "/images/dubai.jpg" },
    { name: "France", image: "/images/france.jpg" },
  ];

  const toggleFollowers = () => {
    setShowFollowers(!showFollowers);
    setShowFollowing(false);
  };

  const toggleFollowing = () => {
    setShowFollowing(!showFollowing);
    setShowFollowers(false);
  };

  const handleFollowButtonClick = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="profile-page">
      <header className="profile-header">
        <div className="profile-pic">
          <img src={profileImage} alt="Profile" />
        </div>
        <div className="profile-info">
          <h1>Mishka Dukhanti</h1>
          <h2>{profileDetails.email}</h2>
          <div className="location">
            <FaMapMarkerAlt />
            <span>South Africa</span>
          </div>
          <div className="member-since">
            <FaRegCalendarAlt />
            <span>Member Since: 2023/05/30</span>
          </div>
          <button
            className={`follow-button ${isFollowing ? "unfollow" : "follow"}`}
            onClick={handleFollowButtonClick}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        </div>
      </header>

      <section className="saved-itineraries">
        <div className="profile-stats">
          <div className="following" onClick={toggleFollowing}>
            <span>24</span>
            <p>Following</p>
          </div>
          <div className="followers" onClick={toggleFollowers}>
            <span>33</span>
            <p>Followers</p>
          </div>
        </div>
        <h3 className="section-title">Saved Itineraries</h3>
        <div className="itinerary-cards">
          {itineraries.map((itinerary, index) => (
            <div key={index} className="itinerary-card">
              <img src={itinerary.image} alt={itinerary.name} className="itinerary-image" />
              <div className="itinerary-content">
                <h4>{itinerary.name}</h4>
                <button className="view-button">View</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {showFollowers && (
        <div className="popup-overlay" onClick={toggleFollowers}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-bold text-lg">Followers</h3>
            <div className="users-list">
              {followers.map((follower, index) => (
                <div key={index} className="user-item">
                  <img src={follower.profilePic} alt={follower.username} className="user-pic" />
                  <p>{follower.username}</p>
                </div>
              ))}
            </div>
            <button className="close-button" onClick={toggleFollowers}>Close</button>
          </div>
        </div>
      )}

      {showFollowing && (
        <div className="popup-overlay" onClick={toggleFollowing}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-bold text-lg">Following</h3>
            <div className="users-list">
              {following.map((user, index) => (
                <div key={index} className="user-item">
                  <img src={user.profilePic} alt={user.username} className="user-pic" />
                  <p>{user.username}</p>
                </div>
              ))}
            </div>
            <button className="close-button" onClick={toggleFollowing}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
