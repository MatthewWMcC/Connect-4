export interface IPlayer {
  id: string;
  index: number;
}

export interface IRoomData {
  board: number[][];
  winner: number;
  turn: number;
  playerList: IPlayer[];
}
