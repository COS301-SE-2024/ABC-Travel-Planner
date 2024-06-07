import React from 'react';
import styles from '../loading.module.css';

const Loading = () => {
    return (
      <div className="flex flex-col" style={{ paddingBottom: '20px', marginBottom: '20px' }}>
        <div className="w-full mt-8 bg-gray-100 bg-opacity-75" style={{ marginTop: '40px', padding: '20px' }}>
          <div className="flex justify-end mb-4">
            <select className="bg-gray-100 text-white font-bold py-2 px-4 rounded">
            </select>
          </div>
          <div className={`${styles.skeletonHeading} text-3xl font-bold mb-4 text-gray-800`}></div>
          <div className="flex overflow-x-auto pb-4" style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'thin', scrollbarColor: '#888 #f1f1f1' }}>
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="w-64 flex-shrink-0 mr-4" style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', transition: 'transform 0.3s ease' }}>
                <div className={`${styles.skeleton} w-full h-32 sm:h-48`}></div>
                <div className="p-4">
                  <div className={`${styles.skeleton} h-6 mb-2`} style={{ width: '70%' }}></div>
                  <div className={`${styles.skeleton} h-5 mb-1`} style={{ width: '50%' }}></div>
                  <div className={`${styles.skeleton} h-5`} style={{ width: '80%' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full mt-8" style={{ backgroundColor: 'rgba(173, 216, 230, 0.5)', padding: '20px' }}>
          <h2 className="text-3xl font-bold my-4 text-gray-800">More to explore</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2" style={{ maxHeight: '500px', overflowY: 'scroll', scrollbarWidth: 'thin', scrollbarColor: '#888 #f1f1f1' }}>
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="w-64 flex-shrink-0 mr-4" style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', transition: 'transform 0.3s ease' }}>
                <div className={`${styles.skeleton} w-full h-32 sm:h-48`}></div>
                <div className="p-4">
                  <div className={`${styles.skeleton} h-6 mb-2`} style={{ width: '70%' }}></div>
                  <div className={`${styles.skeleton} h-5 mb-1`} style={{ width: '50%' }}></div>
                  <div className={`${styles.skeleton} h-5`} style={{ width: '80%' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default Loading;
  