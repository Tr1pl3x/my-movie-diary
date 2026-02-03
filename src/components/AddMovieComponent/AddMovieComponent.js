import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './AddMovieComponent.module.css';
import config from '../../config'; // For TMDb API key

const AddMovieComponent = ({ addMovie, editMovie, closeForm }) => {
    const [title, setTitle] = useState('');
    const [watchedDate, setWatchedDate] = useState('');
    const [rating, setRating] = useState('');
    const [notes, setNotes] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const debounceRef = useRef(null);
    const suggestionsRef = useRef(null);

    useEffect(() => {
        if (editMovie) {
            setTitle(editMovie.title);
            setWatchedDate(editMovie.watchedDate);
            setRating(editMovie.rating);
            setNotes(editMovie.notes);
        } else {
            setTitle('');
            setWatchedDate('');
            setRating('');
            setNotes('');
            setSelectedMovie(null);
        }
    }, [editMovie]);

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(e.target)) {
                setSuggestions([]);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const searchMovies = useCallback(async (query) => {
        if (query.trim().length < 2) {
            setSuggestions([]);
            return;
        }
        const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&api_key=${config.apiKey}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            setSuggestions(data.results ? data.results.slice(0, 7) : []);
        } catch {
            setSuggestions([]);
        }
    }, []);

    const handleTitleChange = (e) => {
        const value = e.target.value;
        setTitle(value);
        setSelectedMovie(null);

        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => searchMovies(value), 300);
    };

    const handleSelectSuggestion = (movie) => {
        setTitle(movie.title);
        setSelectedMovie(movie);
        setSuggestions([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Use stored movie data if available, otherwise search TMDb
        let movie = selectedMovie;
        if (!movie) {
            const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(title)}&api_key=${config.apiKey}`;
            try {
                const response = await fetch(url);
                const data = await response.json();
                if (data.results && data.results.length > 0) {
                    movie = data.results[0];
                } else {
                    setError('No movie found with that title');
                    return;
                }
            } catch {
                setError('Failed to fetch movie details');
                return;
            }
        }

        const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        const newMovie = {
            ...(editMovie && { movieId: editMovie.movieId }),
            title: movie.title,
            poster: posterUrl,
            releaseDate: movie.release_date,
            watchedDate,
            rating,
            notes: notes.trim() === '' ? 'No comments' : notes,
            adminPassword: password,
        };

        try {
            await addMovie(newMovie);
        } catch (err) {
            if (err.message === 'Unauthorized') {
                setError('Incorrect password');
            } else {
                setError('Failed to save movie');
            }
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
            <h2>{editMovie ? 'Edit the details of the selected movie ' : "What's the latest movie you watched? "}</h2>
            
            <form onSubmit={handleSubmit}>
                <div className={styles.closeButton} onClick={closeForm}>×</div>  {}
                <div className={styles.titleWrapper} ref={suggestionsRef}>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        readOnly={!!editMovie}
                        className={editMovie ? styles.readOnlyInput : ''}
                        autoComplete="off"
                        required
                    />
                    {suggestions.length > 0 && (
                        <ul className={styles.suggestions}>
                            {suggestions.map((movie) => (
                                <li
                                    key={movie.id}
                                    className={styles.suggestionItem}
                                    onMouseDown={() => handleSelectSuggestion(movie)}
                                >
                                    {movie.poster_path && (
                                        <img
                                            src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                                            alt=""
                                            className={styles.suggestionPoster}
                                        />
                                    )}
                                    <div className={styles.suggestionInfo}>
                                        <span className={styles.suggestionTitle}>{movie.title}</span>
                                        {movie.release_date && (
                                            <span className={styles.suggestionYear}>
                                                {movie.release_date.slice(0, 4)}
                                            </span>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
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
