const apiKey = '8fc2844082992a91743e504f0fc3d836'; // Replace with your TMDb API key
const movieTitle = 'Inception'; // Replace with the movie title you want to search for

// Construct the API URL
const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movieTitle)}&api_key=${apiKey}`;

// Send a request using fetch
fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json(); // Parse the JSON from the response
  })
  .then(data => {
    if (data.results.length > 0) {
      const movie = data.results[0]; // Get the first result
      const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`; // Get the poster URL
      const releaseDate = movie.release_date; // Get the release date
      console.log(`Title: ${movie.title}`);
      console.log(`Release Date: ${releaseDate}`);
      console.log(`Poster URL: ${posterUrl}`);
    } else {
      console.log('No results found for the movie title.');
    }
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

/**
 $ node test.js
 Title: Inception
 Release Date: 2010-07-15
 Poster URL: https://image.tmdb.org/t/p/w500/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg
 */
