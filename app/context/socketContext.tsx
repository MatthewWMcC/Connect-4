"use client";

import { ReactNode, createContext, useEffect, useState } from "react";
import { ISocketContext } from "../utils/types";
import useSocket from "../hooks/useSocket";

export const SocketContext = createContext<ISocketContext | null>(null);

export const SocketProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [socket] = useSocket();

  return (
    <SocketContext.Provider
      value={{
        socket: socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
