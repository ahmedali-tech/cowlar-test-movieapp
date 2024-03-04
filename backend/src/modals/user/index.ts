import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

interface IUser extends Document {
	name: string;
	password: string;
}

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please enter your name'],
		trim: true,
		validate: {
			validator: function (value: string) {
				return /^[A-Za-z\s]+$/.test(value);
			},
			message: 'Title must contain only alphabets and spaces',
		},
	},
	password: {
		type: String,
		required: [true, 'Please enter your password'],
		minlength: [8, 'Password should be atleast 8 characters long']
	},
	email: {
		type: String,
		required: [true, 'Please enter your email'],
		unique: true,
		validate: [validator.isEmail, 'Please provide a valid email']
	},
	phone: {
		type: String,
		required: [true, 'Please enter your phone number'],
		validate: {
			validator: function (value: string) {
				return /^\92\d{10}$/.test(value);
			},
			message: 'Invalid Phone number format',
		},
	},

}, { collection: 'user' });

userSchema.methods.encryptPassword = async (pass_: string) => {
	const saltRounds = 10;
	const salt = await bcrypt.genSalt(saltRounds);
	const hash = bcrypt.hash(pass_, salt);
	return hash;
};

userSchema.pre<IUser>('save', async function (next: any) {
	this.password = await bcrypt.hash(this.password, 12);
	next();
});

userSchema.methods.matchPassword = async function (pass_: string) {
	const match = await bcrypt.compare(pass_, this.password);
	return match;
};

const userModel: Model<IUser> = mongoose.model<IUser>('user', userSchema);

export default userModel;