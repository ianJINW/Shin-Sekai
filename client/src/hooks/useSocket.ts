import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import envConfig from "../config/env.config";

export const socket: Socket = io(envConfig.baseRL, {
  autoConnect: false,
});

const useSocket = (event: string, handler: (data: any) => void) => {
  useEffect(() => {
    // Log when hook runs
    console.log(`[useSocket] subscribing to event: "${event}"`);

    // Connect (only if not already)
    if (!socket.connected) {
      console.log("[socket] attempting to connect…");
      socket.connect();
    }

    // Log built‑in socket events
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

    // Your specific event
    socket.on(event, (data) => {
      console.log(`[socket] received "${event}":`, data);
      handler(data);
    });

    return () => {
      console.log(`[useSocket] unsubscribing from event: "${event}"`);
      socket.off(event, handler);
    };
  }, [event, handler]);
};

export default useSocket;
