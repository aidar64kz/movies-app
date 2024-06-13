import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MovieDetailsResponse } from "../../types"; 
import { API_KEY, BASE_URL } from "../../config";
import axios from "axios";

export const fetchMovieDetails = createAsyncThunk(
    "singleMovie/fetchMovieDetails",
    async (id: string) => {
        const response = await axios.get<MovieDetailsResponse>(`${BASE_URL}/movie/${id}`, {
            params: {
                api_key: API_KEY,
            },
        });
        return response.data;
    }
);

interface MovieDetailsState {
    singleMovie: MovieDetailsResponse | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: MovieDetailsState = {
    singleMovie: null,
    isLoading: false,
    error: null,
};

const singleMovieSlice = createSlice({
    name: "singleMovie",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchMovieDetails.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchMovieDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.singleMovie = action.payload;
            })
            .addCase(fetchMovieDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to fetch movie details';
            });
    },
});

export default singleMovieSlice.reducer;
