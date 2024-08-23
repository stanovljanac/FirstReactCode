import { useState, useRef, useEffect } from "react";

const KEY = "7a8911ba";
export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(
    function () {
      callback?.();

      const controller = new AbortController(); // Za otkazivanje prethodnih zahteva
      const signal = controller.signal;

      async function fetchMovies() {
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
      }

      fetchMovies();

      return () => {
        controller.abort(); // Otkazivanje prethodnog zahteva ako je u toku
      };
    },
    [query]
  );

  return { movies, isLoading, error };
}
