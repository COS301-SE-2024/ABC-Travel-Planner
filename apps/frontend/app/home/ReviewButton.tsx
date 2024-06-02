import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { createClient } from '../utils/supabase/client';
import { json } from 'stream/consumers';
import { v4 as uuidv4 } from 'uuid';

interface Review {
    name: string; //the username
    text: string;
    rating: number;
    title: string; 
}

interface ReviewButtonProps {
    location_id: string;
    reviews: Review[];
    onAddReview: (review: Review) => void;
}

const ReviewButton: React.FC<ReviewButtonProps> = ({ location_id, reviews, onAddReview }) => {
    const [showReviews, setShowReviews] = useState(false);
    const [newReview, setNewReview] = useState('');
    const [title, setTitle] = useState('');
    const [rating, setRating] = useState(0);

    const handleToggleReviews = () => {
        setShowReviews(!showReviews);
    };

    const handleAddReview = async () => {
        if (newReview.trim() && title.trim()) {
            const supabase = createClient();
            
            const { data: { user } } = await supabase.auth.getUser();
            console.log("Retrieving user data: " + `${user?.id}`)

            const { data: userData, error: userErr } = await supabase
            .from('Users')
            .select("name, surname")
            .eq('user_id', `${user?.id}`)
            
            console.log(userData)
            if (userData) {
                //Frontend 
                onAddReview({ name: `${userData[0].name}`, text: newReview, rating, title});  //the username 
                setNewReview('');
                setTitle('');
                setRating(0);
                
                //Backend Insertion
                console.log("Retrieving user")
                const now = new Date();
                const formattedDate = now.toISOString();
                if (userData != null) {
                    const reviewUUID = uuidv4();
    
                    const { name, surname } = userData[0];
    
                    const { data: insertData, error: insertError } = await supabase
                    .from('reviews')
                    .insert([{
                        id: reviewUUID,
                        created_at: formattedDate,
                        destination_id: location_id, 
                        review_title: title, 
                        review_text: newReview, 
                        user_id: `${user?.id}`, 
                        user_name: name,        
                        user_surname: surname,
                        rating: rating
                    }])
                    .select()
    
                    if (insertError) {
                        console.log("Could not insert data:\n" + JSON.stringify(insertError))
                    }
                }
                else {
                    console.log("Review could not be created - user does not exist in database")
                }
            } else {
                console.log("ERR: AddReview - Could not add review (User not found in database)")
            }
        }
    };

    const handleRatingClick = (selectedRating: number) => {
        setRating(selectedRating);
    };

    return (
        <div className="review-container">
            <button onClick={handleToggleReviews} className="review-button">
                {showReviews ? 'Hide Reviews' : 'Show Reviews'}
            </button>
            {showReviews && (
                <div className="reviews">
                    <div className="review-list">
                        <h3 className="review-heading">Reviews:</h3>
                        {reviews.map((review, index) => (
                            <div key={index} className="review-item">
                                <p>
                                    <u>{review.name}</u> ({review.rating} stars)
                                </p>
                                <p><strong>{review.title}</strong></p> {/* Display the title here */}
                                <p>{review.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className="review-form">
                        <label htmlFor="title" className="review-label">Title:</label>
                        <input 
                            id="title"
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            placeholder="Enter title here" 
                            className="review-input"
                        />
                        <label htmlFor="newReview" className="review-label">Your Review:</label>
                        <input 
                            id="newReview"
                            type="text" 
                            value={newReview} 
                            onChange={(e) => setNewReview(e.target.value)} 
                            placeholder="Write your review here" 
                            className="review-input"
                        />
                        <label htmlFor="rating" className="review-label">Rating:</label>
                        <div className="rating-container">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <FaStar
                                    key={star}
                                    onClick={() => handleRatingClick(star)}
                                    className={`w-6 h-6 fill-current ${
                                        star <= rating ? 'text-yellow-500' : 'text-gray-400'
                                    } inline-block cursor-pointer`}
                                />
                            ))}
                        </div>
                        <button onClick={handleAddReview} className="submit-review">Submit</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReviewButton;
