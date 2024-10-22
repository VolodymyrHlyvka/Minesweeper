import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Stack, Typography } from "@mui/material";
import { RootState } from "src/store/store";
import { useBoard } from "src/hooks/useBoard";
import { checkWinCondition } from "src/utils/checkWinCondition";
import { DIRECTIONS } from "src/const/columnDirection";
import { Cell } from "src/types/cell";

const Minesweeper = () => {
  const { boardSize, minesCount } = useSelector(
    (state: RootState) => state.settings
  );

  const { board, setBoard, reset } = useBoard(boardSize, minesCount);
  const [gameOver, setGameOver] = useState(false);

  const handleCellClick = (row: number, col: number) => {
    if (gameOver || board[row][col].isRevealed || board[row][col].markAsBomb)
      return;

    const newBoard = [...board];
    newBoard[row][col].isRevealed = true;

    if (newBoard[row][col].isMine) {
      for (let rowIndex = 0; rowIndex < boardSize; rowIndex++) {
        for (let colIndex = 0; colIndex < boardSize; colIndex++) {
          if (newBoard[rowIndex][colIndex].isMine) {
            newBoard[rowIndex][colIndex].markAsBomb = false;
            newBoard[rowIndex][colIndex].isRevealed = true;
          }
        }
      }
      setGameOver(true);
      alert("Ви програли!");
    } else if (newBoard[row][col].adjacentMines === 0) {
      revealEmptyCells(newBoard, row, col);
    }
    const isWindCondition = checkWinCondition(newBoard, boardSize, minesCount);
    if (isWindCondition) {
      alert("Ви виграли!");
    }

    setBoard(newBoard);
  };

  const handleBlockMineClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    row: number,
    col: number
  ) => {
    event.preventDefault();
    if (gameOver || board[row][col].isRevealed) return;
    const newBoard = [...board];
    newBoard[row][col].markAsBomb = !newBoard[row][col].markAsBomb;

    setBoard(newBoard);
  };

  const revealEmptyCells = (board: Cell[][], row: number, col: number) => {
    DIRECTIONS.forEach(([dx, dy]) => {
      const newRow = row + dx;
      const newCol = col + dy;
      if (
        newRow >= 0 &&
        newRow < boardSize &&
        newCol >= 0 &&
        newCol < boardSize &&
        !board[newRow][newCol].isRevealed
      ) {
        board[newRow][newCol].isRevealed = true;
        if (board[newRow][newCol].adjacentMines === 0) {
          revealEmptyCells(board, newRow, newCol);
        }
      }
    });
  };

  const renderCell = (row: number, col: number) => {
    const cell = board[row][col];
    return (
      <Button
        variant="contained"
        key={`${row}-${col}`}
        onClick={() => handleCellClick(row, col)}
        onContextMenu={(e) => handleBlockMineClick(e, row, col)}
        sx={{
          width: "30px",
          height: "30px",
          background: cell.isRevealed ? "#ddd" : "#999",
          padding: 0,
          minWidth: "30px",
          maxWidth: "30px",
          color: "black",
        }}
      >
        {cell.isRevealed &&
          (cell.isMine
            ? "💣"
            : cell.adjacentMines > 0
            ? cell.adjacentMines
            : "")}
        {cell.markAsBomb && "🔐"}
      </Button>
    );
  };

  const handleRetry = () => {
    setGameOver(false);
    reset();
  };

  return (
    <Stack justifyContent="center">
      {gameOver && (
        <Typography variant="h4" textAlign="center" marginY={2}>
          Game over
          <Button
            variant="outlined"
            onClick={handleRetry}
            sx={{ marginLeft: "16px" }}
          >
            Retry
          </Button>
        </Typography>
      )}

      <Stack alignItems="center" justifyContent="center">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${boardSize}, 30px)`,
            gap: "1px",
          }}
        >
          {board.map((row, rowIndex) =>
            row.map((_, colIndex: number) => renderCell(rowIndex, colIndex))
          )}
        </div>
      </Stack>
    </Stack>
  );
};

export default Minesweeper;
