import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minLength: [
            2,
            'event name must be at least 2 characters long'
        ]}
},{ timestamps: true});

export const Event = mongoose.model("Event", EventSchema);