import { Request, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AppError } from './app-error';

const generateJWT = (userID: string, next: NextFunction) => {
	const jwtSecretKey = process.env.JWT_SECRET;
	if (!jwtSecretKey) {
		return next(new AppError("Internal Server Error", 500))
	}

	const token = jwt.sign({ id: userID }, jwtSecretKey, {
		expiresIn: process.env.JWT_EXPIRES_IN
	});
	return token;
};

// To get userId direct JWT object
const extractUserFromJwt = (token: string, next: NextFunction) => {
	const jwtSecretKey = process.env.JWT_SECRET;

	if (!jwtSecretKey) {
		return next(new AppError("Internal Server Error", 500))
	}

	const decoded = jwt.verify(token, jwtSecretKey);

	if (typeof decoded === 'string') {
		// Handle the case where the token is a string (invalid or expired token)
		return next(new AppError("Invalid access token", 401))
	}

	return decoded.id;
};

// To get userId direct req object
const extractUserFromReq = (req: Request, next: NextFunction) => {

	let token: string;
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1];
		return extractUserFromJwt(token, next);
	}

	return null;
};


export { generateJWT, extractUserFromJwt, extractUserFromReq };