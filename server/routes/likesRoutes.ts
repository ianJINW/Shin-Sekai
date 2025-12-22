import { Router } from "express";

import { likeItem, unlikeItem, getLikes } from "../controllers/likesController";

const router = Router();

// expect item info in the request body (itemId, type, user)
router.route("/item").post(likeItem).delete(unlikeItem);

router.route("/").get(getLikes);

export default router;