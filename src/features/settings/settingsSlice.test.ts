import reducer, {
  setBoardSize,
  setMinesCount,
  BoardSettingsState,
  setLevel,
} from "./settingsSlice";

describe("settingsSlice", () => {
  it("should handle initial state", () => {
    const initialState: BoardSettingsState = {
      boardSize: 10,
      minesCount: 10,
      level: "Beginner",
    };

    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle setBoardSize", () => {
    const initialState: BoardSettingsState = {
      boardSize: 10,
      minesCount: 10,
      level: "Beginner",
    };

    const actual = reducer(initialState, setBoardSize(20));
    expect(actual.boardSize).toEqual(20);
  });

  it("should handle setMinesCount", () => {
    const initialState: BoardSettingsState = {
      boardSize: 10,
      minesCount: 10,
      level: "Beginner",
    };

    const actual = reducer(initialState, setMinesCount(15));
    expect(actual.minesCount).toEqual(15);
  });

  it("should handle setlevel", () => {
    const initialState: BoardSettingsState = {
      boardSize: 10,
      minesCount: 10,
      level: "Beginner",
    };

    const actualBeginner = reducer(initialState, setLevel("Beginner"));
    expect(actualBeginner.boardSize).toEqual(10);
    expect(actualBeginner.minesCount).toEqual(10);
    expect(actualBeginner.level).toEqual("Beginner");

    const actualAdvanced = reducer(initialState, setLevel("Advanced"));
    expect(actualAdvanced.boardSize).toEqual(20);
    expect(actualAdvanced.minesCount).toEqual(50);
    expect(actualAdvanced.level).toEqual("Advanced");

    const actualImpossible = reducer(initialState, setLevel("Impossible"));
    expect(actualImpossible.boardSize).toEqual(50);
    expect(actualImpossible.minesCount).toEqual(2499);
    expect(actualImpossible.level).toEqual("Impossible");
  });
});
