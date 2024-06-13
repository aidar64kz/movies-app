import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import moviesReducer from './reducers/moviesSlice';
import singleMovieSlice from './reducers/movieDetailsSlice';

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    singleMovie: singleMovieSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;
