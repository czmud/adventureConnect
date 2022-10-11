import 'dotenv/config';
import mongoose from "mongoose";
const mongoUri: string = process.env.MONGODB_URI!;

mongoose.connect(mongoUri)
	.then(() => console.log("Established a connection to the database"))
	.catch(err => console.log("Something went wrong when connecting to the database", err));