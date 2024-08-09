import React from 'react';
import styles from '../loading.module.css';

const Loading = () => {
  return (
    <div className="profile-page">
      <header className="profile-header">
        <div className="profile-pic">
          <div className={`${styles.skeleton} w-24 h-24 rounded-full`}></div>
        </div>
        <div className="profile-info">
          <div className={`${styles.skeleton} ${styles.skeletonHeading} w-1/2`}></div>
          <div className={`${styles.skeleton} h-6 w-1/3`}></div>
          <div className="location mt-4">
            <div className={`${styles.skeleton} h-6 w-1/4`}></div>
          </div>
          <div className="member-since mt-2">
            <div className={`${styles.skeleton} h-6 w-1/3`}></div>
          </div>
        </div>
      </header>
      <section className="saved-itineraries mt-8">
        <div className="profile-stats flex justify-between mb-4">
          <div className="following">
            <div className={`${styles.skeleton} h-6 w-16`}></div>
            <div className={`${styles.skeleton} h-6 w-24 mt-1`}></div>
          </div>
          <div className="followers">
            <div className={`${styles.skeleton} h-6 w-16`}></div>
            <div className={`${styles.skeleton} h-6 w-24 mt-1`}></div>
          </div>
        </div>
        <h3 className={`${styles.skeleton} ${styles.skeletonHeading} w-1/4`}></h3>
        <div className="itinerary-cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="itinerary-card p-4 bg-white shadow rounded-lg">
              <div className={`${styles.skeleton} w-full h-32 sm:h-48 mb-4`}></div>
              <div className={`${styles.skeleton} h-6 mb-2 w-3/4`}></div>
              <div className={`${styles.skeleton} h-6 w-1/2`}></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Loading;
