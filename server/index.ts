import express from "express";
import * as dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import helmet from "helmet";
import passport from "passport";
import cookieParser from 'cookie-parser'

import connectDB from "./config/db";
import userRouter from "./routes/userRoutes";
import animeRouter from "./routes/animeRoutes";
import postRouter from "./routes/postRoutes";
import commentRouter from "./routes/commentRoutes";
import groupRouter from "./routes/groupRoutes";
import likeRouter from "./routes/likesRoutes";
import { createServer, Server } from "http";
import { Server as socketServer } from "socket.io";
import { initSocket } from "./config/socket";
import { httpLogger, logger } from "./utils/logger";

const app = express();
const frontend = process.env.FRONTEND_URL;
const PORT = parseInt(process.env.PORT || '8080', 10);

const server = createServer(app)

app.use(
	cors({
		origin: frontend,
		credentials: true,
	})
);

app.use(httpLogger)

app.use(cookieParser())
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use((err: any, req: any, res: any, next: any) => {
	req.log.error({
		err,
		msg: err.message,
		method: req.method,
		url: req.originalUrl,
		status: res.statusCode
	}, "Unhandled error");

	res.status(500).json({ error: "Internal Server Error" });
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/anime", animeRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/groups", groupRouter);
app.use("/api/v1/likes", likeRouter);

const io = new socketServer(server, {
	cors: {
		origin: process.env.FRONTEND_URL,
		methods: ["GET", "POST"],
		credentials: true,
	},
	cookie: true
})

connectDB();
initSocket(io)

server.listen(PORT, '0.0.0.0', () => {
	logger.info({ port: PORT }, `Server running`);
});

// graceful shutdown and error handlers
process.on('uncaughtException', (err) => {
	logger.error({ err }, 'Uncaught Exception');
	process.exit(1);
});

process.on('unhandledRejection', (reason) => {
	logger.error({ reason }, 'Unhandled Rejection');
});

process.on('SIGTERM', () => {
	logger.info('SIGTERM received, shutting down');
	server.close(() => process.exit(0));
});
