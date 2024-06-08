"use client"
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { createClient } from '../utils/supabase/client';

interface Review {
    name: string; // the username
    text: string;
    rating: number;
    title: string;
}

interface ReviewButtonProps {
    reviews: Review[];
    onAddReview: (review: Review) => void;
}

const ReviewButton: React.FC<ReviewButtonProps> = ({ reviews, onAddReview }) => {
    const [showReviews, setShowReviews] = useState(false);
    const [newReview, setNewReview] = useState('');
    const [title, setTitle] = useState('');
    const [rating, setRating] = useState(0);

    const handleToggleReviews = () => {
        setShowReviews(!showReviews);
    };

    const handleAddReview = () => 
    {
        if (newReview.trim() && title.trim()) {
            // Simulate fetching user data
            const userData = { name: 'John', surname: 'Doe' };

            // Frontend
            onAddReview({ name: `${userData.name}`, text: newReview, rating: rating, title: title });
            setNewReview('');
            setTitle('');
            setRating(0);
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
