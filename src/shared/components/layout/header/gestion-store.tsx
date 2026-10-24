import { Box, Typography } from "@mui/material";

export function GestionStore({
  description,
  page,
}: {
  description: string;
  page?: string;
}) {
  return (
    <Box>
      <Typography
        component="p"
        sx={{
          color: "#16A34A",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "1.4px",
        }}
      >
        GESTÃO DA LOJA
      </Typography>

      <Typography
        component="h1"
        sx={{
          mt: 1,
          color: "#20243a",
          fontFamily: 'Manrope, "DM Sans", sans-serif',
          fontSize: "clamp(30px, 4vw, 40px)",
          fontWeight: 700,
          letterSpacing: "-1.6px",
        }}
      >
        {page}
      </Typography>

      <Typography sx={{ mt: 0.75, color: "#777d91", fontSize: 14 }}>
        {description}
      </Typography>
    </Box>
  );
}
