import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as filledHeart,faShareAlt  } from '@fortawesome/free-solid-svg-icons';
import { faHeart as unfilledHeart} from '@fortawesome/free-regular-svg-icons';

interface PostCardProps {
  post_title: string;
  post_description: string;
  post_likes: number;
  timestamp: number;
}

const PostCard: React.FC<PostCardProps> = ({ post_title, post_description, post_likes, timestamp }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleShare = () => {
    alert('Share functionality coming soon!');
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-96 bg-pink-100 rounded-lg shadow-md p-4 flex flex-col items-start space-y-2 text-left">
        <div className="flex items-center justify-between w-full">
          <div>
            <h3 className="text-lg font-bold">{post_title}</h3>
            <p className="text-sm text-gray-500">{new Date(timestamp * 1000).toLocaleDateString()}</p>
          </div>
          <button className="bg-blue-200 text-black font-bold py-1 px-3 rounded-full">Follow</button>
        </div>
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
        </div>
      </div>
    </div>
  );
};

export default PostCard;