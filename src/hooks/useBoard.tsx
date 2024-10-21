import { useEffect, useState } from "react";
import { calculateAdjacentMines } from "src/utils/calculateAdjacentMines";
import { createEmptyBoard } from "src/utils/createEmptyBoard";
import { placeMines } from "src/utils/placeMines";

export const useBoard = (size: number, mineCount: number) => {
  const [board, setBoard] = useState(() => createEmptyBoard(size));

  useEffect(() => {
    const newBoard = createEmptyBoard(size);
    placeMines(newBoard, size, mineCount);
    calculateAdjacentMines(newBoard, size);
    setBoard(newBoard);
  }, [size, mineCount]);

  return { board, setBoard };
};
