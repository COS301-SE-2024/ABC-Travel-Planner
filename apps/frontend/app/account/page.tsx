"use client";

import {
  FaMapMarkerAlt,
  FaRegCalendarAlt,
  FaPlane,
  FaEdit,
  FaQuestionCircle,
  FaInfoCircle,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { logout, getUserProfile } from ".";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const Account = () => {
  const [profileDetails, setProfileDetails] = useState<{
    name: string;
    surname: string;
    email: string;
  }>({ name: "", surname: "", email: "" });
  const [originalProfileDetails, setOriginalProfileDetails] = useState(profileDetails);

  const [profileImage, setProfileImage] = useState("/Images/profile.jpg"); // Default image path
  const [originalImage, setOriginalImage] = useState(profileImage); // Store original image for cancellation
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

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
  
  const router = useRouter();

  const handleSignout = async () => {
    await logout();
    router.push("/login");
  };

  const handleHelpCenter = () => {
    router.push("/help");
  };

  useEffect(() => {
    const fetchProfileDetails = async () => {
      const response = await getUserProfile();
      setProfileDetails(response);
    };
    fetchProfileDetails();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

 const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]; // Use optional chaining
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl); // Set the new image URL for preview
  }
};

const handleCancel = () => {
  setProfileDetails(originalProfileDetails); // Revert to original details
  setProfileImage(originalImage); // Reset image if needed
  toggleEdit(); // Exit edit mode
};
 
  const toggleEdit = () => {
    if (!isEditing) {
        setOriginalProfileDetails(profileDetails); // Save original details when starting to edit
        setOriginalImage(profileImage); // Save original image
    }
    setIsEditing(!isEditing);
};

  const openEditProfile = () => {
    toggleEdit();
    setShowMenu(false);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const toggleFollowers = () => {
    setShowFollowers(!showFollowers);
    setShowFollowing(false);
  };

  const toggleFollowing = () => {
    setShowFollowing(!showFollowing);
    setShowFollowers(false);
  };

 


  return (
    <div data-testid="accountContainer" className="profile-page">
      <header className="profile-header">
        <div className="profile-pic">
          <img src={profileImage} alt="Profile" />
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="image-input"
            />
          )}
        </div>
        <div className="profile-info">
          {isEditing ? (
            <div className="edit-profile">
              <input
                type="text"
                name="name"
                value={profileDetails.name}
                onChange={handleInputChange}
                placeholder="First Name"
                className="edit-input"
              />
              <input
                type="text"
                name="surname"
                value={profileDetails.surname}
                onChange={handleInputChange}
                placeholder="Surname"
                className="edit-input"
              />
              <input
                type="email"
                name="email"
                value={profileDetails.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="edit-input"
              />
              <div className="edit-buttons">
                <button onClick={toggleEdit} className="save-button">Save</button>
                <button onClick={handleCancel} className="cancel-button">Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <h1 data-testid="accountName">
                {profileDetails.name} {profileDetails.surname}
              </h1>
              <h2 data-testid="accountEmail" >{profileDetails.email}</h2>
              <div className="location">
                <FaMapMarkerAlt />
                <span>South Africa</span>
              </div>
              <div className="member-since">
                <FaRegCalendarAlt />
                <span>Member Since: 2023/05/30</span>
              </div>
            </>
          )}
        </div>
        <button className="menu-button" onClick={() => setShowMenu(!showMenu)}>
          {showMenu ? <FaTimes /> : <FaBars />}
        </button>
        {showMenu && (
          <div className="menu-dropdown">
            <button onClick={() => setShowMenu(false)}><FaTimes /> Close</button>
            <button onClick={openEditProfile}><FaEdit /> Edit Profile</button>
            <button onClick={togglePopup}><FaInfoCircle /> About</button>
            <button onClick={handleHelpCenter}><FaQuestionCircle /> Help Center</button>
            <button>Manage Account</button>
            <button>Disable Account</button>
            <button onClick={handleSignout}><FaSignOutAlt /> Logout</button>
          </div>
        )}
      </header>

      <section className="saved-itineraries">
        <h3 className="Following-title">My Following</h3>
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

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>About This Site</h2>
            <p>Welcome to our Travel Planner! This platform is designed to simplify your journey by helping you effortlessly organize your trips, discover curated itineraries, and access a wealth of travel resources. Whether you&apos;re planning a weekend getaway or a grand adventure, we&apos;ve got you covered. If you need further assistance or personalized guidance, be sure to visit our Help Center, where you&apos;ll find FAQs, tips, and support to make your travel experience even better.</p>
            <button onClick={togglePopup}>Close</button>
          </div>
        </div>
      )}

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

export default Account;
