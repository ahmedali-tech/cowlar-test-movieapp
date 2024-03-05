import mongoose, { Document, Model, Schema } from 'mongoose';
import { IMovie } from '../../types/movie';

const movieGenres = [
	"action",
	"comedy",
	"drama",
	"fiction",
	"horror",
	"romance",
	"adventure",
	"fantasy",
	"mystery",
	"thriller"
];

const movieSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Movie name was not provided'],
		unique: [true, "Movie with this name already exists"]
	},
	releaseYear: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	imgUrl: {
		type: String,
		default: "https://image.tmdb.org/t/p/w185/46sp1Z9b2PPTgCMyA87g9aTLUXi.jpg"
	},
	videoUrl: {
		type: String,
		default: "https://www.youtube.com/watch?v=QfFasuouxQI&pp=ygUMbGlmdCB0cmFpbGVy"
	},
	genre: {
		type: String,
		required: true,
		enum: movieGenres
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
		required: true,
	},

}, { collection: 'movie' });

movieSchema.pre<IMovie>('save', function (next: any) {
	if (!this.imgUrl) {
		this.imgUrl = 'https://image.tmdb.org/t/p/w185/46sp1Z9b2PPTgCMyA87g9aTLUXi.jpg';
	}
	if (!this.videoUrl) {
		this.videoUrl = 'https://www.youtube.com/watch?v=QfFasuouxQI&pp=ygUMbGlmdCB0cmFpbGVy';
	}
	next();
});

const movieModel: Model<IMovie> = mongoose.model<IMovie>('movie', movieSchema);

export default movieModel;