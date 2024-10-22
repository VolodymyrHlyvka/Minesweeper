/* eslint-disable jest/no-conditional-expect */
import { placeMines } from "./placeMines";
import { createEmptyBoard } from "./createEmptyBoard";

jest.mock("./createEmptyBoard", () => ({
  createEmptyBoard: jest.fn(),
}));

describe("placeMines", () => {
  const boardSize = 10;
  const minesCount = 10;

  beforeEach(() => {
    const mockBoard = Array(boardSize)
      .fill(null)
      .map(() =>
        Array(boardSize)
          .fill(null)
          .map(() => ({ isMine: false }))
      );

    (createEmptyBoard as jest.Mock).mockReturnValue(mockBoard);
  });

  it("should place the correct number of mines on the board", () => {
    const board = createEmptyBoard(boardSize);

    placeMines(board, boardSize, minesCount);

    let mineCount = 0;
    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        if (board[row][col].isMine) {
          mineCount++;
        }
      }
    }

    expect(mineCount).toBe(minesCount);
  });

  it("should not place mines in the same cell more than once", () => {
    const board = createEmptyBoard(boardSize);

    placeMines(board, boardSize, minesCount);

    let mineLocations = new Set<string>();
    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        if (board[row][col].isMine) {
          const locationKey = `${row}-${col}`;
          expect(mineLocations.has(locationKey)).toBe(false);
          mineLocations.add(locationKey);
        }
      }
    }
  });
});
