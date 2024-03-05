import express from 'express';
import { createMovie, getAllMovies, getMovie, deleteMovie, getOwnMovies } from '../../controllers/movie';
import { isLoggedIn } from '../../middlewares/auth';

const router = express.Router();

router.route('/').get(getAllMovies).post(isLoggedIn, createMovie);
router.route('/own').get(isLoggedIn, getOwnMovies)
router.route('/:id').get(getMovie).delete(isLoggedIn, deleteMovie);

module.exports = router;
