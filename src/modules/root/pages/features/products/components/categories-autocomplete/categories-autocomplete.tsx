import { Autocomplete, TextField } from "@mui/material";
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
      loading={isLoading}
      loadingText="Carregando categorias..."
      noOptionsText="Nenhuma categoria encontrada"
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, selected) => option.id === selected.id}
      value={categories.filter((category) => value.includes(category.id))}
      onChange={(_, selected) => onChange(selected.map((category) => category.id))}
      onBlur={onBlur}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Categorias"
          error={Boolean(error)}
          helperText={error}
        />
      )}
    />
  );
}
