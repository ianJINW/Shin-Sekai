import { Router } from "express";

import { likeItem, unlikeItem, getLikes } from "../controllers/likesController";

const router = Router();

router.route("/itemId").post(likeItem).delete(unlikeItem);

router.route("/").get(getLikes);

export default router;