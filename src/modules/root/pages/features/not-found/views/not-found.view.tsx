import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import goldShapeLogo from "../../../../../../assets/goldshape-logo.png";

export function NotFoundView() {
  const navigate = useNavigate();

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        p: { xs: 2.5, sm: 4 },
        background:
          "radial-gradient(circle at 10% 90%, rgba(111, 92, 231, 0.1), transparent 26%), #f4f6fb",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "min(100%, 620px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: { xs: 4, sm: 7 },
          border: "1px solid #e8eaf2",
          borderRadius: "24px",
          bgcolor: "#fff",
          boxShadow: "0 24px 70px rgba(35, 43, 77, 0.09)",
          textAlign: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mb: 5 }}>
          <img className="brand-mark" src={goldShapeLogo} alt="" width={44} height={44} />
          <Typography
            component="span"
            sx={{
              color: "#242842",
              fontFamily: 'Manrope, "DM Sans", sans-serif',
              fontSize: 20,
              fontWeight: 800,
            }}
          >
            GoldShape
          </Typography>
        </Box>

        <Typography
          component="p"
          sx={{
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: "3px",
          }}
        >
          404
        </Typography>
        <Typography
          component="h1"
          variant="h3"
          sx={{
            mt: 1.5,
            color: "#20243a",
            fontSize: "clamp(28px, 5vw, 40px)",
            fontWeight: 700,
            letterSpacing: "-1.5px",
          }}
        >
          Esta página saiu do fluxo.
        </Typography>
        <Typography
          component="p"
          sx={{
            maxWidth: 390,
            mt: 1.5,
            color: "#777d91",
            fontSize: 15,
            lineHeight: 1.7,
          }}
        >
          Não encontramos o endereço que você tentou acessar. Volte para o início e continue de onde
          parou.
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          sx={{ mt: 4, width: { xs: "100%", sm: "auto" } }}
        >
          <Button
            variant="contained"
            startIcon={<HomeRoundedIcon />}
            onClick={() => void navigate("/")}
            sx={{
              minHeight: 46,
              px: 2.5,
              borderRadius: "9px",
              bgcolor: "#16a34a",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": { bgcolor: "#16a34a" },
            }}
          >
            Ir para o início
          </Button>
          <Button
            variant="outlined"
            startIcon={<ArrowBackRoundedIcon />}
            onClick={() => void navigate(-1)}
            sx={{
              minHeight: 46,
              px: 2.5,
              borderColor: "#e2e5ef",
              borderRadius: "9px",
              color: "#656b80",
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            Voltar
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
