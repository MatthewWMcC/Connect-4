export interface IPlayer {
  id: string;
}

export interface IRoomData {
  board: number[][];
  winner: number;
  turn: number;
  players: IPlayer[];
}
