import styles from '../loading.module.css';
import LoadingSkeleton from './loadingSkeleton';
export default function Loading() {
    return (
        <>
            <div className={styles.skeletonHeading}></div>
            <div className='cardContainer'>
                {Array.from({ length: 6 }).map((_, index) => <LoadingSkeleton key={index} />)}
            </div>
        </>

    );
}