import mongoose from "mongoose";
import { envConfig } from "./env.config";

const mongoURI = envConfig.mongoURI

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(mongoURI, {});
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (err: any) {
		console.error(`Error: ${err.message}`);
		process.exit(1);
	}
};

export default connectDB;
