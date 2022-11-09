import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
		trim: true,
		required: [true, 'first name is required'],
	},
	lastName: {
		type: String,
		trim: true,
		required: [true, 'last name is required'],
	},
	email: {
		type: String,
		trim: true,
		required: [true, 'contact email is required'],
	},
});
