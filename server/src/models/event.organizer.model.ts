import mongoose from 'mongoose';

export const EventOrganizerSchema = new mongoose.Schema({
	organizerId: {
		type: String,
		required: [true, 'Organizer id is required'],
	},
	firstName: {
		type: String,
		trim: true,
		required: [true, 'Organizer first name is required'],
	},
	lastName: {
		type: String,
		trim: true,
		required: [true, 'Organizer last name is required'],
	},
	email: {
		type: String,
		trim: true,
		required: [true, 'Organizer email is required'],
	},
});
