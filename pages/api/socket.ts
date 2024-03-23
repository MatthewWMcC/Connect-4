import { Server } from "socket.io";
import { handleGameEvents } from "../helpers/handleGameEvents";
import { IRoomData } from "./types";
import { newRoomData } from "./constants";

export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    res.end();
    return;
  }
  const serverState = new Map<string, IRoomData>();

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", (socket) => {
    console.log(socket.id, " connected");
    socket.on("join-room", (roomId) => {
      console.log(socket.id, "wants to join");
      socket.join(roomId);

      const currentRoomData = serverState.get(roomId);
      let roomData;
      if (currentRoomData === undefined) {
        roomData = {
          ...newRoomData,
          playerList: [{ id: socket.id, index: 0 }],
        };
      } else {
        roomData = {
          ...currentRoomData,
          playerList: [
            ...currentRoomData.playerList,
            {
              id: socket.id,
              index: 1,
            },
          ],
        };
      }
      serverState.set(roomId, roomData);
      console.log(roomData.playerList);
    });
    // socket.on("leave-room", (roomId) => {
    //   const currentRoomData = serverState.get(roomId);
    //   if (currentRoomData) {
    //     console.log(currentRoomData.playerList);
    //     serverState.set(roomId, {
    //       ...currentRoomData,
    //       playerList: currentRoomData.playerList.filter(
    //         ({ id }) => id !== socket.id
    //       ),
    //     });
    //   }
    // });
  });

  console.log("Setting up socket");
  res.end();
}
