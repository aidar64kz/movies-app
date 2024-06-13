import React from 'react';
import MovieItem from './MovieItem';
import { Movie } from '../types';
import '../styles/MovieList.scss';


type MovieListPropsType = {
  movies: Movie[];
}

const MovieList: React.FC<MovieListPropsType> = ({ movies }) => {


  return (
    <div className="movie-list">
      {movies.map((movie: Movie) => (
        <MovieItem key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
