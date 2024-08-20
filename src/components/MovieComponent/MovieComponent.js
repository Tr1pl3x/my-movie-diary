// MovieComponent is a functional component that displays a movie card.
// It receives the movie's details (title, poster, releaseDate, watchedDate, rating, notes)
// as props, along with two functions (onRemove and onEdit) to handle movie removal and editing.
import React from 'react';
import styles from './MovieComponent.module.css';
import config from '../../config';

const MovieComponent = ({ title, poster, releaseDate, watchedDate, rating, notes, onRemove, onEdit }) => {

    // handleRemoveClick is called when the user clicks the trash icon.
    // It prompts the user for an admin password and, if correct, calls the onRemove function passed in as a prop.
    const handleRemoveClick = () => {
        const password = prompt('Enter admin password to remove this movie:');
        if (password === config.adminPassword) {
            onRemove(); 
        } else {
            alert('Incorrect password. Movie not removed.');
        }
    };

    // handleEditClick is called when the user clicks the edit icon.
    // It triggers the onEdit function passed in as a prop and scrolls the window to the top of the page.
    const handleEditClick = () => {
        onEdit();
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    };
    
    // The returned JSX structure defines the layout of the movie card,
    // including the movie poster, title, release date, watched date, rating, and notes.
    // It also includes the edit and trash icons, which trigger their respective functions on click.
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
