import React from 'react';
import styles from '../loading.module.css';

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className={styles.filterTitle}></h1>
      {[...Array(5)].map((_, index) => (
        <div key={index} className={styles.filterCard}>
          <div className={`${styles.filterImage} ${styles.skeleton}`}></div>
          <div className={`${styles.filterContent} ${styles.skeleton}`}>
            <div className={`${styles.filterHeader} ${styles.skeleton}`}></div>
            <div className={`${styles.filterText} ${styles.skeleton}`}></div>
            <div className={`${styles.filterText} ${styles.skeleton}`}></div>
            <div className={`${styles.filterText} ${styles.skeleton}`}></div>
            <div className={`${styles.filterFooter} ${styles.skeleton}`}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loading;
