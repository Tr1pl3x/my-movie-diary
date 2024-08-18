import React, { useState, useEffect } from 'react';
import styles from './AddMovieComponent.module.css';
import config from '../../config';

const AddMovieComponent = ({ addMovie, editMovie }) => {
    const [title, setTitle] = useState('');
    const [watchedDate, setWatchedDate] = useState('');
    const [rating, setRating] = useState('');
    const [notes, setNotes] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (editMovie) {
            setTitle(editMovie.title);
            setWatchedDate(editMovie.watchedDate);
            setRating(editMovie.rating);
            setNotes(editMovie.notes);
        }
    }, [editMovie]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== config.adminPassword) {
            setError('Incorrect password');
            return;
        }

        const newMovie = {
            title, // Title is not editable, so keep it as it is
            poster: editMovie ? editMovie.poster : '', 
            releaseDate: editMovie ? editMovie.releaseDate : '', 
            watchedDate,
            rating,
            notes: notes.trim() === '' ? 'No comments' : notes,
        };
        addMovie(newMovie);
        setTitle('');
        setWatchedDate('');
        setRating('');
        setNotes('');
        setPassword('');
        setError('');
    };

    return (
        <div className={styles.addMovieForm}>
            <h2>{editMovie ? 'Edit Movie' : "What's the latest movie you watched? 👀"}</h2>
            
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        readOnly
                        className={styles.readOnlyInput}  /* Apply the readOnlyInput style */
                    />
                </div>
                <div>
                    <label>Watched Date:</label>
                    <input
                        type="date"
                        value={watchedDate}
                        onChange={(e) => setWatchedDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Ratings:</label>
                    <input
                        type="number"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        min="0"
                        max="10"
                        step="0.1"
                        required
                    />
                </div>
                <div>
                    <label>Remarks:</label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    ></textarea>
                </div>
                <div>
                    <label>Admin Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className={styles.error}>{error}</p>}
                <button type="submit">{editMovie ? 'Update Movie' : 'Add Movie'}</button>
            </form>
        </div>
    );
};

export default AddMovieComponent;
