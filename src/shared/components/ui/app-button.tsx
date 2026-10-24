import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Button as MuiButton, CircularProgress } from "@mui/material";
import type { ButtonProps } from "@mui/material";

type AppButtonProps = ButtonProps & {
  isLoading?: boolean;
  loadingText?: string;
};

export function AppButton({
  isLoading = false,
  loadingText = "Carregando...",
  children,
  disabled,
  startIcon,
  sx,
  ...props
}: AppButtonProps) {
  return (
    <MuiButton
      variant="contained"
      startIcon={
        isLoading ? (
          <CircularProgress size={16} color="inherit" />
        ) : (
          (startIcon ?? <AddRoundedIcon />)
        )
      }
      disabled={disabled || isLoading}
      sx={{
        minHeight: 44,
        alignSelf: { xs: "flex-start", sm: "auto" },
        px: 2.25,
        borderRadius: "9px",
        bgcolor: "#16A34A",
        fontWeight: 600,
        textTransform: "none",
        boxShadow: "0 8px 17px rgba(22, 163, 74, 0.19)",
        "&:hover": {
          bgcolor: "#15803D",
        },
        "&.Mui-disabled": {
          bgcolor: "#86c99b",
          color: "#fff",
        },
        ...sx,
      }}
      {...props}
    >
      {isLoading ? loadingText : children}
    </MuiButton>
  );
}
