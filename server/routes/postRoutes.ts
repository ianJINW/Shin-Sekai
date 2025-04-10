import {Router} from 'express';
import {getPosts, getPost, creatPost, updatePost,deletePost } from '../controllers/postController';
import uploads from '../middleware/multer';

const postRouter = Router();

postRouter.route('/').get(getPosts).post(uploads.single('media'), creatPost);

postRouter.route('/:id').get(getPost).put(updatePost).delete(deletePost);

export default postRouter;