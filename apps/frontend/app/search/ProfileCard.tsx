"use client";
import React from 'react';

const ProfileCard = ({ profile }: { profile: { id: number, name: string, imageUrl: string } }) => {
    return (
        <div className="flex items-center p-4 bg-white rounded-lg shadow-lg w-full max-w-sm min-w-[600px] h-[120px] border border-gray-200">
            {/* Profile Image */}
            <img
                src={profile.imageUrl}
                alt={profile.name}
                className="w-16 h-16 rounded-full border-2 border-gray-300 mr-4"
            />
            <div className="flex-1 flex flex-col justify-between">
                {/* Profile Name */}
                <h3 className="text-lg font-semibold text-gray-900 truncate">{profile.name}</h3>
            </div>
            {/* Action Button */}
            <div className="flex-shrink-0 ml-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    View
                </button>
            </div>
        </div>
    );
};

export default ProfileCard;
