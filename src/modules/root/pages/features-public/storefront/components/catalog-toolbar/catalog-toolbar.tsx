import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import {
  Box,
  Button,
  Chip,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  TextField,
} from "@mui/material";
import { useEffect, useRef } from "react";
import { trackEvent } from "../../helpers/storefront-analytics";
import {
  isStorefrontSortOption,
  STOREFRONT_SORT_OPTIONS,
  type StorefrontSortOption,
} from "../../helpers/storefront-sort-options";

type CatalogToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  onlyOnSale: boolean;
  onOnlyOnSaleChange: (value: boolean) => void;
  sort: StorefrontSortOption;
  onSortChange: (value: StorefrontSortOption) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
};

const SEARCH_TRACK_DELAY_MS = 1000;
const MIN_SEARCH_LENGTH = 2;

export function CatalogToolbar({
  search,
  onSearchChange,
  onlyOnSale,
  onOnlyOnSaleChange,
  sort,
  onSortChange,
  hasActiveFilters,
  onClearFilters,
}: CatalogToolbarProps) {
  const lastTrackedTerm = useRef("");

  useEffect(() => {
    const term = search.trim().toLowerCase();

    if (term === "") {
      lastTrackedTerm.current = "";
      return;
    }

    if (term.length < MIN_SEARCH_LENGTH || term === lastTrackedTerm.current) return;

    const timer = setTimeout(() => {
      lastTrackedTerm.current = term;
      trackEvent("catalog_searched", {
        search_term: term,
        term_length: term.length,
        sort,
        only_on_sale: onlyOnSale,
      });
    }, SEARCH_TRACK_DELAY_MS);

    return () => clearTimeout(timer);
  }, [search, sort, onlyOnSale]);

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
            sm: "1fr 200px",
            lg: "2fr 200px auto",
          },
        }}
      >
        <TextField
          size="small"
          placeholder="Buscar produtos"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          sx={{ gridColumn: { xs: "auto", sm: "1 / -1", lg: "auto" } }}
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
          label="Ordenar por"
          value={sort}
          onChange={(event) => {
            if (isStorefrontSortOption(event.target.value)) onSortChange(event.target.value);
          }}
        >
          {STOREFRONT_SORT_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          <Chip
            clickable
            icon={<LocalOfferRoundedIcon />}
            label="Somente ofertas"
            aria-pressed={onlyOnSale}
            onClick={() => onOnlyOnSaleChange(!onlyOnSale)}
            sx={{
              height: 36,
              border: "1px solid",
              borderColor: onlyOnSale ? "#F58A33" : "#DFE2EC",
              color: onlyOnSale ? "#FFFFFF" : "#292D45",
              bgcolor: onlyOnSale ? "#F58A33" : "#FFFFFF",
              fontWeight: 600,
              "& .MuiChip-icon": { color: onlyOnSale ? "#FFFFFF" : "#F58A33" },
              "&:hover": { bgcolor: onlyOnSale ? "#E07A26" : "#FFF7ED" },
            }}
          />

          {hasActiveFilters && (
            <Button
              onClick={onClearFilters}
              sx={{
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
      </Box>
    </Paper>
  );
}
