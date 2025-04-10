import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  media: {
    type: String,
    default: "",
  },
  commentsCount:{
    type: Number,
    default: 0,
  },
  likesCount: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true });

const post = mongoose.model("Post", postSchema);

export default post;
