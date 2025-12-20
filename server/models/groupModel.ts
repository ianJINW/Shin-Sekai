import mongoose, { Schema } from "mongoose";

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
        default: "member",
      },
      joinedAt: { type: Date, default: Date.now },
    },
  ],
  postsCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const messageSchema = new Schema({
  group: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true }
}, { timestamps: true });

const groupModel = mongoose.model("Group", groupSchema);
const Message = mongoose.model("Message", messageSchema);

export default groupModel;
export { Message }