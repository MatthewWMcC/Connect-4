"use client";

import Tile from "@/app/components/tile";
import { AppContext } from "@/app/context/appContext";
import { checkWinner } from "@/app/utils/board-helpers";
import { initBoard } from "@/app/utils/constants";
import { IAppContext } from "@/app/utils/types";
import { useContext, useState } from "react";

export default function Board() {
  const { boardState, turnState, winnerState } = useContext(
    AppContext
  ) as IAppContext;

  const [board, setBoard] = boardState;
  const [turn, setTurn] = turnState;
  const [winner, setWinner] = winnerState;

  const makeMove = (j: number) => {
    const i = board.findLastIndex((row) => {
      return row[j] === 0;
    });

    if (i > -1) {
      const newboard = board.map((row, x) => {
        if (x === i) {
          return row.map((col, y) => {
            if (y === j) {
              return turn;
            } else return col;
          });
        } else return row;
      });
      setBoard(newboard);
      setTurn(turn === 1 ? 2 : 1);
      const winner = checkWinner(newboard, i, j);
      if (winner) {
        setWinner(winner);
        setTurn(0);
      }
    }
  };

  const startGame = () => {
    setTurn(1);
    setWinner(0);
    setBoard(initBoard);
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
                    onClick={() => turn !== 0 && makeMove(j)}
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
