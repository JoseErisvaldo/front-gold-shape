import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Box, Button, IconButton, InputAdornment, MenuItem, Paper, TextField } from "@mui/material";
import {
  isProductSortOption,
  PRODUCT_SORT_OPTIONS,
  type ProductSortOption,
} from "../../helpers/product-sort-options";
import type { CategoryOption } from "../../types/product.types";

type ProductsToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  categoryId: string;
  onCategoryChange: (value: string) => void;
  categories: CategoryOption[];
  isCategoriesLoading: boolean;
  sort: ProductSortOption;
  onSortChange: (value: ProductSortOption) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
};

export function ProductsToolbar({
  search,
  onSearchChange,
  categoryId,
  onCategoryChange,
  categories,
  isCategoriesLoading,
  sort,
  onSortChange,
  hasActiveFilters,
  onClearFilters,
}: ProductsToolbarProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 1.5, sm: 2 },
        mb: 3,
        border: "1px solid #DFE2EC",
        borderRadius: "16px",
        bgcolor: "#FFFFFF",
      }}
    >
      <Box
        sx={{
          display: "grid",
          alignItems: "center",
          gap: 1.5,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: hasActiveFilters ? "2fr 1fr 1fr auto" : "2fr 1fr 1fr",
          },
        }}
      >
        <TextField
          size="small"
          placeholder="Buscar produtos"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          sx={{ gridColumn: { sm: "1 / -1", lg: "auto" } }}
          slotProps={{
            htmlInput: { "aria-label": "Buscar produtos" },
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: search ? (
                <IconButton
                  size="small"
                  aria-label="Limpar busca"
                  onClick={() => onSearchChange("")}
                >
                  <ClearRoundedIcon fontSize="small" />
                </IconButton>
              ) : undefined,
            },
          }}
        />

        <TextField
          select
          size="small"
          label="Categoria"
          value={categoryId}
          disabled={isCategoriesLoading}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          <MenuItem value="">Todas as categorias</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          size="small"
          label="Ordenar por"
          value={sort}
          onChange={(event) => {
            if (isProductSortOption(event.target.value)) {
              onSortChange(event.target.value);
            }
          }}
        >
          {PRODUCT_SORT_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        {hasActiveFilters && (
          <Button
            onClick={onClearFilters}
            sx={{
              gridColumn: { sm: "1 / -1", lg: "auto" },
              justifySelf: { xs: "stretch", lg: "auto" },
              minHeight: 40,
              color: "#16A34A",
              fontWeight: 600,
              textTransform: "none",
              whiteSpace: "nowrap",
            }}
          >
            Limpar filtros
          </Button>
        )}
      </Box>
    </Paper>
  );
}
