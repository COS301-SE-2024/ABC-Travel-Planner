import { FaMapMarkerAlt, FaRegCalendarAlt, FaPlane, FaEdit, FaQuestionCircle, FaInfoCircle } from 'react-icons/fa';

const Account = () => {
  return (
    <div className="account-container">
      <div className="account-profile">
        <div className="account-profile-image">
          <img src="/Images/profile.jpg" alt="Profile" />
        </div>
        <h1 className="account-name" style={{ fontSize: '2rem' }}>Jessica</h1>
        <h2 className="account-email" style={{ fontSize: '1.5rem' }}>jessica.vorster@gmail.com</h2>
      </div>
      <div className="account-info-container">
        <div className="account-info">
          <div className="account-info-item">
            <div className="icon-container">
              <FaPlane className="account-icon" />
              <FaRegCalendarAlt className="account-icon" />
              <FaMapMarkerAlt className="account-icon" />
            </div>
            <p>Location: South Africa</p>
          </div>
          <div className="account-info-item">
            <p>Member Since: 2015 January 1st</p>
          </div>
          <div className="account-info-item">
            <p>Previous Travel History: Here's a sample travel history description:
              "I have always had a passion for exploring new places and experiencing different cultures. Some of my most memorable adventures include hiking the Inca Trail to Machu Picchu, exploring the ancient ruins of Rome, and cruising through the picturesque fjords of Norway. Each journey has taught me something new about the world and myself, and I look forward to many more adventures in the future."
            </p>
          </div>
        </div>
        <div className="account-image-container">
          <img src="/Images/Tourism.jpg" alt="Your Travel History" className="account-travel-image" />
        </div>
      </div>
      <div className="account-buttons">
        <button className="account-button">
          <FaEdit className="account-button-icon" />
          Edit Profile
        </button>
        <button className="account-button">
          <FaQuestionCircle className="account-button-icon" />
          Help Center
        </button>
        <button className="account-button">
          <FaInfoCircle className="account-button-icon" />
          About
        </button>
      </div>
    </div>
  );
};

export default Account;
