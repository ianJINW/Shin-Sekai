import { Request, Response } from "express";
import Post from "../models/postModel";
import { cloudinary } from "../middleware/multer";

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find();
    res.json({ posts, message: "すごいすごい" });
    return;
  } catch (error) {
    res.status(500).json({ message: `やめやめ, ${error}` });
    return;
  }
};

export const getPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    res.json({ post, message: "すごいすごい" });
    return;
  } catch (error) {
    res.status(500).json({ message: `やめやめ, ${error}` });
    return;
  }
};

export const creatPost = async (req: Request, res: Response) => {
  let media = ""
  const { title, content, user } = req.body;
  if (!user) {
    res.status(400).json({ message: "だめです" });
    return;
  }

 if (req.file) {
    const file = req.file;
    media = await new Promise<string>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ upload_preset: "art-gallery" }, (error, result) => {
          if (result) resolve(result.url);
          else reject(error);
        })
        .end(file.buffer);
    }).catch((error) => {
      res.status(500).json({ message: "Image upload failed", error });
      return "";
    });
  }

  try {
    const post = new Post({
      user,
      title,
      content,
      media,
    });

    await post.save();
    res.json({ post, message: "すごいすごい" });
    return;
  } catch (error) {
    res.status(500).json({ message: `だめだめ, ${error}` });
    return;
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content, media } = req.body;
  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { title, content, media },
      { new: true }
    );
    res.json({ post, message: "すごいすごい" });
    return;
  } catch (error) {
    res.status(500).json({ message: `だめだめ, ${error}` });
    return;
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Post.findByIdAndDelete(id);
    res.json({ message: "おめでと" });
    return;
  } catch (error) {
    res.status(500).json({ message: `だめだめ, ${error}` });
    return;
  }
};
