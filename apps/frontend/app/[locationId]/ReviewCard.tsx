"use client"
import React, { useState } from 'react';
import ReviewButton from './ReviewButton';
import Image from 'next/image';

const TouristPage: React.FC = async () => {
  const [reviews, setReviews] = useState<any[]>([
    { name: 'John Doe', text: 'Great experience!', rating: 5, title: 'Amazing place' },
    { name: 'Jane Smith', text: 'Not bad', rating: 4, title: 'Good experience' },
  ]);

  // Function to add a review
  const addReview = (review: any) => {
    setReviews([...reviews, review]);
  };

  return (
    <div className="w-full p-4 md:p-8 bg-gray-100">
      {/* Other sections */}
      <div className="reviews-section p-4 bg-white rounded-lg shadow-lg" style={{ backgroundColor: 'rgba(173, 216, 230, 0.5)' }}>
        <h1 className="text-2xl font-bold mb-4">Reviews</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Display reviews */}
          {reviews.map((review: any, index: number) => (
            <div key={index} className="border border-gray-200 p-4 rounded-lg">
              <h2 className="text-xl font-semibold">{review.name}</h2>
              <p className="text-gray-600 mb-2">Rating: {review.rating}/5</p>
              <p><strong>{review.title}</strong></p>
              <p>{review.text}</p>
            </div>
          ))}
        </div>
        {/* Render ReviewButton component */}
        <ReviewButton
          reviews={reviews} // Pass the reviews array
          onAddReview={addReview} // Pass the addReview function
        />
      </div>
    </div>
  );
};

export default TouristPage;
