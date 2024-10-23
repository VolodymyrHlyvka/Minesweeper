import { render, screen, fireEvent } from "@testing-library/react";
import { App } from "./App";
import { ReduxProvider } from "./tests/helpers";
import '@testing-library/jest-dom'

jest.mock("./views/Settings/Settings", () => ({
  __esModule: true,
  Settings: () => <div>Settings mode</div>,
}));

jest.mock("./views/Minesweeper/Minesweeper", () => ({
  __esModule: true,
  Minesweeper: () => <div>Minesweeper mode</div>,
}));

describe("App Component", () => {
  it("renders the Minesweeper heading", () => {
    render(
      <ReduxProvider>
        <App />
      </ReduxProvider>
    );

    const heading = screen.getByRole("heading", { name: /Minesweeper/i });
    expect(heading).toBeInTheDocument();
  });

  it("renders the Tabs and switches between them", () => {
    render(
      <ReduxProvider>
        <App />
      </ReduxProvider>
    );

    const settingsTab = screen.getByTestId("Settings");
    const playTab = screen.getByTestId("Play");
    expect(settingsTab).toBeInTheDocument();
    expect(playTab).toBeInTheDocument();

    fireEvent.click(playTab);
    expect(screen.getByText(/Minesweeper mode/i)).toBeInTheDocument();

    fireEvent.click(settingsTab);
    expect(screen.getByText(/Settings mode/i)).toBeInTheDocument();
  });
});
