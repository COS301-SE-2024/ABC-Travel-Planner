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
import { logout, updateUserProfile, getSharedItineraries } from ".";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createClient } from "../utils/supabase/client";
import Cookie from "js-cookie";
import getUser from "@/libs/actions/getUser";

const Account = () => {
  const [profileDetails, setProfileDetails] = useState<{
    name: string;
    surname: string;
    email: string;
    user_id: string;
    country: string;
    imageUrl: string;
    memberSince: string;
  }>({
    name: "",
    surname: "",
    email: "",
    user_id: "",
    country: "",
    imageUrl: "",
    memberSince: "",
  });
  const [originalProfileDetails, setOriginalProfileDetails] =
    useState(profileDetails);
  const [file, setFile] = useState<any>(null);
  const [profileImage, setProfileImage] = useState(
    profileDetails.imageUrl || "/Images/profile.jpg"
  ); // Default image path
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

  const [itineraries, setItineraries] = useState<any>([]);

  const router = useRouter();

  const handleSignout = async () => {
    await logout();
    Cookie.remove("user_id");
    router.push("/login");
  };

  const handleHelpCenter = () => {
    router.push("/help");
  };
  const fetchProfileDetails = async () => {
    const temp = Cookie.get("user_id");
    console.log(temp);
    const r = await getUser(temp);
    console.log(r);
    const tmp = JSON.parse(r || "");
    setProfileDetails(tmp);
    // if(response.imageUrl)
    //   {
    //     setProfileImage(response.imageUrl);
    //     console.log(response.imageUrl);
    //   }
    //   else{
    //     setProfileImage("/Images/profile.jpg");
    //   }
  };

  useEffect(() => {
    async function fetch() {
      await fetchProfileDetails();
      // const result = await getSharedItineraries();
      // setItineraries(result);
    }
    fetch();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files?.[0]; // Use optional chaining

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl); // Set the new image URL for preview
      setFile(file);
    }
  };

  const uploadImage = async (file: any) => {
    const supabase = createClient();
    const { data, error } = await supabase.storage
      .from("Profile Pictures")
      .upload(`${profileDetails.name}_${profileDetails.surname}.jpg`, file, {
        cacheControl: "no-store, no-cache, must-revalidate", // Prevent caching at all levels
        upsert: true, // Replace file if it already exists
      });
  };

  const handleCancel = () => {
    setProfileDetails(originalProfileDetails); // Revert to original details
    setProfileImage(originalImage); // Reset image if needed
    toggleEdit(); // Exit edit mode
  };

  const handleSave = async () => {
    const temp = Cookie.get("user");
    console.log(temp);
    // Save changes to the database
    if (file) {
      const url = await uploadImage(file);
      console.log(url);
    }
    await updateUserProfile(profileDetails,temp);
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
    <div className="bg-gray-100 min-h-screen p-6">
      <header className="bg-blue-100 shadow-md rounded-lg p-6 mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            {isEditing && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute bottom-0 right-0 opacity-0 cursor-pointer w-10 h-10"
              />
            )}
          </div>
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={profileDetails.name}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  name="surname"
                  value={profileDetails.surname}
                  onChange={handleInputChange}
                  placeholder="Surname"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  type="email"
                  name="email"
                  value={profileDetails.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  name="country"
                  value={profileDetails.country}
                  onChange={handleInputChange}
                  placeholder="Country"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <div className="flex space-x-4">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold">
                  {profileDetails.name} {profileDetails.surname}
                </h1>
                <h2 className="text-lg text-gray-600">
                  {profileDetails.email}
                </h2>
                {profileDetails.country && (
                  <div className="flex items-center space-x-2 mt-2">
                    <FaMapMarkerAlt />
                    <span>{profileDetails.country}</span>
                  </div>
                )}

                <div className="flex items-center space-x-2 mt-2">
                  <FaRegCalendarAlt />
                  <span>
                    Member Since: {profileDetails.memberSince?.substring(5, 17)}
                  </span>
                </div>
              </>
            )}
          </div>
          <button
            className="ml-4 p-2 text-gray-600 hover:text-gray-800"
            onClick={() => setShowMenu(!showMenu)}
          >
            {showMenu ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        {showMenu && (
          <div className="mt-4 mr-4 bg-white shadow-md rounded-lg p-4 absolute right-0 w-48">
            <button
              onClick={() => setShowMenu(false)}
              className="block w-full text-left py-2 hover:bg-gray-100"
            >
              <FaTimes /> Close
            </button>
            <button
              onClick={openEditProfile}
              className="block w-full text-left py-2 hover:bg-gray-100"
            >
              <FaEdit /> Edit Profile
            </button>
            <button
              onClick={togglePopup}
              className="block w-full text-left py-2 hover:bg-gray-100"
            >
              <FaInfoCircle /> About
            </button>
            <button
              onClick={handleHelpCenter}
              className="block w-full text-left py-2 hover:bg-gray-100"
            >
              <FaQuestionCircle /> Help Center
            </button>
            <button
              onClick={handleSignout}
              className="block w-full text-left py-2 hover:bg-gray-100"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        )}
      </header>

      <section className="bg-blue-100 shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">My Following</h3>
        <div className="flex space-x-4 mb-6">
          <div className="text-center cursor-pointer" onClick={toggleFollowing}>
            <span className="text-2xl font-bold">24</span>
            <p className="text-gray-600">Following</p>
          </div>
          <div className="text-center cursor-pointer" onClick={toggleFollowers}>
            <span className="text-2xl font-bold">33</span>
            <p className="text-gray-600">Followers</p>
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-4">Shared Itineraries</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {itineraries.map((itinerary: any, index: any) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={itinerary.image}
                alt={itinerary.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h4 className="text-lg font-semibold">{itinerary.name}</h4>
                <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>About This Site</h2>
            <p>
              Welcome to our Travel Planner! This platform is designed to
              simplify your journey by helping you effortlessly organize your
              trips, discover curated itineraries, and access a wealth of travel
              resources. Whether you're planning a weekend getaway or a grand
              adventure, we've got you covered. If you need further assistance
              or personalized guidance, be sure to visit our Help Center, where
              you'll find FAQs, tips, and support to make your travel experience
              even better.
            </p>
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
                  <img
                    src={follower.profilePic}
                    alt={follower.username}
                    className="user-pic"
                  />
                  <p>{follower.username}</p>
                </div>
              ))}
            </div>
            <button className="close-button" onClick={toggleFollowers}>
              Close
            </button>
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
                  <img
                    src={user.profilePic}
                    alt={user.username}
                    className="user-pic"
                  />
                  <p>{user.username}</p>
                </div>
              ))}
            </div>
            <button className="close-button" onClick={toggleFollowing}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
