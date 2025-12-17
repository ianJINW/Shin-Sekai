import { useEffect } from "react"
import { io, Socket } from 'socket.io-client';
import envConfig from "../config/env.config";

export const socket: Socket = io(envConfig.baseRL, {
  autoConnect: false
})

const useSocket = (event: string, handler: (data: any) => void) => {

  useEffect(() => {
    socket.connect()

    socket.on(event, handler)

    return () => {
      socket.off(event, handler)
    }
  }, [event, handler])
}

export default useSocket