import React, { useState, useEffect } from 'react';
import TitleComponent from './components/TitleComponent/TitleComponent';
import MovieComponent from './components/MovieComponent/MovieComponent';
import AddMovieComponent from './components/AddMovieComponent/AddMovieComponent';
import IntroComponent from './components/IntroComponent/IntroComponent';
import SortComponent from './components/Sort Component/SortComponent';
import './App.css';

const App = () => {
    const [movies, setMovies] = useState(() => {
        const savedMovies = localStorage.getItem('movies');
        return savedMovies ? JSON.parse(savedMovies) : [];
    });

    const [sortOption, setSortOption] = useState(() => {
        return 'watchedDate'; // Default sort option
    });

    const [showAddMovie, setShowAddMovie] = useState(false);
    const [editMovieIndex, setEditMovieIndex] = useState(null); // New state for editing

    useEffect(() => {
        if (movies.length > 0) {
            handleSort({ target: { value: sortOption } }); // Apply the sorting on initial load
        }
    }, [movies, sortOption]);
    
    const handleSort = (event) => {
        const selectedSortOption = event.target.value;
        setSortOption(selectedSortOption);

        let sortedMovies;

        switch (selectedSortOption) {
            case 'releaseDate':
                sortedMovies = [...movies].sort((b, a) => new Date(a.releaseDate) - new Date(b.releaseDate));
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

    const addMovie = (newMovie) => {
        let updatedMovies;
        if (editMovieIndex !== null) {
            updatedMovies = [...movies];
            updatedMovies[editMovieIndex] = newMovie; // Replace the movie being edited
            setEditMovieIndex(null); // Reset edit state
        } else {
            updatedMovies = [newMovie, ...movies];
        }
        
        // Sort movies by watchedDate in descending order (most recent first)
        updatedMovies.sort((a, b) => new Date(b.watchedDate) - new Date(a.watchedDate));
        
        setMovies(updatedMovies);
        setShowAddMovie(false); // Hide form after adding
    };
    

    const removeMovie = (index) => {
        const updatedMovies = movies.filter((_, i) => i !== index);
        setMovies(updatedMovies);
    };

    const startEditing = (index) => {
        setEditMovieIndex(index); // Set the movie being edited
        setShowAddMovie(true); // Show the form
    };

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
        </div>
    );
};

export default App;
