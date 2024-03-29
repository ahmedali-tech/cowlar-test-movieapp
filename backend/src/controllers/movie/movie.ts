import { ICustomRequest, ICustomResponse } from "../../types/express";
import { AppError } from "../../utils/app-error";
import { catchAsync } from "../../utils/catch-async";
import { getAllMovies as getAllMoviesService, getMovieById, createMovie as createMovieService, deleteMovie as deleteMovieService, getAllMoviesRankedByRating, getOwnMovies as getOwnMoviesService } from "../../services/movie";
import { IMovie } from "../../types/movie";
import { extractUserFromJwt, extractUserFromReq } from "../../utils/jwt";
import { NextFunction } from "express";


const getAllMovies = catchAsync(async (req: ICustomRequest, res: ICustomResponse) => {

    const searchFilter = req.query.name as string || "";

    const allMovies = await getAllMoviesRankedByRating(searchFilter)

    return res.status(200).json({
        message: "success",
        data: allMovies
    });
});

const getMovie = catchAsync(async (req: ICustomRequest, res: ICustomResponse) => {
    const movieId = req.params.id

    const movieDetails = await getMovieById(movieId);

    return res.status(200).json({
        message: "success",
        data: movieDetails
    });
});

const createMovie = catchAsync(async (req: ICustomRequest, res: ICustomResponse, next: NextFunction) => {

    const userId = await extractUserFromReq(req, next);
    if (!userId) return next(new AppError('Invalid access token', 401))

    const { name, description, releaseYear, imgUrl, videoUrl, genre } = req.body;

    const movieDetails = await createMovieService({ name, description, releaseYear, imgUrl, videoUrl, genre, createdBy: userId } as IMovie);

    return res.status(200).json({
        message: "success",
        data: movieDetails
    });
});

const deleteMovie = catchAsync(async (req: ICustomRequest, res: ICustomResponse, next: NextFunction) => {

    const userId = await extractUserFromReq(req, next);
    if (!userId) return next(new AppError('Invalid access token', 401))

    const movieId = req.params.id

    const deletedMovie = await deleteMovieService(userId, movieId);

    if (!deletedMovie) {
        return res.status(404).json({
            message: "fail",
            data: "No such movie found for the user"
        });
    }

    return res.status(204).json({
        message: "success",
    });
});

const getOwnMovies = catchAsync(async (req: ICustomRequest, res: ICustomResponse, next: NextFunction) => {

    const userId = await extractUserFromReq(req, next);
    if (!userId) return next(new AppError('Invalid access token', 401))

    // console.log();

    const movies = await getOwnMoviesService(userId);

    if (!movies) {
        return res.status(404).json({
            message: "fail",
            data: "You dont have any movies that you created!"
        });
    }

    return res.status(200).json({
        message: "success",
        length: movies?.length,
        data: movies
    });
});





export { getAllMovies, getMovie, createMovie, deleteMovie, getOwnMovies };


