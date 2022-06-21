import { configureStore } from '@reduxjs/toolkit';
import MeSlice from './slices/me.slice';
import MoviesSlice from "./slices/movies.slice";

export const store = configureStore({
    reducer: {
        meStore: MeSlice.reducer,
        movies: MoviesSlice.reducer,
    }
})
export type RootState = ReturnType<typeof store.getState>
