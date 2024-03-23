import { Socket, io } from "socket.io-client";
import { DefaultEventsMap, IAppContext } from "../utils/types";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/appContext";
import { IPlayer, IRoomData } from "@/pages/api/types";
import { useRouter } from "next/navigation";

export default function useSocket() {
  const [socket, setSocket] =
    useState<Socket<DefaultEventsMap, DefaultEventsMap>>();

  const { boardState, turnState, winnerState, playersState, idState } =
    useContext(AppContext) as IAppContext;

  const [board, setBoard] = boardState;
  const [winner, setWinner] = winnerState;
  const [turn, setTurn] = turnState;
  const [id, setId] = idState;
  const [players, setPlayers] = playersState;
  const router = useRouter();

  useEffect(() => {
    const getSocket = async () => {
      await fetch("/api/socket");

      const socket = io();

      socket.once("connect", () => {
        setSocket(socket);
      });
      socket.on("set-id", (id) => {
        setId(id);
      });
      socket.on("joined-room", (roomData: IRoomData) => {
        setBoard(roomData.board);
        setTurn(roomData.turn);
        setWinner(roomData.winner);
        setPlayers(roomData.players);
        console.log(roomData);
      });
      socket.on("new-player", (players: IPlayer[]) => {
        setPlayers(players);
      });
      socket.on("room-full", () => {
        router.push("/");
      });
      socket.on("starting-game", (roomData: IRoomData) => {
        setBoard(roomData.board);
        setTurn(roomData.turn);
        setWinner(roomData.winner);
      });
      socket.on("made-move", (board, turn, winner) => {
        setBoard(board);
        setTurn(turn);
        setWinner(winner);
      });
    };

    getSocket();
  }, []);

  return [socket];
}
