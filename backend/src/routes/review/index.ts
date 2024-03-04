import express from 'express';
import { isLoggedIn } from '../../middlewares/auth';
import { getAllReviews, getReview, createReview, deleteReview, updateReview } from '../../controllers/review';

const router = express.Router();

router.route('/:movieId/reviews').get(getAllReviews).post(isLoggedIn, createReview)
router.route('/:movieId/reviews/:reviewId').get(getReview).delete(isLoggedIn, deleteReview).patch(isLoggedIn, updateReview)

module.exports = router;
