import React from 'react';
import styles from '../loading.module.css';

const LoadingSkeleton = () => {
    return (
        <>
            <div className='max-w-sm rounded overflow-hidden shadow-lg flex flex-col h-full'>
                <div className={`${styles.homeImage} ${styles.skeleton}`}></div>
                <div className={`${styles.homeText} ${styles.skeleton}`}></div>
                <div className={`${styles.homeAddress} ${styles.skeleton}`}></div>
                <div className={`${styles.homeButton} ${styles.skeleton}`}></div>
            </div>
        </>
    );
};

export default LoadingSkeleton;