"use client"
import React from 'react';
import Image from 'next/image';
import { useTheme } from "../context/ThemeContext";
interface ReviewSectionProps {
  data:any;
  };


const ReviewSection: React.FC<ReviewSectionProps> = ({ data }) => {
    const { selectedTheme, setTheme, themeStyles } = useTheme();
  return (
    <div className="reviews-section p-6 rounded-lg shadow-lg" style={{ background: themeStyles.primaryColor}}>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Reviews</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.reviews.map((data: any) => (
          <div key={data.id} className="data-card bg-white border border-gray-200 rounded-lg shadow-md p-4">
            <div className="flex items-center space-x-4 mb-4">
              <Image
                src={data.authorAttribution.photoUri}
                alt="Reviewer Photo"
                width={80}
                height={80}
                className="rounded-full border border-gray-300"
              />
              <div className="data-details flex-1">
                <h2 className="text-xl font-semibold mb-1 text-blue-700">{data.authorAttribution.displayName}</h2>
                <p className="text-gray-600" style={{ color: themeStyles.textColor }} ><strong>Posted:</strong> {data.relativePublishTimeDescription}</p>
                <p className="text-gray-600" style={{ color: themeStyles.textColor }}><strong>Rating:</strong> {data.rating}</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">{data.originalText ? data.originalText.text : ''}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;