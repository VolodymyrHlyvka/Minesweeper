import { Cell } from "src/types/cell";
import { checkWinCondition } from "./checkWinCondition";
import { createEmptyBoard } from "./createEmptyBoard";

jest.mock("./createEmptyBoard", () => ({
  createEmptyBoard: jest.fn(),
}));

describe("checkWinCondition", () => {
  beforeEach(() => {
    const boardSize = 3;
    const mockBoard = Array(boardSize)
      .fill(null)
      .map(() =>
        Array(boardSize)
          .fill(null)
          .map(() => ({ isMine: false, adjacentMines: 0, isRevealed: false }))
      );

    (createEmptyBoard as jest.Mock).mockReturnValue(mockBoard);
  });

  it("should return true if all non-mine cells are revealed", () => {
    const boardSize = 3;
    const minesCount = 1;

    const board: Cell[][] = createEmptyBoard(boardSize);

    board[0][0].isMine = true;

    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        if (!board[row][col].isMine) {
          board[row][col].isRevealed = true;
        }
      }
    }

    const result = checkWinCondition(board, boardSize, minesCount);
    expect(result).toBe(true);
  });

  it("should return false if not all non-mine cells are revealed", () => {
    const boardSize = 3;
    const minesCount = 1;

    const board: Cell[][] = createEmptyBoard(boardSize);

    board[0][0].isMine = true;
    board[1][1].isRevealed = true;

    const result = checkWinCondition(board, boardSize, minesCount);

    expect(result).toBe(false);
  });
});
