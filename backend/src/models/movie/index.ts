import mongoose, { Document, Model, Schema } from 'mongoose';

const movieGenres = [
	"Action",
	"Comedy",
	"Drama",
	"Science Fiction",
	"Horror",
	"Romance",
	"Adventure",
	"Fantasy",
	"Mystery",
	"Thriller"
];

interface IMovie extends Document {
	name: string;
	releaseYear: string;
	description: string;
	imgUrl: string;
	videoUrl: string;
	genre: string;
}

const movieSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
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


}, { collection: 'movie' });


const movieModel: Model<IMovie> = mongoose.model<IMovie>('movie', movieSchema);

export default movieModel;