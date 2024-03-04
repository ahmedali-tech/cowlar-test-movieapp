import { Types } from "mongoose";

interface IReview extends Document {
    userId: Types.ObjectId;
    movieId: Types.ObjectId;
    ratingStars: number;
    comment: string
}

export { IReview }