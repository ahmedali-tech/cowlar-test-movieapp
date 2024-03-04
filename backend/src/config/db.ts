import mongoose, { ConnectOptions } from 'mongoose';

// const ConnectionOptions: ConnectOptions = {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
// }

export default function establishDBConnection(DB: string): void {
	mongoose
		.connect(DB)
		.then((con: any) => {
			console.log('DB connected sir!!!');
		})
		.catch((err: any) => console.log(err));
}
