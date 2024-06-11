import styles from '../loading.module.css';
import LoadingSkeleton from './loadingSkeleton';
import React from 'react';

export default function Loading() {
    return (
        <>
            <div className={styles.ItineraryItemsCard}>
                <LoadingSkeleton key={0} />
            </div>
        </>

    );
}