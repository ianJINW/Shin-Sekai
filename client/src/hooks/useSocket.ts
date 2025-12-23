import { useEffect, useRef } from "react";
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
  const handlerRef = useRef(handler);

  // keep a stable reference to the handler
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
  // connect once
    if (!socket.connected) {
      socket.connect();
    }

    const listener = (data: unknown) => {
      handlerRef.current(data);
    };

    socket.on(event, listener);

    return () => {
      socket.off(event, listener);
    };
  }, [event]);
};


export default useSocket;
