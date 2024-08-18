import React from 'react';
import styles from './MovieComponent.module.css';

const MovieComponent = ({ title, poster, releaseDate, watchedDate, rating, notes }) => {
    return (
        <div className={styles.movieCard}>
            <img src={poster} alt={`${title} Poster`} className={styles.poster} />
            <div className={styles.details}>
                <h2>{title}</h2>
                <p>Release Date: {releaseDate}</p>
                <p>Watched Date: {watchedDate}</p>
                <p>Rating: {rating} / 10</p> 
                <p>Notes: {notes}</p>
            </div>
        </div>
    );
}

export default MovieComponent;
