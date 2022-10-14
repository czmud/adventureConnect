import * as jwt from 'jsonwebtoken';
import express from "express";
import cookieParser from 'cookie-parser';
import cors from "cors";
const app = express();
app.use(cookieParser());
const port: number = 8000;
import "./src/config/mongoose.config"
import { env } from "./src/util/environment"

app.use(express.json(), express.urlencoded({ extended: true }));

app.use(cors({credentials: true, origin: env.CLIENT_URL, preflightContinue: true, methods: "GET,HEAD,PUT,PATCH,POST,DELETE"}));

import { AllEventRoutes } from './src/routes/event.routes'
AllEventRoutes(app);
import { AllOrganizerRoutes } from './src/routes/organizer.routes'
AllOrganizerRoutes(app);

const server = app.listen(port, () =>
    console.log(`Server is locked and loaded on port ${port}!`)
);