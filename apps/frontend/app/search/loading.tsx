import styles from '../loading.module.css';
export default function Loading() {
    return (
        <div className="search-container">
            <div className={`${styles.skeleton} ${styles.searchHeading}`}></div>
            <div className={`${styles.skeleton} ${styles.searchSubheading}`}></div>
            <div className="search-button-container">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center mb-2">
                        <div className={`${styles.skeleton} ${styles.searchIcon}`}></div>
                        <div className={`${styles.skeleton} ${styles.searchButton}`}></div>
                    </div>
                ))}
            </div>
            <div className="search-bar-container flex items-center mt-4">
                <div className={`${styles.skeleton} ${styles.searchInput}`}></div>
                <div className={`${styles.skeleton} ${styles.searchSubmitButton}`}></div>
            </div>
        </div>
    );
}