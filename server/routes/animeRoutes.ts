import express from "express";
const animeRouter = express.Router();
import { getAnimes, getPopularAnimes } from "../controllers/animeController";

animeRouter.get("/", getAnimes);

animeRouter.get("/popular", getPopularAnimes);

export default animeRouter;
