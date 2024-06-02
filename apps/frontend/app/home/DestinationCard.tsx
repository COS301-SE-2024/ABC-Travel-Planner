"use client";
import React, { useEffect, useState } from 'react';
import ReviewButton from './ReviewButton';
import Link from 'next/link';

interface DestinationCardProps {
  destination: any;
  review: any;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination, review }) => {

  const [reviews, setReviews] = useState(destination.reviews || []);
  const [isSet, setIsSet] = useState(false)

  interface apiData {
      user_name: string;
      review_text: string;
      rating: number;
      title: string;
  }

  interface newData {
      name: string;
      text: string;
      rating: number;
      title: string;
  }

  useEffect(() => {
      const updateReviews = () => {
          if (!isSet) {
              setIsSet(true)
          }
          else  {
          //   console.log("Review already set :)")
          if ((review)) {
              console.log("Curr Review Data: " + JSON.stringify(review))
              console.log("REVIEW VALUE: " + review.value)
              if (review.value) {
                  const parsedValue = JSON.parse(review.value)

                  if (Array.isArray(parsedValue)) {
                      const transformedReviews : newData[] = parsedValue.map((item: apiData) => ({
                              name: item.user_name,
                              text: item.review_text,
                              rating: item.rating,
                              title: item.title
                          }));
                          
                      setReviews((prevReviews: any) => [...prevReviews, ...transformedReviews]);
                      setIsSet(true);
                      // console.log(review.user_name)
                      // console.log(review.review_text)
                      // console.log(review.rating)
                  } else console.log("REVIEW VALUE NOT ARRAY - TYPE: " + typeof parsedValue)
              }
          }
          else console.log("REVIEW IS NOT ARRAY..." + JSON.stringify(review))
          }
      }

      updateReviews();
  }, [isSet]);


    const handleAddReview = (review: { name: string; text: string }) => {
        setReviews([...reviews, review]);
    };

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg flex flex-col h-full">
          <Link href={`/${destination.location_id}`} className="flex-1 flex flex-col h-full no-underline">
            <img src={destination.image} className="w-full h-48 object-cover" alt={destination.name} />
            <div className="flex-1 px-6 py-4 flex flex-col justify-between" style={{ minHeight: '200px' }}>
              <div>
                <div className="font-bold text-xl mb-2">{destination.name}</div>
                <div className="flex justify-center items-center mb-2">
                  {Array.from({ length: destination.rating }, (_, i) => (
                    <svg key={i} className="w-6 h-6 fill-current text-yellow-500 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M12 2c-.3 0-.6.1-.8.4l-4.2 6.4-6.3.9c-.4.1-.6.5-.5.9.1.3.4.6.8.6h7.2l2.6 6.8c.1.2.3.3.5.3s.4-.1.5-.3l2.6-6.8h7.2c.4 0 .7-.3.8-.6.1-.4-.1-.8-.5-.9l-6.3-.9-4.2-6.4c-.2-.4-.5-.5-.8-.5z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 text-base">{destination.address_obj.address_string}</p>
              </div>
            </div>
          </Link>
          <div className="flex justify-center" style={{ marginBottom: '10px' }}>
            <ReviewButton location_id={destination.location_id} reviews={reviews} onAddReview={handleAddReview} />
          </div>
        </div>
      );
      
    
    
};

export default DestinationCard;





