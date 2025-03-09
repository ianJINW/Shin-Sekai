import express from 'express';
const router = express.Router();
import { getAnimes, getPopularAnimes } from '../controllers/animeController';


router.get('/', getAnimes);

router.get('/popular', getPopularAnimes);


export default router;