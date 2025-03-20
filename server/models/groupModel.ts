import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500,
  },
  image: {
    type: String,
    default: "",
  },
  members: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      role: {
        type: String,
        enum: ["member", "admin", "owner"], // Role-based system
        default: "member",
      },
      joinedAt: { type: Date, default: Date.now },
    },
  ],
  postsCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});



const groupModel = mongoose.model("Group", groupSchema);

export default groupModel;
