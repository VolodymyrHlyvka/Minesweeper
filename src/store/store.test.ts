import { store } from "./store"; // Adjust the import path
import {
  setBoardSize,
  setLevel,
  setMinesCount,
} from "src/features/settings/settingsSlice"; // Adjust the import path

describe("Redux Store", () => {
  it("should have initial state", () => {
    const state = store.getState();
    expect(state.settings).toEqual({
      boardSize: 10,
      minesCount: 10,
      level: "Beginner",
    });
  });

  it("should handle setBoardSize action", () => {
    store.dispatch(setBoardSize(10));
    const state = store.getState();
    expect(state.settings.boardSize).toEqual(10);
    expect(state.settings.minesCount).toEqual(10);
    expect(state.settings.level).toEqual("Custom");
  });

  it("should handle setMinesCount action", () => {
    store.dispatch(setMinesCount(5));
    const state = store.getState();
    expect(state.settings.minesCount).toEqual(5);
  });

  it("should handle setLevel action", () => {
    store.dispatch(setLevel("Advanced"));
    const state = store.getState();
    expect(state.settings.boardSize).toEqual(20);
    expect(state.settings.minesCount).toEqual(50);
    expect(state.settings.level).toEqual("Advanced");
  });
});
