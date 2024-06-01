import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { createClient } from '../utils/supabase/client';
import { json } from 'stream/consumers';
import { v4 as uuidv4 } from 'uuid';

interface Review {
    name: string;
    text: string;
    rating: number;
}

interface ReviewButtonProps {
    reviews: Review[];
    onAddReview: (review: Review) => void;
}

const ReviewButton: React.FC<ReviewButtonProps> = ({ reviews, onAddReview }) => {
    const [showReviews, setShowReviews] = useState(false);
    const [newReview, setNewReview] = useState('');
    const [reviewerName, setReviewerName] = useState('');
    const [rating, setRating] = useState(0);

    const handleToggleReviews = () => {
        setShowReviews(!showReviews);
    };

    const handleAddReview = async () => {
        console.log("Handle Add Review entered...")
        //Call the backend function for creating a review...
        const location_ids = window.sessionStorage.getItem('Location_ids');

        if (newReview.trim() && reviewerName.trim()) {
            onAddReview({ 
                name: reviewerName, text: newReview, rating
            });
            setNewReview('');
            setReviewerName('');
            setRating(0);

            console.log("Proceeding to create client")

            const supabase = createClient();
            
            // console.log("Client created")
            const { data: { user } } = await supabase.auth.getUser();
            
            console.log("Retrieving user")
            // const curruser = await getCurrentUser();
            // console.log("This is the one we get from the user " + JSON.stringify(curruser));

            const now = new Date();
            const formattedDate = now.toISOString();
            
            console.log("Retrieving user data: " + `${user?.id}`)

            const { data: userData, error: userErr } = await supabase
            .from('Users')
            .select("name, surname")
            .eq('user_id', `${user?.id}`)
            
            console.log(userData)
            
            if (userData != null) {
                const destUUID = uuidv4();
                const reviewUUID = uuidv4();

                const { name, surname } = userData[0];

                const { data: insertData, error: insertError } = await supabase
                .from('reviews')
                .insert([{
                    id: reviewUUID,
                    created_at: formattedDate,
                    destination_id: destUUID, 
                    review_title: "testing_title :)", 
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
                            <p key={index} className="review-item">
                                <strong>{review.name}:</strong> {review.text} ({review.rating} stars)
                            </p>
                        ))}
                    </div>
                    <div className="review-form">
                        <label htmlFor="reviewerName" className="review-label">Your Name:</label>
                        <input 
                            id="reviewerName"
                            type="text" 
                            value={reviewerName} 
                            onChange={(e) => setReviewerName(e.target.value)} 
                            placeholder="Your name" 
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
