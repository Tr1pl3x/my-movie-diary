import React from 'react';
import styles from './MovieComponent.module.css';
import config from '../../config';

const MovieComponent = ({ title, poster, releaseDate, watchedDate, rating, notes, onRemove, onEdit }) => {

    const handleRemoveClick = () => {
        const password = prompt('Enter admin password to remove this movie:');
        if (password === config.adminPassword) {
            onRemove(); 
        } else {
            alert('Incorrect password. Movie not removed.');
        }
    };

    const handleEditClick = () => {
        onEdit();
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    };
    

    return (
        <div className={styles.movieCard}>
            <img src={poster} alt={`${title} Poster`} className={styles.poster} />
            <div className={styles.details}>
                <h2>{title}</h2>
                <p><b>Release Date</b>: {releaseDate}</p>
                <p><b>Watched Date</b>: {watchedDate}</p>
                <p><b>Rating</b>: {rating} / 10 ★ </p> 
                <p><b>Remarks</b>: {notes}</p>
            </div>
            <div className={styles.editIcon} onClick={handleEditClick}>
                <img src="assets/edit.png" alt="Edit" />
            </div>
            <div className={styles.trashIcon} onClick={handleRemoveClick}>
                <img src="assets/bin.png" alt="Remove" />
            </div>
        </div>
    );
};

export default MovieComponent;
