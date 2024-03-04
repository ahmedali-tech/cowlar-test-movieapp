import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
const app = require('./app');

import establishDBConnection from './config/db';

const DB = process.env.MONGODB_CONNECTION_STRING_URL


establishDBConnection(DB ?? '');

const PORT = process.env.PORT_NUMBER_DEV;

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});