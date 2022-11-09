import mongoose, { Schema, Document, model } from 'mongoose';
import bcrypt from 'bcrypt';

const modelOptions = {
	timestamps: true,
	toJSON: { virtuals: true },
	toObject: { virtuals: true },
};

interface IOrganizer extends Document {
	_id: mongoose.ObjectId;
	firstName: string;
	lastName: string;
	email: string;
	_password: string;
	_confirmPassword: string;
	passwordHash: string;
}

export const OrganizerSchema = new Schema<IOrganizer>(
	{
		firstName: {
			type: String,
			trim: true,
			required: [true, 'First name is required'],
			minLength: [2, 'First name must be at least 2 characters'],
		},
		lastName: {
			type: String,
			trim: true,
			required: [true, 'Last name is required'],
			minLength: [2, 'Last name must be at least 2 characters'],
		},
		email: {
			type: String,
			trim: true,
			required: [true, 'Contact email is required'],
			validate: {
				validator: (val: string) => /^([\w-.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
				message: 'Must enter a valid email',
			},
		},
		passwordHash: {
			type: String,
		},
	},
	modelOptions,
);

/* Mongoose methods do not support the use of arrow functions */
/* arrow functions do have 'this' defined in function scope */
/* eslint-disable func-names */
OrganizerSchema.virtual('password')
	.get(function (this: IOrganizer) {
		return this._password;
	})
	.set(function (this: IOrganizer, value: string) {
		this._password = value;
	});

OrganizerSchema.virtual('confirmPassword')
	.get(function (this: IOrganizer) {
		return this._confirmPassword;
	})
	.set(function (this: IOrganizer, value: string) {
		this._confirmPassword = value;
	});

OrganizerSchema.pre<IOrganizer>('validate', function (next) {
	if (this._password.length < 8) {
		this.invalidate('password', 'Password must be at least 8 characters in length');
	}
	if (this._confirmPassword !== this._password) {
		this.invalidate('confirmPassword', 'Password and confirmation must match');
	}
	next();
});

OrganizerSchema.pre<IOrganizer>('save', function (next) {
	bcrypt.hash(this._password, 10).then((hash: string) => {
		this.passwordHash = hash;
		next();
	});
});
/* eslint-enable func-names */

export const Organizer = model('Organizer', OrganizerSchema);
