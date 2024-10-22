import { Cell } from "src/types/cell";

export const createEmptyBoard = (boardSize: number): Cell[][] => {
  return Array.from({ length: boardSize }, () =>
    Array.from({ length: boardSize }, () => ({
      isRevealed: false,
      isMine: false,
      adjacentMines: 0,
      markAsBomb: false,
    }))
  );
};
