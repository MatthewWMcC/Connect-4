const row = new Array(7).fill(0);
const column = new Array(6).fill(0);
export const initBoard = [...column.map((_) => [...row])] as number[][];

export const newGameData = { board: initBoard, turn: 0, winner: 0 };

export const newRoomData = { players: [], ...newGameData };
