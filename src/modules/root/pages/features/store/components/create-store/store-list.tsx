import { Box } from "@mui/material";
import type { Store } from "../../types/store.types";
import { StoreCard } from "./store-card";

type StoresListProps = {
  stores: Store[];
};

export function StoresList({ stores }: StoresListProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        },
        gap: 2,
        mt: 3,
      }}
    >
      {stores.map((store) => (
        <StoreCard key={store.id ?? store.name} store={store} />
      ))}
    </Box>
  );
}
