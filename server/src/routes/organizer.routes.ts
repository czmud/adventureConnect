import * as OrganizersController from "../controllers/organizer.controller";
import express from "express";

export const AllOrganizerRoutes = (app: express.Application) => {
    app.get("/api/organizers/", OrganizersController.findAllOrganizers);
    app.get("/api/organizers/:id", OrganizersController.findOneOrganizer);
    app.post("/api/organizers/new", OrganizersController.createNewOrganizer);
    app.put("/api/organizers/update/:id", OrganizersController.updateOrganizer);
    app.delete("/api/organizers/delete/:id", OrganizersController.deleteOrganizer);
};