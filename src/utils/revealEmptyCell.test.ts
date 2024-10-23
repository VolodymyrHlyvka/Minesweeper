import { revealEmptyCells } from "./revealEmptyCells";
import { Cell } from "src/types/cell";

describe("revealEmptyCells", () => {
  it("should reveal connected empty cells", () => {
    const board: Cell[][] = [
      [
        {
          isRevealed: false,
          isMine: false,
          adjacentMines: 0,
          markAsBomb: false,
        },
        {
          isRevealed: false,
          isMine: false,
          adjacentMines: 0,
          markAsBomb: false,
        },
      ],
      [
        {
          isRevealed: false,
          isMine: false,
          adjacentMines: 0,
          markAsBomb: false,
        },
        {
          isRevealed: false,
          isMine: false,
          adjacentMines: 0,
          markAsBomb: false,
        },
      ],
    ];

    revealEmptyCells(board, 1, 1);

    expect(board[0][0].isRevealed).toBe(true);
    expect(board[0][1].isRevealed).toBe(true);
    expect(board[1][0].isRevealed).toBe(true);
    expect(board[1][1].isRevealed).toBe(true);
  });
});
