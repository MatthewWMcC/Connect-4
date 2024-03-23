import { DefaultEventsMap } from "@/app/utils/types";
import { Server } from "socket.io";

export const getRoomSize = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  roomId: string
) => {
  return io.sockets.adapter.rooms.get(roomId)?.size || 0;
};
