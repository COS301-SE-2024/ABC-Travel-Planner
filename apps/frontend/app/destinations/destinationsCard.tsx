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
        if(isFavourite) {
            handleUnFavoriteClick();
        }else {
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
                { user_id: `${user?.id}`, destination_object: destination, location_id: destination.location_id, status: true},
            ])
            .select()
        
    };

    const handleUnFavoriteClick = async () => {
        setIsFavourite(false);
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        const { data, error } = await supabase.from('favourite_destinations').update({status: false}).eq('location_id', `${destination.location_id}`).eq('user_id', `${user?.id}`);
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
            <div className="card">
                <img src={destination.image} alt={destination.name} className="image" />
                <p>{destination.address_obj.address_string}</p>
                <button onClick={handleMoreInfoClick} className="moreInfoButton">
                    More Information 
                </button >
                <button onClick={handleFavouriteToggle} className="favoriteButton">
                    {isFavourite ? <FaBookmark style={{ color: 'yellow' }} /> : <FaBookmark />}
                </button>
            </div>
            {/* The Modal  code and additional information */}
            <div id={`modal-${destination.location_id}`} className="modal">
                <div className="modal-content">
                    <h1 className="title" style={{ fontSize: '1.5rem' }}>Additional Information</h1>
                    <span className="close" onClick={handleCloseClick}>&times;</span>
                    <h2>{destination.name}</h2>
                    {/* <img src={destination.image} alt={destination.name} className="modal-image" /> */}
                    <p>{destination.description}</p>
                </div>
            </div>
        </>
    );
};
export default DestinationCard;
