import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import {
  setBoardSize,
  setMinesCount,
} from "src/features/settings/settingsSlice";
import { DIRECTIONS } from "./const/columnDirection";
import { useBoard } from "./hooks/useBoard";
import { Cell } from "./types/cell";
import { Button, Stack, Typography } from "@mui/material";
import { checkWinCondition } from "./utils/checkWinCondition";

const Minesweeper = () => {
  const { boardSize, minesCount } = useSelector(
    (state: RootState) => state.settings
  );
  const dispatch = useDispatch();

  const { board, setBoard, reset } = useBoard(boardSize, minesCount);
  const [gameOver, setGameOver] = useState(false);

  const handleBoardSizeChange = (value: string) => {
    dispatch(setBoardSize(Number(value)));
  };

  const handleMinesCountChange = (value: string) => {
    dispatch(setMinesCount(Number(value)));
  };

  const handleCellClick = (row: number, col: number) => {
    if (gameOver || board[row][col].isRevealed || board[row][col].markAsBomb)
      return;

    const newBoard = [...board];
    newBoard[row][col].isRevealed = true;

    if (newBoard[row][col].isMine) {
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
      <Typography variant="h1" textAlign="center">
        Minesweeper
      </Typography>
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
      {/* {
        //TODO: add validation
      }
      <input
        type="text"
        onChange={(event) => handleBoardSizeChange(event.target.value)}
      /> */}
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
