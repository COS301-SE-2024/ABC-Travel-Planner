"use client";
import React, { useState, useEffect } from 'react';
import { FaBookmark } from 'react-icons/fa';
import { createClient } from '../utils/supabase/client';
import { getCurrentUser } from '../actions/actions';
interface DestinationCardProps {
    destination: any;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
    const [isFavourite, setIsFavourite] = useState(destination.isFavourite);

    const handleFavouriteToggle = () => {
        if (isFavourite) {
            handleUnFavoriteClick();
        } else {
            handleFavoriteClick();
        }
    }
    const handleFavoriteClick = async () => {
        setIsFavourite(true);
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        // const curruser = await getCurrentUser();
        // console.log("This is the one we get from the user " + JSON.stringify(curruser));
        const { data, error } = await supabase.from('favourite_destinations').insert([
            { user_id: `${user?.id}`, destination_object: destination, location_id: destination.location_id, status: true },
        ])
            .select()

    };

    const handleUnFavoriteClick = async () => {
        setIsFavourite(false);
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        const { data, error } = await supabase.from('favourite_destinations').update({ status: false }).eq('location_id', `${destination.location_id}`).eq('user_id', `${user?.id}`);
    };

    const handleMoreInfoClick = () => {
        const modal = document.getElementById(`modal-${destination.location_id}`);
        if (modal) {
            modal.style.display = 'block';
        }
    };

    const handleCloseClick = () => {
        const modal = document.getElementById(`modal-${destination.location_id}`);
        if (modal) {
            modal.style.display = 'none';
        }
    };

    return (
        <>
           
           <div className="card max-w-sm rounded overflow-hidden shadow-lg flex flex-col items-center p-4">
            <img src={destination.image} alt={destination.name} className="image w-full h-48 object-cover mb-4" />
            <p className="text-center text-gray-700 mb-4">{destination.address_obj.address_string}</p>
            <div className="flex justify-between items-center w-full">
                <button onClick={handleMoreInfoClick}  className="review-button">
                More Information
                </button>
                <button onClick={handleFavouriteToggle} className="favoriteButton ml-4">
                {isFavourite ? <FaBookmark style={{ color: 'yellow' }} /> : <FaBookmark />}
                </button>
            </div>
            </div>

            {/* The Modal  code and additional information */}
            <div id={`modal-${destination.location_id}`} className="modal">
                <div className="modal-content">
                    <span className="close" onClick={handleCloseClick}>&times;</span>
                    <img src={destination.image} alt={destination.name} className="modal-image" />
                    <h1 className="title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{destination.name}</h1>
                    <p style={{ marginBottom: '1rem' }}>{destination.description ? destination.description : ""}</p>
                    <p style={{ marginBottom: '1rem' }}>{destination.timezone}</p>
                    <p style={{ marginBottom: '1rem' }}>
                    <span className="font-bold">Location Category:</span> <span>{destination.category.name}</span>
                    </p>
                    <p style={{ marginBottom: '1rem' }}>
                    <span className="font-bold">Location Type:</span> <span>{destination.subcategory[0].name}</span>
                    </p>
                </div>
                </div>

        </>
    );
};

export default DestinationCard;
