"use client"

import React from 'react';
import { FaGoogle, FaAtlas } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
interface GoogleDivProps {
    apiKey: string;
    locationLat: string;
    locationLon: string;
}

const GoogleDiv: React.FC<GoogleDivProps> = ({ apiKey, locationLat, locationLon }) => {
    const { selectedTheme, themeStyles, setTheme } = useTheme();

    return (
        <div className="info-section grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="google-street-view p-4 bg-white rounded-lg shadow-lg" style={{ background: themeStyles.primaryColor }}>
                <div className="flex items-center mb-4">
                    <FaGoogle size={22} className="mr-2" />
                    <h1 className="text-3xl font-bold">Google Street View</h1>
                </div>
                <iframe
                    src={`https://www.google.com/maps/embed/v1/streetview?key=${apiKey}&location=${locationLat},${locationLon}`}
                    width="100%"
                    height="400px"
                    allowFullScreen
                    frameBorder="0"
                    title="Google Street View"
                    className="rounded-lg"
                ></iframe>
            </div>

            <div className="google-maps-api p-4 bg-white rounded-lg shadow-lg" style={{ background: themeStyles.primaryColor }}>
                <div className="flex items-center mb-4">
                    <FaAtlas size={22} className="mr-2" />
                    <h1 className="text-3xl font-bold">Google Maps Ariel View</h1>
                </div>
                <iframe
                    src={`https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${locationLat},${locationLon}&zoom=18&maptype=satellite`}
                    width="100%"
                    height="400px"
                    allowFullScreen
                    frameBorder="0"
                    title="Google Maps Ariel View"
                    className="rounded-lg"
                ></iframe>
            </div>
        </div>
    );
};

export default GoogleDiv;