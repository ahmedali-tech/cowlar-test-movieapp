import mongoose, { Document, Model, Schema } from 'mongoose';
import { IReview } from '../../types/review';

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'movie',
        required: true,
    },

    comment: {
        type: String,
        required: [true, 'Comment was not provided'],
        default: ""
    },
    ratingStars: {
        type: Number,
        required: [true, 'Rating stars were not provided'],
        min: [1, 'Minimum star is 1'],
        max: [5, 'Maximum star is 5'],
        validate: {
            validator: Number.isInteger,
            message: 'Rating must be an integer',
        },
    }
}, { collection: 'review', timestamps: true });

// not allwoing user to review a movie more than once
reviewSchema.index({ userId: 1, movieId: 1 }, { unique: true });

const reviewModel: Model<IReview> = mongoose.model<IReview>('review', reviewSchema);

export default reviewModel;