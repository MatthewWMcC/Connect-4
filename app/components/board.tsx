"use client";

import Tile from "@/app/components/tile";
import { AppContext } from "@/app/context/appContext";
import { initBoard } from "@/app/utils/constants";
import { IAppContext, ISocketContext } from "@/app/utils/types";
import { useContext, useState } from "react";
import { SocketContext } from "../context/socketContext";
import { useRoomId } from "../hooks/useRoomId";

export default function Board() {
  const { boardState, turnState, winnerState, playersState, idState } =
    useContext(AppContext) as IAppContext;
  const { socket } = useContext(SocketContext) as ISocketContext;

  const [board] = boardState;
  const [turn] = turnState;
  const [winner] = winnerState;
  const [players] = playersState;
  const [id] = idState;
  const [roomId] = useRoomId();

  const isYourTurn = () => {
    const currentPlayer = players[turn - 1];
    console.log(currentPlayer, id, players, turn);

    return !!currentPlayer && currentPlayer.id === id;
  };

  const makeMove = (column: number) => {
    socket?.emit("make-move", roomId, column);
  };

  const startGame = () => {
    socket?.emit("start-game", roomId);
  };

  return (
    <div>
      <div className="flex max-w-3xl gap-5 flex-col p-5 bg-blue-800 rounded-xl">
        {board.map((row, i) => {
          return (
            <div className="flex gap-5" key={i}>
              {row.map((value, j) => {
                return (
                  <Tile
                    value={value}
                    key={`${i}-${j}`}
                    onClick={() => isYourTurn() && makeMove(j)}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
      {winner !== 0 ? (
        <div>
          <h1>{`Player ${winner} is the winner!`}</h1>
        </div>
      ) : null}
      {turn === 0 ? <button onClick={startGame}>Start Game</button> : null}
    </div>
  );
}
