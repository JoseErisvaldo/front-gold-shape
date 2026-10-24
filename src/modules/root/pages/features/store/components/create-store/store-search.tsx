import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { InputAdornment, Paper, TextField } from "@mui/material";

type StoresSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export function StoresSearch({ value, onChange }: StoresSearchProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        alignItems: "center",
        mt: 4,
        px: 1.5,
        border: "1px solid #e5e7ef",
        borderRadius: "10px",
        bgcolor: "rgba(255,255,255,0.88)",
        "&:focus-within": {
          borderColor: "#8274e8",
          boxShadow: "0 0 0 3px rgba(116, 99, 232, 0.1)",
        },
      }}
    >
      <TextField
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Buscar lojas"
        fullWidth
        variant="standard"
        slotProps={{
          input: {
            disableUnderline: true,
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon sx={{ color: "#9da2b3", fontSize: 20 }} />
              </InputAdornment>
            ),
          },
        }}
        sx={{ py: 1.25, "& input": { fontSize: 13 } }}
      />
    </Paper>
  );
}
