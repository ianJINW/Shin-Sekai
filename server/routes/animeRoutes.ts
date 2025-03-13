import express from "express";
const animeRouter = express.Router();
import { getAnimes, getPopularAnimes, getAnimeById, getTopAnimes, getUpcomingAnimes } from "../controllers/animeController";

animeRouter.get("/", getAnimes);

animeRouter.get("/popular", getPopularAnimes);

animeRouter.get("/top", getTopAnimes);

animeRouter.get("/upcoming", getUpcomingAnimes);

animeRouter.get("/:id", getAnimeById);

export default animeRouter;
