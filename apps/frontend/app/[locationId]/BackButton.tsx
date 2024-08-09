'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

interface BackButtonProps {
  destination: string;
  label: string;
}

const BackButton: React.FC<BackButtonProps> = ({ destination, label }) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button onClick={handleBack} className="flex items-center text-blue-600 hover:text-blue-800 mb-4 bg-blue-100 p-2 rounded-md shadow-md hover:bg-blue-200 transition-all">
      <FaArrowLeft className="mr-2" />
      {label}
    </button>
  );
};

export default BackButton;
