import { Request, Response } from 'express';
import Post from '../models/postModel';


export const getPosts = async (req:Request, res:Response) => {
    try{
        const posts = await Post.find();
        res.json({posts, message: "これわ"});
        return
    } catch(error){
        res.status(500).json({ message: `やめやめ, ${error}` });
        return;
    }
}

export const creatPost = async (req: Request, res: Response) => {
    const { title, content, media,  user } = req.body;
    
    try{
        const post = new Post({
            user,
            title,
            content,
            media,
         
        });

        await post.save();
        res.json({ post, message: "これわ" });
        return;

    } catch (error) {
        res.status(500).json({ message: `だめだめ, ${error}` });
        return;
    }
}


