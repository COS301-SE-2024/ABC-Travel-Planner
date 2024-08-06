"use client"

import React, { useState } from 'react';
import Image from 'next/image';

interface PhotoGalleryProps {
  photos: string[];
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
  // Initialize with the first two photos
  const [mainPhotos, setMainPhotos] = useState<string[]>(photos.slice(0, 2));

  const handleSmallPhotoClick = (photo: string) => {
    // Swap the images
    setMainPhotos([mainPhotos[1], photo]);
  };

  return (
    <div className="photos-section grid grid-cols-1 md:grid-cols-4 gap-4 mb-8" style={{ backgroundColor: 'rgba(173, 216, 230, 0.5)' }}>
      <div className="small-photos flex flex-col gap-4">
        {Array.isArray(photos) && photos.length > 0 ? (
          photos.slice(2, 7).map((photo: string) => (
            <div key={photo} onClick={() => handleSmallPhotoClick(photo)} className="cursor-pointer">
              <img src={`${photo}`} alt="Photo" width={200} height={200} className="rounded-lg shadow-lg" />
            </div>
          ))
        ) : (
          <p>No photos available</p>
        )}
      </div>
      <div className="main-photos col-span-2 grid grid-cols-2 md:grid-cols-2 gap-3">
        {mainPhotos.map((photo: string, index: number) => (
          <div key={photo} className="main-photo">
            <Image src={`${photo}`} alt={`Photo ${index + 1}`} width={800} height={800} className="rounded-lg shadow-lg" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;