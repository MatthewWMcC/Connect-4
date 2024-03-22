const row = new Array(7).fill(0);
const column = new Array(6).fill(0);
export const initBoard = [...column.map((_) => [...row])] as number[][];

export const newAppState = {
  id: "",
  roomId: "",
  gameState: [[]],
  turn: 0,
  winner: 0,
};
