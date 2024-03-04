import mongoose, { ConnectOptions } from 'mongoose';


export default function establishDBConnection(DB: string): void {
	mongoose
		.connect(DB)
		.then((con: any) => {
			console.log('DB has been connected!!!');
		})
		.catch((err: any) => console.log(err));
}