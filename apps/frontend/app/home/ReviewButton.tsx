import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

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

    const handleAddReview = () => {
        //Call the backend function for creating a review...
        if (newReview.trim() && reviewerName.trim()) {
            onAddReview({ name: reviewerName, text: newReview, rating });
            setNewReview('');
            setReviewerName('');
            setRating(0);

            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
        
            // const curruser = await getCurrentUser();
            // console.log("This is the one we get from the user " + JSON.stringify(curruser));
            const { data, error } = await supabase.from('favourite_destinations').insert([
                    { user_id: ${user?.id}, destination_object: destination, location_id: destination.location_id, status: true},
                ])
                .select()
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
