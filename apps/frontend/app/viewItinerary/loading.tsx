
import React from 'react';
import styles from '../loading.module.css';

const loading = () => {
  return (
    <div className="view-itinerary-page">
      <div className={styles.skeletonHeader}>
        <div className={styles.skeletonCircle}></div>
        <div className={styles.skeletonText}></div>
      </div>
      <div className={styles.skeletonSlider}>
        <div className={styles.skeletonImage}></div>
        <div className={styles.skeletonLabel}></div>
      </div>
    </div>
  );
};

export default loading;