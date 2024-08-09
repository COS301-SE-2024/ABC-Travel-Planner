
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

const BackButton: React.FC = () => {
  const router = useRouter();

  const handleBack = () => {
    router.push('/search'); // Navigate to the search page
  };

  return (
    <button onClick={handleBack} className="flex items-center text-blue-600 hover:text-blue-800 mb-4">
      <FaArrowLeft className="mr-2" />
      Back to Search
    </button>
  );
};

export default BackButton;
