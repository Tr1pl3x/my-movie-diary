import React, { useState, useEffect } from 'react';
import TitleComponent from './components/TitleComponent/TitleComponent';
import MovieComponent from './components/MovieComponent/MovieComponent';
import AddMovieComponent from './components/AddMovieComponent/AddMovieComponent';
import IntroComponent from './components/IntroComponent/IntroComponent';
import SortComponent from './components/SortComponent/SortComponent';
import './App.css';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [sortOption, setSortOption] = useState('watchedDate'); // Default sort option
    const [showAddMovie, setShowAddMovie] = useState(false);
    const [editMovieIndex, setEditMovieIndex] = useState(null); // State for editing

    // Replace the localhost URL with your Render backend URL
    const backendUrl = 'https://backend-my-movie-diary.onrender.com/movies';

    /**
     * Fetch movies from the backend when the component is mounted.
     * The fetched movies are then sorted by the watched date in descending order (most recent first)
     * and stored in the `movies` state.
     * This effect runs only once when the component is first rendered.
     */
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(backendUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setMovies(data.sort((a, b) => new Date(b.watchedDate) - new Date(a.watchedDate)));
            } catch (error) {
                console.error('Failed to fetch movies:', error);
            }
        };
    
        fetchMovies();
    }, []);
    
    /**
     * Handles sorting the movies array based on the selected sorting option.
     * The `sortOption` can be 'releaseDate', 'alphabetical', 'rating', or 'watchedDate'.
     * After sorting, the sorted movies are updated in the `movies` state.
     */
    const handleSort = (event) => {
        const selectedSortOption = event.target.value;
        setSortOption(selectedSortOption);

        let sortedMovies;
        switch (selectedSortOption) {
            case 'releaseDate':
                sortedMovies = [...movies].sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
                break;
            case 'alphabetical':
                sortedMovies = [...movies].sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'rating':
                sortedMovies = [...movies].sort((a, b) => b.rating - a.rating);
                break;
            default:
                sortedMovies = [...movies].sort((a, b) => new Date(b.watchedDate) - new Date(a.watchedDate));
        }

        setMovies(sortedMovies);
    };

    /**
     * Adds a new movie or updates an existing movie by sending a POST request to the backend.
     * If editing, the movie being edited is updated in the `movies` state; otherwise, the new movie is added.
     * The movies list is then re-sorted based on the currently selected sort option.
     * After the operation, the add/edit form is hidden.
     */
    const addMovie = async (newMovie) => {
        try {
            const response = await fetch(backendUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newMovie),
            });
    
            // Check if the response status is not OK (200)
            if (!response.ok) {  
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const addedMovie = await response.json();
    
            let updatedMovies;
            if (editMovieIndex !== null) {
                updatedMovies = [...movies];
                updatedMovies[editMovieIndex] = addedMovie; // Replace the movie being edited
                setEditMovieIndex(null);                    // Reset edit state
            } else {
                updatedMovies = [addedMovie, ...movies];
            }
    
            handleSort({ target: { value: sortOption } }); // Apply sorting based on the selected option
            setMovies(updatedMovies);
            setShowAddMovie(false);                        // Hide form after adding
        } catch (error) {
            console.error('Failed to add movie:', error);  // Log the error
        }
    };
    
    /**
     * Removes a movie from the list by sending a DELETE request to the backend.
     * The movie is identified by its index, and once removed, the `movies` state is updated.
     */
    const removeMovie = async (index) => {
        try {
            const movieId = movies[index].movieId;
            console.log('Deleting movie with ID:', movieId); // Log the movieId
    
            if (!movieId) {
                throw new Error('movieId is undefined');
            }
    
            await fetch(`${backendUrl}/${movieId}`, {
                method: 'DELETE',
            });
    
            const updatedMovies = movies.filter((_, i) => i !== index);
            setMovies(updatedMovies);
        } catch (error) {
            console.error('Failed to remove movie:', error);
        }
    };

    /**
     * Prepares the component for editing a movie by setting the `editMovieIndex` to the index of the movie to edit.
     * The add/edit form is then displayed, allowing the user to make changes.
     */
    const startEditing = (index) => {
        setEditMovieIndex(index); // Set the movie being edited
        setShowAddMovie(true); // Show the form
    };

    /**
     * Closes the add/edit form and resets any editing state.
     * This hides the form and ensures no movie is marked for editing.
     */
    const closeForm = () => {
        setShowAddMovie(false);
        setEditMovieIndex(null); // Reset the edit state
    };

    return (
        <div className="App">
            <TitleComponent toggleAddMovie={() => setShowAddMovie(!showAddMovie)} />
            <div className="content-wrapper">
                <div className="left-side-content">
                    <IntroComponent />
                    <SortComponent
                        onSort={handleSort}
                        selectedSortOption={sortOption}
                    />
                </div>
                <div className="right-side-content">
                    {showAddMovie && (
                        <AddMovieComponent
                            addMovie={addMovie}
                            editMovie={editMovieIndex !== null ? movies[editMovieIndex] : null}
                            closeForm={closeForm}
                        />
                    )}
                    {movies.map((movie, index) => (
                        <MovieComponent
                            key={index}
                            {...movie}
                            onRemove={() => removeMovie(index)}
                            onEdit={() => startEditing(index)}
                        />
                    ))}
                </div>
            </div>
            <div className="fixed-icon">
                <a href="https://tr1pl3x.github.io/personalWebsite1.0/" target="_blank" rel="noopener noreferrer">
                    <img src="assets/github.png" alt="Fixed Icon" />
                </a>
            </div>
        </div>
    );
};

export default App;
