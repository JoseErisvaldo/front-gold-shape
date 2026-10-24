import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, Drawer, IconButton, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import type { ProductListItem } from "../../types/product.types";
import { EditProductCategoriesForm } from "../edit-product-categories-form/edit-product-categories-form";
import { EditProductDetailsForm } from "../edit-product-details-form/edit-product-details-form";
import { ProductVariantsManager } from "../product-variants-manager/product-variants-manager";

type EditProductDrawerProps = {
  product: ProductListItem | null;
  onClose: () => void;
};

type DrawerTab = "details" | "categories" | "variants";

type DrawerContentProps = {
  product: ProductListItem;
  onClose: () => void;
};

function EditProductDrawerContent({ product, onClose }: DrawerContentProps) {
  const [tab, setTab] = useState<DrawerTab>("details");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 2,
          px: { xs: 2.5, sm: 3 },
          pt: 3,
          pb: 1,
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography component="h2" sx={{ color: "#292D45", fontSize: 18, fontWeight: 700 }}>
            Editar produto
          </Typography>
          <Typography noWrap sx={{ color: "#858A9D", fontSize: 13 }}>
            {product.name}
          </Typography>
        </Box>

        <IconButton aria-label="Fechar" onClick={onClose} size="small">
          <CloseRoundedIcon />
        </IconButton>
      </Box>

      <Tabs
        value={tab}
        onChange={(_, value: DrawerTab) => setTab(value)}
        variant="fullWidth"
        sx={{
          borderBottom: "1px solid #DFE2EC",
          "& .MuiTab-root": { textTransform: "none", fontWeight: 600 },
          "& .Mui-selected": { color: "#16A34A" },
          "& .MuiTabs-indicator": { bgcolor: "#16A34A" },
        }}
      >
        <Tab value="details" label="Dados" />
        <Tab value="categories" label="Categorias" />
        <Tab value="variants" label="Variações" />
      </Tabs>

      <Box sx={{ flex: 1, overflowY: "auto", p: { xs: 2.5, sm: 3 } }}>
        {tab === "details" && <EditProductDetailsForm product={product} />}
        {tab === "categories" && <EditProductCategoriesForm product={product} />}
        {tab === "variants" && <ProductVariantsManager productId={product.id} />}
      </Box>
    </Box>
  );
}

export function EditProductDrawer({ product, onClose }: EditProductDrawerProps) {
  return (
    <Drawer
      anchor="right"
      open={product !== null}
      onClose={onClose}
      slotProps={{
        paper: { sx: { width: { xs: "100%", sm: 560 }, maxWidth: "100%" } },
      }}
    >
      {product && <EditProductDrawerContent key={product.id} product={product} onClose={onClose} />}
    </Drawer>
  );
}
