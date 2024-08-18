import React from 'react';
import styles from './TitleComponent.module.css';

const TitleComponent = ({ toggleAddMovie }) => {
    return (
        <div className={styles.titleContainer}>
            <h1 className={styles.title}>Pyae Sone's Movie Diary 🎬</h1>
            <button className={styles.addButton} onClick={toggleAddMovie}>
                +
            </button>
        </div>
    );
}

export default TitleComponent;
