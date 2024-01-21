import React, { useState, useEffect } from "react";
import './Movies.css';
import { Link } from "react-router-dom";

const Movies = () => {
  const [searchInput, setSearchInput] = useState('');
  const [moviefact, setMovieFact] = useState({
    title: "oppenheimer",
    director: "Jeremy Leven",
    year: '2023',
    Genre: "Biography, Drama, History",
    actors: "Cillian Murphy, Emily Blunt",
    boxoffice: "$325,390,875",
    Plot: "The story of American scientist, J. Robert Oppenheimer, and his role in the development of the atomic bomb.",
    imdbRating: "8.5",
  });
  const [noMovieFound, setNoMovieFound] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    setBookmarks(storedBookmarks);
  }, []);

  const addBookmark = () => {
    if (!bookmarks.includes(moviefact.title)) {
      const updatedBookmarks = [...bookmarks, moviefact.title];
      setBookmarks(updatedBookmarks);
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    }
  };

  const removeBookmark = () => {
    const updatedBookmarks = bookmarks.filter((bookmark) => bookmark !== moviefact.title);
    setBookmarks(updatedBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
  };

  const fetchMoviedata = async () => {
    try {
      const response = await fetch(`http://www.omdbapi.com/?t=${searchInput}&apikey=25e9c7ef`);
      const data = await response.json();

      if (data.Response === 'True') {
        setMovieFact({
          title: data.Title,
          director: data.Director,
          year: data.Year,
          Genre: data.Genre,
          actors: data.Actors,
          boxoffice: data.BoxOffice,
          Plot: data.Plot,
          imdbRating: data.imdbRating,
        });
        setNoMovieFound(false);
      } else {
        setNoMovieFound(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={(e) => { e.preventDefault(); fetchMoviedata(); }}>
        <input
          className="input"
          type="text"
          placeholder="Search For Movie"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className="button" type="submit">Search</button>
      </form>

      {noMovieFound ? (
        <div className="no-movie-found">No movie found</div>
      ) : (
        <div className="infoContainer">
          <div className="infoItem">Title: {moviefact.title}</div>
          <div className="infoItem">Year: {moviefact.year}</div>
          <div className="infoItem">Director: {moviefact.director}</div>
          <div className="infoItem">Genre: {moviefact.Genre}</div>
          <div className="infoItem">Actors: {moviefact.actors}</div>
          <div className="infoItem">Box Office: {moviefact.boxoffice}</div>
          <div className="infoItem">Plot: {moviefact.Plot}</div>
          <div className="infoItem">IMDB Rating: {moviefact.imdbRating}</div>
          <Link to={`https://flixtorz.to/filter?keyword=${moviefact.title}`}>Link to Movie</Link>
          <Link to={`https://www.youtube.com/results?search_query=${moviefact.title}+trailer`}>Link to Trailer</Link>
          <button onClick={addBookmark}>Bookmark</button>
          <button onClick={removeBookmark}>Remove Bookmark</button>
        </div>
      )}

      <div className="bookmarks-container">
        <h2>Bookmarked Movies</h2>
        <ul>
          {bookmarks.map((bookmark, index) => (
            <li key={index}>{bookmark}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Movies;
