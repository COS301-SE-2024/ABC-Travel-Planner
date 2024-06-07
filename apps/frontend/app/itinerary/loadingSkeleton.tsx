import React from 'react';
import styles from '../loading.module.css';

const ItineraryLoading = () => {
    return (
        <div className="flex flex-col m-4 items-center">
            <div className="p-8 mt-4 w-full rounded-lg overflow-hidden shadow-xl bg-white">
                <div className="flex justify-between items-center mb-8">
                    <div className={`${styles.skeletonHeading} w-36 h-8`} aria-label="Loading heading"></div>
                    <div className={`${styles.skeletonHeading} w-36 h-8`} aria-label="Loading button"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {/* Itinerary Item Loading Skeleton */}
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="bg-blue-50 rounded-lg shadow-sm animate-pulse" aria-label="Loading itinerary item">
                            <div className="relative w-full h-0 pb-2/3 bg-gray-200 rounded-t-lg" aria-hidden="true"></div>
                            <div className="p-4">
                                <div className={`${styles.skeletonTitle} w-24 h-4`} aria-label="Loading title"></div>
                                <div className={`${styles.skeletonSubtitle} w-20 h-3 mt-2`} aria-label="Loading subtitle"></div>
                                <div className="flex justify-end mt-2 space-x-4">
                                    <div className={`${styles.skeletonButton} w-12 h-3`} aria-label="Loading edit button"></div>
                                    <div className={`${styles.skeletonButton} w-12 h-3`} aria-label="Loading delete button"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ItineraryLoading;