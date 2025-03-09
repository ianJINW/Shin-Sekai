import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import  animeRouter from './routes/animeRoutes';

const app = express();

app.use(express.json());

app.use("/api/anime", animeRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    });