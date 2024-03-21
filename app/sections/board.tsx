"use client"

import { useState } from "react"
import Tile from "../components/tile"
import { checkWinner } from "../utils/board-helpers"

export default function Board() {
    const width = 7
    const height = 6
    const row = new Array(7).fill(0)
    const column = new Array(6).fill(0)
    const initGameState = [...column.map(_ => [...row])]

    const [gameState, setGameState] = useState<number[][]>(initGameState)
    const [turn, setTurn] = useState(0)
    const [winner, setWinner] = useState(0)

    const makeMove = (j: number) => {
        const i = gameState.findLastIndex((row) => {
            return row[j] === 0
        })

        if (i > -1) {
            const newGameState = gameState.map((row, x) => {
                if (x === i) {
                    return row.map((col, y) => {
                        if (y === j) {
                            return turn
                        } else return col
                    })
                } else return row
            })
            setGameState(newGameState)
            setTurn(turn === 1 ? 2 : 1)
            const winner = checkWinner(newGameState, i, j)
            if (winner) {
                setWinner(winner)
                setTurn(0)
            }
        }

    }

    const startGame = () => {
        setTurn(1)
        setWinner(0)
        setGameState(initGameState)
    }


    return <div>
        <div className="flex max-w-3xl gap-5 flex-col p-5 bg-blue-800 rounded-xl">
            {gameState.map((row, i) => {
                return <div className="flex gap-5" key={i}>
                    {row.map((value, j) => {
                        return <Tile value={value} key={`${i}-${j}`} onClick={() => turn !== 0 && makeMove(j)} />
                    })}
                </div>

            })}
        </div>
        {winner !== 0 ? <div>
            <h1>{`Player ${winner} is the winner!`}</h1>
        </div> : null}
        {turn === 0 ? <button onClick={startGame}>Start Game</button> : null}

    </div>


}