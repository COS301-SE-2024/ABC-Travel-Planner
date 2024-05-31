"use client";

import {
  FaMapMarkerAlt,
  FaRegCalendarAlt,
  FaPlane,
  FaEdit,
  FaQuestionCircle,
  FaInfoCircle,
  FaSignOutAlt
} from "react-icons/fa";
import logout from "./index";
import { useRouter } from "next/navigation";

const Account = () => {
  const router = useRouter();
  const handleSignout = async () => {
    await logout();
    router.push("/login");
  };
  return (
    <div style={{ backgroundImage: 'url(/Images/profile_background8.jpg)', backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundAttachment: 'fixed', color: '#333', fontFamily: 'Arial, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div className="account-container" style={{ padding: '20px', borderRadius: '10px', width: '80%' }}>
        <div className="account-header">
          <div className="account-profile">
            <div className="account-profile-image">
              <img src="/Images/profile.jpg" alt="Profile" />
            </div>
            <div className="account-profile-details">
              <h1 className="account-name">Jessica Vorster</h1>
              <h2 className="account-email">jessica.vorster@gmail.com</h2>
              <p className="account-location"><FaMapMarkerAlt /> South Africa</p>
              <p className="account-member-since"><FaRegCalendarAlt /> Member Since: 2015 January 1st</p>
            </div>
          </div>
          <div className="account-actions">
            <button className="edit-profile-button">
              <FaEdit /> Edit Profile
            </button>
          </div>
        </div>
        <div className="account-content">
          <div className="account-info">
            <h3 className="info-heading">Previous Travel History</h3>
            <p className="info-description">
              I have always had a passion for exploring new places and experiencing different cultures. Some of my most memorable adventures include hiking the Inca Trail to Machu Picchu, exploring the ancient ruins of Rome, and cruising through the picturesque fjords of Norway. Each journey has taught me something new about the world and myself, and I look forward to many more adventures in the future.
            </p>
          </div>
          <div className="account-buttons">
            <button className="account-button">
              <FaQuestionCircle /> Help Center
            </button>
            <button className="account-button">
              <FaInfoCircle /> About
            </button>
            <button onClick={handleSignout} className="account-button">
                <FaSignOutAlt /> Logout
              </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  
  );
};

export default Account;
