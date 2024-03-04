import express, { Request, Response, NextFunction } from 'express';
import { ICustomRequest, ICustomError } from './types/express';

//Utils
import { AppError } from './utils/app-error';

// Controllers
const errorController = require('./controllers/error/index')

// Libraries imports
import morgan from 'morgan';
import cors from 'cors';

const app = express();
app.use(morgan('dev'));

app.use(cors());

app.use(express.json());

app.use((req: ICustomRequest, res: Response, next: NextFunction) => {
	req.requestTime = new Date().toISOString();
	next();
});

app.get('/', (req: Request, res: Response) => {
	res.send('You have reached the server base url!');
});

// Manage unhandles routes
app.all("*", (req: ICustomRequest, res: Response, next: NextFunction) => {
	const err = new AppError(`Unable to find ${req.originalUrl} on server`, 404);
	next(err);
})

// Global error handler
app.use(errorController);


module.exports = app;