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
  FaHeart,
  FaComment,
  FaPlus,
  FaTrash,
  FaPaperPlane,
  FaBookmark,
  FaUser,
} from "react-icons/fa";
import app from "@/libs/firebase/firebase";
import axios from "axios";
import {
  logout,
  updateUserProfile,
  getSharedItineraries,
  updateImageURL,
} from ".";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Cookie from "js-cookie";
import getUser from "@/libs/actions/getUser";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Link from "next/link";
import { FaPerson } from "react-icons/fa6";
import { useTheme } from "../context/ThemeContext";

const Account = () => {
  const [profileDetails, setProfileDetails] = useState<{
    username: string;
    email: string;
    user_id: string;
    country: string;
    imageUrl: string;
    memberSince: string;
  }>({
    username: "",
    email: "",
    user_id: "",
    country: "",
    imageUrl: "",
    memberSince: "",
  });

  interface Post {
    id: string;
    imageUrl: string;
    caption: string;
    post_likes: number;
    comments: any[];
    timestamp: string;
  }
  const { selectedTheme, setTheme, themeStyles } = useTheme();
  const [originalProfileDetails, setOriginalProfileDetails] =
    useState(profileDetails);
  const [file, setFile] = useState<any>(null);
  const [postFile, setPostFile] = useState<any>(null);
  const [profileImage, setProfileImage] = useState(
    profileDetails.imageUrl || ""
  ); // Default image path
  const [originalImage, setOriginalImage] = useState(profileImage); // Store original image for cancellation
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  //POSTS
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostImage, setNewPostImage] = useState("");
  const [newPostCaption, setNewPostCaption] = useState("");
  const [showPostModal, setShowPostModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [currentPostIndex, setCurrentPostIndex] = useState<number | null>(null);
  const [newComment, setNewComment] = useState("");
  const [enlargedPostIndex, setEnlargedPostIndex] = useState<number | null>(
    null
  );

  const [followers, setFollowers] = useState<any>([]);

  const [following, setFollowing] = useState<any>([]);

  const [itineraries, setItineraries] = useState<any>([]);

  const [savedItineraries, setSavedItineraries] = useState<any>([]);

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
    if (tmp.imageUrl) {
      setProfileImage(tmp.imageUrl);
    }
  };

  useEffect(() => {
    async function fetch() {
      await fetchProfileDetails();
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const userId = Cookie.get("user_id");
      const response = await axios.post(
        `${backendUrl}/itinerary/getMySharedItineraries`,
        {
          user_id: userId,
        }
      );

      setItineraries(response.data);
      const postsResponse = await axios.post(
        `${backendUrl}/posts/getUserPosts`,
        {
          user_id: userId,
        }
      );
      setPosts(postsResponse.data);

      const res = await axios.post(
        `${backendUrl}/itinerary/getSavedItineraries`,
        {
          user_id: userId,
        }
      );
      setSavedItineraries(res.data);

      const f = await axios.post(`${backendUrl}/follows/following`, {
        user_id: userId,
      });
      setFollowing(f.data);
      const r = await axios.post(`${backendUrl}/follows/followers`, {
        user_id: userId,
      });
      setFollowers(r.data);
    }
    localStorage.removeItem("searchResults");
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
    const storage = getStorage(app);
    const storageRef = ref(storage, `Profiles/${profileDetails.user_id}.jpg`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    await updateImageURL({ user_id: profileDetails.user_id, imageURL: url });
  };

  const uploadPostImage = async (file: any, post_id: any) => {
    const storage = getStorage(app);
    const storageRef = ref(storage, `Posts/${post_id}.jpg`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    await axios.post(`${backendUrl}/posts/updateImage`, {
      postId: post_id,
      imageUrl: url,
    });
  };

  const handleCancel = () => {
    setProfileDetails(originalProfileDetails); // Revert to original details
    setProfileImage(originalImage); // Reset image if needed
    toggleEdit(); // Exit edit mode
  };

  const handleSave = async () => {
    const temp = Cookie.get("user_id");
    console.log(temp);
    // Save changes to the database
    if (file) {
      const url = await uploadImage(file);
      console.log(url);
    }
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (originalProfileDetails.email !== profileDetails.email) {
      const response = await axios.post(`${backendUrl}/auth/UpdateEmail`, {
        email: profileDetails.email,
        user_id: temp,
      });
      console.log(response);
    }
    await updateUserProfile(profileDetails);
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
  const handleViewClick = (itineraryName: string) => {
    // router.push(`/viewItinerary/${itineraryName}`);
    router.push("/viewItinerary");
  };
  const handlePostClick = (index: number) => {
    setEnlargedPostIndex(index);
  };

  const closeEnlargedPost = () => {
    setEnlargedPostIndex(null);
  };
  const handleNewPostImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPostFile(file);
      const imageUrl = URL.createObjectURL(file);
      setNewPostImage(imageUrl);
    }
  };

  const handleNewPostSubmit = async () => {
    if (!newPostImage || !newPostCaption) {
      alert("Please provide an image and caption for the post");
      return;
    }

    if (newPostImage && newPostCaption) {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const result = await axios.post(`${backendUrl}/posts/create`, {
        user_id: profileDetails.user_id,
        caption: newPostCaption,
      });

      if (postFile) {
        await uploadPostImage(postFile, result.data);
      }

      const newPost = await axios.post(`${backendUrl}/posts/getPost`, {
        postId: result.data,
      });
      setPosts([newPost.data, ...posts]);
      setNewPostImage("");
      setNewPostCaption("");
      setShowPostModal(false);
    }
  };
  const handleLike = async (index: number) => {
    const user_id = Cookie.get("user_id");
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const res = await axios.post(`${backendUrl}/likes/userLikesPost`, {
      post_id: posts[index].id,
      user_id: user_id,
    });
    if (res.data) {
      await axios.post(`${backendUrl}/posts/decrementLikes`, {
        postId: posts[index].id,
      });
      await axios.post(`${backendUrl}/likes/unlikePost`, {
        post_id: posts[index].id,
        user_id: user_id,
      });
      const updatedPosts = [...posts];
      updatedPosts[index].post_likes -= 1;
      setPosts(updatedPosts);
    } else {
      await axios.post(`${backendUrl}/posts/incrementLikes`, {
        postId: posts[index].id,
      });
      await axios.post(`${backendUrl}/likes/likePost`, {
        post_id: posts[index].id,
        user_id: user_id,
      });
      const updatedPosts = [...posts];
      updatedPosts[index].post_likes += 1;
      setPosts(updatedPosts);
    }
  };

  // const openCommentModal = (index: number) => {
  //   setCurrentPostIndex(index);
  //   setShowCommentModal(true);
  // };

  const handleCommentSubmit = async () => {
    if (enlargedPostIndex !== null && newComment.trim()) {
      const updatedPosts = [...posts];
      const user_id = Cookie.get("user_id");
      const temp = await getUser(user_id);
      const u = JSON.parse(temp || "{}");

      updatedPosts[enlargedPostIndex].comments.push({
        comment: newComment,
        post_id: updatedPosts[enlargedPostIndex].id,
        user_id: user_id,
        username: u.username,
      });

      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      await axios.post(`${backendUrl}/comments/create`, {
        post_id: updatedPosts[enlargedPostIndex].id,
        comment: newComment,
        user_id: user_id,
        username: u.username,
      });

      setPosts(updatedPosts);
      setNewComment("");
    }
  };

  const [view, setView] = useState("shared");

  const handleViewChange = (view: string) => {
    setView(view);
  };
//delete button
  const handleDeletePost = async (postId: string) => {
    try {
      //await axios.delete(`/api/posts/${postId}`);
      //Update posts state to remove the deleted post
      //setPosts(posts.filter((post) => post.id !== postId));
      closeEnlargedPost(); // Close the modal after deletion
    } catch (error) {
      console.error("Failed to delete the post:", error);
    }
  };
  

  return (
    <div data-testid="accountContainer" className="profile-page">
      <header className="profile-header" style={{background: themeStyles.primaryColor}}>
        <div className="profile-pic">
          <div className="relative">
            {profileDetails.imageUrl && (
              <img src={profileImage} alt="Profile" />
            )}
            {isEditing && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute bottom-0 opacity-0 right-0 cursor-pointer w-20 h-20"
              />
            )}
          </div>
        </div>
        <div className="profile-info" >
          {isEditing ? (
            <div className="edit-profile">
              <input
                type="text"
                name="username"
                value={profileDetails.username}
                onChange={handleInputChange}
                placeholder="Username"
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
              <input
                type="text"
                name="country"
                value={profileDetails.country}
                onChange={handleInputChange}
                placeholder="Country"
                className="edit-input"
              />
              <div className="edit-buttons" >
                <button onClick={handleSave} className="save-button" style={{ backgroundColor: themeStyles.navbarColor}}>
                  Save
                </button>
                <button onClick={handleCancel} className="cancel-button">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <h1 data-testid="accountName"style={{color: themeStyles.textColor}} >{profileDetails.username}</h1>
              <h2 data-testid="accountEmail">{profileDetails.email}</h2>
              {profileDetails.country && (
                <div className="location">
                  <FaMapMarkerAlt />
                  <span>{profileDetails.country}</span>
                </div>
              )}
              {profileDetails.memberSince && (
                <div className="member-since">
                  <FaRegCalendarAlt />
                  <span>Member Since: {profileDetails.memberSince}</span>
                </div>
              )}
            </>
          )}
        </div>
        <button className="menu-button" onClick={() => setShowMenu(!showMenu)}>
          {showMenu ? <FaTimes /> : <FaBars />}
        </button>
        {showMenu && (
          <div className="menu-dropdown">
            <button onClick={() => setShowMenu(false)}>
              <FaTimes /> Close
            </button>
            <button onClick={openEditProfile}>
              <FaEdit /> Edit Profile
            </button>
            <button onClick={togglePopup}>
              <FaInfoCircle /> About
            </button>
            <button onClick={handleHelpCenter}>
              <FaQuestionCircle /> Help Center
            </button>

            <button onClick={handleSignout}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        )}
      </header>

      <section className="saved-itineraries" style={{background: themeStyles.primaryColor}}>
        <h3 className="Following-title">My Following</h3>
        <div className="profile-stats">
          <div className="following" onClick={toggleFollowing}>
            <span>{following?.length}</span>
            <p>Following</p>
          </div>
          <div className="followers" onClick={toggleFollowers}>
            <span>{followers?.length}</span>
            <p>Followers</p>
          </div>
        </div>
        <div className="flex justify-center mb-4 space-x-4">
          <button
            onClick={() => handleViewChange("shared")}
            className={`text-base font-semibold px-4 py-2 border-b-4 ${
              view === "shared" ? "border-blue-500" : "border-transparent"
            } focus:outline-none`}
          >
            Shared Itineraries
          </button>
          <button
            onClick={() => handleViewChange("bookmarks")}
            className={`text-base font-semibold px-4 py-2 border-b-4 ${
              view === "bookmarks" ? "border-blue-500" : "border-transparent"
            } focus:outline-none`}
          >
            Saved Itineraries
          </button>
        </div>
        {view === "shared" && (
          <div className="itinerary-cards">
            {itineraries.map((itinerary: any, index: any) => (
              <Link
                key={index}
                href={`/viewItinerary?itineraryName=${itinerary.name}&itineraryId=${itinerary.id}&myItinerary=true&prev=${location.pathname}`}
                passHref
              >
                <div className="itinerary-card">
                  <img
                    src={itinerary.imageUrl}
                    alt={itinerary.name}
                    className="itinerary-image"
                  />
                  <div className="itinerary-content">
                    <h4 className="itinerary-title">{itinerary.name}</h4>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        {view === "bookmarks" && (
          <div className="itinerary-cards">
            {savedItineraries.map((itinerary: any, index: any) => (
              <Link
                key={index}
                href={`/viewItinerary?itineraryName=${itinerary?.name}&itineraryId=${itinerary.id}&myItinerary=false&prev=${location.pathname}`}
                passHref
              >
                <div className="itinerary-card">
                  <img
                    src={itinerary?.imageUrl}
                    alt={itinerary?.name}
                    className="itinerary-image"
                  />
                  <div className="itinerary-content">
                    <h4 className="itinerary-title">{itinerary?.name}</h4>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>About This Site</h2>
            <p>
              Welcome to our Travel Planner! This platform is designed to
              simplify your journey by helping you effortlessly organize your
              trips, discover curated itineraries, and access a wealth of travel
              resources. Whether you&apos;re planning a weekend getaway or a
              grand adventure, we&rsquo;ve got you covered. If you need further
              assistance or personalized guidance, be sure to visit our Help
              Center, where you&rsquo;ll find FAQs, tips, and support to make
              your travel experience even better.
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
              {followers.map((follower: any, index: any) => (
                <div key={index} className="user-item">
                  <img
                    src={follower.imageUrl}
                    alt={follower.username}
                    className="user-pic"
                  />
                  <p>{follower.username}</p>
                </div>
              ))}
            </div>
            <button  onClick={toggleFollowers} style={{ backgroundColor: themeStyles.navbarColor}}>
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
              {following.map((user: any, index: any) => (
                <div key={index} className="user-item">
                  <img
                    src={user.imageUrl}
                    alt={user.username}
                    className="user-pic"
                  />
                  <p>{user.username}</p>
                </div>
              ))}
            </div>
            <button className="close-button" onClick={toggleFollowing} style={{ backgroundColor: themeStyles.navbarColor}}>
              Close
            </button>
          </div>
        </div>
      )}
      {/* Posts */}

      <section className="posts py-6 px-4 " style={{ width: "140%", background: themeStyles.primaryColor }}>
        <h3 className="text-xl font-bold mb-4">My Travel Posts</h3>
        <button
          onClick={() => setShowPostModal(true)}
          className="mt-6 mb-4 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg flex items-center mx-auto"
          style={{background: themeStyles.navbarColor}}
        >
          <FaPlus className="mr-2" /> Add Post
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {posts.map((post, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer ${
                enlargedPostIndex === index ? "enlarged" : ""
              }`}
              onClick={() => handlePostClick(index)}
            >
              <img
                src={post.imageUrl}
                alt={post.caption}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-md mb-2">{post.caption}</p>
                <div className="flex justify-between items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(index);
                    }}
                    className="flex items-center text-red-500"
                  >
                    <FaHeart className="mr-1" />
                    {post.post_likes}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEnlargedPostIndex(index);
                    }}
                    className="flex items-center text-blue-500"
                  >
                    <FaComment className="mr-1" />
                    {post?.comments?.length}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {showPostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Add New Post</h2>
            <input
              type="file"
              accept="image/*"
              onChange={handleNewPostImageChange}
              className="block w-full mb-4"
            />
            <textarea
              value={newPostCaption}
              onChange={(e) => setNewPostCaption(e.target.value)}
              placeholder="Enter caption"
              className="block w-full mb-4 p-2 border rounded"
            />
            <div className="flex justify-between">
              <button
                onClick={handleNewPostSubmit}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg"
                style={{ backgroundColor: themeStyles.navbarColor}}
              >
                Submit
              </button>
              <button
                onClick={() => setShowPostModal(false)}
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {enlargedPostIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center"
          onClick={closeEnlargedPost}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-5xl w-full max-h-[90vh] overflow-auto relative mt-24"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeEnlargedPost}
              className="absolute top-2 right-2 text-3xl text-gray-600"
            >
              &times;
            </button>
            <img
              src={posts[enlargedPostIndex].imageUrl}
              alt={posts[enlargedPostIndex].caption}
              className="w-full h-auto max-h-[60vh] object-contain mb-4"
            />
            <p className="text-2xl font-bold mb-3 text-center">
              {posts[enlargedPostIndex].caption}
            </p>

            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => handleLike(enlargedPostIndex)}
                className="flex items-center text-red-500"
              >
                <FaHeart className="mr-1 text-2xl" />{" "}
                {posts[enlargedPostIndex].post_likes}
              </button>
              <button
                onClick={() => {
                  /* No action needed here */
                }}
                className="flex items-center text-blue-500"
              >
                <FaComment className="mr-1 text-2xl" />
                {posts[enlargedPostIndex]?.comments?.length}
              </button>
               {/* Delete Button */}
              <button
                onClick={() => handleDeletePost(posts[enlargedPostIndex].id)}
                className="flex items-center text-red-600"
              >
                <FaTrash className="mr-1 text-2xl" />
                Delete Post
              </button>
            </div>
            <div className="mb-4">
              {posts[enlargedPostIndex]?.comments?.map((data, index) => (
                <div key={index} className="border-b border-gray-200 py-2">
                  <p className="font-bold">{data.username}</p>
                  <p>{data.comment}</p>
                </div>
              ))}
            </div>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            />
            <button
              onClick={handleCommentSubmit}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg"
              style={{ backgroundColor: themeStyles.navbarColor}}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
