"use client";
import { useTheme } from "../context/ThemeContext"; // Import the useTheme hook
import React, { useState, useEffect } from "react";
import {
  UserIcon,
  GlobeAltIcon,
  KeyIcon,
  HomeIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import {
  FaUser,
  FaSearch,
  FaVolumeMute,
  FaBan,
  FaHeart,
  FaCommentAlt,
  FaFileAlt,
  FaTimes,
} from "react-icons/fa";
import axios from "axios";
import Cookie from "js-cookie";
import { deleteAccount, getFavouriteCountries } from ".";
import { logout } from "../account";

import getUser from "@/libs/actions/getUser";

const countries = [
  "Argentina",
  "Australia",
  "Brazil",
  "Canada",
  "China",
  "Egypt",
  "France",
  "Germany",
  "Ghana",
  "Greece",
  "India",
  "Indonesia",
  "Italy",
  "Japan",
  "Kenya",
  "Malaysia",
  "Mexico",
  "Morocco",
  "Netherlands",
  "New Zealand",
  "Nigeria",
  "Russia",
  "South Africa",
  "South Korea",
  "Spain",
  "Switzerland",
  "Tanzania",
  "Thailand",
  "Tunisia",
  "Turkey",
  "United Kingdom",
  "USA",
];

const themes: {
  value: "default" | "beach" | "adventure" | "cultural" | "nature";
  name: string;
}[] = [
  { value: "default", name: "Default Theme" },
  { value: "beach", name: "Beach Holiday" },
  { value: "adventure", name: "Sunsets and Pretty skies" },
  { value: "cultural", name: "Cultural Exploration" },
  { value: "nature", name: "Nature Retreat" },
];

const SettingsPage: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  //Theme
  const { selectedTheme, setTheme, themeStyles } = useTheme();
  const [showModalTheme, setShowModalTheme] = useState<boolean>(false);

  const handleThemeSelect = (
    themeValue: "default" | "beach" | "adventure" | "cultural" | "nature"
  ) => {
    setTheme(themeValue); // Use the context method to set theme
    setShowModal(false);
  };

  //Account
  const router = useRouter();
  const [showChangePasswordModal, setShowChangePasswordModal] =
    useState<boolean>(false);
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");

  const handleChangePassword = async () => {
    // Add logic for changing the password
    if (newPassword != confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const user_id = Cookie.get("user_id");
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await axios.post(`${backendUrl}/auth/ChangePassword`, {
      password: newPassword,
      user_id: user_id,
    });
    if (res.data) {
      alert("Password changed successfully");
    } else {
      alert("Password change failed");
    }
    setNewPassword("");
    setConfirmPassword("");
    setShowChangePasswordModal(false);
  };

  //Itinerary
  const [showCountryModal, setShowCountryModal] = useState<boolean>(false);
  const [showSharingModal, setShowSharingModal] = useState<boolean>(false);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [sharingMode, setSharingMode] = useState<"private" | "public">(
    "private"
  );

  const handleCountrySelectItinerary = (country: string) => {
    if (selectedCountries.length < 3) {
      setSelectedCountries((prev) =>
        prev.includes(country)
          ? prev.filter((c) => c !== country)
          : [...prev, country]
      );
    } else if (selectedCountries.includes(country)) {
      setSelectedCountries((prev) => prev.filter((c) => c !== country));
    } else {
      alert("You can select up to 3 countries only.");
    }
  };

  const [likesCount, setLikesCount] = useState<number>(0);
  const [commentsCount, setCommentsCount] = useState<number>(0);
  const [postsCount, setPostsCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetch() {
      try {
        const userId = Cookie.get("user_id");

        const result = await getUser(userId);
        const user = JSON.parse(result || "{}");

        if (user !== null && user?.sharingMode) {
          setSharingMode(user?.sharingMode);
        } else {
          setSharingMode("public");
        }

        const countries = await getFavouriteCountries(userId);
        setSelectedCountries(countries);

        //get blocked users
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/block/blockedUsers`,
          { user_id: userId }
        );

        const blockedUsers = response.data;
        //filter I want the username then blocked set to true
        const blockedUsersList = blockedUsers.map((user: any) => {
          return {
            username: user.username,
            blocked: true,
            user_id: user.user_id,
          };
        });
        //setBlocked
        setUserList(blockedUsersList);
      } catch (error: any) {
        setError(error.message);
      }
    }
    fetch();
  }, []);

  useEffect(() => {
    async function getLikesCount() {
      try {
        const userId = Cookie.get("user_id");

        const count = await fetchLikesCount(userId || "");

        setLikesCount(count);
      } catch (error: any) {
        setError(error.message);
      }
    }
    getLikesCount();
  }, []);

  useEffect(() => {
    async function getCommentsCount() {
      try {
        const userId = Cookie.get("user_id");

        const count = await fetchCommentsCount(userId || "");

        setCommentsCount(count);
      } catch (error: any) {
        setError(error.message);
      }
    }

    getCommentsCount();
  }, []);

  useEffect(() => {
    async function getPostsCount() {
      try {
        const userId = Cookie.get("user_id");

        const count = await fetchPostsCount(userId || "");

        setPostsCount(count);
      } catch (error: any) {
        setError(error.message);
      }
    }

    getPostsCount();
  }, []);
  async function fetchLikesCount(userId: string): Promise<number> {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/activity/getLikesCount`,
      { userId }
    );
    //console.log(response);
    if (!response.data) {
      throw new Error("Failed to fetch likes count");
    }
    return response.data;
  }

  async function fetchCommentsCount(userId: string): Promise<number> {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/activity/getCommentsCount`,
      { userId }
    );
    console.log("Data is :" + response.data);
    console.log(response);
    if (!response.data) {
      throw new Error("Failed to fetch comments count");
    }
    return response.data;
  }

  async function fetchPostsCount(userId: string): Promise<number> {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/activity/getPostsCount`,
      { userId }
    );
    console.log("Data is :" + response.data);
    console.log(response);
    if (!response.data) {
      throw new Error("Failed to fetch posts count");
    }
    return response.data;
  }

  const handleSaveCountries = async () => {
    if (selectedCountries.length !== 3) {
      alert("Please select 3 countries");
      return;
    }

    await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/itinerary/changeFavouriteCountries`,
      {
        countries: selectedCountries,
        user_id: Cookie.get("user_id"),
      }
    );
    setShowCountryModal(false);
  };

  const handleSharingModeChange = (mode: "private" | "public") => {
    setSharingMode(mode);
  };

  const [showBlockedModal, setShowBlockedModal] = useState<boolean>(false);
  const [showActivityModal, setShowActivityModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  //useeffect for blocked users
  const [userList, setUserList] = useState<any[]>([]);

  const handleBlock = async (user_id: string) => {
    setUserList((prevList) =>
      prevList.map((user) =>
        user.user_id === user_id ? { ...user, blocked: !user.blocked } : user
      )
    );

    const u = Cookie.get("user_id");
    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/block/blockUser`, {
      user_id: u,
      blocked_id: user_id,
    });
  };

  const filteredUsers = userList.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveSharingMode = async () => {
    // Add logic for saving sharing mode
    const userId = Cookie.get("user_id");
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await axios.post(`${backendUrl}/auth/ChangeSharingMode`, {
      sharingMode: sharingMode,
      user_id: userId,
    });
    setShowSharingModal(false);
  };

  const handleDeleteAccount = async () => {
    const user_id = Cookie.get("user_id");

    await deleteAccount(user_id);
    await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/deleteAccount`,
      {
        user_id: user_id,
      }
    );
    await logout();
    Cookie.remove("user_id");
    router.push("/login");
  };

  return (
    <div
      className="min-h-screen bg-gray-100 p-8"
      style={{ backgroundColor: themeStyles.background }}
    >
      <h1 className="text-4xl font-extrabold text-center mb-8">Settings</h1>

      <div className="space-y-6">
        {/* User Management Section */}
        <section
          className="bg-white p-6 rounded-lg shadow-md"
          style={{ background: themeStyles.primaryColor }}
        >
          <h2
            className="text-2xl font-semibold mb-4 cursor-pointer transition-colors duration-200 hover:text-blue-600 flex items-center space-x-2"
            onClick={() => toggleSection("user-management")}
          >
            <FaUser className="w-6 h-6 text-blue-500" />
            <span>User Management</span>
          </h2>
          {expandedSection === "user-management" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">Blocked Users</h3>
                  <p className="text-gray-700">
                    Manage your blocked users here.
                  </p>
                </div>
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => setShowBlockedModal(true)}
                >
                  View List
                </button>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">Activity</h3>
                  <p className="text-gray-700">
                    View posts you liked, commented on, or deleted.
                  </p>
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
                  <h3 className="text-xl font-semibold">Delete Account</h3>
                  <p className="text-gray-700">
                    Delete your Account Permanently
                  </p>
                </div>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => setShowDeleteModal(true)}
                >
                  Delete Account
                </button>
              </div>
            </div>
          )}

          {/*Blocked Users Modal */}
          {showBlockedModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
                <button
                  className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                  onClick={() => setShowBlockedModal(false)}
                >
                  <FaTimes className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-semibold mb-4 text-center">
                  Blocked Users
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
                          onClick={() => handleBlock(user.user_id)}
                          className={`p-2 rounded-full ${
                            user.blocked ? "bg-red-500" : "bg-gray-200"
                          }`}
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
                    onClick={() => setShowBlockedModal(false)}
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
                    <span className="text-xl font-medium text-gray-800">
                      Posts Liked:{" "}
                      <span className="font-bold">{likesCount}</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg shadow-sm">
                    <FaCommentAlt className="w-8 h-8 text-blue-600" />
                    <span className="text-xl font-medium text-gray-800">
                      Comments Made:{" "}
                      <span className="font-bold">{commentsCount}</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-lg shadow-sm">
                    <FaFileAlt className="w-8 h-8 text-green-600" />
                    <span className="text-xl font-medium text-gray-800">
                      Posts Created:{" "}
                      <span className="font-bold">{postsCount}</span>
                    </span>
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

          {/* delete Account Modal */}
          {showDeleteModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
                <button
                  className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                  onClick={() => setShowDeleteModal(false)}
                >
                  <FaTimes className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-semibold mb-4 text-center">
                  Delete Account
                </h2>
                <p className="text-center text-gray-700 mb-6">
                  Are you sure you want to delete your account permanently?
                </p>
                <div className="flex justify-center space-x-4">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={handleDeleteAccount}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-gray-300 px-4 py-2 rounded"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Itinerary Settings Section */}
        <section
          className="bg-white p-6 rounded-lg shadow-md"
          style={{ background: themeStyles.primaryColor }}
        >
          <h2
            className="text-2xl font-semibold mb-4 cursor-pointer transition-colors duration-200 hover:text-blue-600 flex items-center space-x-2"
            onClick={() => toggleSection("itinerary-settings")}
          >
            <GlobeAltIcon className="w-6 h-6 text-green-500" />
            <span>Itinerary Settings</span>
          </h2>
          {expandedSection === "itinerary-settings" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">
                  Select Favourite Countries
                </h3>
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
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative max-h-[90vh] overflow-y-auto">
                <button
                  className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                  onClick={() => setShowCountryModal(false)}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
                <h2 className="text-2xl font-semibold mb-4 text-center">
                  Select Top 3 Countries
                </h2>
                <div className="p-2 space-y-2 max-h-[50vh] overflow-y-auto">
                  {countries.map((country) => (
                    <div
                      key={country}
                      className={`p-4 cursor-pointer rounded-lg border-2 ${
                        selectedCountries?.includes(country)
                          ? "border-blue-500 bg-blue-100"
                          : "border-gray-300"
                      } hover:bg-blue-50 flex justify-between items-center`}
                      onClick={() => handleCountrySelectItinerary(country)}
                    >
                      <span className="text-lg">{country}</span>
                      {selectedCountries?.includes(country) && (
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
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
                <h2 className="text-2xl font-semibold mb-4 text-center">
                  Sharing Settings
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="private"
                      name="sharing-mode"
                      checked={sharingMode === "private"}
                      onChange={() => handleSharingModeChange("private")}
                      className="form-radio h-6 w-6 text-blue-600"
                    />
                    <label
                      htmlFor="private"
                      className="ml-2 text-lg font-semibold"
                    >
                      Private
                    </label>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Your itineraries will be visible only to you.
                  </p>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="public"
                      name="sharing-mode"
                      checked={sharingMode === "public"}
                      onChange={() => handleSharingModeChange("public")}
                      className="form-radio h-6 w-6 text-blue-600"
                    />
                    <label
                      htmlFor="public"
                      className="ml-2 text-lg font-semibold"
                    >
                      Public
                    </label>
                  </div>
                  <p className="text-gray-700">
                    Your itineraries will be visible to everyone.
                  </p>
                </div>
                <div className="flex justify-center mt-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={handleSaveSharingMode}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Account Settings Section */}
        <section
          className="bg-white p-6 rounded-lg shadow-md"
          style={{ background: themeStyles.primaryColor }}
        >
          <h2
            className="text-2xl font-semibold mb-4 cursor-pointer transition-colors duration-200 hover:text-blue-600 flex items-center space-x-2"
            onClick={() => toggleSection("account-settings")}
          >
            <KeyIcon className="w-6 h-6 text-red-500" />
            <span>Account Settings</span>
          </h2>
          {expandedSection === "account-settings" && (
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
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
                <h2 className="text-2xl font-semibold mb-4 text-center">
                  Change Password
                </h2>
                <div className="space-y-4">
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
        </section>
        {/* User Theme Section */}
        <section
          className="bg-white p-6 rounded-lg shadow-md"
          style={{ background: themeStyles.primaryColor }}
        >
          <h2
            className="text-2xl font-semibold mb-4 cursor-pointer flex items-center space-x-2"
            onClick={() => setShowModal(true)}
          >
            <HomeIcon className="w-6 h-6 text-purple-500" />
            <span>User Theme</span>
          </h2>
          <div>
            <h3 className="text-xl font-semibold">Selected Theme</h3>
            <p className="text-gray-700">
              {themes.find((theme) => theme.value === selectedTheme)?.name ||
                "default"}
            </p>
          </div>
        </section>

        {/* Modal for theme selection */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
              <button
                className="absolute top-2 right-2"
                onClick={() => setShowModal(false)}
              >
                X
              </button>
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Select Theme
              </h2>
              <div className="space-y-2">
                {themes.map((theme) => (
                  <div
                    key={theme.value}
                    className={`p-4 cursor-pointer rounded-lg ${
                      selectedTheme === theme.value
                        ? "bg-blue-100"
                        : "bg-gray-100"
                    }`}
                    onClick={() => handleThemeSelect(theme.value)}
                  >
                    <span className="text-lg">{theme.name}</span>
                    {selectedTheme === theme.value && (
                      <CheckIcon className="w-6 h-6 inline-block text-blue-500 float-right" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
