import React from 'react';
import styles from '../loading.module.css';

const LoadingSkeleton = () => {
    return (
        <>
            <div className={`card ${styles.borderless}`}>
                <div className={`${styles.image} ${styles.skeleton}`}></div>
                <div className={`${styles.text} ${styles.skeleton}`}></div>
                <div className={`${styles.button} ${styles.skeleton}`}></div>
            </div>
        </>
    );
};

export default LoadingSkeleton;