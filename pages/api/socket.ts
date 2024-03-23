import { Server } from "socket.io";
import { IRoomData } from "./types";
import { newRoomData, newGameData } from "./constants";
import { getRoomSize } from "./helpers";
import { checkWinner, makeMove } from "./game-helpers";
import { NextApiRequest, NextApiResponse } from "next";

export default function SocketHandler(req: NextApiRequest, res: any) {
  if (res.socket?.server.io) {
    res.end();
    return;
  }
  const serverState = new Map<string, IRoomData>();

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", (socket) => {
    console.log(socket.id, " connected");
    socket.emit("set-id", socket.id);
    socket.on("join-room", (roomId) => {
      if (getRoomSize(io, roomId) >= 2) {
        socket.emit("room-full");
        return;
      }

      console.log(socket.id, "wants to join", roomId);
      socket.join(roomId);

      const currentRoomData = serverState.get(roomId);
      let roomData;
      if (currentRoomData === undefined) {
        roomData = {
          ...newRoomData,
          players: [{ id: socket.id }],
        };
      } else {
        roomData = {
          ...currentRoomData,
          players: [
            ...currentRoomData.players,
            {
              id: socket.id,
            },
          ],
        };
      }
      serverState.set(roomId, roomData);
      socket.emit("joined-room", roomData);
      socket.broadcast.emit("new-player", roomData.players);
    });
    socket.on("leave-room", (roomId) => {
      console.log(socket.id, "leaving");

      socket.leave(roomId);
      const currentRoomData = serverState.get(roomId);
      if (currentRoomData) {
        console.log(currentRoomData.players, "batman");
        serverState.set(roomId, {
          ...currentRoomData,
          players: currentRoomData.players.filter(({ id }) => id !== socket.id),
        });
      }
    });

    socket.on("start-game", (roomId) => {
      const currentRoomData = serverState.get(roomId);
      if (currentRoomData?.players.length === 2) {
        let roomData = { ...currentRoomData, ...newGameData, turn: 1 };
        serverState.set(roomId, roomData);
        io.in(roomId).emit("starting-game", roomData);
      }
    });

    socket.on("make-move", (roomId, column) => {
      const currentRoomData = serverState.get(roomId);
      if (currentRoomData) {
        const { board, players, turn } = currentRoomData;
        if (turn > 0 && players[turn - 1].id === socket.id) {
          const [newBoard, winner] = makeMove(board, column, turn);
          let newTurn = turn === 1 ? 2 : 1;
          if (winner) {
            newTurn = 0;
          }
          serverState.set(roomId, {
            ...currentRoomData,
            board: newBoard,
            turn: newTurn,
          });

          io.to(roomId).emit("made-move", newBoard, newTurn, winner);
        }
      }
    });
  });

  console.log("Setting up socket");
  res.end();
}
