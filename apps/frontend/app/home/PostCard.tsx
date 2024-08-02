import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as filledHeart, faShareAlt, faComment } from '@fortawesome/free-solid-svg-icons';
import { faHeart as unfilledHeart } from '@fortawesome/free-regular-svg-icons';

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

const PostCard: React.FC<PostCardProps> = ({ post_id, user_id, image_url, post_title, post_description, post_likes, timestamp }) => {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isFollowing, setIsFollowing] = useState('Follow');

  const [newComment, setNewComment] = useState<Comment>({
    user_id: 'User1',   //Remember to set to actual user...
    comment_string: ''
  });

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleShare = () => {
    alert('Share functionality coming soon!');
  };

  const handleCommentToggle = async () => {
    setShowComments(!showComments);
    
    //No cache available atm...
    if (!showComments) {
      const commentRes = await fetch(`http://localhost:4000/comments/${post_id}`)
      // console.log(await commentRes.text());

      const midData = await commentRes.text();
      let receivedComments: Comment[] = [];

      JSON.parse(midData).map((element: { comment_string: string; user_id: string; }) => {
        receivedComments.push({
          comment_string: element.comment_string,
          user_id: element.user_id
        })
      });

      setComments(receivedComments)
      // handleAddComment();
    }
  };

  const handleAddComment = async () => {
      //Add new comment to the backend...
      
      //Add to db...
      if (newComment) {
        //Testing data
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
          //Do something
          console.log("Comment added :)")
        }
        
        setComments([...comments, newComment]);

        //Remember to set the user_id to current user...
        setNewComment({
          user_id: 'User1',
          comment_string: ''
        });
      }
  };

  const followUser = async () => {
    //Check if already following... 
    setIsFollowing("Follow")

    //Change to dynamic...
    const followData = {
      curr_user: 'User1',
      other_user: user_id
    }
    
    const response = await fetch(`http://localhost:4000/follow-endpoint/isFollowing`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers here if needed
      },
      body: JSON.stringify(followData), // Convert the data to JSON
    });

    if (response) {
      //Make call to unfollow
      setIsFollowing("Follow");
    } else {
      //Make call to follow
      setIsFollowing("Following");
    }
  }

  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-full justify-center w-full max-w-lg bg-pink-100 rounded-lg shadow-md p-4 flex flex-col items-start space-y-2 text-left">
        <div className="flex items-center justify-between w-full">
          <div>
            <h3 className="text-lg font-bold">{post_title}</h3>
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
            <span>{post_likes + (liked ? 1 : 0)}</span>
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
