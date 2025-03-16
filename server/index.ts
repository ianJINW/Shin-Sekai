import express from "express";
import * as dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import helmet from "helmet";
import passport from "passport";

import connectDB from "./config/db";
import userRouter from "./routes/userRoutes";
import animeRouter from "./routes/animeRoutes";
import postRouter from "./routes/postRoutes";
import commentRouter from "./routes/commentRoutes";

const app = express();
const frontend = process.env.FRONTEND_URL;
const PORT = process.env.PORT;

app.use(
  cors({
    origin: frontend,
    credentials: true,
  })
);

connectDB();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/anime", animeRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/comments", commentRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
