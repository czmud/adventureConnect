import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
const port: number = 8000;
import "./src/config/mongoose.config"

app.use(express.json(), express.urlencoded({ extended: true }));

import { AllEventRoutes } from './src/routes/event.routes'
AllEventRoutes(app);

import { AllOrganizerRoutes } from './src/routes/organizer.routes'
AllOrganizerRoutes(app);

const server = app.listen(port, () =>
    console.log(`Server is locked and loaded on port ${port}!`)
);