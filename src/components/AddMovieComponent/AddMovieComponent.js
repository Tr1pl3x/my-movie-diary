import React, { useState } from 'react';
import styles from './AddMovieComponent.module.css';
import config from '../../config';
  


const AddMovieComponent = ({ addMovie }) => {
    const [title, setTitle] = useState('');
    const [watchedDate, setWatchedDate] = useState('');
    const [rating, setRating] = useState('');
    const [notes, setNotes] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const fetchMovieDetails = async (movieTitle) => {
        const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movieTitle)}&api_key=${config.apiKey}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (data.results.length > 0) {
                const movie = data.results[0];
                return {
                    title: movie.title, // Get the title from the API
                    posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                    releaseDate: movie.release_date,
                };
            } else {
                setError('No results found for the movie title.');
                return null;
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            setError('Failed to fetch movie details.');
            return null;
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== config.adminPassword) {  // Compare with the password in config
            setError('Incorrect password');
            return;
        }
    
        const movieDetails = await fetchMovieDetails(title);
        if (!movieDetails) {
            return;
        }
    
        const newMovie = {
            title: movieDetails.title || title, // Use the title from the API
            poster: movieDetails.posterUrl || '', 
            releaseDate: movieDetails.releaseDate || '', 
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
            <h2>What's the latest movie you watched? 👀</h2>
            
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
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
                <button type="submit">Add Movie</button>
            </form>
        </div>
    );
};

export default AddMovieComponent;
