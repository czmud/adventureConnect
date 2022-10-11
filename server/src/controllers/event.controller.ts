import { Event } from "../models/event.model";
import { Request, Response } from "express";

export const findAllEvents = (req: Request, res: Response) => {
    res.json({events: 'are they real?'})
    // Event.find()
    //     .then(allEvents => res.json({ events: allEvents }))
    //     .catch(err => res.json({message: "Something went wrong", error: err }));
}

export const findOneEvent = (req: Request, res: Response) => {
    Event.findOne({ _id: req.params.id})
        .then(oneEvent => res.json({ event: oneEvent }))
        .catch(err => res.json({message: "Something went wrong", error: err }));
}

export const createNewEvent = (req: Request, res: Response) => {
    console.log("created "+JSON.stringify(req.body));
    Event.create(req.body)
        .then(newlyCreatedEvent => res.json({ event: newlyCreatedEvent }))
        .catch(err => res.status(400).json(err));
};

export const updateEvent = (req: Request, res: Response) => {
    console.log("updated "+JSON.stringify(req.body));
    Event.findOneAndUpdate({_id: req.params.id}, req.body, { new: true, runValidators: true })
        .then( updatedEvent => res.json({ event: updatedEvent }))
        .catch( err => res.status(400).json(err));
};

export const deleteEvent = (req: Request, res: Response) => {
    console.log("deleted id: "+req.params.id);
    Event.deleteOne({_id: req.params.id })
        .then(result => res.json({ result: result }))
        .catch(err => res.json({ message: "something went wrong", error: err}));
};