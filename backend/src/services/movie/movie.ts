import movieModel from "../../models/movie";
import { IMovie } from "../../types/movie";

const getAllMovies = async () => {
    const movies = await movieModel.find().select('-createdBy');
    return movies;
}

const getMovieById = async (id: string) => {
    const movies = await movieModel.findById(id).select("-createdBy");
    return movies;
}

const createMovie = async (movieData: IMovie) => {
    const movies = await movieModel.create(movieData);
    return movies;
}
const deleteMovie = async (userId: string, movieId: string) => {
    const movie = await movieModel.findOneAndDelete({ _id: movieId, createdBy: userId });
    return movie;
}

export { getAllMovies, getMovieById, createMovie, deleteMovie }