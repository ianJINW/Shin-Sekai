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

const app = express();
const frontend = process.env.FRONTEND_URL;
const PORT = process.env.PORT;

const server = createServer(app)

app.use(
	cors({
		origin: frontend,
		credentials: true,
	})
);

app.use(cookieParser())
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());

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

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
