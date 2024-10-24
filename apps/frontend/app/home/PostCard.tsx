import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as filledHeart,
  faShareAlt,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as unfilledHeart } from "@fortawesome/free-regular-svg-icons";
import getUser from "@/libs/actions/getUser";
import PopupMessage from "../utils/PopupMessage";
import axios from "axios";

import Cookie from "js-cookie";
import { useTheme } from "../context/ThemeContext";
interface PostCardProps {
  post_id: string;
  user_id: string;
  image_url?: string;
  post_description: string;
  post_likes: number;
  timestamp: number;
  profileImageUrl?: string;
}

interface Comment {
  comment: string;
  id?: string;
  post_id: string;
  user_id: string;
  timestamp?: number;
  username?: string;
}

interface User {
  memberSince: string;
  user_id: string;
  country: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
}

interface ModalProps {
  isOpen: boolean; // Explicitly define the type as boolean
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-4 rounded shadow-lg">
        {/* <button onClick={onClose} className="text-red-500">
          Close
        </button> */}
        {children}
      </div>
    </div>
  );
};

const PostCard: React.FC<PostCardProps> = ({
  post_id,
  user_id,
  image_url,
  post_description,
  post_likes,
  timestamp,
}) => {
  const [liked, setLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(post_likes);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isFollowing, setIsFollowing] = useState("Follow");
  const [message, setMessage] = useState("");
  const [trigger, setTrigger] = useState(false);
  const [userName, setUserName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectedTheme, themeStyles, setTheme } = useTheme();
  const curr_user = Cookie.get("user_id") ?? "";
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [busyCommenting, setBusyCommenting] = useState(false);
  const router = useRouter();

  const [newComment, setNewComment] = useState<Comment>({
    comment: "",
    id: "",
    post_id: "",
    user_id: curr_user,
    timestamp: 0,
    username: "",
  });

  useEffect(() => {
    const getIsLiked = async () => {
      try {
        const temp = await getUser(curr_user);
        const u = JSON.parse(temp || "{}");
        const t = await getUser(user_id);
        const u2 = JSON.parse(t || "{}");
        setProfilePicUrl(u2.imageUrl);
        setNewComment({
          comment: "",
          id: "",
          post_id: post_id,
          user_id: curr_user,
          timestamp: 0,
          username: u.username,
        });

        const isLikedRes = await fetch(`${backendUrl}/likes/userLikesPost`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: curr_user,
            post_id: post_id,
          }),
        });

        const isLikedText = await isLikedRes.text();

        if (isLikedText == "true") {
          setLiked(true);
        }
      } catch (error) {
        console.log(error);
        throw new Error(
          `Could not get userName of ${user_id}: ${(error as Error).message}`
        );
      }
    };

    getIsLiked();
  }, []);

  useEffect(() => {
    const getUserName = async () => {
      try {
        const userNameRes = await fetch(`${backendUrl}/users/${user_id}`);
        const userNameText: User[] = await userNameRes.json();
        setUserName(userNameText[0].username);
      } catch (error) {
        console.log(error);
        throw new Error(
          `Could not get userName of ${user_id}: ${(error as Error).message}`
        );
      }
    };

    getUserName();
  }, []);

  useEffect(() => {
    const isFollowing = async () => {
      //Make this dynamic...
      const postData = {
        user_id: user_id,
        follower_id: Cookie.get("user_id"),
      };

      const isFollowingRes = await fetch(`${backendUrl}/follows/isFollowing`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      const following = await isFollowingRes.text();
      if (following == "true") {
        setIsFollowing("Following");
      }
    };

    isFollowing();
  }, []);

  const handleViewProfile = () => {
    const curr = user_id;
    const curr_user_id = Cookie.get("user_id");
    if (curr_user_id === curr) {
      router.push("/account");
    } else {
      router.push(`/profile/${curr}`);
    }
  };

  const handleLike = async () => {
    if (liked) {
      try {
        const unLikeRes = await fetch(`${backendUrl}/likes/unlikePost`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            //Maybe an Auth header?
          },
          body: JSON.stringify({
            post_id: post_id,
            user_id: curr_user,
          }),
        });

        if (unLikeRes) {
          const decrementLikeRes = await fetch(
            `${backendUrl}/posts/decrementLikes`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                postId: post_id,
              }),
            }
          );

          if (decrementLikeRes) {
            setNumLikes(numLikes - 1);
          }
        } else {
          setMessage(`Could not like post...`);
          setTrigger(true);
          setTimeout(() => {
            setTrigger(false);
          }, 4000);
          throw new Error("unlikePost endpoint not functioning");
        }
      } catch (error) {
        console.log(error);
        throw new Error(`Could not unlike post: ${(error as Error).message}`);
      }
    } else if (!liked) {
      try {
        const LikeRes = await fetch(`${backendUrl}/likes/likePost`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            //Maybe an Auth header?
          },
          body: JSON.stringify({
            post_id: post_id,
            user_id: curr_user,
          }),
        });

        if (LikeRes) {
          const incrementLikeRes = await fetch(
            `${backendUrl}/posts/incrementLikes`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                postId: post_id,
              }),
            }
          );

          if (incrementLikeRes) {
            setNumLikes(numLikes + 1);
          }
        } else {
          setMessage(`Could not like post...`);
          setTrigger(true);
          setTimeout(() => {
            setTrigger(false);
          }, 4000);
          throw new Error("unlikePost endpoint not functioning");
        }
      } catch (error) {
        console.log(error);
        throw new Error(`Could not like post: ${(error as Error).message}`);
      }
    }
    setLiked(!liked);
  };

  const handleCommentToggle = async () => {
    setShowComments(!showComments);

    //No cache available atm...
    if (!showComments) {
      const commentRes = await fetch(`${backendUrl}/comments/getComments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ post_id }),
      });

      const midData = await commentRes.text();
      let receivedComments: Comment[] = [];


      JSON.parse(midData).map(
        (element: {
          comment: string;
          id: string;
          post_id: string;
          user_id: string;
          timestamp: {
            _seconds: number;
            _nanoseconds: number;
          };
          username: string;
        }) => {
          receivedComments.push({
            comment: element.comment,
            id: element.id,
            user_id: element.user_id,
            post_id: element.post_id,
            timestamp: element.timestamp._seconds,
            username: element.username,
          });
        }
      );
      const r = await axios.post(`${backendUrl}/block/blockedUsers`, {
        user_id: user_id,
      });

      const blockedUsers = r.data;

      const r2 = await axios.post(`${backendUrl}/block/blockedBy`, {
        user_id: user_id,
      });
      const blockedBy = r2.data;

      const filteredData = receivedComments.filter(
        (item) =>
          !blockedUsers.some((user: any) => user.user_id === item.user_id)
      );

      const filteredData2 = filteredData.filter(
        (item) => !blockedBy.some((user: any) => user.user_id === item.user_id)
      );

      const sortedComments = filteredData2.sort((a, b) => (a.timestamp ?? 0) - (b.timestamp ?? 0));

      setComments(sortedComments);
    }
  };

  const handleAddComment = async () => {
    if (newComment) {
      setBusyCommenting(true);
      console.log("handleAddComment (Before): " + busyCommenting)
      const temp = await getUser(curr_user);
      const u = JSON.parse(temp || "{}");

      const dataToAdd = {
        comment: newComment.comment,
        user_id: curr_user,
        post_id: newComment.post_id,
        username: u.username,
      };


      const addCommentRes = await fetch(`${backendUrl}/comments/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToAdd),
      });

      if (addCommentRes.ok) {
        setMessage("Comment posted");
        setTrigger(true);
        setTimeout(() => {
          setTrigger(false);
        }, 4000);
      }

      setComments([...comments, newComment]);

      setNewComment({
        comment: "",
        id: "",
        post_id: "",
        user_id: curr_user,
        timestamp: 0,
        username: u.username,
      });

      setBusyCommenting(false);
      console.log("handleAddComment (Before): " + busyCommenting)
    }
  };

  const getTimeAgo = (timestamp: any) => {
    const now = new Date();
    let postDate: Date;

    if (timestamp.toDate) {
      postDate = timestamp.toDate();
    } else if (typeof timestamp === "number") {
      postDate = new Date(timestamp * 1000);
    } else if (typeof timestamp === "string") {
      postDate = new Date(timestamp);
    } else {
      postDate = timestamp;
    }

    const diffInSeconds = Math.floor(
      (now.getTime() - postDate.getTime()) / 1000
    );


    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days === 1 ? "" : "s"} ago`;
    } else if (diffInSeconds < 2419200) {
      const weeks = Math.floor(diffInSeconds / 604800);
      return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
    } else if (diffInSeconds < 31536000) {
      const months = Math.floor(diffInSeconds / 2592000);
      return `${months} month${months === 1 ? "" : "s"} ago`; // Approximate 30 days per month
    } else {
      return postDate.toLocaleString();
    }
  };

  const followUser = async () => {
    //Change to dynamic...
    const followData = {
      user_id: user_id,
      follower_id: curr_user,
    };

    const response = await fetch(`${backendUrl}/follows/isFollowing`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //Maybe an Auth header?
      },
      body: JSON.stringify(followData),
    });

    const following = await response.text();

    if (following == "true") {
      try {
        const unfollowRes = await fetch(`${backendUrl}/follows/follow`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            //Maybe an Auth header?
          },
          body: JSON.stringify({
            user_id: user_id,
            follower_id: curr_user,
          }),
        });

        //Popup message
        setMessage(`${userName} unfollowed`);
        setTrigger(true);
        setTimeout(() => {
          setTrigger(false);
        }, 5000);
        setIsFollowing("Follow");
      } catch (error) {
        console.log(error);
        throw new Error(
          `Could not unfollow user ${userName}: ${(error as Error).message}`
        );
      }
    } else {
      try {
        const followRes = await fetch(`${backendUrl}/follows/follow`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            //Maybe an Auth header?
          },
          body: JSON.stringify({
            user_id: user_id,
            follower_id: curr_user,
          }),
        });

        //Popup message
        setMessage(`Following ${userName}`);
        setTrigger(true);
        setTimeout(() => {
          setTrigger(false);
        }, 5000);
        setIsFollowing("Following");
      } catch (error) {
        console.log(error);
        throw new Error(
          `Could not follow user ${userName}: ${(error as Error).message}`
        );
      }
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <PopupMessage msg={message} trigger={trigger} />
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-4 flex flex-col items-start space-y-2 text-left">
        <div className="flex items-center w-full space-x-3">
          {/* Displaying the post image */}
          {image_url && (
            <img
              src={profilePicUrl}
              alt="Profile"
              className="profile-image w-12 h-12 rounded-full object-cover"
            />
          )}

          {/* User info and post description */}
          <div className="flex-1">
            <a
              onClick={handleViewProfile}
              className="text-lg font-bold text-black hover:underline"
              style={{ color: themeStyles.textColor }}
            >
              @{userName}
            </a>
            <p
              className="text-sm text-gray-500"
              style={{ color: themeStyles.textColor }}
            >
              {getTimeAgo(timestamp)}
            </p>
            <h2>{post_description}</h2>
          </div>
        </div>

        {/* Follow button */}
        {curr_user !== user_id && (
          <button
            className="bg-blue-200 text-black font-bold py-1 px-3 rounded-full"
            style={{ background: themeStyles.primaryColor }}
            onClick={followUser}
          >
            {isFollowing}
          </button>
        )}

        {/* Image with click handler */}
        {image_url && (
          <img
            src={image_url}
            alt="Post Image"
            className="cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          />
        )}

        {/* Modal for enlarged image */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="relative max-w-screen-sm mx-auto bg-white rounded-lg shadow-lg p-4 mt-4">
            {/* Close cross */}
            <span
              className="absolute top-[-15px] right-2 text-4xl text-gray-600 hover:text-gray-900 cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </span>
            <img
              src={image_url}
              alt="Enlarged Post Image"
              className="max-w-full max-h-[80vh] rounded-lg"
            />
          </div>
        </Modal>

        {/* Like and comment buttons */}
        <div className="flex items-center space-x-4">
          <button
            className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 focus:outline-none"
            onClick={handleLike}
          >
            <FontAwesomeIcon
              icon={liked ? filledHeart : unfilledHeart}
              className={liked ? "text-red-500" : ""}
            />
            <span>{numLikes}</span>
          </button>

          <button
            className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 focus:outline-none"
            onClick={handleCommentToggle}
          >
            <FontAwesomeIcon icon={faComment} />
          </button>
        </div>

        {/* Comments section */}
        {showComments && (
          <div className="w-full mt-4 comments-section">
            <div className="space-y-2">
              {comments.map((comment, index) => (
                <div
                  key={index}
                  className="p-2 bg-blue-100 rounded-md text-gray-800 text-sm comment-box"
                  style={{
                    color: themeStyles.textColor,
                    background: themeStyles.background,
                  }}
                >
                  {curr_user !== comment.user_id ? (
                    <a
                      href={`/profile/${comment.user_id}`}
                      className="font-bold text-black hover:underline"
                      style={{ color: themeStyles.textColor }}
                    >
                      @{comment.username}
                    </a>
                  ) : (
                    <a
                      href={`/account`}
                      className="font-bold text-black hover:underline"
                      style={{ color: themeStyles.textColor }}
                    >
                      @{comment.username}
                    </a>
                  )}
                  : {comment.comment}
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <input
                type="text"
                value={newComment.comment}
                onChange={(e) => {
                  setNewComment({
                    post_id,
                    user_id: Cookie.get("user_id") || "",
                    comment: e.target.value,
                    username: newComment.username,
                  });
                }}
                placeholder="Add a comment..."
                className="flex-grow p-2 border rounded-md"
              />
              <button
                onClick={() => {
                  if (newComment.comment.trim() !== "") {
                    console.log("Onclick: " + busyCommenting)
                    if (!busyCommenting) {
                      handleAddComment();
                    }
                  }
                }}
                className="add-post-button mb-2"
                style={{ background: themeStyles.navbarColor }}
              >
                Add
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default PostCard;
