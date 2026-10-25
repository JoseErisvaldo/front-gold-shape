import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Box, Button, IconButton, InputAdornment, Paper, TextField } from "@mui/material";

type DeliveryAreasToolbarProps = {
  city: string;
  onCityChange: (value: string) => void;
  neighborhood: string;
  onNeighborhoodChange: (value: string) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
};

type FilterFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

function FilterField({ label, value, onChange }: FilterFieldProps) {
  return (
    <TextField
      size="small"
      placeholder={label}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      slotProps={{
        htmlInput: { "aria-label": label },
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon fontSize="small" />
            </InputAdornment>
          ),
          endAdornment: value ? (
            <IconButton
              size="small"
              aria-label={`Limpar ${label.toLowerCase()}`}
              onClick={() => onChange("")}
            >
              <ClearRoundedIcon fontSize="small" />
            </IconButton>
          ) : undefined,
        },
      }}
    />
  );
}

export function DeliveryAreasToolbar({
  city,
  onCityChange,
  neighborhood,
  onNeighborhoodChange,
  hasActiveFilters,
  onClearFilters,
}: DeliveryAreasToolbarProps) {
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
            lg: hasActiveFilters ? "1fr 1fr auto" : "1fr 1fr",
          },
        }}
      >
        <FilterField label="Filtrar por cidade" value={city} onChange={onCityChange} />
        <FilterField
          label="Filtrar por bairro"
          value={neighborhood}
          onChange={onNeighborhoodChange}
        />

        {hasActiveFilters && (
          <Button
            onClick={onClearFilters}
            sx={{
              gridColumn: { sm: "1 / -1", lg: "auto" },
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
