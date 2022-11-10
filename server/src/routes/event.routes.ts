import express from 'express';
import * as EventsController from '../controllers/event.controller';
import { authenticate } from '../config/jwt.config';

export const AllEventRoutes = (app: express.Application) => {
	app.get('/api/events/', EventsController.findAllEvents);
	app.get('/api/events/:id', EventsController.findOneEvent);
	app.post('/api/events/new', authenticate, EventsController.createNewEvent);
	app.put('/api/events/update/:id', EventsController.updateEvent);
	app.delete('/api/events/delete/:id', EventsController.deleteEvent);
};
