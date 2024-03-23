import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface DefaultEventsMap {
  [event: string]: (...args: any[]) => void;
}

export const useGetSocket = () => {
  const [socket, setSocket] = useState<Socket<DefaultEventsMap> | null>(null);
  console.log("useGetSOcket");
  useEffect(() => {
    const getSocket = async () => {
      console.log("getSOcket");
      await fetch("/api/socket");

      const socketClient = io();

      setSocket(socketClient);
    };
    getSocket();
  }, []);

  return {
    socket,
  };
};
