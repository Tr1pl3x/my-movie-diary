import React, { useState } from 'react';
import TitleComponent from './components/TitleComponent/TitleComponent';
import MovieComponent from './components/MovieComponent/MovieComponent';
import AddMovieComponent from './components/AddMovieComponent/AddMovieComponent';
import './App.css';

const App = () => {
    const [movies, setMovies] = useState([
        {
            title: '500 Days of Summer',
            poster: 'https://m.media-amazon.com/images/M/MV5BMTk5MjM4OTU1OV5BMl5BanBnXkFtZTcwODkzNDIzMw@@._V1_SX300.jpg',
            releaseDate: '2009-07-17',
            watchedDate: '2024-01-01',
            rating: 8.5,
            notes: 'A refreshing take on relationships.',
        },
        // More movies can be added here...
    ]);

    const [showAddMovie, setShowAddMovie] = useState(false);

    const addMovie = (newMovie) => {
        setMovies([newMovie, ...movies]);;
        setShowAddMovie(false); // Hide form after adding
    };

    const removeMovie = (index) => {
        const updatedMovies = movies.filter((_, i) => i !== index);
        setMovies(updatedMovies);
    };

    return (
        <div className="App">
            <TitleComponent toggleAddMovie={() => setShowAddMovie(!showAddMovie)} />
            {showAddMovie && <AddMovieComponent addMovie={addMovie} />}
            <div className="movie-list">
                {movies.map((movie, index) => (
                    <MovieComponent
                    key={index}
                    {...movie}
                    onRemove={() => removeMovie(index)}
                />
                ))}
            </div>
        </div>
    );
};

export default App;
