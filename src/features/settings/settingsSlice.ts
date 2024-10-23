import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface BoardSettingsState {
  boardSize: number;
  minesCount: number;
  level: "Beginner" | "Advanced" | "Impossible" | "Custom";
}

const initialState: BoardSettingsState = {
  boardSize: 10,
  minesCount: 10,
  level: "Beginner",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setBoardSize: (state, action: PayloadAction<number>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      if (action.payload > 50) {
        action.payload = 10;
      } else if (action.payload <= 1) {
        action.payload = 10;
      }
      state.boardSize = action.payload;
      state.level = "Custom";
    },
    setMinesCount: (state, action: PayloadAction<number>) => {
      state.minesCount = action.payload;
      state.level = "Custom";
    },
    setLevel: (state, action: PayloadAction<BoardSettingsState["level"]>) => {
      state.level = action.payload;
      let size = 10;
      let count = 10;
      if (action.payload === "Advanced") {
        size = 20;
        count = 50;
      } else if (action.payload === "Impossible") {
        size = 50;
        count = 2499;
      }
      state.boardSize = size;
      state.minesCount = count;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBoardSize, setMinesCount, setLevel } = settingsSlice.actions;

export default settingsSlice.reducer;
