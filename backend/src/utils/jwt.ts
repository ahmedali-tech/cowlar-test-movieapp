import jwt from 'jsonwebtoken';

const generateJWT = (userID: string) => {
	const jwt_ = process.env.JWT_SECRET ?? '';
	const token = jwt.sign({ id: userID }, jwt_, {
		expiresIn: process.env.JWT_EXPIRES_IN
	});
	return token;
};

export { generateJWT };