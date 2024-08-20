import React, { useState, useEffect } from 'react';
import styles from './AddMovieComponent.module.css';
import config from '../../config';

const AddMovieComponent = ({ addMovie, editMovie, closeForm }) => {
    const [title, setTitle] = useState('');
    const [watchedDate, setWatchedDate] = useState('');
    const [rating, setRating] = useState('');
    const [notes, setNotes] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    /**
     * This useEffect hook runs whenever the `editMovie` prop changes.
     * If `editMovie` is truthy (i.e., a movie is being edited), it pre-fills the form fields with the movie's details.
     * If `editMovie` is falsy (i.e., a new movie is being added), it clears the form fields.
     */
    useEffect(() => {
        if (editMovie) {
            setTitle(editMovie.title);
            setWatchedDate(editMovie.watchedDate);
            setRating(editMovie.rating);
            setNotes(editMovie.notes);
        } else {
            // Clear fields when adding a new movie
            setTitle('');
            setWatchedDate('');
            setRating('');
            setNotes('');
        }
    }, [editMovie]);

    /**
     * handleSubmit is an asynchronous function that handles the form submission.
     * It first checks if the entered password matches the admin password.
     * If the password is correct, it makes a request to The Movie Database (TMDb) API to fetch movie details.
     * If the API returns a valid movie, it creates a new movie object with the fetched details and calls the `addMovie` function to save it.
     * If the API call fails or no movie is found, it sets an error message to be displayed.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== config.adminPassword) {
            setError('Incorrect password');
            return;
        }
    
        // Fetch movie details from API
        const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(title)}&api_key=${config.apiKey}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.results && data.results.length > 0) {
                const movie = data.results[0];
                const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                const releaseDate = movie.release_date;
    
                const newMovie = {
                    title: movie.title, // Use title from the API response
                    poster: posterUrl,
                    releaseDate: releaseDate,
                    watchedDate,
                    rating,
                    notes: notes.trim() === '' ? 'No comments' : notes,
                };
    
                await addMovie(newMovie);
            } else {
                setError('No movie found with that title');
            }
        } catch (error) {
            setError('Failed to fetch movie details');
        }
    };
    
    /**
     * The return statement defines the JSX structure of the component.
     * It includes form fields for entering the movie title, watched date, rating, and remarks.
     * If the form is being used to edit an existing movie, the title field is made read-only.
     * The form also includes a password field to authenticate the user before allowing a movie to be added or updated.
     * If there's an error (e.g., incorrect password or no movie found), it is displayed below the form fields.
     */
    return (
        <div className={styles.addMovieForm}>
            <h2>{editMovie ? 'Edit the details of the selected movie 🛠️' : "What's the latest movie you watched? 👀"}</h2>
            
            <form onSubmit={handleSubmit}>
                <div className={styles.closeButton} onClick={closeForm}>×</div>  {}
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        readOnly={!!editMovie}  
                        className={editMovie ? styles.readOnlyInput : ''}
                        required
                    />
                </div>
                
                <div>
                    <label>Date Watched:</label>
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
