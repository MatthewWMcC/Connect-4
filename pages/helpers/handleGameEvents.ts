import { Server, Socket } from "socket.io";

interface DefaultEventsMap {
  [event: string]: (...args: any[]) => void;
}

export const handleGameEvents = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  roomId: string
) => {
  socket.on;
};
