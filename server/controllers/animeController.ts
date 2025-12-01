import mongoose from "mongoose";
import { Request, Response } from "express";
import { envConfig } from "../config/env.config";
//import { animeModel } from '../models/animeModel';
import axios from 'axios';

const baseUrl = envConfig.jikan_api;

//all anime
export const getAnimes = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${baseUrl}/anime`);
    console.log("Data ", response);

    res.status(200).json(response.data);
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
    const response = await axios.get(`${baseUrl}/top/anime?filter=bypopularity`);
    console.log("Data ", response);

    res.status(200).json(response.data);
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
    const response = await axios.get(`${baseUrl}/top/anime`);
    console.log("Data ", response);

    res.status(200).json(response.data);
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
    const response = await axios.get(`${baseUrl}/top/anime?filter=upcoming`);
    console.log("Data ", response);

    res.status(200).json(response.data);
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
    const response = await axios.get(`${baseUrl}/anime/${id}`);
    console.log("Data ", response);

    res.status(200).json(response.data);
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
    const response = await axios.get(`${baseUrl}/top/anime?filter=airing`);
    console.log("Data ", response);

    res.status(200).json(response.data);
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
    const response = await axios.get(`${baseUrl}/top/anime?type=movie`);
    console.log("Data ", response);

    res.status(200).json(response.data);
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
    const response = await axios.get(`${baseUrl}/top/anime?type=tv`);
    console.log("Data ", response);

    res.status(200).json(response.data);
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
    const response = await axios.get(`${baseUrl}/genre/anime`);
    console.log("Data ", response);

    res.status(200).json(response.data);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(404).json({ message: "An unknown error occurred" });
    }
  }
};
