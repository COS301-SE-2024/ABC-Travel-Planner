import styles from '../loading.module.css';
export default function Loading() {
    return (
        <div className={`${styles.skeletonContainer}`}>
            <div className={`${styles.skeleton} ${styles.skeletonImage}`}></div>
            <div className={`${styles.skeleton} ${styles.skeletonText}`}></div>
            <div className={`${styles.skeleton} ${styles.skeletonParagraph}`}></div>
            <div className={`${styles.skeleton} ${styles.skeletonParagraph}`}></div>
            <div className={`${styles.skeleton} ${styles.skeletonParagraph}`}></div>
            <div className={`${styles.skeleton} ${styles.skeletonParagraph}`}></div>
            <div className={`${styles.skeleton} ${styles.skeletonParagraph}`}></div>
            <div className={`${styles.skeleton} ${styles.skeletonParagraph}`}></div>
            <div className={`${styles.skeleton} ${styles.skeletonParagraph}`}></div>
            <div className="flex items-center mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className={`${styles.skeleton} ${styles.skeletonStar}`}></div>
                ))}
            </div>
        </div>
    );
}