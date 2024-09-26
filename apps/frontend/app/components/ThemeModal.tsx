import React from 'react';
import { useTheme } from '../context/ThemeContext';

const themes: { value: 'default' | 'beach' | 'adventure' | 'cultural' | 'nature', name: string }[] = [
  { value: 'default', name: 'Default Theme' },
  { value: 'beach', name: 'Beach Holiday' },
  { value: 'adventure', name: 'Outdoor Adventure' },
  { value: 'cultural', name: 'Cultural Exploration' },
  { value: 'nature', name: 'Nature Escape' }
];

const ThemeModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { selectedTheme, setTheme } = useTheme();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold mb-4">Select Theme</h2>
        <div className="space-y-2">
          {themes.map((themeOption) => (
            <div
              key={themeOption.value}
              className={`p-4 cursor-pointer rounded-lg border-2 ${selectedTheme === themeOption.value ? 'border-blue-500 bg-blue-100' : 'border-gray-300'}`}
              onClick={() => {
                setTheme(themeOption.value); // No need to cast to Theme
                onClose();
              }}
            >
              {themeOption.name}
            </div>
          ))}
        </div>
        <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Close</button>
      </div>
    </div>
  );
};

export default ThemeModal;