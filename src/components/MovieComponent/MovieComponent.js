// MovieComponent is a functional component that displays a movie card.
// It receives the movie's details (title, poster, releaseDate, watchedDate, rating, notes)
// as props, along with two functions (onRemove and onEdit) to handle movie removal and editing.
import React, { useState } from 'react';
import styles from './MovieComponent.module.css';

const MovieComponent = ({ title, poster, releaseDate, watchedDate, rating, notes, onRemove, onEdit }) => {
    const [showSheet, setShowSheet] = useState(false);

    const handleRemoveClick = () => {
        const password = prompt('Enter admin password to remove this movie:');
        if (password) {
            onRemove(password);
        }
    };

    const handleEditClick = () => {
        setShowSheet(false);
        onEdit();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <div className={styles.movieCard} onClick={() => setShowSheet(true)}>
                <img src={poster} alt={`${title} Poster`} className={styles.poster} />
                <div className={styles.details}>
                    <h2>{title}</h2>
                    <p><b>Release Date</b>: {releaseDate}</p>
                    <p><b>Watched Date</b>: {watchedDate}</p>
                    <p><b>Rating</b>: {rating} / 10 ★ </p>
                    <p><b>Remarks</b>: {notes}</p>
                </div>
                <div className={styles.editIcon} onClick={(e) => { e.stopPropagation(); handleEditClick(); }}>
                    <img src="assets/edit.png" alt="Edit" />
                </div>
                <div className={styles.trashIcon} onClick={(e) => { e.stopPropagation(); handleRemoveClick(); }}>
                    <img src="assets/bin.png" alt="Remove" />
                </div>
            </div>

            {showSheet && (
                <div className={styles.sheetOverlay} onClick={() => setShowSheet(false)}>
                    <div className={styles.bottomSheet} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.sheetHandle} />
                        <button className={styles.sheetClose} onClick={() => setShowSheet(false)}>×</button>
                        <div className={styles.sheetContent}>
                            <img src={poster} alt={`${title} Poster`} className={styles.sheetPoster} />
                            <h2 className={styles.sheetTitle}>{title}</h2>
                            <div className={styles.sheetDetails}>
                                <p><b>Release Date</b>: {releaseDate}</p>
                                <p><b>Watched Date</b>: {watchedDate}</p>
                                <p><b>Rating</b>: {rating} / 10 ★</p>
                                <p><b>Remarks</b>: {notes}</p>
                            </div>
                            <div className={styles.sheetActions}>
                                <button className={styles.sheetEditBtn} onClick={handleEditClick}>Edit</button>
                                <button className={styles.sheetDeleteBtn} onClick={handleRemoveClick}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MovieComponent;
