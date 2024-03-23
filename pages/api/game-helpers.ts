export const makeMove = (
  board: number[][],
  j: number,
  turn: number
): [number[][], number] => {
  const i = board.findLastIndex((row) => {
    return row[j] === 0;
  });

  if (i > -1) {
    const newBoard = board.map((row, x) => {
      if (x === i) {
        return row.map((col, y) => {
          if (y === j) {
            return turn;
          } else return col;
        });
      } else return row;
    });

    const winner = checkWinner(newBoard, i, j);
    return [newBoard, winner];
  }
  return [board, 0];
};

const isValidTile = (boardState: number[][], i: number, j: number) => {
  return boardState[i] !== undefined && boardState[i][j] !== undefined;
};

export const checkWinner = (boardState: number[][], i: number, j: number) => {
  const currentTile = boardState[i][j];

  let horizontalCount = 0;
  for (let x = j - 3; x <= j + 3; x++) {
    if (boardState[i][x] !== undefined && boardState[i][x] === currentTile) {
      horizontalCount++;
      if (horizontalCount === 4) {
        return currentTile;
      }
    } else {
      horizontalCount = 0;
    }
  }

  let vertCount = 0;
  for (let y = i - 3; y <= i + 3; y++) {
    if (isValidTile(boardState, y, j) && boardState[y][j] === currentTile) {
      vertCount++;
      if (vertCount === 4) {
        return currentTile;
      }
    } else {
      vertCount = 0;
    }
  }

  let leftDiagCount = 0;
  for (let xy = -3; xy <= 3; xy++) {
    if (
      isValidTile(boardState, i + xy, j + xy) &&
      boardState[i + xy][j + xy] === currentTile
    ) {
      leftDiagCount++;
      if (leftDiagCount === 4) {
        return currentTile;
      }
    } else {
      leftDiagCount = 0;
    }
  }

  let rightDiagCount = 0;
  for (let yx = -3; yx <= 3; yx++) {
    if (
      isValidTile(boardState, i + yx, j - yx) &&
      boardState[i + yx][j - yx] === currentTile
    ) {
      rightDiagCount++;
      if (rightDiagCount === 4) {
        return currentTile;
      }
    } else {
      rightDiagCount = 0;
    }
  }

  return 0;
};
