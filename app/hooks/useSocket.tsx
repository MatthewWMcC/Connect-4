import { Socket, io } from "socket.io-client";
import { DefaultEventsMap } from "../utils/types";
import { useEffect, useState } from "react";

export default function useSocket() {
  const [socket, setSocket] =
    useState<Socket<DefaultEventsMap, DefaultEventsMap>>();

  useEffect(() => {
    const getSocket = async () => {
      await fetch("/api/socket");

      const socketInstance = io();

      socketInstance.once("connect", () => {
        setSocket(socketInstance);
      });
    };

    getSocket();
  }, []);

  return [socket];
}
