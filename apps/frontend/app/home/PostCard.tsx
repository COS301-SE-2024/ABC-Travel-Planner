import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShareAlt } from '@fortawesome/free-solid-svg-icons';

interface PostCardProps {
  user: string;
  content: string;
  date: string;
  avatar: string;
}

const PostCard: React.FC<PostCardProps> = ({ user, content, date, avatar }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleShare = () => {
    // Handle share functionality here
    alert('Share functionality coming soon!');
  };

  return (
    <div className="w-full max-w-2xl bg-pink-100 rounded-lg shadow-md p-4 flex flex-col items-start space-y-2 text-left">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-2">
          <img src={avatar} alt={`${user}'s avatar`} className="w-12 h-12 rounded-full" />
          <div>
            <h3 className="text-lg font-bold">{user}</h3>
            <p className="text-sm text-gray-500">{date}</p>
          </div>
        </div>
        <button className="bg-blue-200 text-black font-bold py-1 px-3 rounded-full">Follow</button>
      </div>
      <p className="text-gray-800">{content}</p>
      <div className="flex items-center space-x-4">
        <button
          className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 focus:outline-none"
          onClick={handleLike}
        >
          <FontAwesomeIcon icon={faHeart} />
          <span className="sr-only">{liked ? 'Unlike' : 'Like'}</span>
        </button>
        <button
          className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 focus:outline-none"
          onClick={handleShare}
        >
          <FontAwesomeIcon icon={faShareAlt} />
          <span className="sr-only">Share</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
