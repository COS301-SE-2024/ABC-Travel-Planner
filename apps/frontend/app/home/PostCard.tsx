import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as filledHeart, faShareAlt, faComment } from '@fortawesome/free-solid-svg-icons';
import { faHeart as unfilledHeart } from '@fortawesome/free-regular-svg-icons';
import PopupMessage from '../utils/PopupMessage';
import Cookie from "js-cookie";

interface PostCardProps {
  post_id: string;
  user_id: string;
  image_url?: string;
  post_title: string;
  post_description: string;
  post_likes: number;
  timestamp: number;
}

interface Comment {
  user_id: string;
  comment_string: string;
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

const PostCard: React.FC<PostCardProps> = ({ post_id, user_id, image_url, post_title, post_description, post_likes, timestamp }) => {
  const [liked, setLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(post_likes);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isFollowing, setIsFollowing] = useState('Follow');
  const [message, setMessage] = useState('');
  const [trigger, setTrigger] = useState(false);
  const [userName, setUserName] = useState('');
  
  const curr_user = Cookie.get("user_id") ?? ''

  const [newComment, setNewComment] = useState<Comment>({
    user_id: curr_user,   
    comment_string: ''
  });

  useEffect(() => {
    const getIsLiked = async () => {
      try {
        const isLikedRes = await fetch(`http://localhost:4000/like-endpoint/isLiked`, {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({
            post_id: post_id,
            user_id: curr_user
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
        const userNameRes = await fetch(`http://localhost:4000/users/${user_id}`)
        const userNameText : User[] = await userNameRes.json();
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
        currUser: 'User1',
        otherUser: user_id
      }
      const isFollowingRes = await fetch(`http://localhost:4000/follow-endpoint/isFollowing`, {
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
    // try {
    //   const isLiked = await fetch(`http://localhost:4000/like-endpoint/isLiked/`, {
    //     method: 'POST',
    //     headers: {    
    //       'Content-Type': 'application/json',
    //       //Maybe an Auth header?
    //   },     
    //     body: JSON.stringify({
    //       post_id: post_id,
    //       user_id: curr_user   //Test value
    //     }),
    //   });
  
    //   const isLikedText = await isLiked.text();
    //   console.log(isLikedText)

      // if (isLikedText == "true") {
      if (liked) {
        try {
          const unLikeRes = await fetch(`http://localhost:4000/like-endpoint/unlike`, {
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
          
          setNumLikes(numLikes - 1)
        } catch (error) {
          console.log(error)
          throw new Error(`Could not unlike post: ${(error as Error).message}`)
        }
      } else if (!liked) {
        try {
          const LikeRes = await fetch(`http://localhost:4000/like-endpoint/like`, {
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
  
        setNumLikes(numLikes + 1)
      } catch (error) {
        console.log(error)
        throw new Error(`Could not like post: ${(error as Error).message}`)
      }
    } 
    
    setLiked(!liked)
    
  // } catch (error) {
  //   console.log(error)
  //   throw new Error(`Could not check if post ${post_id} is liked: ${(error as Error).message}`)
  // }
}

  const handleShare = () => {
    alert('Share functionality coming soon!');
  };

  const handleCommentToggle = async () => {
    setShowComments(!showComments);

    //No cache available atm...
    if (!showComments) {
      const commentRes = await fetch(`http://localhost:4000/comments/${post_id}`)
      const midData = await commentRes.text();
      let receivedComments: Comment[] = [];

      JSON.parse(midData).map((element: { comment_string: string; user_id: string; }) => {
        receivedComments.push({
          comment_string: element.comment_string,
          user_id: element.user_id
        })
      });

      setComments(receivedComments)
    }
  };

  const handleAddComment = async () => {
      if (newComment) {
        const dataToAdd = {
          data: {
            ...newComment
          },
          post_id: post_id
        }

        console.log("Comment to add: " + newComment)

        const addCommentRes = await fetch(`http://localhost:4000/comments/post/home`, {
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

        //Remember to set the user_id to current user...
        setNewComment({
          user_id: curr_user,
          comment_string: ''
        });
      }
  };

  const followUser = async () => {
    //Change to dynamic...
    const followData = {
      currUser: curr_user,
      otherUser: user_id
    }
    
    const response = await fetch(`http://localhost:4000/follow-endpoint/isFollowing`, {
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
        const unfollowRes = await fetch(`http://localhost:4000/follow-endpoint/unfollow`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            //Maybe an Auth header?
        },
          body: JSON.stringify({
            currUser: curr_user,
            userToUnfollow: user_id
          }),
        });
  
        //Popup message
        setMessage(`${userName} unfollowed`)
        setTrigger(true);
        setTimeout(() => {
          setTrigger(false);
        }, 4000);
        setIsFollowing("Follow");
      } catch (error) {
        console.log(error)
        throw new Error(`Could not unfollow user ${userName}: ${(error as Error).message}`)
      }
  
    } else {
      try {
        const followRes = await fetch(`http://localhost:4000/follow-endpoint/follow`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            //Maybe an Auth header?
        },
          body: JSON.stringify({
            currUser: curr_user,
            userToFollow: user_id
          }),
        });
  
        //Popup message
        setMessage(`Following ${userName}`)
        setTrigger(true);
        setTimeout(() => {
          setTrigger(false);
        }, 4000);
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
      <div className="w-full justify-center w-full max-w-2xl bg-pink-100 rounded-lg shadow-md p-4 flex flex-col items-start space-y-2 text-left">
        <div className="flex items-center justify-between w-full">
          <div>
            <h3 className="text-lg font-bold">{userName}: {post_title}</h3>
            <p className="text-sm text-gray-500">{new Date(timestamp * 1000).toLocaleDateString()}</p>
          </div>
          {/* Check to see if user is following the currPost's user*/}
          <button 
            className="bg-blue-200 text-black font-bold py-1 px-3 rounded-full"
            onClick={followUser}>{isFollowing}
          </button>
        </div>
        <img src={image_url} alt='heloooooo'></img>
        <p className="text-gray-800">{post_description}</p>
        <div className="flex items-center space-x-4">
          <button
            className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 focus:outline-none"
            onClick={handleLike}
          >
            <FontAwesomeIcon icon={liked ? filledHeart : unfilledHeart} className={liked ? 'text-red-500' : ''} />
            <span>{numLikes}</span>
          </button>
          <button
            className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 focus:outline-none"
            onClick={handleShare}
          >
            <FontAwesomeIcon icon={faShareAlt} />
          </button>
          <button
            className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 focus:outline-none"
            onClick={handleCommentToggle}
          >
            <FontAwesomeIcon icon={faComment} />
          </button>
        </div>

        {showComments && (
          <div className="w-full mt-4">
            <div className="space-y-2">
              {comments.map((comment, index) => (
                <div key={index} className="p-2 bg-blue-100 rounded-md text-gray-800 text-sm">
                  {/* Remember to change to actual username of currUser... */}
                  {comment.user_id ?? 'User1'}: {comment.comment_string} 
                </div>
              ))}
            </div>
              {/* Remember to change to actual username of currUser... */}
            <div className="mt-4 flex items-center space-x-2">
              <input
                type="text" 
                value={newComment.comment_string}
                onChange={(e) => setNewComment({user_id: 'User1', comment_string: e.target.value })}
                placeholder="Add a comment..."
                className="flex-grow p-2 border rounded-md"
              />
              <button
                onClick={handleAddComment}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
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
