import React from "react";
import { Link } from "react-router-dom";
import { Movie } from "../types";
import "../styles/MovieItem.scss";
import { IMG_URL_W500 } from "../config";

interface MovieItemProps {
  movie: Movie;
}

const MovieItem: React.FC<MovieItemProps> = ({ movie }) => {
  const posterUrl = `${IMG_URL_W500}${movie.poster_path}`;

  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="movie-card">
        <div className="movie-header">
          <img className="movie-poster" src={posterUrl} alt={movie.title} />
          <div className="header-icon-container"></div>
        </div>
        <div className="movie-content">
          <div className="movie-content-header">
            <h3 className="movie-title">{movie.title}</h3>
            <div className="imax-logo"></div>
          </div>
          <div className="movie-info">
            <div className="info-section">
              <label>Release Date</label>
              <span>{movie.release_date}</span>
            </div>
            <div className="info-section">
              <label>Rating</label>
              <span>⭐ {movie.vote_average}</span>
            </div>
            <div className="info-section">
              <label>Votes</label>
              <span>{movie.vote_count}</span>
            </div>
            <div className="info-section">
              <label>Average</label>
              <span>{movie.vote_average}/10</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieItem;
