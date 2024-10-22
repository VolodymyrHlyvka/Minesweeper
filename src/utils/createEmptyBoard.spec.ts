import { Cell } from "src/types/cell";
import { createEmptyBoard } from "./createEmptyBoard";

describe("createEmptyBoard", () => {
  it("should create a board with the correct size", () => {
    const boardSize = 10;

    const board: Cell[][] = createEmptyBoard(boardSize);

    expect(board.length).toBe(boardSize);
    board.forEach((row) => {
      expect(row.length).toBe(boardSize);
    });
  });

  it("should initialize all cells with the default values", () => {
    const boardSize = 10;

    const board: Cell[][] = createEmptyBoard(boardSize);

    board.forEach((row) => {
      row.forEach((cell) => {
        expect(cell.isRevealed).toBe(false);
        expect(cell.isMine).toBe(false);
        expect(cell.adjacentMines).toBe(0);
        expect(cell.markAsBomb).toBe(false);
      });
    });
  });
});
