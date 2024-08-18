import React from 'react';
import styles from './MovieComponent.module.css';

const MovieComponent = ({ title, poster, releaseDate, watchedDate, rating, notes, onRemove }) => {
    
    const handleRemoveClick = () => {
        const password = prompt('Enter admin password to remove this movie:');
        if (password === '2911') {
            onRemove(); // Call the remove function if the password is correct
        } else {
            alert('Incorrect password. Movie not removed.');
        }
    };

    return (
        <div className={styles.movieCard}>
            <img src={poster} alt={`${title} Poster`} className={styles.poster} />
            <div className={styles.details}>
                <h2>{title}</h2>
                <p>Release Date: {releaseDate}</p>
                <p>Watched Date: {watchedDate}</p>
                <p>Rating: {rating} / 10 ★ </p> 
                <p>Notes: {notes}</p>
            </div>
            <div className={styles.trashIcon} onClick={handleRemoveClick}>
                <img src="assets/bin.png"/>
            </div>
        </div>
    );
}

export default MovieComponent;
