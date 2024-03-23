"use client";

import { ReactNode, createContext, useEffect, useState } from "react";
import { initBoard } from "../utils/constants";
import { IAppContext } from "../utils/types";
import uniqid from "uniqid";

export const AppContext = createContext<IAppContext | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [board, setBoard] = useState(initBoard);
  const [turn, setTurn] = useState(0);
  const [winner, setWinner] = useState(0);
  const id = uniqid();

  return (
    <AppContext.Provider
      value={{
        id: id,
        boardState: [board, setBoard],
        turnState: [turn, setTurn],
        winnerState: [winner, setWinner],
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
