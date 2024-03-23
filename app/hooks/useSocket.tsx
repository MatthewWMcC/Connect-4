import { Socket, io } from "socket.io-client";
import { DefaultEventsMap, IAppContext } from "../utils/types";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/appContext";
import { IRoomData } from "@/pages/api/types";

export default function useSocket() {
  const [socket, setSocket] =
    useState<Socket<DefaultEventsMap, DefaultEventsMap>>();

  const { boardState, turnState, winnerState } = useContext(
    AppContext
  ) as IAppContext;

  const [board, setBoard] = boardState;
  const [winner, setWinner] = winnerState;
  const [turn, setTurn] = turnState;

  useEffect(() => {
    const getSocket = async () => {
      await fetch("/api/socket");

      const socket = io();

      socket.once("connect", () => {
        setSocket(socket);
      });
      socket.on("joined-room", (roomData: IRoomData) => {
        setBoard(roomData.board);
        setTurn(roomData.turn);
        setWinner(roomData.winner);
        console.log(roomData);
      });
    };

    getSocket();
  }, []);

  return [socket];
}
