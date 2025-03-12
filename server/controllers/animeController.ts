import mongoose from 'mongoose';
import { Request, Response } from 'express';
//import { animeModel } from '../models/animeModel';

const baseUrl = "https://api.jikan.moe/v4";


export const getAnimes = async (req: Request, res: Response) => {
  try {
    const response = await fetch(`${baseUrl}/anime`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(404).json({ message: 'An unknown error occurred' });
    }
  }
};

export const getPopularAnimes = async (req: Request, res: Response) => {
    try {
        const response = await fetch(
          `${baseUrl}/top/anime?filter=bypopularity`
        );
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        if (error instanceof Error) {
        res.status(404).json({ message: error.message });
        } else {
        res.status(404).json({ message: 'An unknown error occurred' });
        }
    }
    }

    