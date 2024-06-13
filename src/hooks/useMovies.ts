import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMoviesAction } from '../state/reducers/moviesSlice';
import { AppDispatch, RootState } from '../state/store';

export const useMovies = (query: string, page: number) => {
    const dispatch = useDispatch<AppDispatch>();
    const { movies, loading, error, totalPages } = useSelector((state: RootState) => state.movies);

    useEffect(() => {
        dispatch(fetchMoviesAction(query, page));
    }, [dispatch, query, page]);

    return { movies, loading, error, totalPages };
};
