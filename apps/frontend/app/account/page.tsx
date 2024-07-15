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
  const [isEditing, setIsEditing] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State for the pop-up
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

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const openEditProfile = () => {
    toggleEdit();
    setShowMenu(false);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  if (!profileDetails.name) return <div>Loading...</div>;

  return (
    <div className="profile-page">
      <header className="profile-header">
        <div className="profile-pic">
          <img src="/Images/profile.jpg" alt="Profile" />
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
                <button onClick={toggleEdit} className="cancel-button">Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <h1>
                {profileDetails.name} {profileDetails.surname}
              </h1>
              <h2>{profileDetails.email}</h2>
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
          <div className="following">
            <span>24</span>
            <p>Following</p>
          </div>
          <div className="followers">
            <span>33</span>
            <p>Followers</p>
          </div>
        </div>
        <h3 className="section-title">Saved Itineraries</h3>
        <div className="itinerary-cards">
          <div className="itinerary-card">
            <img src="/images/bali.jpeg" alt="Bali" className="itinerary-image" />
            <div className="itinerary-content">
              <h4>Bali</h4>
              <button className="view-button">View</button>
            </div>
          </div>
          <div className="itinerary-card">
            <img src="/images/dubai.jpg" alt="Dubai" className="itinerary-image" />
            <div className="itinerary-content">
              <h4>Dubai</h4>
              <button className="view-button">View</button>
            </div>
          </div>
          <div className="itinerary-card">
            <img src="/images/france.jpg" alt="France" className="itinerary-image" />
            <div className="itinerary-content">
              <h4>France</h4>
              <button className="view-button">View</button>
            </div>
          </div>
        </div>
      </section>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>About This Site</h2>
            <p>Welcome to our Travel Planner! This platform is designed to simplify your journey by helping you effortlessly organize your trips, discover curated itineraries, and access a wealth of travel resources. Whether you're planning a weekend getaway or a grand adventure, we've got you covered. If you need further assistance or personalized guidance, be sure to visit our Help Center, where you'll find FAQs, tips, and support to make your travel experience even better.</p>

            <button onClick={togglePopup}>Close</button>
          </div>
        </div>
      )}

      <style jsx>{`
        .edit-profile {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 20px;
        }
        .edit-input {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          width: 100%;
          max-width: 300px;
        }
        .edit-buttons {
          display: flex;
          gap: 10px;
        }
        .save-button {
          background-color: #5d6dca;
          color: white;
          padding: 10px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .cancel-button {
          background-color: #f44336;
          color: white;
          padding: 10px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .cancel-button:hover,
        .save-button:hover {
          opacity: 0.9;
        }
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 20;
        }
        .popup-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          margin-right: 40px;
          margin-left: 40px;
        }
        .popup-content button {
          margin-top: 10px;
          background-color: #5d6dca;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          padding: 5px 10px;
        
        }
        .popup-content button:hover {
          opacity: 0.9;
        }
      `}</style>
    </div>
  );
};

export default Account;
