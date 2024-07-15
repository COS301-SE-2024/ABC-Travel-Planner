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
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  const handleSignout = async () => {
    await logout();
    router.push("/login");
  };

  useEffect(() => {
    const fetchProfileDetails = async () => {
      const response = await getUserProfile();
      setProfileDetails(response);
    };
    fetchProfileDetails();
  }, []);

  if (!profileDetails.name) return <div>Loading...</div>;

  return (
    <div className="profile-page">
      <header className="profile-header">
        <div className="profile-pic">
          <img src="/Images/profile.jpg" alt="Profile" />
        </div>
        <div className="profile-info">
          <h1>{profileDetails.name} {profileDetails.surname}</h1>
          <h2>{profileDetails.email}</h2>
          <div className="location">
            <FaMapMarkerAlt />
            <span>South Africa</span>
          </div>
          <div className="member-since">
            <FaRegCalendarAlt />
            <span>Member Since: 2023/05/30</span>
          </div>
        </div>
        <button className="menu-button" onClick={() => setShowMenu(!showMenu)}>
          {showMenu ? <FaTimes /> : <FaBars />}
        </button>
        {showMenu && (
          <div className="menu-dropdown">
            <button><FaEdit /> Edit Profile</button>
            <button>Manage Account</button>
            <button>Disable Account</button>
          </div>
        )}
      </header>

      <div className="profile-stats">
        <div className="following">
          <span>24</span>
          <p>Following</p>
        </div>
        <div className="followers">
          <span>33</span>
          <p>Followers</p>
        </div>
      </div>

      <section className="saved-itineraries">
        <h3>Saved Itineraries</h3>
        <div className="itinerary-cards">
          <div className="itinerary-card"></div>
          <div className="itinerary-card"></div>
          <div className="itinerary-card"></div>
        </div>
      </section>

      <section className="profile-actions">
        <button><FaQuestionCircle /> Help Center</button>
        <button><FaInfoCircle /> About</button>
        <button onClick={handleSignout}><FaSignOutAlt /> Logout</button>
      </section>
    </div>
  );
};

export default Account;
