'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

interface BackButtonProps {
  destination: string;
  label: string;
}

const BackButton: React.FC<BackButtonProps> = ({ destination, label }) => {
  const router = useRouter();
  const { selectedTheme, themeStyles, setTheme } = useTheme();
  const handleBack = () => {
    router.back();
  };

  return (
    <button onClick={handleBack} className="flex items-center hover:text-white mb-4 bg-blue-100 p-2 rounded-md shadow-md hover:bg-blue-200 transition-all" style={{ background: themeStyles.navbarColor}}>
      <FaArrowLeft className="mr-2" />
      {label}
    </button>
  );
};

export default BackButton;
