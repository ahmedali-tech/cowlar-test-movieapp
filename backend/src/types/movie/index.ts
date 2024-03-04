import { Types } from "mongoose";

interface IMovie extends Document {
    name: string;
    releaseYear: string;
    description: string;
    imgUrl?: string;
    videoUrl?: string;
    genre: string;
    createdBy: Types.ObjectId;
}

export { IMovie }