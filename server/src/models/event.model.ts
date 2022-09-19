import mongoose from 'mongoose';
import { EventOrganizerSchema } from './event.organizer.model';
import { UserSchema } from './user.model';

const modelOptions = {
    timestamps: true
}

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minLength: [
            2,
            'event name must be at least 2 characters long'
        ]},
    description: {
        type: String,
        required: [true, 'description is required']
    },
    type: {
        type: String,
        trim: true,
        required: [true, 'trip type is required']
        },
    intensity: {
        type: Number,
        min: [
            1,
            'intensity must be at least 1 star'
        ],
        max: [
            5,
            'intensity must be at most 5 stars'
        ]},
    organizer: {
        type: EventOrganizerSchema,
        required: [true, 'Event organizer is required']
    },
    users: [UserSchema]
}, modelOptions);

export const Event = mongoose.model("Event", EventSchema);