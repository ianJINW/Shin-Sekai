import { Request, Response } from "express";
import Post from "../models/postModel";
import Like from "../models/likesModel";
import Comment from "../models/commentModel";

export const likeItem = async (req: Request, res: Response) => {
  const { itemId, type, user } = req.body;

  try {
    const existingLike = await Like.findOne({ itemId, userId: user, type });

    if (existingLike) {
       res.status(400).json({ message: "Already liked" });
    }

    const newLike = new Like({ itemId, userId: user, type });
    await newLike.save();

    if (type == "post"){
        await Post.findByIdAndUpdate(itemId, { $inc: { likesCount: 1 } });
    } else if (type == "comment"){
        await Comment.findByIdAndUpdate(itemId, { $inc: { likesCount: 1 } });
    }
    res.json({ message: "Liked successfully" });

  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const unlikeItem = async (req: Request, res: Response) => {
    const { itemId, type, user } = req.body;
    try{
        const existingLike = await Like.findOne({ itemId, userId: user, type });

        if (!existingLike) {
             res.status(400).json({ message: "Not liked yet" });
        }

        await Like.deleteOne({ itemId, userId: user, type });

        if (type == "post"){
            await Post.findByIdAndUpdate(itemId, { $inc: { likesCount: -1 } });
        } else if (type == "comment"){
            await Comment.findByIdAndUpdate(itemId, { $inc: { likesCount: -1 } });
        }
        res.json({ message: "Unliked successfully" });
    
    } catch(err) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getLikes = async (req: Request, res: Response) => {
    const { itemId, type } = req.body;
    try {
        const likes = await Like.find({ itemId, type });
        res.status(200).json(likes);
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
}


