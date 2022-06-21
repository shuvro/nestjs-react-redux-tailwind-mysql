import { APIResponse } from "../models/api.model";
import { get, post, put } from "./utils.service";
import { Movie } from "../models/movie.model";

export const getMovies = async (): Promise<APIResponse<any>> => {
  const res = await get(`/movies`);
  return await res.json();
};

export const getMovieById = async (id: number): Promise<APIResponse<any>> => {
  const res = await get(`/movies/${id}`);
  return await res.json();
};

export const addMovie = async (movie: Movie): Promise<APIResponse<any>> => {
  const res = await post(`/movies`, movie);
  return await res.json();
};

export const updateMovie = async (id: number, movie: Movie): Promise<APIResponse<any>> => {
  const res = await put(`/movies/${id}`, movie);
  return await res.json();
};
