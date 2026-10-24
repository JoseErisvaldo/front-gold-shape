import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
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
  const isCancelButton =
    typeof children === "string" && children.trim().toLowerCase() === "cancelar";

  const defaultIcon = isCancelButton ? <CloseRoundedIcon /> : <AddRoundedIcon />;

  return (
    <MuiButton
      variant={isCancelButton ? "outlined" : "contained"}
      startIcon={
        isLoading ? (
          <CircularProgress size={16} color="inherit" />
        ) : (
          (startIcon ?? (isCancelButton ? defaultIcon : defaultIcon))
        )
      }
      disabled={disabled || isLoading}
      sx={{
        minHeight: 44,
        alignSelf: { xs: "flex-start", sm: "auto" },
        px: 2.25,
        borderRadius: "9px",
        fontWeight: 600,
        textTransform: "none",
        ...(isCancelButton
          ? {
              color: "#DC2626",
              borderColor: "#FCA5A5",
              bgcolor: "#FEF2F2",
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#FEE2E2",
                borderColor: "#DC2626",
              },
              "&.Mui-disabled": {
                color: "#F87171",
                borderColor: "#FECACA",
                bgcolor: "#FEF2F2",
              },
            }
          : {
              bgcolor: "#16A34A",
              boxShadow: "0 8px 17px rgba(22, 163, 74, 0.19)",
              "&:hover": {
                bgcolor: "#15803D",
              },
              "&.Mui-disabled": {
                bgcolor: "#86c99b",
                color: "#FFFFFF",
              },
            }),
        ...sx,
      }}
      {...props}
    >
      {isLoading ? loadingText : children}
    </MuiButton>
  );
}
