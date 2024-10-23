import { DIRECTIONS } from "src/const/columnDirection";
import { Cell } from "src/types/cell";

export const revealEmptyCells = (board: Cell[][], row: number, col: number) => {
  DIRECTIONS.forEach(([dx, dy]) => {
    const newRow = row + dx;
    const newCol = col + dy;
    if (
      newRow >= 0 &&
      newRow < board.length &&
      newCol >= 0 &&
      newCol < board.length &&
      !board[newRow][newCol].isRevealed
    ) {
      board[newRow][newCol].isRevealed = true;
      if (board[newRow][newCol].adjacentMines === 0) {
        revealEmptyCells(board, newRow, newCol);
      }
    }
  });
};
