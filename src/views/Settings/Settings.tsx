import { MenuItem, Select, Stack, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setBoardSize,
  setMinesCount,
  setLevel,
  BoardSettingsState,
} from "src/features/settings/settingsSlice";
import { RootState } from "src/store/store";

const levels = [
  {
    value: "Beginner",
    label: "Beginner",
  },
  {
    value: "Advanced",
    label: "Advanced",
  },
  {
    value: "Impossible",
    label: "Impossible",
  },
  {
    value: "Custom",
    label: "Custom",
  },
];

export const Settings = () => {
  const { boardSize, minesCount, level } = useSelector(
    (state: RootState) => state.settings
  );
  const dispatch = useDispatch();

  const handleBoardSizeChange = (value: string) => {
    dispatch(setBoardSize(Number(value)));
  };

  const handleMinesCountChange = (value: string) => {
    dispatch(setMinesCount(Number(value)));
  };

  const handleLevelChange = (value: BoardSettingsState["level"]) => {
    dispatch(setLevel(value));
  };

  const isCustom = level === "Custom";

  return (
    <Stack justifyContent="center" alignItems="center">
      <TextField
        disabled={!isCustom}
        value={boardSize}
        id="outlined-basic"
        label="Board size"
        variant="outlined"
        sx={{ width: "400px", marginBottom: "24px" }}
        onChange={(e) => handleBoardSizeChange(e.target.value)}
      />
      <TextField
        disabled={!isCustom}
        value={minesCount}
        id="outlined-basic"
        label="Mines count"
        variant="outlined"
        sx={{ width: "400px", marginBottom: "24px" }}
        onChange={(e) => handleMinesCountChange(e.target.value)}
      />
      <Select
        sx={{ width: "400px", marginBottom: "24px" }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={level}
        label="Age"
        onChange={(e) =>
          handleLevelChange(e.target.value as BoardSettingsState["level"])
        }
      >
        {levels.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
};
