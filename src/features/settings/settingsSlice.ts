import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface BoardSettingsState {
  boardSize: number;
  minesCount: number;
}

const initialState: BoardSettingsState = {
  boardSize: 10,
  minesCount: 10,
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
      state.minesCount = action.payload;
    },
    setMinesCount: (state, action: PayloadAction<number>) => {
      state.minesCount = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBoardSize, setMinesCount } = settingsSlice.actions;

export default settingsSlice.reducer;
