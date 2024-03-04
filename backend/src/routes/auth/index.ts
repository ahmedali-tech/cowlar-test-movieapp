import express from 'express';
import { logInController, signUpController } from "../../controllers/auth";

const router = express.Router();

router.route('/login').post(logInController);
router.route('/signup').post(signUpController);

module.exports = router;
