import express from 'express';
import { logInController, signUpController, verifyUserController } from "../../controllers/auth";

const router = express.Router();

router.route('/login').post(logInController);
router.route('/signup').post(signUpController);
router.route('/verify-user').get(verifyUserController);

module.exports = router;
