import React, { useState } from 'react';
import { FaBookmark } from 'react-icons/fa';

interface BookmarkButtonProps {
    isFavorite: boolean;
    onClick: () => void;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ isFavorite, onClick }) => {
    return (
        <button onClick={onClick} className="favoriteButton">
            {isFavorite ? <FaBookmark style={{ color: 'yellow' }} /> : <FaBookmark />}
        </button>
    );
};

export default BookmarkButton;