import React, { useState } from 'react';
import styles from './AddMovieComponent.module.css';

const AddMovieComponent = ({ addMovie }) => {
    const [title, setTitle] = useState('');
    const [watchedDate, setWatchedDate] = useState('');
    const [rating, setRating] = useState('');
    const [notes, setNotes] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== '2911') {
            setError('Incorrect password');
            return;
        }
        const newMovie = {
            title,
            poster: '', // Placeholder, can be set later if using an API
            releaseDate: '', // Placeholder, can be set later if using an API
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
            <h2 >What's the latest movie you watched? 👀</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label id>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
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
                    <label>Rating:</label>
                    <input
                        type="number"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        min="0"
                        max="10"
                        required
                    />
                </div>
                <div>
                    <label>Notes:</label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    ></textarea>
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className={styles.error}>{error}</p>}
                <button type="submit">Add Movie</button>
            </form>
        </div>
    );
};

export default AddMovieComponent;
