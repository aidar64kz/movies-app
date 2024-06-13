import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie, MoviesResponse } from '../../types';
import axios from 'axios';
import { BASE_URL, API_KEY } from '../../config';
import { AppThunk } from '../store';

interface MoviesState {
    query: string;
    page: number;
    totalPages: number;
    movies: Movie[];
    loading: boolean;
    error: string | null;
}

const initialState: MoviesState = {
    query: '',
    page: 1,
    totalPages: 1,
    movies: [],
    loading: false,
    error: null,
};

export const fetchMovies = createAsyncThunk(
    'movies/fetchMovies',
    async ({ query, page }: { query: string; page: number }) => {
        const endpoint = query.trim() === '' ? 'discover/movie' : 'search/movie';
        const params = query.trim() === '' ? { api_key: API_KEY, page } : { api_key: API_KEY, query, page };

        const response = await axios.get<MoviesResponse>(`${BASE_URL}/${endpoint}`, {
            params,
        });
        return response.data;
    }
);

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setQuery(state, action: PayloadAction<string>) {
            state.query = action.payload;
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        setMovies(state, action: PayloadAction<Movie[]>) {
            state.movies = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.movies = action.payload.results;
                state.totalPages = action.payload.total_pages;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to fetch movies';
                state.loading = false;
            })
            .addCase(fetchMovies.pending, state => {
                state.loading = true;
            });
    },
});

export const { setQuery, setPage, setMovies, setLoading, setError } = moviesSlice.actions;

export const fetchMoviesAction = (query: string, page: number): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        await dispatch(fetchMovies({ query, page }));
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : (error as string) || null;
        dispatch(setError(errorMessage));
    } finally {
        dispatch(setLoading(false));
    }
};

export default moviesSlice.reducer;
