import { Organizer } from "../models/organizer.model";
import { Request, Response } from "express";

export const findAllOrganizers = (req: Request, res: Response) => {
    Organizer.find()
        .then(allOrganizers => res.json({ organizers: allOrganizers }))
        .catch(err => res.json({message: "Something went wrong", error: err }));
}

export const findOneOrganizer = (req: Request, res: Response) => {
    Organizer.findOne({ _id: req.params.id})
        .then(oneOrganizer => res.json({ organizer: oneOrganizer }))
        .catch(err => res.json({message: "Something went wrong", error: err }));
}

export const createNewOrganizer = (req: Request, res: Response) => {
    console.log("created "+JSON.stringify(req.body));
    Organizer.create(req.body)
        .then(newlyCreatedOrganizer => res.json({ organizer: newlyCreatedOrganizer }))
        .catch(err => res.status(400).json(err));
};

export const updateOrganizer = (req: Request, res: Response) => {
    console.log("updated "+JSON.stringify(req.body));
    Organizer.findOneAndUpdate({_id: req.params.id}, req.body, { new: true, runValidators: true })
        .then( updatedOrganizer => res.json({ organizer: updatedOrganizer }))
        .catch( err => res.status(400).json(err));
};

export const deleteOrganizer = (req: Request, res: Response) => {
    console.log("deleted id: "+req.params.id);
    Organizer.deleteOne({_id: req.params.id })
        .then(result => res.json({ result: result }))
        .catch(err => res.json({ message: "something went wrong", error: err}));
};