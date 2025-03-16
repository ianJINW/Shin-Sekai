import { Router } from "express";

import { getComments, createComment, deleteComment } from "../controllers/commentController";


const commentRouter = Router();

commentRouter.route("/").get(getComments).post(createComment);

commentRouter.route("/:id").delete(deleteComment);

export default commentRouter;