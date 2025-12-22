import mongoose from "mongoose";
import { envConfig } from "./env.config";
import { logger } from "../utils/logger";

const mongoURI = envConfig.mongoURI

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(mongoURI, {});
		logger.info({ host: conn.connection.host }, `MongoDB Connected`);
	} catch (err: any) {
		logger.error({ err }, `MongoDB connection error`);
		process.exit(1);
	}
};

export default connectDB;
