import React from 'react';
import styles from '../loading.module.css'; 
const Loading = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-4">Help Centre</h1>

      <div className="rounded-lg shadow-md p-6 mb-6 bg-gray-100 bg-opacity-75" style={{  padding: '20px', width: '100%' }}>
        <h2 className="text-2xl font-bold mb-4 flex items-center">Frequently Asked Questions </h2>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="mb-4">
            <div className={`${styles.skeletonHeading} text-3xl font-bold mb-4 text-gray-800`}></div>
            <div className={`${styles.skeleton} h-6 mb-2`} style={{ width: '70%' }}></div>
            <div className={`${styles.skeleton} h-5 mb-1`} style={{ width: '50%' }}></div>
            <div className={`${styles.skeleton} h-5`} style={{ width: '80%' }}></div>
          </div>
        ))}
      </div>

      <div className="rounded-lg shadow-md p-6 mb-6 bg-gray-100 bg-opacity-75" style={{ padding: '20px' }}>
        <h2 className="text-2xl font-bold mb-4 flex items-center">Contact Us </h2>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="mb-4">
            <div className={`${styles.skeletonHeading} text-3xl font-bold mb-4 text-gray-800`}></div>
            <div className={`${styles.skeleton} h-6 mb-2`} style={{ width: '70%' }}></div>
            <div className={`${styles.skeleton} h-5 mb-1`} style={{ width: '50%' }}></div>
            <div className={`${styles.skeleton} h-5`} style={{ width: '80%' }}></div>
          </div>
        ))}
      </div>

      <div className="rounded-lg shadow-md p-6 mb-6 bg-gray-100 bg-opacity-75" style={{  padding: '20px' }}>
        <h2 className="text-2xl font-bold mb-4 flex items-center">Watch Me! </h2>
        <div className={`${styles.skeletonHeading} text-3xl font-bold mb-4 text-gray-800`}></div>
        <div className={`${styles.skeleton} h-6 mb-2`} style={{ width: '70%' }}></div>
        <div className={`${styles.skeleton} h-5 mb-1`} style={{ width: '50%' }}></div>
        <div className={`${styles.skeleton} h-5`} style={{ width: '80%' }}></div>
      </div>
    </div>
  );
};

export default Loading;
