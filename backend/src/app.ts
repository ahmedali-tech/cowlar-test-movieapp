import express, { Request, Response, NextFunction } from 'express';
import { ICustomRequest, ICustomError } from './types/express';

//Utils
import { AppError } from './utils/app-error';

// Controllers
const errorController = require('./controllers/error');
const authRoutes = require('./routes/auth')
const movieRoutes = require('./routes/movie')
const reviewRoutes = require('./routes/review')
const userRoutes = require('./routes/user')


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

// API routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/movies', reviewRoutes);
app.use('/api/v1/movies', movieRoutes);
app.use('/api/v1/user', userRoutes);

app.get('/', (req: Request, res: Response) => {
	res.send('Hello from the server!');
});

// Manage unhandles routes
app.all("*", (req: ICustomRequest, res: Response, next: NextFunction) => {
	const err = new AppError(`Unable to find ${req.originalUrl} on server`, 404);
	next(err);
})

// Global error handler
app.use(errorController);


export default app;