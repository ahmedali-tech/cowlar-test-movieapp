import reviewModel from "../../models/review";

interface IUpdateBody {
    comment?: string;
    ratingStars?: number;
}

const getAllReviews = async (movieId: string) => {
    const reviews = await reviewModel.find({ movieId: movieId });
    return reviews;
}

const getReview = async (movieId: string, reviewId: string) => {
    const review = await reviewModel.findOne({ movieId: movieId, _id: reviewId });
    console.log(review);
    return review;
}

const createReview = async (movieId: string, userId: string, ratingStars: number, comment: string) => {
    const review = await reviewModel.create({ movieId, userId, ratingStars, comment });
    return review;
}

const deleteReview = async (movieId: string, reviewId: string, userId: string) => {
    const review = await reviewModel.findOneAndDelete({ movieId, _id: reviewId, userId });
    return review;
}

const updateReview = async (movieId: string, reviewId: string, userId: string, updateBody: IUpdateBody) => {
    const updatedReview = await reviewModel.findOneAndUpdate({ movieId, _id: reviewId, userId }, updateBody, { new: true, runValidators: true });
    return updatedReview;
}

export { getAllReviews, getReview, createReview, deleteReview, updateReview }