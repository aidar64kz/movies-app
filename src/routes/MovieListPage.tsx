import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { setPage } from "../state/reducers/moviesSlice";
import { Movie } from "../types";
import { useMovies } from "../hooks/useMovies";
import MovieList from "../components/MovieList";
import Pagination from "../components/Pagination";

const MovieListPage: React.FC = () => {
  const dispatch = useDispatch();
  const query = useSelector((state: RootState) => state.movies.query);
  const page = useSelector((state: RootState) => state.movies.page);
  const { movies, loading, error, totalPages } = useMovies(query, page);
  const [displayedMovies, setDisplayedMovies] = useState<Movie[]>([]);
  const totalPageNumber = totalPages >= 100 ? 100 : totalPages;

  useEffect(() => {
    setDisplayedMovies(movies.slice(0, 10));
  }, [movies, page]);

  const handlePageClick = (selectedItem: { selected: number }) => {
    const newPage = selectedItem.selected + 1;
    dispatch(setPage(newPage));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <MovieList movies={displayedMovies} />

      {totalPages > 1 && (
        <Pagination
          pageCount={totalPageNumber}
          onPageChange={handlePageClick}
          currentPage={page}
        />
      )}
    </div>
  );
};

export default MovieListPage;
