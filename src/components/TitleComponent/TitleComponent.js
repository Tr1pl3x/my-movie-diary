import React from 'react';
import styles from './TitleComponent.module.css';

/**
 * TitleComponent: A functional React component that renders the title of the movie diary.
 * 
 * @param {string} title - The main title to be displayed at the top of the page.
 * 
 * @returns {JSX.Element} A styled header containing the title of the movie diary.
 */
const TitleComponent = ({ toggleAddMovie }) => {
    return (
        <div className={styles.titleContainer}>
            <h1 className={styles.title}>🎬 Pyae Sone's Movie Diary 🎬</h1>
            <button className={styles.addButton} onClick={toggleAddMovie}>
                +
            </button>
        </div>
    );
}

export default TitleComponent;
