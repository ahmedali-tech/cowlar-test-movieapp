import express from 'express';
import { isLoggedIn } from '../../middlewares/auth';
import { deleteUser } from '../../controllers/user';

const router = express.Router();

router.route('/').delete(isLoggedIn, deleteUser);

module.exports = router;
