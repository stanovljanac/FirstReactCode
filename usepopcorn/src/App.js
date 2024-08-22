import { useEffect, useState } from "react";
import Navbar from "./NavBar";
import Main from "./Main";
import Search from "./Search";
import NumResults from "./NumResults";
import MovieList from "./MoviesList";
import Box from "./Box";
import Summary from "./Summary";
import MovieDetails from "./MovieDetails";
import WatchedMovie from "./WatchedMovie";
import Movie from "./Movie";

const KEY = "7a8911ba"; //f84fc31d
const tempQuery = "interstellar";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id == selectedId ? null : id));
  }
  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatchedMovie(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteMovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(
    function () {
      const controller = new AbortController(); // Za otkazivanje prethodnih zahteva
      const signal = controller.signal;

      const debounceTimeout = setTimeout(async () => {
        if (!query.trim()) return; // Ne šalji prazan query

        try {
          setError("");
          setIsLoading(true);

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal }
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
        } catch (err) {
          if (err.name !== "AbortError") {
            // Ignoriši grešku ako je fetch otkazan
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }, 500); // Debounce na 500ms

      return () => {
        clearTimeout(debounceTimeout); // Očisti prethodni timeout
        controller.abort(); // Otkazivanje prethodnog zahteva ako je u toku
      };
    },
    [query]
  );

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList
              movies={movies}
              onSelectMovie={handleSelectMovie}
              Component={Movie}
            ></MovieList>
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatchedMovie}
              watched={watched}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <MovieList
                movies={watched}
                Component={WatchedMovie} onDeleteWatched={handleDeleteMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">LOADING...</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>{message}📛</span>
    </p>
  );
}
