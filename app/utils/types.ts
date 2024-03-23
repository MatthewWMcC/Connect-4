import { Dispatch, SetStateAction } from "react";
import { Socket } from "socket.io-client";

export interface DefaultEventsMap {
  [event: string]: (...args: any[]) => void;
}

export interface IAppContext {
  id: string;
  boardState: [number[][], Dispatch<SetStateAction<number[][]>>];
  turnState: [number, Dispatch<SetStateAction<number>>];
  winnerState: [number, Dispatch<SetStateAction<number>>];
}

export interface ISocketContext {
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | undefined;
}
