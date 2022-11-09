import mongoose from 'mongoose';
import { env } from '../util/environment';

mongoose
	.connect(env.MONGODB_URI)
	.then(() => console.log('Established a connection to the database'))
	.catch((err) => console.log('Something went wrong when connecting to the database', err));
