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
  profileImageUrl?: string; // Add profileImageUrl to props
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

const PostCard: React.FC<PostCardProps> = ({ post_id, user_id, image_url, post_description, post_likes, timestamp, profileImageUrl }) => {
  const [liked, setLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(post_likes);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isFollowing, setIsFollowing] = useState('Follow');
  const [message, setMessage] = useState('');
  const [trigger, setTrigger] = useState(false);
  const [userName, setUserName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const curr_user = Cookie.get("user_id") ?? '';
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

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
        });
        const isLikedRes = await fetch(`${backendUrl}/likes/userLikesPost`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: curr_user,
            post_id: post_id
          })
        });

        const isLikedText = await isLikedRes.text();

        if (isLikedText === "true") {
          setLiked(true);
        }

      } catch (error) {
        console.log(error);
        throw new Error(`Could not get userName of ${user_id}: ${(error as Error).message}`);
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
        throw new Error(`Could not get userName of ${user_id}: ${(error as Error).message}`);
      }
    };

    getUserName();
  }, []);

  useEffect(() => {
    const isFollowing = async () => {
      const postData = {
        user_id: user_id,
        follower_id: Cookie.get('user_id')
      };

      const isFollowingRes = await fetch(`${backendUrl}/follows/isFollowing`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)
      });
      const following = await isFollowingRes.text();
      if (following === "true") {
        setIsFollowing("Following");
      }
    };

    isFollowing();
  }, []);

  const handleLike = async () => {
    if (liked) {
      try {
        const unLikeRes = await fetch(`${backendUrl}/likes/unlikePost`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
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
          });

          if (decrementLikeRes) {
            setNumLikes(numLikes - 1);
          }
        } else {
          setMessage(`Could not like post...`);
          setTrigger(true);
          setTimeout(() => {
            setTrigger(false);
          }, 4000);
          throw new Error('unlikePost endpoint not functioning');
        }
      } catch (error) {
        console.log(error);
        throw new Error(`Could not unlike post: ${(error as Error).message}`);
      }
    } else {
      try {
        const LikeRes = await fetch(`${backendUrl}/likes/likePost`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
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
          });

          if (incrementLikeRes) {
            setNumLikes(numLikes + 1);
          }
        } else {
          setMessage(`Could not like post...`);
          setTrigger(true);
          setTimeout(() => {
            setTrigger(false);
          }, 4000);
          throw new Error('likePost endpoint not functioning');
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

    if (!showComments) {
      const commentRes = await fetch(`${backendUrl}/comments/getComments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ post_id })
      });

      const midData = await commentRes.text();
      let receivedComments: Comment[] = [];
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
        });
      });
      setComments(receivedComments);
    }
  };

  const handleAddComment = async () => {
    if (newComment) {
      const temp = await getUser(curr_user);
      const u = JSON.parse(temp || "{}");

      const dataToAdd = {
        comment: newComment.comment,
        user_id: curr_user,
        post_id: newComment.post_id,
        username: u.username,
      };

      const addCommentRes = await fetch(`${backendUrl}/comments/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToAdd),
      });

      if (addCommentRes.ok) {
        setMessage('Comment posted');
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
        username: '',
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 my-4">
      <PopupMessage msg={message} trigger={trigger} />
      <div className="flex items-center">
        {profileImageUrl && (
          <img
            src={profileImageUrl}
            alt="User profile"
            className="w-10 h-10 rounded-full mr-2" // Adjust size as needed
          />
        )}
        <h4 className="font-semibold">{userName}</h4>
        <span className="text-gray-500 text-sm ml-2">{new Date(timestamp * 1000).toLocaleString()}</span>
      </div>
      {image_url && (
        <img
          src={image_url}
          alt="Post"
          className="w-full h-auto rounded-lg mt-2"
          onClick={() => setIsModalOpen(true)}
        />
      )}
      <div className="flex justify-between items-center mt-2">
        <div>
          <button onClick={handleLike} className="flex items-center">
            <FontAwesomeIcon icon={liked ? filledHeart : unfilledHeart} className="text-red-500 mr-2" />
            <span>{numLikes}</span>
          </button>
          <button onClick={handleCommentToggle} className="flex items-center ml-4">
            <FontAwesomeIcon icon={faComment} className="mr-2" />
            <span>{comments.length} Comments</span>
          </button>
          <button className="flex items-center ml-4">
            <FontAwesomeIcon icon={faShareAlt} className="mr-2" />
            <span>Share</span>
          </button>
        </div>
        <button className="text-blue-500">{isFollowing}</button>
      </div>
      {showComments && (
        <div className="mt-4">
          <div>
            {comments.map((comment) => (
              <div key={comment.id} className="flex items-center my-2">
                <span className="font-semibold">{comment.username}:</span>
                <span className="ml-2">{comment.comment}</span>
              </div>
            ))}
          </div>
          <input
            type="text"
            value={newComment.comment}
            onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
            placeholder="Add a comment..."
            className="border p-2 w-full rounded mt-2"
          />
          <button onClick={handleAddComment} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Post</button>
        </div>
      )}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <img src={image_url} alt="Post" className="w-full h-auto" />
        </Modal>
      )}
    </div>
  );
};

export default PostCard;
