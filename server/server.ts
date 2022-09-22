import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import express from "express";
import cookieParser from 'cookie-parser';
import cors from "cors";
const app = express();
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
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