import { useSelector } from "react-redux";
import { Movie } from "../models/movie.model";
import { getMovies } from "../services/movie.service";
import { store } from "../store/configure.store";
import MoviesSlice from "../store/slices/movies.slice";

export const useListing = (): { movies: Movie[] } => {
  const me = useSelector(state => state.movies);
  return {
    movies: me
  };
}


export const setListing = async () => {
  const res = await getMovies();
  if (res.statusCode === 200) {
    store.dispatch(MoviesSlice.actions.setMe(res.data));
  }
}
