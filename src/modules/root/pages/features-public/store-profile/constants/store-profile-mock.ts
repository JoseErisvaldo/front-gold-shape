import type { StoreProfileInfo } from "../types/store-profile.types";

export const STORE_PROFILE_MOCK: StoreProfileInfo = {
  hours: [
    { day: "monday", open: "08:00", close: "20:00" },
    { day: "tuesday", open: "08:00", close: "20:00" },
    { day: "wednesday", open: "08:00", close: "20:00" },
    { day: "thursday", open: "08:00", close: "20:00" },
    { day: "friday", open: "08:00", close: "20:00" },
    { day: "saturday", open: "09:00", close: "16:00" },
    { day: "sunday", open: null, close: null },
  ],
  address: {
    street: "Avenida Ricieri Chiquetto, 460, Sl 4",
    neighborhood: "Jardim Santo Antônio",
    city: "Louveira",
    state: "SP",
    zipCode: "13294-416",
  },
  deliveryRegion: "Entregas em Louveira SP e região",
};
