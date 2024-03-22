import { Dispatch, SetStateAction } from "react";

export interface IAppState {
  id: string;
  roomId: string;
  gameState: number[][];
  turn: number;
  winner: number;
}

export interface IAppContext {
  boardState: [number[][], Dispatch<SetStateAction<number[][]>>];
  turnState: [number, Dispatch<SetStateAction<number>>];
  winnerState: [number, Dispatch<SetStateAction<number>>];
}
