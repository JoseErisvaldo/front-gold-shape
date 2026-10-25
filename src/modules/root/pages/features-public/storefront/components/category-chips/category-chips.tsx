import { Box, Chip, Skeleton } from "@mui/material";
import type { PublicCategory } from "../../types/storefront.types";

type CategoryChipsProps = {
  categories: PublicCategory[];
  selectedId: string | null;
  isLoading: boolean;
  onSelect: (categoryId: string | null) => void;
};

const SKELETON_KEYS = ["a", "b", "c", "d"];

function chipSx(selected: boolean) {
  return {
    flexShrink: 0,
    height: 38,
    px: 0.5,
    border: "1px solid",
    borderColor: selected ? "#16A34A" : "#DFE2EC",
    color: selected ? "#FFFFFF" : "#292D45",
    bgcolor: selected ? "#16A34A" : "#FFFFFF",
    fontSize: 14,
    fontWeight: 600,
    "&:hover": { bgcolor: selected ? "#15803D" : "#F0FDF4" },
  } as const;
}

export function CategoryChips({ categories, selectedId, isLoading, onSelect }: CategoryChipsProps) {
  return (
    <Box
      component="nav"
      aria-label="Categorias"
      sx={{
        display: "flex",
        gap: 1,
        overflowX: "auto",
        mx: { xs: -2, sm: 0 },
        px: { xs: 2, sm: 0 },
        pb: 0.5,
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {isLoading ? (
        SKELETON_KEYS.map((key) => (
          <Skeleton
            key={key}
            variant="rounded"
            width={96}
            height={38}
            sx={{ flexShrink: 0, borderRadius: 19 }}
          />
        ))
      ) : (
        <>
          <Chip
            clickable
            label="Todos"
            aria-pressed={selectedId === null}
            onClick={() => onSelect(null)}
            sx={chipSx(selectedId === null)}
          />
          {categories.map((category) => (
            <Chip
              key={category.id}
              clickable
              label={category.name}
              aria-pressed={selectedId === category.id}
              onClick={() => onSelect(selectedId === category.id ? null : category.id)}
              sx={chipSx(selectedId === category.id)}
            />
          ))}
        </>
      )}
    </Box>
  );
}
