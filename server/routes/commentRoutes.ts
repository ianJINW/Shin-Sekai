import { Router } from "express";

import { getComments, createComment, deleteComment, getCommentsByPost, getComment, updateComment } from "../controllers/commentController";

const commentRouter = Router();

commentRouter.route("/").get(getComments).post(createComment);

// get comments for a specific post
commentRouter.route("/post/:post").get(getCommentsByPost);

// comment operations
commentRouter.route("/:id").get(getComment).put(updateComment).delete(deleteComment);

export default commentRouter;