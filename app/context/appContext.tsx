"use client";

import { ReactNode, createContext, useEffect, useState } from "react";
import { initBoard } from "../utils/constants";
import { IAppContext } from "../utils/types";
import uniqid from "uniqid";
import { IPlayer } from "@/pages/api/types";

export const AppContext = createContext<IAppContext | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [board, setBoard] = useState(initBoard);
  const [turn, setTurn] = useState(0);
  const [winner, setWinner] = useState(0);
  const [players, setPlayers] = useState(new Array<IPlayer>());
  const [id, setId] = useState("");

  return (
    <AppContext.Provider
      value={{
        idState: [id, setId],
        boardState: [board, setBoard],
        turnState: [turn, setTurn],
        winnerState: [winner, setWinner],
        playersState: [players, setPlayers],
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
