"use client"

import React from 'react';
import {FaHome, FaGlobe, FaPhone, FaStar, FaUsers, FaInfoCircle } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
interface SummaryDivProps {
    data: any;
}

const SummaryDiv: React.FC<SummaryDivProps> = ({ data }) => {
    const { selectedTheme, themeStyles, setTheme } = useTheme();
    const starRating = Array.from({ length: Math.floor(data.rating) }, (_, i) => i);
    
    return (
        <div className="attractions-section bg-blue-200 rounded-lg shadow-lg mb-8 p-6 flex" style={{ background: themeStyles.primaryColor}}>
            {/* <!-- Left Side: Name and Summary --> */}
            <div className="left-side bg-white rounded-lg shadow-md p-6 flex-1">
                <h1 className="text-3xl font-bold mb-4 text-gray-800" style={{ color: themeStyles.textColor }}>Need more info ?</h1>
                <div className="flex items-center text-gray-600" style={{ color: themeStyles.textColor }}>
                    <FaInfoCircle className="mr-2 text-3xl text-gray-600" />
                    <span><strong>Summary:</strong> {data.editorialSummary}</span>
                </div>
            </div>

            {/* <!-- Right Side: Additional Info --> */}
            <div className="right-side bg-white rounded-lg shadow-md p-6 ml-6 flex-1">
                <div className="info-details space-y-4">
                    <div className="flex items-center text-gray-600" style={{ color: themeStyles.textColor }}>
                        <FaHome className="mr-2 text-gray-600" />
                        <span><strong>Address:</strong> {data.formattedAddress}</span>
                    </div>
                    <div className="flex items-center text-gray-600" style={{ color: themeStyles.textColor }}>
                        <FaGlobe className="mr-2 text-gray-600" />
                        <span><strong>Website:</strong> <a href={data.websiteUri} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{data.websiteUri}</a></span>
                    </div>
                    <div className="flex items-center text-gray-600" style={{ color: themeStyles.textColor }}>
                        <FaPhone className="mr-2 text-gray-600" />
                        <span><strong>Int Phone:</strong> {data.internationalPhoneNumber}</span>
                    </div>
                    <div className="flex items-center text-gray-600" style={{ color: themeStyles.textColor }}>
                        <span className="flex items-center"><strong>Rating:</strong>
                            {starRating.map((_, index) => (
                                <FaStar key={index} className="mr-1 text-yellow-500" />
                            ))}
                        </span>
                    </div>
                    <div className="flex items-center text-gray-600" style={{ color: themeStyles.textColor }}>
                        <FaUsers className="mr-2 text-gray-600" />
                        <span><strong>User rating count:</strong> {data.userRatingCount}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SummaryDiv;