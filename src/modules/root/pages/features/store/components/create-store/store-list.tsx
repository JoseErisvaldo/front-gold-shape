import { Box } from "@mui/material";
import type { Store } from "../../types/store.types";
import { StoreCard } from "./store-card";

type StoresListProps = {
  stores: Store[];
};

export function StoresList({ stores }: StoresListProps) {
  return (
    <Box sx={{}}>
      {stores.map((store) => (
        <StoreCard key={store.id ?? store.name} store={store} />
      ))}
    </Box>
  );
}
