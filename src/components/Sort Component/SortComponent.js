// SortComponent.js
import React from 'react';
import styles from './SortComponent.module.css';

const SortComponent = ({ onSort, selectedSortOption }) => {
    return (
        <div className={styles.sortContainer}>
            <label htmlFor="sortOptions">Sort by: </label>
            <select id="sortOptions" onChange={onSort}  value={selectedSortOption}>
                <option value="watchedDate">Watched Date</option>
                <option value="alphabetical">Alphabetical</option>
                <option value="rating">Rating</option>
                <option value="releaseDate">Release Date</option>
            </select>
        </div>
    );
};

export default SortComponent;
