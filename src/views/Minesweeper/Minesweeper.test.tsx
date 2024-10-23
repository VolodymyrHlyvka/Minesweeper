import { render, screen, fireEvent } from "@testing-library/react";
import { Minesweeper } from "./Minesweeper";
import * as redux from "react-redux";
import { useSelector } from "react-redux";
import { ReduxProvider } from "src/tests/helpers";
import "@testing-library/jest-dom";
import { createEmptyBoard } from "src/utils/createEmptyBoard";
import * as hooks from "src/hooks/useBoard";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("Minesweeper", () => {
  const mockSelectorState = {
    boardSize: 5,
    minesCount: 5,
    level: "Beginner",
  };

  const useDispatchSpy = jest.spyOn(redux, "useDispatch");
  const mockDispatchFn = jest.fn();
  let alertMock: any;

  beforeEach(() => {
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    (useSelector as unknown as jest.Mock).mockReturnValue(mockSelectorState);
    alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    alertMock.mockRestore();
  });

  it("renders the game board", () => {
    render(
      <ReduxProvider>
        <Minesweeper />
      </ReduxProvider>
    );

    expect(screen.getAllByRole("button")).toHaveLength(25);
  });

  it("reveals a cell when clicked", async () => {
    const newBoard = createEmptyBoard(5);
    newBoard[0][0].isRevealed = true;
    jest.spyOn(hooks, "useBoard").mockImplementation(() => ({
      board: newBoard,
      setBoard: jest.fn().mockReturnValue(newBoard),
      reset: jest.fn(),
    }));

    render(
      <ReduxProvider>
        <Minesweeper />
      </ReduxProvider>
    );

    const cellButton = screen.getByTestId("0-0");
    await fireEvent.click(cellButton);

    expect(cellButton).toHaveStyle("background: #ddd");
  });

  it("marks a cell as a bomb on right-click", async () => {
    const newBoard = createEmptyBoard(5);
    newBoard[0][0].markAsBomb = true;
    jest.spyOn(hooks, "useBoard").mockImplementation(() => ({
      board: newBoard,
      setBoard: jest.fn().mockReturnValue(newBoard),
      reset: jest.fn(),
    }));

    render(
      <ReduxProvider>
        <Minesweeper />
      </ReduxProvider>
    );

    const cellButton = screen.getByTestId("0-0");
    await fireEvent.contextMenu(cellButton);

    expect(cellButton).toHaveTextContent("🔐");
  });

  it("shows game over alert when a mine is clicked", async () => {
    const newBoard = createEmptyBoard(5);
    const reset = jest.fn();
    newBoard[0][0].isMine = true;
    jest.spyOn(hooks, "useBoard").mockImplementation(() => ({
      board: newBoard,
      setBoard: jest.fn().mockReturnValue(newBoard),
      reset: reset,
    }));

    render(
      <ReduxProvider>
        <Minesweeper />
      </ReduxProvider>
    );

    const cellButton = screen.getByTestId("0-0");
    await fireEvent.click(cellButton);

    expect(cellButton).toHaveTextContent("💣");

    const retryButton = screen.getByTestId("retry");
    await fireEvent.click(retryButton);

    expect(reset).toHaveBeenCalledTimes(1);
  });
});
