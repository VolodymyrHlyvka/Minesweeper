import { render, screen, fireEvent } from "@testing-library/react";
import { Settings } from "./Settings";
import * as redux from "react-redux";
import { useSelector } from "react-redux";
import { setBoardSize, setLevel } from "src/features/settings/settingsSlice";
import { ReduxProvider } from "src/tests/helpers";
import "@testing-library/jest-dom";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("Settings Component", () => {
  const mockSelectorState = {
    boardSize: 10,
    minesCount: 10,
    level: "Beginner",
  };
  const useDispatchSpy = jest.spyOn(redux, "useDispatch");
  const mockDispatchFn = jest.fn();

  beforeEach(() => {
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    (useSelector as unknown as jest.Mock).mockReturnValue(mockSelectorState);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with initial values", () => {
    render(
      <ReduxProvider>
        <Settings />
      </ReduxProvider>
    );

    const boardSizeInput = screen.getByLabelText(
      /Board size/i
    ) as HTMLInputElement;
    expect(boardSizeInput).toBeInTheDocument();
    expect(boardSizeInput.value).toBe("10");

    const minesCountInput = screen.getByLabelText(
      /Mines count/i
    ) as HTMLInputElement;
    expect(minesCountInput).toBeInTheDocument();
    expect(minesCountInput.value).toBe("10");

    const inputElement = screen.getByPlaceholderText(
      "Enter level"
    ) as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toBe("Beginner");
  });

  it("dispatches setBoardSize when board size is changed", () => {
    render(
      <ReduxProvider>
        <Settings />
      </ReduxProvider>
    );

    const boardSizeInput = screen.getByLabelText(/Board size/i);
    fireEvent.change(boardSizeInput, { target: { value: "15" } });

    expect(mockDispatchFn).toHaveBeenCalledWith(setBoardSize(15));
  });

  it("dispatches setMinesCount when mines count is changed", () => {
    render(
      <ReduxProvider>
        <Settings />
      </ReduxProvider>
    );

    const minesCountInput = screen.getByLabelText(/Mines count/i);
    fireEvent.change(minesCountInput, { target: { value: "20" } });

    expect(mockDispatchFn).toHaveBeenCalledTimes(1);
  });

  it("dispatches setLevel when level is changed", () => {
    render(
      <ReduxProvider>
        <Settings />
      </ReduxProvider>
    );

    const inputElement = screen.getByPlaceholderText("Enter level");
    fireEvent.change(inputElement, { target: { value: "Advanced" } });

    expect(mockDispatchFn).toHaveBeenCalledWith(setLevel("Advanced"));
  });

  it("disables board size and mines count inputs when level is not 'Custom'", () => {
    render(
      <ReduxProvider>
        <Settings />
      </ReduxProvider>
    );

    const boardSizeInput = screen.getByLabelText(
      /Board size/i
    ) as HTMLInputElement;
    const minesCountInput = screen.getByLabelText(
      /Mines count/i
    ) as HTMLInputElement;

    expect(boardSizeInput).toBeDisabled();
    expect(minesCountInput).toBeDisabled();
  });
});
