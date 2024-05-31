import styles from '../loading.module.css';
import LoadingSkeleton from './loadingSkeleton';
export default function Loading() {
    return (
        <>
            <div className={styles.skeletonHeading}></div>
            <div className='container mx-auto mt-8'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {Array.from({ length: 12 }).map((_, index) => <LoadingSkeleton key={index} />)}
                </div>
            </div>

        </>

    );
}