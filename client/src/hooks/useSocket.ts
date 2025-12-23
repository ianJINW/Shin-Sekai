import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import envConfig from "../config/env.config";

export const socket: Socket = io(envConfig.baseRL, {
  autoConnect: false,
  transports: ['websocket'],
  withCredentials: true,
});

let socketInitialized = false;

// register built-in listeners once for the shared socket
if (!socketInitialized) {
  socketInitialized = true;

  socket.on("connect", () => {
    console.log("[socket] connected:", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.error("[socket] connection error:", err);
  });

  socket.on("disconnect", (reason) => {
    console.warn("[socket] disconnected:", reason);
  });

  socket.on("reconnect_attempt", (attempt) => {
    console.warn("[socket] reconnect attempt:", attempt);
  });

  socket.on("reconnect_error", (err) => {
    console.error("[socket] reconnect error:", err);
  });
}

const useSocket = (event: string, handler: (data: unknown) => void) => {
  useEffect(() => {
    // Log when hook runs
    console.log(`[useSocket] subscribing to event: "${event}"`);

    // Connect (only if not already)
    if (!socket.connected) {
      console.log("[socket] attempting to connect…");
      socket.connect();
    }

    // named listener so we can clean it up
    const listener = (data: unknown) => {
      console.log(`[socket] received "${event}":`, data);
      handler(data);
    };

    socket.on(event, listener);

    return () => {
      console.log(`[useSocket] unsubscribing from event: "${event}"`);
      socket.off(event, listener);
    };
  }, [event, handler]);
};

export default useSocket;
