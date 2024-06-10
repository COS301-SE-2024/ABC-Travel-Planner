import styles from '../loading.module.css';
import LoadingSkeleton from './loadingSkeleton';
import React from 'react';

export default function Loading() {
    return (
        <>
            <div className={styles.skeletonHeading}></div>
            <div className='cardContainer'>
                {Array.from({ length: 3 }).map((_, index) => <LoadingSkeleton key={index} />)}
            </div>
        </>

    );
}