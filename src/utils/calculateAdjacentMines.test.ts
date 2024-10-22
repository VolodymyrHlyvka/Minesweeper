/* eslint-disable jest/no-conditional-expect */
import { Cell } from "src/types/cell";
import { calculateAdjacentMines } from "./calculateAdjacentMines";
import { createEmptyBoard } from "./createEmptyBoard";

jest.mock("./createEmptyBoard", () => ({
  createEmptyBoard: jest.fn(),
}));

describe("calculateAdjacentMines", () => {
  const boardSize = 10;

  beforeEach(() => {
    const mockBoard = Array(boardSize)
      .fill(null)
      .map(() =>
        Array(boardSize)
          .fill(null)
          .map(() => ({ isMine: false, adjacentMines: 0 }))
      );

    (createEmptyBoard as jest.Mock).mockReturnValue(mockBoard);
  });

  it("should correctly count adjacent mines for each cell", () => {
    const boardSize = 3;

    const board: Cell[][] = createEmptyBoard(boardSize);
    board[1][1].isMine = true;

    calculateAdjacentMines(board, boardSize);

    const expectedAdjacentMines = [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
    ];

    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        if (!board[row][col].isMine) {
          expect(board[row][col].adjacentMines).toBe(
            expectedAdjacentMines[row][col]
          );
        }
      }
    }
  });

  it("should not change adjacentMines for cells that are mines", () => {
    const boardSize = 3;

    const board: Cell[][] = createEmptyBoard(boardSize);
    board[0][0].isMine = true;

    calculateAdjacentMines(board, boardSize);

    expect(board[0][0].adjacentMines).toBe(0);
  });
});
