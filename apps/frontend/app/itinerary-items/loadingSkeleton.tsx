import React from 'react';
import styles from '../loading.module.css';

const LoadingSkeleton = () => {
    return (
        <>
            <div className={`${styles.ItineraryItemsCard}`}>
                <div className={`${styles.skeletonHeading} ${styles.formHeading}`}></div>
                <div className={`${styles.image} ${styles.skeleton}`}></div>
            </div>
        </>
    );
};

export default LoadingSkeleton;