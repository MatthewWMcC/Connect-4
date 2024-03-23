import { Dispatch, SetStateAction } from "react";
import { Socket } from "socket.io-client";

export interface IAppState {
  id: string;
  roomId: string;
  gameState: number[][];
  turn: number;
  winner: number;
}

export interface DefaultEventsMap {
  [event: string]: (...args: any[]) => void;
}

export interface IAppContext {
  boardState: [number[][], Dispatch<SetStateAction<number[][]>>];
  turnState: [number, Dispatch<SetStateAction<number>>];
  winnerState: [number, Dispatch<SetStateAction<number>>];
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | undefined;
}
