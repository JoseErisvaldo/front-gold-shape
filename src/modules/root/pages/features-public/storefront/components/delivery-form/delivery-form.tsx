import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { formatPrice } from "../../helpers/format-price";
import { usePublicDeliveryAreasQuery } from "../../queries/use-public-delivery-areas-query";
import type { DeliveryInfo, PublicDeliveryArea } from "../../types/storefront.types";

type DeliveryFormProps = {
  delivery: DeliveryInfo;
  isSearchingCep: boolean;
  isFeeLoading: boolean;
  isFeeError: boolean;
  cepNotFound: boolean;
  onChange: (patch: Partial<DeliveryInfo>) => void;
  onAreaSelect: (area: PublicDeliveryArea | null) => void;
  onManualChange: (manual: boolean) => void;
  onCepChange: (cep: string) => void;
};

const fieldSx = {
  "& .MuiOutlinedInput-root": { borderRadius: "10px", bgcolor: "#FFFFFF" },
};

const linkButtonSx = {
  alignSelf: "flex-start",
  minHeight: 0,
  p: 0,
  color: "#16A34A",
  fontSize: 13,
  fontWeight: 700,
  textTransform: "none",
  "&:hover": { bgcolor: "transparent", textDecoration: "underline" },
} as const;

const formatLocation = (area: PublicDeliveryArea) =>
  [area.city, area.state].filter(Boolean).join("/");

export function DeliveryForm({
  delivery,
  isSearchingCep,
  isFeeLoading,
  isFeeError,
  cepNotFound,
  onChange,
  onAreaSelect,
  onManualChange,
  onCepChange,
}: DeliveryFormProps) {
  const [search, setSearch] = useState("");
  const { data: areas = [], isFetching } = usePublicDeliveryAreasQuery(search);

  return (
    <Stack spacing={2}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <LocalShippingRoundedIcon sx={{ color: "#16A34A" }} fontSize="small" />
        <Typography sx={{ color: "#292D45", fontSize: 15, fontWeight: 700 }}>Entrega</Typography>
      </Box>

      {delivery.isManualArea ? (
        <>
          <TextField
            required
            label="Nome do bairro"
            value={delivery.neighborhood}
            onChange={(event) => onChange({ neighborhood: event.target.value })}
            sx={fieldSx}
          />
          <Alert severity="info" sx={{ borderRadius: "10px" }}>
            O valor da entrega para este bairro será combinado com a loja pelo WhatsApp.
          </Alert>
          <Button disableRipple sx={linkButtonSx} onClick={() => onManualChange(false)}>
            Escolher um bairro da lista
          </Button>
        </>
      ) : (
        <>
          <Autocomplete
            options={areas}
            value={delivery.area}
            loading={isFetching}
            filterOptions={(options) => options}
            getOptionLabel={(area) => area.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(_, area) => onAreaSelect(area)}
            onInputChange={(_, value, reason) => reason === "input" && setSearch(value)}
            noOptionsText="Nenhum bairro encontrado. Use a opção abaixo."
            loadingText="Buscando bairros..."
            renderOption={(props, area) => (
              <Box component="li" {...props} key={area.id}>
                <Box sx={{ minWidth: 0 }}>
                  <Typography sx={{ color: "#292D45", fontSize: 14 }}>{area.name}</Typography>
                  {formatLocation(area) && (
                    <Typography sx={{ color: "#858A9D", fontSize: 12 }}>
                      {formatLocation(area)}
                    </Typography>
                  )}
                </Box>
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label="Bairro de entrega"
                placeholder="Digite para pesquisar"
                sx={fieldSx}
                slotProps={{
                  ...params.slotProps,
                  input: {
                    ...params.slotProps.input,
                    endAdornment: (
                      <>
                        {isFetching && <CircularProgress size={16} />}
                        {params.slotProps.input?.endAdornment}
                      </>
                    ),
                  },
                }}
              />
            )}
          />

          {delivery.area && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {isFeeError ? (
                <Typography sx={{ color: "#B42318", fontSize: 13, fontWeight: 700 }}>
                  Não foi possível calcular a taxa. Escolha o bairro novamente.
                </Typography>
              ) : isFeeLoading || delivery.area.fee === null ? (
                <>
                  <Typography sx={{ color: "#858A9D", fontSize: 13, fontWeight: 700 }}>
                    Calculando taxa de entrega...
                  </Typography>
                  <CircularProgress size={14} />
                </>
              ) : (
                <Typography sx={{ color: "#15803D", fontSize: 13, fontWeight: 700 }}>
                  Taxa de entrega:{" "}
                  {delivery.area.fee > 0 ? formatPrice(delivery.area.fee) : "Grátis"}
                </Typography>
              )}
            </Box>
          )}

          <Button disableRipple sx={linkButtonSx} onClick={() => onManualChange(true)}>
            Não encontrei meu bairro
          </Button>
        </>
      )}

      <TextField
        label="CEP (opcional)"
        value={delivery.cep}
        onChange={(event) => onCepChange(event.target.value)}
        sx={fieldSx}
        slotProps={{
          htmlInput: { inputMode: "numeric", maxLength: 9 },
          input: {
            endAdornment: isSearchingCep ? <CircularProgress size={16} /> : undefined,
          },
        }}
      />

      {cepNotFound && (
        <Alert severity="info" sx={{ borderRadius: "10px" }}>
          CEP não localizado. Preencha o endereço manualmente.
        </Alert>
      )}

      <TextField
        required
        label="Endereço (rua / avenida)"
        value={delivery.street}
        onChange={(event) => onChange({ street: event.target.value })}
        sx={fieldSx}
      />

      <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: "1fr 2fr" }}>
        <TextField
          required
          label="Número"
          value={delivery.number}
          onChange={(event) => onChange({ number: event.target.value })}
          sx={fieldSx}
        />
        <TextField
          label="Complemento"
          value={delivery.complement}
          onChange={(event) => onChange({ complement: event.target.value })}
          sx={fieldSx}
        />
      </Box>
    </Stack>
  );
}
