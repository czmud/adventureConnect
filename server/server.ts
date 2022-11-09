import 'jsonwebtoken';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import './src/config/mongoose.config';
import { env } from './src/util/environment';
import { AllEventRoutes } from './src/routes/event.routes';
import { AllOrganizerRoutes } from './src/routes/organizer.routes';

const app = express();
app.use(cookieParser());
const port = 8000;

app.use(express.json(), express.urlencoded({ extended: true }));

app.use(
	cors({
		credentials: true,
		origin: env.CLIENT_URL,
		preflightContinue: true,
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	}),
);

AllEventRoutes(app);
AllOrganizerRoutes(app);

app.listen(port, () => console.log(`Server is locked and loaded on port ${port}!`));
