"use client";
import React, { useState } from 'react';
import { FaBookmark } from 'react-icons/fa';
import { createClient } from '../utils/supabase/client';
interface DestinationCardProps {
    destination: any;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
    const [isFavourite, setIsFavourite] = useState(destination.isFavourite);

    const handleFavoriteClick = async () => {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        const { data, error } = await supabase.from('favourite_destinations').insert([
                { some_column: '', other_column: 'otherValue' },
            ])
            .select()
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
