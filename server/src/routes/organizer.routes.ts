import * as OrganizersController from "../controllers/organizer.controller";
import express from "express";
import { authenticate } from "../config/jwt.config";

export const AllOrganizerRoutes = (app: express.Application) => {
    app.get("/api/organizers/", authenticate, OrganizersController.findAllOrganizers);
    app.get("/api/organizers/current", OrganizersController.getLoggedInOrganizer);
    app.post("/api/organizers/register", OrganizersController.createNewOrganizer);
    app.post("/api/organizers/login", OrganizersController.logOrganizerIn);
    app.post("/api/organizers/logout", OrganizersController.logOrganizerOut);
    app.put("/api/organizers/update/:id", authenticate, OrganizersController.updateOrganizer);
    app.delete("/api/organizers/delete/:id", authenticate, OrganizersController.deleteOrganizer);
};