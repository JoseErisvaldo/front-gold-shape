import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircleIcon from "@mui/icons-material/Circle";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import {
  Box,
  Checkbox,
  Chip,
  CircularProgress,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import type { Category } from "../../types/category.types";

type CategoryCardProps = {
  category: Category;
  onEdit?: (category: Category) => void;
  onToggleActive?: (category: Category, active: boolean) => void;
  isToggling?: boolean;
};

export function CategoryCard({
  category,
  onEdit,
  onToggleActive,
  isToggling = false,
}: CategoryCardProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        height: "100%",
        minWidth: 0,
        boxSizing: "border-box",
        p: 2,
        border: "1px solid #E5EAE6",
        borderRadius: 2.5,
        bgcolor: "#FFFFFF",
      }}
    >
      <Box sx={{ minWidth: 0 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 1,
            minWidth: 0,
          }}
        >
          <Typography
            sx={{
              flex: 1,
              minWidth: 0,
              color: "#17211B",
              fontSize: 14,
              fontWeight: 700,
              lineHeight: 1.5,
              overflowWrap: "anywhere",
            }}
          >
            {category.name}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              flexShrink: 0,
            }}
          >
            <Chip
              label={category.active ? "Ativa" : "Inativa"}
              size="small"
              sx={{
                height: 22,
                bgcolor: category.active ? "#EAF7EE" : "#FEECEC",
                color: category.active ? "#15803D" : "#DC2626",
                fontSize: 10,
                fontWeight: 700,
                borderRadius: 1.5,
                "& .MuiChip-label": { px: 0.75 },
              }}
            />

            <IconButton
              type="button"
              size="small"
              aria-label={`Editar categoria ${category.name}`}
              onClick={() => onEdit?.(category)}
              sx={{
                width: 28,
                height: 28,
                color: "#66716A",
                borderRadius: 1.5,
                "&:hover": {
                  bgcolor: "#F1F5F2",
                  color: "#15803D",
                },
              }}
            >
              <EditRoundedIcon sx={{ fontSize: 17 }} />
            </IconButton>
          </Box>
        </Box>

        <Typography
          sx={{
            mt: 0.5,
            color: "#718078",
            fontSize: 11.5,
            lineHeight: 1.4,
            overflowWrap: "anywhere",
          }}
        >
          /{category.slug}
        </Typography>

        <Typography
          sx={{
            mt: 1.25,
            color: "#66716A",
            fontSize: 12,
            lineHeight: 1.5,
            overflowWrap: "anywhere",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
            minHeight: "3em",
          }}
        >
          {category.description?.trim() || "Nenhuma descrição informada."}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 1.5,
            pt: 1,
            borderTop: "1px solid #F0F2F0",
          }}
        >
          <Typography sx={{ fontSize: 12, color: "#66716A" }}>Categoria ativa</Typography>

          <Box
            sx={{
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {isToggling ? (
              <CircularProgress
                size={20}
                thickness={4}
                sx={{ color: "#16A34A" }}
                aria-label="Atualizando status da categoria"
              />
            ) : (
              <Checkbox
                checked={category.active}
                onChange={(_, checked) => onToggleActive?.(category, checked)}
                icon={<CircleIcon />}
                checkedIcon={<CheckCircleIcon />}
                slotProps={{
                  input: {
                    "aria-label": `${category.active ? "Desativar" : "Ativar"} categoria ${category.name}`,
                  },
                }}
                sx={{
                  p: 0.5,
                  color: "#D1D5DB",
                  "&.Mui-checked": {
                    color: "#86EFAC",
                  },
                  "& .MuiSvgIcon-root": {
                    fontSize: 22,
                  },
                }}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
