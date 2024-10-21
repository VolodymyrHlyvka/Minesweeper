import { Cell } from "src/types/cell";

export const checkWinCondition = (
  board: Cell[][],
  boardSize: number,
  minesCount: number
) => {
  const nonBombCells = boardSize * boardSize - minesCount;
  const totalRevealeveCells = board.reduce((acc: number, row: Cell[]) => {
    const revealedRowCells = row.filter((item) => item.isRevealed);
    acc += revealedRowCells.length;
    return acc;
  }, 0);
  return nonBombCells === totalRevealeveCells;
};
