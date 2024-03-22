"use client";

import { ReactNode, createContext, useState } from "react";
import { initBoard, newAppState } from "../utils/constants";
import { IAppContext, IAppState } from "../utils/types";
import socketClient from "../socket/socket-client";

export const AppContext = createContext<IAppContext | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [board, setBoard] = useState(initBoard);
  const [turn, setTurn] = useState(0);
  const [winner, setWinner] = useState(0);

  return (
    <AppContext.Provider
      value={{
        boardState: [board, setBoard],
        turnState: [turn, setTurn],
        winnerState: [winner, setWinner],
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
