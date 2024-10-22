import { Cell } from "src/types/cell";

export const placeMines = (
  board: Cell[][],
  boardSize: number,
  minesCount: number
) => {
  let minesPlaced = 0;
  while (minesPlaced < minesCount) {
    const row = Math.floor(Math.random() * boardSize);
    const col = Math.floor(Math.random() * boardSize);

    if (!board[row][col].isMine) {
      board[row][col].isMine = true;
      minesPlaced++;
    }
  }
};
