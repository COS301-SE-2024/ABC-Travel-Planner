"use client";
import React, { useState } from 'react';
import BookmarkButton from './bookmarkButton';
import { FaBookmark } from 'react-icons/fa';

interface DestinationCardProps {
    destination: any;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination}) => {
    const [isFavourite, setIsFavourite] = useState(destination.isFavourite);

    const handleFavoriteClick = () => {
        const newStatus = !isFavourite;
        setIsFavourite(newStatus);
    };

    return (
        <div className="card">
            <img src={destination.image} alt={destination.name} className="image" />
            <p>{destination.address_obj.address_string}</p>
            <button onClick={handleFavoriteClick} className="favoriteButton">
                {isFavourite ? <FaBookmark style={{ color: 'yellow' }} /> : <FaBookmark />}
            </button>
        </div>
    );
};

export default DestinationCard;
