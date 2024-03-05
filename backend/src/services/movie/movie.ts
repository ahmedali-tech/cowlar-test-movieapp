import movieModel from "../../models/movie";
import reviewModel from "../../models/review";
import { IMovie } from "../../types/movie";

const getAllMovies = async () => {
    const movies = await movieModel.find().select('-createdBy');
    return movies;
}

const getMovieById = async (id: string) => {
    const movies = await movieModel.findById(id).select("-createdBy -__v");
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

const getAllMoviesRankedByRating = async (searchFilter: string) => {

    const moviesWithAvgRating = await movieModel.aggregate([
        {
            $match: {
                $expr: {
                    $cond: {
                        if: !!searchFilter,
                        then: { $regexMatch: { input: '$name', regex: searchFilter.trim(), options: 'i' } },
                        else: true, // Match everything when applyMatch is false
                    },
                },
            },
        },
        {
            $lookup: {
                from: 'review',
                localField: '_id',
                foreignField: 'movieId',
                as: 'reviews',
            },
        },
        {
            $addFields: {
                averageRating: {
                    $avg: '$reviews.ratingStars',
                },
                ratingsCount: {
                    $size: '$reviews',
                },
            },
        },
        {
            $group: {
                _id: '$_id',
                name: { $first: '$name' },
                releaseYear: { $first: '$releaseYear' },
                description: { $first: '$description' },
                imgUrl: { $first: '$imgUrl' },
                videoUrl: { $first: '$videoUrl' },
                genre: { $first: '$genre' },
                createdBy: { $first: '$createdBy' },
                averageRating: { $first: '$averageRating' },
                reviewCount: { $first: '$ratingsCount' },
            },
        },
        {
            $addFields: {
                averageRating: {
                    $ifNull: ['$averageRating', 5]
                },
                reviewCount: {
                    $ifNull: ['$reviewCount', 0]
                }
            },
        },
        {
            $project: {
                _id: 1,
                name: 1,
                releaseYear: 1,
                description: 1,
                imgUrl: 1,
                videoUrl: 1,
                genre: 1,
                createdBy: 1,
                averageRating: 1,
                reviewCount: 1,
            },
        },
        {
            $sort: { averageRating: -1 },
        },
    ]);

    return moviesWithAvgRating;
}

const searchMovieByName = async (id: string) => {
    const movies = await movieModel.findById(id).select("-createdBy");
    return movies;
}

export { getAllMovies, getMovieById, createMovie, deleteMovie, getAllMoviesRankedByRating }