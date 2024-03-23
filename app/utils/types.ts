import { IPlayer } from "@/pages/api/types";
import { Dispatch, SetStateAction } from "react";
import { Socket } from "socket.io-client";

export interface DefaultEventsMap {
  [event: string]: (...args: any[]) => void;
}

export interface IAppContext {
  idState: [string, Dispatch<SetStateAction<string>>];
  boardState: [number[][], Dispatch<SetStateAction<number[][]>>];
  turnState: [number, Dispatch<SetStateAction<number>>];
  winnerState: [number, Dispatch<SetStateAction<number>>];
  playersState: [IPlayer[], Dispatch<SetStateAction<IPlayer[]>>];
}

export interface ISocketContext {
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | undefined;
}
