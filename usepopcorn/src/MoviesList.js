import { Component } from "react";
import Movie from "./Movie";

export default function MoviesList({ movies, onSelectMovie, Component,onDeleteWatched }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Component
          movie={movie}
          key={movie.imdbID}
          onSelectMovie={onSelectMovie}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}
