import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as filledHeart, faShareAlt, faComment } from '@fortawesome/free-solid-svg-icons';
import { faHeart as unfilledHeart } from '@fortawesome/free-regular-svg-icons';
import getUser from "@/libs/actions/getUser";
import PopupMessage from '../utils/PopupMessage';

import Cookie from "js-cookie";

interface PostCardProps {
  post_id: string;
  user_id: string;
  image_url?: string;
  post_description: string;
  post_likes: number;
  timestamp: number;
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
  memberSince: string,
  user_id: string,
  country: string,
  name: string,
  username: string,
  email: string,
  imageUrl: string
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={handleOverlayClick}>
      <div className="bg-white p-4 rounded shadow-lg">
      <button onClick={onClose} className="text-red-500">Close</button>
        {children}
      </div>
    </div>
  );
};

const PostCard: React.FC<PostCardProps> = ({ post_id, user_id, image_url, post_description, post_likes, timestamp }) => {
  const [liked, setLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(post_likes);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isFollowing, setIsFollowing] = useState('Follow');
  const [message, setMessage] = useState('');
  const [trigger, setTrigger] = useState(false);
  const [userName, setUserName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const curr_user = Cookie.get("user_id") ?? ''
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
  console.log(backendUrl)

  const [newComment, setNewComment] = useState<Comment>({
    comment: '',
    id: '',
    post_id: '',
    user_id: curr_user,
    timestamp: 0,
    username: '',
  });

  useEffect(() => {
    const getIsLiked = async () => {
      try {
        const temp = await getUser(curr_user);
        const u = JSON.parse(temp || "{}");
        setNewComment({
          comment: '',
          id: '',
          post_id: post_id,
          user_id: curr_user,
          timestamp: 0,
          username: u.username,
        })
        const isLikedRes = await fetch(`${backendUrl}/likes/userLikesPost`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: curr_user,
            post_id: post_id
          })
        })

        const isLikedText = await isLikedRes.text();

        if (isLikedText == "true") {
          setLiked(true);
        }

      } catch (error) {
        console.log(error)
        throw new Error(`Could not get userName of ${user_id}: ${(error as Error).message}`)
      }
    }

    getIsLiked()
  }, []);

  useEffect(() => {
    const getUserName = async () => {
      try {
        const userNameRes = await fetch(`${backendUrl}/users/${user_id}`)
        const userNameText: User[] = await userNameRes.json();
        setUserName(userNameText[0].username)

      } catch (error) {
        console.log(error)
        throw new Error(`Could not get userName of ${user_id}: ${(error as Error).message}`)
      }
    }

    getUserName();
  }, [])

  useEffect(() => {
    const isFollowing = async () => {
      //Make this dynamic...
      const postData = {
        user_id: user_id,
        follower_id: Cookie.get('user_id')
      }

      const isFollowingRes = await fetch(`${backendUrl}/follows/isFollowing`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

        },
        body: JSON.stringify(postData)
      })
      const following = await isFollowingRes.text()
      if (following == "true") {
        console.log("Currently following user, updating frontend")
        setIsFollowing("Following")
      }
    }

    isFollowing()
  }, [])

  const handleLike = async () => {
    if (liked) {
      try {
        const unLikeRes = await fetch(`${backendUrl}/likes/unlikePost`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            //Maybe an Auth header?
          },
          body: JSON.stringify({
            post_id: post_id,
            user_id: curr_user
          }),
        });

        if (unLikeRes) {
          const decrementLikeRes = await fetch(`${backendUrl}/posts/decrementLikes`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              postId: post_id
            })
          })

          if (decrementLikeRes) {
            setNumLikes(numLikes - 1)
          }
        } else {
          setMessage(`Could not like post...`)
          setTrigger(true);
          setTimeout(() => {
            setTrigger(false);
          }, 4000);
          throw new Error('unlikePost endpoint not functioning')
        }
      } catch (error) {
        console.log(error)
        throw new Error(`Could not unlike post: ${(error as Error).message}`)
      }
    } else if (!liked) {
      try {
        const LikeRes = await fetch(`${backendUrl}/likes/likePost`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            //Maybe an Auth header?
          },
          body: JSON.stringify({
            post_id: post_id,
            user_id: curr_user
          }),
        });

        if (LikeRes) {
          const incrementLikeRes = await fetch(`${backendUrl}/posts/incrementLikes`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              postId: post_id
            })
          })

          if (incrementLikeRes) {
            setNumLikes(numLikes + 1)
          }
        } else {
          setMessage(`Could not like post...`)
          setTrigger(true);
          setTimeout(() => {
            setTrigger(false);
          }, 4000);
          throw new Error('unlikePost endpoint not functioning')
        }
      } catch (error) {
        console.log(error)
        throw new Error(`Could not like post: ${(error as Error).message}`)
      }
    }
    setLiked(!liked)
  }

  const handleCommentToggle = async () => {
    setShowComments(!showComments);

    //No cache available atm...
    if (!showComments) {
      const commentRes = await fetch(`${backendUrl}/comments/getComments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ post_id })
      })

      const midData = await commentRes.text();
      let receivedComments: Comment[] = [];
      console.log(midData)
      JSON.parse(midData).map((element: {
        comment: string;
        id: string;
        post_id: string;
        user_id: string;
        timestamp: {
          _seconds: number,
          _nanoseconds: number
        };
        username: string;
      }) => {
        receivedComments.push({
          comment: element.comment,
          id: element.id,
          user_id: element.user_id,
          post_id: element.post_id,
          timestamp: element.timestamp._seconds,
          username: element.username
        })
      });
      console.log("Received comments: " + JSON.stringify(receivedComments));
      setComments(receivedComments)
    }
  };

  const handleAddComment = async () => {
    console.log("Adding comment...")
    if (newComment) {
      const temp = await getUser(curr_user);
      const u = JSON.parse(temp || "{}");
      console.log(JSON.stringify(u))

      const dataToAdd = {
        comment: newComment.comment,
        user_id: curr_user,
        post_id: newComment.post_id,
        username: u.username,
      }

      console.log("Comment to add: " + JSON.stringify(newComment))

      const addCommentRes = await fetch(`${backendUrl}/comments/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToAdd),
      })

      if (addCommentRes.ok) {
        setMessage('Comment posted')
        setTrigger(true);
        setTimeout(() => {
          setTrigger(false);
        }, 4000);
      }

      setComments([...comments, newComment]);

      setNewComment({
        comment: '',
        id: '',
        post_id: '',
        user_id: curr_user,
        timestamp: 0,
        username: u.username,
      });
    }
  };

  const getTimeAgo = (timestamp: number | string | Date) => {
    const now = new Date();
    const postDate = typeof timestamp === 'number'
        ? new Date(timestamp)
        : new Date(timestamp);

    const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
        return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
        return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    } else if (diffInSeconds < 86400) {
        return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    } else if (diffInSeconds < 604800) {
        return `${Math.floor(diffInSeconds / 86400)} days ago`;
    } else if (diffInSeconds < 2419200) {
        return 'Posted a week ago';
    } else if (diffInSeconds < 31536000) {
        return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
    } else if (diffInSeconds < 31536000000) {
        return `${Math.floor(diffInSeconds / 2592000)} months ago`;
    } else {
        return postDate.toLocaleString(); // Format to local string for actual timestamp
    }
};




  const followUser = async () => {
    //Change to dynamic...
    const followData = {
      user_id: user_id,
      follower_id: curr_user
    }

    const response = await fetch(`${backendUrl}/follows/isFollowing`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //Maybe an Auth header?
      },
      body: JSON.stringify(followData),
    });

    const following = await response.text()

    if (following == "true") {
      try {
        const unfollowRes = await fetch(`${backendUrl}/follows/follow`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            //Maybe an Auth header?
          },
          body: JSON.stringify({
            user_id: user_id,
            follower_id: curr_user
          }),
        });

        //Popup message
        setMessage(`${userName} unfollowed`)
        setTrigger(true);
        setTimeout(() => {
          setTrigger(false);
        }, 5000);
        setIsFollowing("Follow");
      } catch (error) {
        console.log(error)
        throw new Error(`Could not unfollow user ${userName}: ${(error as Error).message}`)
      }

    } else {
      try {
        const followRes = await fetch(`${backendUrl}/follows/follow`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            //Maybe an Auth header?
          },
          body: JSON.stringify({
            user_id: user_id,
            follower_id: curr_user
          }),
        });

        //Popup message
        setMessage(`Following ${userName}`)
        setTrigger(true);
        setTimeout(() => {
          setTrigger(false);
        }, 5000);
        setIsFollowing("Following");

      } catch (error) {
        console.log(error)
        throw new Error(`Could not follow user ${userName}: ${(error as Error).message}`)
      }
    }
  }

  return (
    <div className="flex justify-center items-center w-full">
      <PopupMessage msg={message} trigger={trigger} />
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-4 flex flex-col items-start space-y-2 text-left">
        <div className="flex items-center justify-between w-full">
          {/* User info and post description */}
          <div className="relative">
            <a href={`/user/${user_id}`} className="text-lg font-bold text-black hover:underline">
              @{userName}
            </a>
            <p className="text-sm text-gray-500">{getTimeAgo(timestamp)}</p>
            <h2>{post_description}</h2>
          </div>
          {/* Follow button */}
          {curr_user !== user_id && (
            <button className="bg-blue-200 text-black font-bold py-1 px-3 rounded-full" onClick={followUser}>
              {isFollowing}
            </button>
          )}
        </div>

        {/* Image with click handler */}
        <img
          src={image_url}
          alt='Post Image'
          className="cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        />

        {/* Modal for enlarged image */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <img src={image_url} alt='Enlarged Post Image' className="max-w-full max-h-screen" />
        </Modal>

        {/* Like and comment buttons */}
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 focus:outline-none" onClick={handleLike}>
            <FontAwesomeIcon icon={liked ? filledHeart : unfilledHeart} className={liked ? 'text-red-500' : ''} />
            <span>{numLikes}</span>
          </button>

          <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 focus:outline-none" onClick={handleCommentToggle}>
            <FontAwesomeIcon icon={faComment} />
          </button>
        </div>

        {/* Comments section */}
        {showComments && (
          <div className="w-full mt-4 comments-section">
            <div className="space-y-2">
              {comments.map((comment, index) => (
                <div key={index} className="p-2 bg-blue-100 rounded-md text-gray-800 text-sm comment-box">
                  <a href={`/user/${comment.user_id}`} className="font-bold text-black hover:underline">
                    @{comment.username}
                  </a>: {comment.comment}
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <input
                type="text"
                value={newComment.comment}
                onChange={(e) => setNewComment({
                  post_id,
                  user_id: Cookie.get('user_id') || '',
                  comment: e.target.value,
                  username: newComment.username
                })}
                placeholder="Add a comment..."
                className="flex-grow p-2 border rounded-md"
              />
              <button onClick={handleAddComment} className="add-comment-button">
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