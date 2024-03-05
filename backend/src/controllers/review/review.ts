import { NextFunction } from "express";
import { ICustomRequest, ICustomResponse } from "../../types/express";
import { AppError } from "../../utils/app-error";
import { catchAsync } from "../../utils/catch-async";
import { extractUserFromReq } from "../../utils/jwt";
import reviewModel from "../../models/review";
import { getOwnReview, getAllReviews as getAllReviewsService, getReview as getReviewService, createReview as createReviewService, deleteReview as deleteReviewService, updateReview as updateReviewService } from "../../services/review";


const getAllReviews = catchAsync(async (req: ICustomRequest, res: ICustomResponse, next: NextFunction) => {

    const movieId = req.params.movieId
    const userId = await extractUserFromReq(req, next);

    if (!movieId) return next(new AppError("Movie Id was not provided", 403));

    let ownReview;

    if (userId) {
        ownReview = await getOwnReview(movieId, userId);
    }

    const reviews = await getAllReviewsService(movieId)

    return res.status(200).json({
        message: "success",
        length: reviews.length,
        data: { ownReview: ownReview, otherReviews: reviews }
    });
});

const getReview = catchAsync(async (req: ICustomRequest, res: ICustomResponse, next: NextFunction) => {

    const movieId = req.params.movieId
    const reviewId = req.params.reviewId
    if (!movieId) return next(new AppError("Movie Id was not provided", 403))
    if (!reviewId) return next(new AppError("Review Id was not provided", 403))

    const review = await getReviewService(movieId, reviewId)

    if (!review) return next(new AppError("Review was not found", 404))

    return res.status(200).json({
        message: "success",
        data: review
    });
});

const createReview = catchAsync(async (req: ICustomRequest, res: ICustomResponse, next: NextFunction) => {

    const movieId = req.params.movieId
    if (!movieId) return next(new AppError("Movie Id was not provided", 403))

    const userId = await extractUserFromReq(req, next);

    const { ratingStars, comment } = req.body;
    const review = await createReviewService(movieId, userId, ratingStars, comment)

    return res.status(200).json({
        message: "success",
        data: review
    });
});

const deleteReview = catchAsync(async (req: ICustomRequest, res: ICustomResponse, next: NextFunction) => {

    const movieId = req.params.movieId
    const reviewId = req.params.reviewId
    if (!movieId) return next(new AppError("Movie Id was not provided", 403))
    if (!reviewId) return next(new AppError("Review Id was not provided", 403))

    const userId = await extractUserFromReq(req, next);

    const review = await deleteReviewService(movieId, reviewId, userId);

    if (!review) return next(new AppError("No such review found", 404))

    return res.status(204).json({
        message: "success",
    });
});

const updateReview = catchAsync(async (req: ICustomRequest, res: ICustomResponse, next: NextFunction) => {

    const movieId = req.params.movieId
    const reviewId = req.params.reviewId
    if (!movieId) return next(new AppError("Movie Id was not provided", 403))
    if (!reviewId) return next(new AppError("Review Id was not provided", 403))

    const userId = await extractUserFromReq(req, next);

    const { ratingStars, comment } = req.body;
    const updateBody = { ratingStars, comment };

    // remove extra and undefined stuff from update body
    const updateBody_ = Object.fromEntries(
        Object.entries(updateBody).filter(([key, value]) => !!value)
    );

    const review = await updateReviewService(movieId, reviewId, userId, updateBody_);

    if (!review) return next(new AppError("No such review found", 404))

    return res.status(200).json({
        message: "success",
        data: review
    });
});



export { getAllReviews, getReview, createReview, deleteReview, updateReview };

