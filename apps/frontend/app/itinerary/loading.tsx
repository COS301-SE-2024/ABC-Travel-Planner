import React from 'react';
import styles from '../loading.module.css';
import ItineraryLoadingSkeleton from './loadingSkeleton';

const ItineraryLoading = () => {
    return (
        <>
            <div className={styles.skeletonHeading}></div>
            <div className='container mx-auto mt-8'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {Array.from({ length: 6 }).map((_, index) => (
                        <ItineraryLoadingSkeleton key={index} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default ItineraryLoading;
