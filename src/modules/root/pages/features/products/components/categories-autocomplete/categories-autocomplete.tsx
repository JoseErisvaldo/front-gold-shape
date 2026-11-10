import { Autocomplete, Chip, TextField } from "@mui/material";
import type { CategoryOption } from "../../types/product.types";

type CategoriesAutocompleteProps = {
  categories: CategoryOption[];
  value: string[];
  onChange: (ids: string[]) => void;
  onBlur?: () => void;
  isLoading: boolean;
  error?: string;
};

export function CategoriesAutocomplete({
  categories,
  value,
  onChange,
  onBlur,
  isLoading,
  error,
}: CategoriesAutocompleteProps) {
  return (
    <Autocomplete
      multiple
      options={categories}
      getOptionDisabled={(option) => !option.active}
      loading={isLoading}
      loadingText="Carregando categorias..."
      noOptionsText="Nenhuma categoria encontrada"
      getOptionLabel={(option) => `${option.name}${option.active ? "" : " - Inativa"}`}
      isOptionEqualToValue={(option, selected) => option.id === selected.id}
      value={categories.filter((category) => value.includes(category.id))}
      onChange={(_, selected) => onChange(selected.map((category) => category.id))}
      onBlur={onBlur}
      renderOption={(props, option) => (
        <li {...props} style={{ ...props.style, color: option.active ? undefined : "#DC2626" }}>
          {option.name}{option.active ? "" : " - Inativa"}
        </li>
      )}
      renderValue={(selected, getItemProps) =>
        selected.map((option, index) => {
          const { key, ...itemProps } = getItemProps({ index });
          return (
            <Chip
              key={key}
              {...itemProps}
              label={`${option.name}${option.active ? "" : " - Inativa"}`}
              color={option.active ? "default" : "error"}
              variant={option.active ? "filled" : "outlined"}
            />
          );
        })
      }
      renderInput={(params) => (
        <TextField {...params} label="Categorias" error={Boolean(error)} helperText={error} />
      )}
    />
  );
}
