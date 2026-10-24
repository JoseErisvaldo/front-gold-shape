import { Box, Typography } from "@mui/material";
import { CategoryCard } from "../category-card/category-card";
import type { Category } from "../../types/category.types";

type CategoriesListProps = {
  categories: Category[];
  onEdit?: (category: Category) => void;
};

export function CategoriesList({ categories, onEdit }: CategoriesListProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, minmax(0, 1fr))",
          lg: "repeat(3, minmax(0, 1fr))",
          xl: "repeat(4, minmax(0, 1fr))",
        },
        gap: 1.5,
        alignItems: "stretch",
      }}
    >
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} onEdit={onEdit} />
      ))}

      {categories.length === 0 && (
        <Box
          sx={{
            gridColumn: "1 / -1",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            py: 6,
            px: 2,
            border: "1px dashed #D7E0D9",
            borderRadius: 3,
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              color: "#17211B",
            }}
          >
            Nenhuma categoria encontrada
          </Typography>

          <Typography
            variant="body2"
            sx={{
              mt: 1,
              color: "text.secondary",
            }}
          >
            Experimente alterar a busca ou cadastre uma nova categoria.
          </Typography>
        </Box>
      )}
    </Box>
  );
}
