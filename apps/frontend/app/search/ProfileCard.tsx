"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";

interface Profile {
  name: string;
  username: string;
  id: string;
  imageUrl: string;
}

interface ProfileCardProps {
  profile: Profile;
}
const ProfileCard = ({ profile }: ProfileCardProps) => {
  const router = useRouter();

  const handleViewProfile = () => {
    const user_id = Cookie.get("user_id");
    if (user_id === profile.id) {
      router.push("/account");
    } else {
      router.push(`/profile/${profile.id}`);
    }
  };

  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-lg w-full max-w-sm min-w-[600px] h-[120px] border border-gray-200">
      {/* Profile Image */}
      <img
        src={profile.imageUrl}
        alt={profile.name}
        className="w-16 h-16 rounded-full border-2 border-gray-300 mr-4"
      />
      <div className="flex-1 flex flex-col justify-between">
        {/* Username */}
        <h3 className="text-xl font-bold text-gray-800 truncate">
          @{profile.username}
        </h3>
        {/* Profile Name */}
        <p className="text-sm text-gray-500 truncate">{profile.name}</p>
      </div>
      {/* Action Button */}
      <div className="flex-shrink-0 ml-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={handleViewProfile}
        >
          View
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
