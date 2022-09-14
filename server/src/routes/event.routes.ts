import * as EventsController from "../controllers/event.controller";
import express from "express";

export const AllEventRoutes = (app: express.Application) => {
    app.get("/api/events/", EventsController.findAllEvents);
    app.get("/api/events/:id", EventsController.findOneEvent);
    app.post("/api/events/new", EventsController.createNewEvent);
    app.put("/api/events/update/:id", EventsController.updateEvent);
    app.delete("/api/events/delete/:id", EventsController.deleteEvent);
};