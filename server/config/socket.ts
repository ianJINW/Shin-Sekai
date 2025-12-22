import { Server, Socket } from "socket.io";
import { Message } from "../models/groupModel";
import User from "../models/userModel";
import { logger } from "../utils/logger";

export function initSocket(io: Server) {
  io.on("connection", (socket: Socket) => {
    logger.info({ socketId: socket.id }, 'Socket client connected');

    socket.on("message", (msg: string) => {
      logger.info({ msg }, 'Socket received message');
      io.emit("message", msg);
    });

    socket.on('joinGroup', groupId => {
      socket.join(groupId)
      logger.info({ groupId, socketId: socket.id }, `Joined room ${groupId}`)
    })

    socket.on('groupMessage', async ({ groupId, text, sender }) => {
      logger.debug({ groupId, len: typeof text === 'string' ? text.length : 0, sender }, 'groupMessage received');

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
        logger.error({ err }, 'Error handling groupMessage');
        socket.emit('groupMessageError', { error: 'Failed to save message' });
      }
    })

    socket.on("disconnect", () => {
      logger.info({ socketId: socket.id }, 'Socket client disconnected');
    });
  });
}
