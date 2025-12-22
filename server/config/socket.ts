import { Server, Socket } from "socket.io";
import { Message } from "../models/groupModel";
import User from "../models/userModel";

export function initSocket(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log("🟢 Client connected:", socket.id);

    socket.on("message", (msg: string) => {
      console.log("📨 Received message:", msg);
      io.emit("message", msg);
    });

    socket.on('joinGroup', groupId => {
      socket.join(groupId)
      console.info(`Joined room ${groupId} (socket ${socket.id})`)
    })

    socket.on('groupMessage', async ({ groupId, text, sender }) => {
      console.log('groupMessage', { groupId, len: typeof text === 'string' ? text.length : 0, sender });

      // Basic validation to avoid large payloads or bad input
      if (typeof text !== 'string' || text.trim().length === 0) {
        socket.emit('groupMessageError', { error: 'Message text required' });
        return;
      }

      if (text.length > 2000) {
        socket.emit('groupMessageError', { error: 'Message too long (max 2000 chars)' });
        return;
      }

      try {
        // find sender details to include username/avatar
        const user = sender ? await User.findById(sender).select('username image').lean() : null;

        const msg = new Message({ group: groupId, sender, text });
        await msg.save();

        io.to(groupId).emit("groupMessage", {
          _id: msg._id,
          text,
          sender: user ? { _id: user._id, username: user.username, image: user.image } : { _id: sender },
          timestamp: msg.createdAt.toISOString()
        });
      } catch (err) {
        console.error('Error handling groupMessage:', err);
        socket.emit('groupMessageError', { error: 'Failed to save message' });
      }
    })

    socket.on("disconnect", () => {
      console.log("🔴 Client disconnected:", socket.id);
    });
  });
}
