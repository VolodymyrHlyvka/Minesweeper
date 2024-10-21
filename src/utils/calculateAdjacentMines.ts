import { DIRECTIONS } from "src/const/columnDirection";
import { Cell } from "src/types/cell";

export const calculateAdjacentMines = (board: Cell[][], boardSize: number) => {
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      if (board[row][col].isMine) continue;

      let minesCount = 0;
      DIRECTIONS.forEach(([dx, dy]) => {
        const newRow = row + dx;
        const newCol = col + dy;
        if (
          newRow >= 0 &&
          newRow < boardSize &&
          newCol >= 0 &&
          newCol < boardSize
        ) {
          if (board[newRow][newCol].isMine) minesCount++;
        }
      });

      board[row][col].adjacentMines = minesCount;
    }
  }
};
