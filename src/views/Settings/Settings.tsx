import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
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

  // simple error check
  const isBoardSizeField = boardSize >= 2 && boardSize <= 50;

  const isMineCountField =
    minesCount >= boardSize && minesCount <= boardSize * boardSize - 1;

  return (
    <Stack justifyContent="center" alignItems="center">
      <TextField
        disabled={!isCustom}
        value={boardSize}
        id="outlined-basic"
        label="Board size"
        helperText="Please enter value between 2 and 50"
        variant="outlined"
        sx={{ width: "400px", marginBottom: "24px" }}
        onChange={(e) => handleBoardSizeChange(e.target.value)}
        error={!isBoardSizeField}
      />
      <TextField
        disabled={!isCustom}
        value={minesCount}
        id="outlined-basic"
        label="Mines count"
        helperText={`Please enter value between ${boardSize} and ${
          boardSize * boardSize - 1
        }`}
        variant="outlined"
        sx={{ width: "400px", marginBottom: "24px" }}
        onChange={(e) => handleMinesCountChange(e.target.value)}
        error={!isMineCountField}
      />

      <FormControl sx={{ width: "400px", marginBottom: "24px" }}>
        <InputLabel id="demo-simple-select-label">Level</InputLabel>
        <Select
          data-testid="level"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          placeholder="Enter level"
          value={level}
          label="Level"
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
      </FormControl>
    </Stack>
  );
};
