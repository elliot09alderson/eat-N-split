import { useState } from "react";

import { useEffect } from "react";
import "./app.css";
const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
const key = "ec0f34bd";
export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState("");
  
  function onCloseMovie() {
    setSelectedId("");
  }
  function sendId(id) {
    if (id === selectedId) {
      setSelectedId("");
      return;
    }
    setSelectedId(id);
  }

  function handleAddWatched(watchedMovie) {
    if (!watched.find((w) => w.imdbID === watchedMovie.imdbID)) {
      setWatched((watched) => [...watched, watchedMovie]);
    }
  }

  useEffect(
    function () {
      async function fetchData() {
        try {
          setLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${key}&s=${query}`
          );
          if (!res.ok)
            throw Error("Something wrong happen while fetching movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie Not Found");
          if (query.length > 2 && data.Search) {
            const filteredData = data.Search.filter((d) => d.Poster !== "N/A");
            setMovies([...filteredData]);
            setLoading(false);
          }
        } catch (err) {
          setLoading(false);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }

      if (query.length < 3) {
        setError("");
        setMovies([]);
        return;
      }
      fetchData();
    },
    [query]
  );
  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {!loading && !error && <MovieList movies={movies} sendId={sendId} />}
          {loading && <Loading />}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {!selectedId && <WatchedSummary watched={watched} />}
          {!selectedId && <WatchedMoviesList watched={watched} />}
          {selectedId && (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={onCloseMovie}
              onAddWatched={handleAddWatched}
            />
          )}
        </Box>
      </Main>
    </>
  );
}

function MovieDetails({ selectedId, onCloseMovie, onAddWatched }) {
  const [movie, setMovie] = useState({});

  const key = "ec0f34bd";
  const {
    Title,
    Year,
    Poster,
    Runtime,
    Released,
    Genre,
    Plot,
    Writer,
    Actors,
    Director,
    imdbRating,
  } = movie;

  function handleAdd() {
    const watchedMovie = {
      imdbID: selectedId,
      Title,
      Year,
      Poster,
      imdbRating: Number(imdbRating),
      Runtime: Number(Runtime.split(" ").at(0)),
    };
    onAddWatched(watchedMovie);
    onCloseMovie();
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?i=${selectedId}&apikey=${key}`
        );
        // if (!res.ok) throw new Error("Data not found ");
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
    console.log(movie);
  }, [selectedId]);
  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onCloseMovie}>
          &larr;
        </button>

        <img src={Poster} alt={`Poster of ${Movie} movie`} />
        <div className="details-overview">
          <h2>{Title}</h2>
          <p>
            {Released}&bull; {Runtime}
          </p>
          <p>{Genre}</p>
          <p>
            <span>⭐</span>
            {imdbRating} IMDB Rating
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
          <button className="btn-add" onClick={handleAdd}>
            Add to Watched List
          </button>
        </div>
      </section>
      <section>
        <p>
          <em>{Plot}</em>
        </p>
        <p>Starring{Actors}</p>
        <p>Directed By {Director}</p>
      </section>
    </div>
  );
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⚠ {message}</span>
    </p>
  );
}
function Loading() {
  return <p> ⏱ Loading ....</p>;
}
function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>

      {isOpen && children}
    </div>
  );
}

/*
function WatchedBox() {
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>

      {isOpen2 && (
        <>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </>
      )}
    </div>
  );
}
*/

function MovieList({ movies, sendId }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie, idx) => (
        <Movie movie={movie} key={movie.imdbID + idx} sendId={sendId} />
      ))}
    </ul>
  );
}

function Movie({ movie, sendId }) {
  return (
    <li
      onClick={() => {
        sendId(movie.imdbID);
        console.log(movie.imdbID);
      }}
    >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMoviesList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.UserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.Runtime} min</span>
        </p>
      </div>
    </li>
  );
}
