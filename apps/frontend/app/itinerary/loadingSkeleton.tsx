import React from 'react';
import styles from '../loading.module.css';

const ItineraryLoadingSkeleton = () => {
    return (
        <div className="flex flex-row items-center justify-between p-4 my-4 bg-blue-50 rounded-lg shadow-sm">
            <div className="flex flex-row items-center">
                <div className={`${styles.itineraryImage} ${styles.skeleton} mr-4`}></div>
                <div className="flex flex-col space-y-2">
                    <div className={`${styles.itineraryTitle} ${styles.skeleton}`}></div>
                    <div className={`${styles.itinerarySubtitle} ${styles.skeleton}`}></div>
                </div>
            </div>
            <div className="flex flex-row items-center space-x-4">
                <div className={`${styles.itineraryButton} ${styles.skeleton}`}></div>
                <div className={`${styles.itineraryButton} ${styles.skeleton}`}></div>
            </div>
        </div>
    );
};

export default ItineraryLoadingSkeleton;
