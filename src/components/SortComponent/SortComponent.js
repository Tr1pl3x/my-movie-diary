import React from 'react';
import styles from './SortComponent.module.css';

/**
 * SortComponent: A functional React component that renders a dropdown menu for sorting movie items.
 * 
 * @param {function} onSort - A callback function triggered when the user selects a different sorting option.
 * @param {string} selectedSortOption - The currently selected sorting option, used to set the value of the dropdown menu.
 * 
 * @returns {JSX.Element} A dropdown menu allowing the user to select how the movies should be sorted.
 */
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
