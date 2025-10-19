import mongoose from "mongoose";
import { Request, Response } from "express";
//import { animeModel } from '../models/animeModel';

const baseUrl = "https://api.jikan.moe/v4";

//all anime
export const getAnimes = async (req: Request, res: Response) => {
  try {
    const response = await fetch(`${baseUrl}/anime`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(404).json({ message: "An unknown error occurred" });
    }
  }
};

//get popular anime
export const getPopularAnimes = async (req: Request, res: Response) => {
  try {
    const response = await fetch(`${baseUrl}/top/anime?filter=bypopularity`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(404).json({ message: "An unknown error occurred" });
    }
  }
};

//get top anime
export const getTopAnimes = async (req: Request, res: Response) => {
  try {
    const response = await fetch(`${baseUrl}/top/anime`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(404).json({ message: "An unknown error occurred" });
    }
  }
};

//get upcoming anime
export const getUpcomingAnimes = async (req: Request, res: Response) => {
  try {
    const response = await fetch(`${baseUrl}/top/anime?filter=upcoming`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(404).json({ message: "An unknown error occurred" });
    }
  }
};

//get anime by id
export const getAnimeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await fetch(`${baseUrl}/anime/${id}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(404).json({ message: "An unknown error occurred" });
    }
  }
};

export const getAiringAnime = async (req: Request, res: Response) => {
  try {
    const response = await fetch(`${baseUrl}/top/anime?filter=airing`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(404).json({ message: "An unknown error occurred" });
    }
  }
};

export const getMovies = async (req: Request, res: Response) => {
  try {
    const response = await fetch(`${baseUrl}/top/anime?type=movie`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(404).json({ message: "An unknown error occurred" });
    }
  }
};

export const getTv = async (req: Request, res: Response) => {
  try {
    const response = await fetch(`${baseUrl}/top/anime?type=tv`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(404).json({ message: "An unknown error occurred" });
    }
  }
};

export const getGenres = async (req: Request, res: Response) => {
  try {
    const response = await fetch(`${baseUrl}/genre/anime`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(404).json({ message: "An unknown error occurred" });
    }
  }
};
