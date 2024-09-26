"use client";
import {
  FaMapMarkerAlt,
  FaRegCalendarAlt,
  FaHeart,
  FaComment,
} from "react-icons/fa";

import { useEffect, useState } from "react";
import getUser from "@/libs/actions/getUser";
import axios from "axios";
import Link from "next/link";
import Cookie from "js-cookie";

const Profile = () => {
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

  const [profileImage, setProfileImage] = useState("/Images/profile.jpg"); // Default image path
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false); // State for follow button

  const [followers, setFollowers] = useState<any>([]);

  const [following, setFollowing] = useState<any>([]);

  interface Post {
    id: string;
    imageUrl: string;
    caption: string;
    post_likes: number;
    comments: any[];
    timestamp: string;
  }
  const [newComment, setNewComment] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [itineraries, setItineraries] = useState<any>([]);
  const [enlargedPostIndex, setEnlargedPostIndex] = useState<number | null>(
    null
  );

  const fetchProfileDetails = async () => {
    const user_id = window.location.pathname.replace("/profile/", "");
    const r = await getUser(user_id);

    const tmp = JSON.parse(r || "");
    setProfileDetails(tmp);
    if (tmp.imageUrl) {
      setProfileImage(tmp.imageUrl);
    }
  };
  const handlePostClick = (index: number) => {
    setEnlargedPostIndex(index);
  };

  const toggleFollowers = () => {
    setShowFollowers(!showFollowers);
    setShowFollowing(false);
  };

  const toggleFollowing = () => {
    setShowFollowing(!showFollowing);
    setShowFollowers(false);
  };

  const handleFollowButtonClick = async () => {
    setIsFollowing(!isFollowing);
    const user_id = profileDetails.user_id;
    const follower_id = Cookie.get("user_id");
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    await axios.post(`${backendUrl}/follows/follow`, {
      user_id: user_id,
      follower_id: follower_id,
    });

    const f = await axios.post(`${backendUrl}/follows/followers`, {
      user_id: user_id,
    });
    setFollowers(f.data);
  };

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

  const handleLike = async (index: number) => {
    const user_id = Cookie.get("user_id");
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const res = await axios.post(`${backendUrl}/likes/userLikesPost`, {
      post_id: posts[index].id,
      user_id: user_id,
    });
    if (res.data === true) {
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

  useEffect(() => {
    async function fetch() {
      await fetchProfileDetails();
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const user_id = window.location.pathname.replace("/profile/", "");

      const u = await getUser(user_id);
      const user = JSON.parse(u || "{}");
      if (user.sharingMode !== "private") {
        const response = await axios.post(
          `${backendUrl}/itinerary/getMySharedItineraries`,
          {
            user_id: user_id,
          }
        );
        setItineraries(response.data);
      }
      const postsResponse = await axios.post(
        `${backendUrl}/posts/getUserPosts`,
        {
          user_id: user_id,
        }
      );

      setPosts(postsResponse.data);

      const r = await axios.post(`${backendUrl}/follows/followers`, {
        user_id: user_id,
      });
      setFollowers(r.data);
      console.log(r.data);

      const f = await axios.post(`${backendUrl}/follows/following`, {
        user_id: user_id,
      });
      setFollowing(f.data);

      const follower_id = Cookie.get("user_id");
      const res = await axios.post(`${backendUrl}/follows/isFollowing`, {
        user_id: user_id,
        follower_id: follower_id,
      });

      setIsFollowing(res.data);
    }
    fetch();
  }, []);
  const closeEnlargedPost = () => {
    setEnlargedPostIndex(null);
  };

  return (
    <div className="profile-page">
      <header className="profile-header">
        <div className="profile-pic">
          {profileDetails.imageUrl && (
            <img src={profileDetails.imageUrl} alt="Profile" />
          )}
        </div>
        <div className="profile-info">
          <h1 data-testid="accountName">{profileDetails.username}</h1>
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
          {profileDetails.user_id && (
            <button
              className={`follow-button ${isFollowing ? "unfollow" : "follow"}`}
              onClick={handleFollowButtonClick}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
      </header>

      <section className="saved-itineraries">
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
        <h3 className="section-title">Shared Itineraries</h3>
        <div className="itinerary-cards">
          {itineraries.map((itinerary: any, index: any) => (
            <Link
              key={index}
              href={`/viewItinerary?itineraryName=${itinerary.name}&itineraryId=${itinerary.id}&myItinerary=false&prev=${location.pathname}`}
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
      </section>

      {showFollowers && (
        <div className="popup-overlay" onClick={toggleFollowers}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-bold text-lg">Followers</h3>
            <div className="users-list">
              {followers.map((follower: any, index: any) => (
                <div key={index} className="user-item">
                  <img
                    src={follower?.imageUrl}
                    alt={follower?.username}
                    className="user-pic"
                  />
                  <p>{follower?.username}</p>
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
              {following.map((user: any, index: any) => (
                <div key={index} className="user-item">
                  <img
                    src={user?.imageUrl}
                    alt={user?.username}
                    className="user-pic"
                  />
                  <p>{user?.username}</p>
                </div>
              ))}
            </div>
            <button className="close-button" onClick={toggleFollowing}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Posts */}

      <section className="posts py-6 px-4" style={{ width: "140%" }}>
        <h3 className="text-xl font-bold mb-4">Travel Posts</h3>

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
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
