import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import { Box, IconButton, Typography } from "@mui/material";

type QuantityStepperProps = {
  value: number;
  max: number;
  min?: number;
  size?: "small" | "medium";
  disabled?: boolean;
  onChange: (value: number) => void;
};

export function QuantityStepper({
  value,
  max,
  min = 1,
  size = "medium",
  disabled = false,
  onChange,
}: QuantityStepperProps) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        border: "1px solid #DFE2EC",
        borderRadius: "10px",
        bgcolor: "#FFFFFF",
      }}
    >
      <IconButton
        aria-label="Diminuir quantidade"
        size={size}
        disabled={disabled || value <= min}
        onClick={() => onChange(value - 1)}
      >
        <RemoveRoundedIcon fontSize="small" />
      </IconButton>

      <Typography
        aria-live="polite"
        sx={{ minWidth: 32, textAlign: "center", color: "#292D45", fontSize: 14, fontWeight: 700 }}
      >
        {value}
      </Typography>

      <IconButton
        aria-label="Aumentar quantidade"
        size={size}
        disabled={disabled || value >= max}
        onClick={() => onChange(value + 1)}
      >
        <AddRoundedIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
