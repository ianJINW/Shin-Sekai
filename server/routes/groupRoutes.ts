import { Router } from "express";
import { createGroup, getGroups, joinGroup } from "../controllers/groupController";

const router = Router();

router.route("/").get(getGroups).post(createGroup);

router.route("/:groupId/join").post(joinGroup);

export default router;