import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    likeCount: {
        type: Number,
        default: 0,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
    });

const comment = mongoose.model("Comment", commentSchema);

export default comment;