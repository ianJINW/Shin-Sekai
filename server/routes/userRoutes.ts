import { Router } from "express";
import {
  authCheck,
  deleteUser,
  getUser,
  getUsers,
  login,
  register,
  updateUser,
} from "../controllers/userController";
import uploads from "../middleware/multer";

const userRouter = Router();

userRouter.route("/").get(getUsers).post(uploads.single("profile"), register);
userRouter.get('/auth', authCheck)
userRouter.route("/login").post(login);
userRouter
  .route("/:id")
  .get(getUser)
  .put(uploads.single("profile"), updateUser)
  .delete(deleteUser);

export default userRouter;
