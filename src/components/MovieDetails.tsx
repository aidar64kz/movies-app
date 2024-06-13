import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { fetchMovieDetails } from "../state/reducers/movieDetailsSlice";
import { IMG_URL_ORIGINAL, IMG_URL_W500 } from "../config";
import "../styles/MovieDetails.scss";

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const {
    singleMovie: movie,
    isLoading,
    error,
  } = useSelector((state: RootState) => state.singleMovie);

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieDetails(id));
    }
  }, [dispatch, id]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const posterUrl = movie ? `${IMG_URL_W500}${movie.poster_path}` : "";
  const backgroundUrl = movie
    ? `${IMG_URL_ORIGINAL}${movie.backdrop_path}`
    : "";

  return (
    <div
      className="movie-details"
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    >
      {movie && (
        <div className="movie-details-container">
          <div className="poster-container">
            <img src={posterUrl} alt={movie.title} className="poster" />
          </div>
          <div className="details-info">
            <h1 className="movie-title">
              {movie.title}
              <span className="release-year">({movie.release_date})</span>
            </h1>
            <div className="status-badge">
              <span className="status">{movie.status}</span>
            </div>
            <div className="movie-metadata">
              <div className="metadata-row">
                {movie.runtime} minutes |{" "}
                {movie.genres.map((genre) => genre.name).join(", ")} |{" "}
                {movie.release_date}
              </div>
              <h3 className="tagline">{movie.tagline}</h3>
              <div className="overview">{movie.overview}</div>
              <div className="metadata-row">
                <h2 className="section-title">Production</h2>
                <div className="production-companies">
                  {movie.production_companies
                    .map((company) => company.name)
                    .join(", ")}
                </div>
              </div>
              <div className="metadata-row">
                <h2 className="section-title">Countries</h2>
                <div className="production-countries">
                  {movie.production_countries
                    .map((country) => country.name)
                    .join(", ")}
                </div>
              </div>
              <div className="metadata-row">
                <h2 className="section-title">Box Office</h2>
                <div className="budget">
                  <strong>Budget:</strong> {movie.budget}$
                </div>
                <div className="revenue">
                  <strong>Revenue:</strong> {movie.revenue}$
                </div>
              </div>
              <div className="metadata-row">
                <div className="rating-column">
                  <div className="ratings">
                    <h2 className="section-title">Rating</h2>
                    <span className="rating">⭐ {movie.vote_average}/10</span>
                  </div>
                </div>
                <div className="runtime-column">
                  <h2 className="section-title">Length</h2>
                  <div className="runtime">{movie.runtime} minutes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
