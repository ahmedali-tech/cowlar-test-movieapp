import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import app from './app';

import establishDBConnection from './config/db';

const DB = process.env.MONGODB_CONNECTION_STRING_URL?.replace(
	'<USERNAME>',
	process.env.MONGODB_URL_USERNAME ?? ''
)?.replace(
	'<PASSWORD>',
	process.env.MONGODB_URL_PASSWORD ?? ''
);

establishDBConnection(DB ?? '');

const PORT = process.env.PORT_NUMBER_DEV;

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
