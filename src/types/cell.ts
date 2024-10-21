export type Cell = {
  isRevealed: boolean;
  isMine: boolean;
  adjacentMines: number;
  markAsBomb: boolean;
};
