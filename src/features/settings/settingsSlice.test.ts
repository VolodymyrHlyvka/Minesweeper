import reducer, {
  setBoardSize,
  setMinesCount,
  BoardSettingsState,
  setLevel,
} from "./settingsSlice";

describe("settingsSlice", () => {
  const initialState: BoardSettingsState = {
    boardSize: 10,
    minesCount: 10,
    level: "Beginner",
  };

  it("should handle initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle setBoardSize", () => {
    const actual = reducer(initialState, setBoardSize(20));
    expect(actual.boardSize).toEqual(20);

    const invalidSize = reducer(initialState, setBoardSize(51));
    expect(invalidSize.boardSize).toEqual(10);
    expect(invalidSize.minesCount).toEqual(10);

    const tooSmallSize = reducer(initialState, setBoardSize(0));
    expect(tooSmallSize.boardSize).toEqual(10);
    expect(tooSmallSize.minesCount).toEqual(10);
  });

  it("should handle setMinesCount", () => {
    const actual = reducer(initialState, setMinesCount(15));
    expect(actual.minesCount).toEqual(15);
  });

  it("should handle setlevel", () => {
    const actual = reducer(initialState, setLevel("Beginner"));
    expect(actual.minesCount).toEqual(10);
  });
});
