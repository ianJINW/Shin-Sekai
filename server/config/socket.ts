import { Server, Socket } from "socket.io";

export function initSocket(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log("🟢 Client connected:", socket.id);

    socket.on("message", (msg: string) => {
      console.log("📨 Received message:", msg);
      io.emit("message", msg); // broadcast to all clients
    });

    socket.on("disconnect", () => {
      console.log("🔴 Client disconnected:", socket.id);
    });
  });
}
