"use client";
import React, { useState } from 'react';
import { UserIcon, GlobeAltIcon, KeyIcon, HomeIcon, CheckIcon} from '@heroicons/react/24/outline';
import { FaUser, FaSearch, FaVolumeMute, FaBan, FaHeart, FaCommentAlt, FaFileAlt,FaTimes } from 'react-icons/fa';

const countries = [
  { name: 'USA', value: 'usa' },
  { name: 'France', value: 'france' },
  { name: 'Japan', value: 'japan' },
  { name: 'Brazil', value: 'brazil' },
  { name: 'Australia', value: 'australia' },
];

const themes = [
  { value: 'beach', name: 'Beach Vibes' },
  { value: 'luxury', name: 'Luxury Experience' },
  { value: 'adventure', name: 'Adventure' },
  { value: 'cultural', name: 'Cultural Exploration' },
  { value: 'nature', name: 'Nature Escape' },
  { value: 'city', name: 'City Life' },
  { value: 'romantic', name: 'Romantic Getaway' },
  { value: 'family', name: 'Family Fun' },
  { value: 'wellness', name: 'Wellness Retreat' },
  { value: 'historical', name: 'Historical Journey' },
  { value: 'none', name: 'None' },
];


 const SettingsPage: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  //Theme
  const [selectedTheme, setSelectedTheme] = useState<string | null>(localStorage.getItem('selectedTheme') || null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);//default dark mode

  const handleThemeSelect = (themeValue: string | null) => {
    setSelectedTheme(themeValue);
    localStorage.setItem('selectedTheme', themeValue || ''); // Save to localStorage
    console.log('Selected Theme:', themeValue); // Log the selected theme
    setShowModal(false);
  };
  


  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  //Account 
  const [showChangePasswordModal, setShowChangePasswordModal] = useState<boolean>(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState<boolean>(false);
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string>('');


  const handleChangePassword = () => {
    // Add logic for changing the password
    setShowChangePasswordModal(false);
  };

  const handleForgotPassword = () => {
    // Add logic for handling password recovery
    setShowForgotPasswordModal(false);
  };

    //Itinerary
  const [showCountryModal, setShowCountryModal] = useState<boolean>(false);
  const [showSharingModal, setShowSharingModal] = useState<boolean>(false);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [sharingMode, setSharingMode] = useState<'private' | 'public'>('private');
  
  const handleCountrySelectItinerary = (country: string) => {
    setSelectedCountries((prev) =>
      prev.includes(country) ? prev.filter((c) => c !== country) : [...prev, country]
    );
  };

  const handleSaveCountries = () => {
    if (selectedCountries.length > 3) {
      alert('You can select up to 3 countries only.');
      return;
    }
    setShowCountryModal(false);
  };

  const handleSharingModeChange = (mode: 'private' | 'public') => {
    setSharingMode(mode);
  };

  //User Management
  const [showMutedBlockedModal, setShowMutedBlockedModal] = useState<boolean>(false);
  const [showActivityModal, setShowActivityModal] = useState<boolean>(false);
  const [showDisableModal, setShowDisableModal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const [userList, setUserList] = useState([
    { username: 'john_doe', muted: false, blocked: false },
    { username: 'jane_smith', muted: true, blocked: false },
    { username: 'user123', muted: false, blocked: true },
    // Add more users as needed
  ]);

  const handleMute = (username: string) => {
    setUserList((prevList) =>
      prevList.map((user) =>
        user.username === username
          ? { ...user, muted: !user.muted }
          : user
      )
    );
  };

  const handleBlock = (username: string) => {
    setUserList((prevList) =>
      prevList.map((user) =>
        user.username === username
          ? { ...user, blocked: !user.blocked }
          : user
      )
    );
  };
  
  const filteredUsers = userList.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );



  const handleDisableAccount = () => {
    // Implement account disable functionality
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div
        className="max-w-4xl mx-auto p-8 rounded-lg shadow-lg"
        style={{ backgroundColor: 'rgba(173, 216, 230, 0.5)' }}
      >
        <h1 className="text-4xl font-extrabold text-center mb-8">Settings</h1>

        <div className="space-y-6">

          {/* User Management Section */}
          <section className="bg-white p-6 rounded-lg shadow-md">
      <h2
        className="text-2xl font-semibold mb-4 cursor-pointer transition-colors duration-200 hover:text-blue-600 flex items-center space-x-2"
        onClick={() => toggleSection('user-management')}
      >
        <FaUser className="w-6 h-6 text-blue-500" />
        <span>User Management</span>
      </h2>
      {expandedSection === 'user-management' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">Muted and Blocked Users</h3>
              <p className="text-gray-700">Manage your muted and blocked users here.</p>
            </div>
            <button
              className="text-blue-500 hover:underline"
              onClick={() => setShowMutedBlockedModal(true)}
            >
              View List
            </button>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">Activity</h3>
              <p className="text-gray-700">View posts you liked, commented on, or deleted.</p>
            </div>
            <button
              className="text-blue-500 hover:underline"
              onClick={() => setShowActivityModal(true)}
            >
              View Activity
            </button>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">Disable Account</h3>
              <p className="text-gray-700">Disable your Account Temporarily</p>
            </div>
            <button
              className="text-red-500 hover:underline"
              onClick={() => setShowDisableModal(true)}
            >
              Disable Account
            </button>
          </div>
        </div>
      )}

      {/* Muted and Blocked Users Modal */}
      {showMutedBlockedModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={() => setShowMutedBlockedModal(false)}
            >
              <FaTimes className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Muted and Blocked Users
            </h2>
            <div className="relative mb-4">
              <FaTimes className="absolute w-5 h-5 left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {filteredUsers.map((user) => (
                <div
                  key={user.username}
                  className="flex justify-between items-center p-4 border-b"
                >
                  <span className="text-lg">{user.username}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleMute(user.username)}
                      className={`p-2 rounded-full ${user.muted ? 'bg-yellow-500' : 'bg-gray-200'}`}
                    >
                      <FaVolumeMute className="w-6 h-6 text-white" />
                    </button>
                    <button
                      onClick={() => handleBlock(user.username)}
                      className={`p-2 rounded-full ${user.blocked ? 'bg-red-500' : 'bg-gray-200'}`}
                    >
                      <FaBan className="w-6 h-6 text-white" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => setShowMutedBlockedModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

       {/* Activity Modal */}
{showActivityModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50">
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative">
      <button
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors duration-300"
        onClick={() => setShowActivityModal(false)}
      >
        <FaTimes className="w-6 h-6" />
      </button>
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Your Activity
      </h2>
      <div className="space-y-6">
        <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg shadow-sm">
          <FaHeart className="w-8 h-8 text-red-600" />
          <span className="text-xl font-medium text-gray-800">Posts Liked: <span className="font-bold">34</span></span>
        </div>
        <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg shadow-sm">
          <FaCommentAlt className="w-8 h-8 text-blue-600" />
          <span className="text-xl font-medium text-gray-800">Comments Made: <span className="font-bold">12</span></span>
        </div>
        <div className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-lg shadow-sm">
          <FaFileAlt className="w-8 h-8 text-green-600" />
          <span className="text-xl font-medium text-gray-800">Posts Created: <span className="font-bold">5</span></span>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
          onClick={() => setShowActivityModal(false)}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}


      {/* Disable Account Modal */}
      {showDisableModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={() => setShowDisableModal(false)}
            >
              <FaTimes className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Disable Account
            </h2>
            <p className="text-center text-gray-700 mb-6">
              Are you sure you want to disable your account temporarily?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleDisableAccount}
              >
                Disable
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setShowDisableModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
        
     {/* Itinerary Settings Section */}
      <section className="bg-white p-6 rounded-lg shadow-md">
      <h2
        className="text-2xl font-semibold mb-4 cursor-pointer transition-colors duration-200 hover:text-blue-600 flex items-center space-x-2"
        onClick={() => toggleSection('itinerary-settings')}
      >
        <GlobeAltIcon className="w-6 h-6 text-green-500" />
        <span>Itinerary Settings</span>
      </h2>
      {expandedSection === 'itinerary-settings' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Select Favourite Countries</h3>
            <button
              className="text-blue-500 hover:underline"
              onClick={() => setShowCountryModal(true)}
            >
              Select
            </button>
          </div>
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Sharing Settings</h3>
            <button
              className="text-blue-500 hover:underline"
              onClick={() => setShowSharingModal(true)}
            >
              Manage
            </button>
          </div>
        </div>
      )}

      {/* Country Selection Modal */}
      {showCountryModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={() => setShowCountryModal(false)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-center">Select Top 3 Countries</h2>
            <div className="space-y-2">
              {countries.map((country) => (
                <div
                  key={country.value}
                  className={`p-4 cursor-pointer rounded-lg border-2 ${selectedCountries.includes(country.value) ? 'border-blue-500 bg-blue-100' : 'border-gray-300'} hover:bg-blue-50 flex justify-between items-center`}
                  onClick={() => handleCountrySelectItinerary(country.value)}
                >
                  <span className="text-lg">{country.name}</span>
                  {selectedCountries.includes(country.value) && (
                    <CheckIcon className="w-6 h-6 text-blue-500" />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleSaveCountries}
              >
                Save
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setShowCountryModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sharing Settings Modal */}
      {showSharingModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={() => setShowSharingModal(false)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-center">Sharing Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="private"
                  name="sharing-mode"
                  checked={sharingMode === 'private'}
                  onChange={() => handleSharingModeChange('private')}
                  className="form-radio h-6 w-6 text-blue-600"
                />
                <label htmlFor="private" className="ml-2 text-lg font-semibold">Private</label>
              </div>
              <p className="text-gray-700 mb-4">Your itineraries will be visible only to you.</p>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="public"
                  name="sharing-mode"
                  checked={sharingMode === 'public'}
                  onChange={() => handleSharingModeChange('public')}
                  className="form-radio h-6 w-6 text-blue-600"
                />
                <label htmlFor="public" className="ml-2 text-lg font-semibold">Public</label>
              </div>
              <p className="text-gray-700">Your itineraries will be visible to everyone.</p>
            </div>
            <div className="flex justify-center mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => setShowSharingModal(false)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
         

          {/* Account Settings Section */}
          <section className="bg-white p-6 rounded-lg shadow-md">
        <h2
            className="text-2xl font-semibold mb-4 cursor-pointer transition-colors duration-200 hover:text-blue-600 flex items-center space-x-2"
            onClick={() => toggleSection('account-settings')}
        >
        <KeyIcon className="w-6 h-6 text-red-500" />
        <span>Account Settings</span>
      </h2>
      {expandedSection === 'account-settings' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Change Password</h3>
            <button
              className="text-blue-500 hover:underline"
              onClick={() => setShowChangePasswordModal(true)}
            >
              Change
            </button>
          </div>
          {/* <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Forgot Password</h3>
            <button
              className="text-blue-500 hover:underline"
              onClick={() => setShowForgotPasswordModal(true)}
            >
              Recover
            </button>
          </div> */}
        </div>
      )}

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={() => setShowChangePasswordModal(false)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-center">Change Password</h2>
            <div className="space-y-4">
              <input
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded"
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded"
              />
              <div className="flex justify-between mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleChangePassword}
                >
                  Save
                </button>
                <button
                  className="bg-gray-300 px-4 py-2 rounded"
                  onClick={() => setShowChangePasswordModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      
      {/* Forgot Password Modal */}
      {/* {showForgotPasswordModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
                  <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                    onClick={() => setShowForgotPasswordModal(false)}
                  >
                    <FaTimes className="w-6 h-6" />
                  </button>
                  <h2 className="text-2xl font-semibold mb-4 text-center">Forgot Password</h2>
                  <p className="text-center text-gray-600 mb-4">
                  An email will be sent to you with instructions on how to reset your password.
                </p>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Verification Code"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded"
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded"
                    />
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded"
                    />
                    <div className="flex justify-between mt-4">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={handleForgotPassword}
                      >
                        Recover
                      </button>
                      <button
                        className="bg-gray-300 px-4 py-2 rounded"
                        onClick={() => setShowForgotPasswordModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )} */}
    </section>
          {/* User Theme Section */}
<section className="bg-white p-6 rounded-lg shadow-md">
  <h2
    className="text-2xl font-semibold mb-4 cursor-pointer transition-colors duration-200 hover:text-blue-600 flex items-center space-x-2"
    onClick={() => setShowModal(true)}
  >
    <HomeIcon className="w-6 h-6 text-purple-500" />
    <span>User Theme</span>
  </h2>
  <div>
    <h3 className="text-xl font-semibold">Selected Theme</h3>
    <p className="text-gray-700">{themes.find(theme => theme.value === selectedTheme)?.name || 'None'}</p>
  </div>
  <div className="flex items-center mt-4 space-x-4">
    <span className="text-xl">Light</span>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={isDarkMode}
        onChange={toggleTheme}
        className="sr-only"
      />
      <div className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${isDarkMode ? 'bg-blue-600' : 'bg-gray-300'}`}>
        <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${isDarkMode ? 'translate-x-5' : 'translate-x-1'}`} />
      </div>
      <span className="ml-2 text-xl">Dark</span>
    </label>
  </div>
</section>

{/* Theme Modal */}
{showModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
      <button
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        onClick={() => setShowModal(false)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
      <h2 className="text-2xl font-semibold mb-4 text-center">Select Theme</h2>
      <div className="space-y-2">
        {themes.map((theme) => (
          <div
            key={theme.value}
            className={`p-4 cursor-pointer rounded-lg border-2 ${selectedTheme === theme.value ? 'border-blue-500 bg-blue-100' : 'border-gray-300'} hover:bg-blue-50`}
            onClick={() => handleThemeSelect(theme.value)}
          >
            <span className="text-lg">{theme.name}</span>
            {selectedTheme === theme.value && (
              <svg className="w-6 h-6 inline-block text-blue-500 float-right" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
)}

        </div>
      </div>
    </div>
  );
};

export default SettingsPage;