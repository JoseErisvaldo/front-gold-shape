export type WeekDay =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type StoreDayHours = {
  day: WeekDay;
  open: string | null;
  close: string | null;
};

export type StoreAddress = {
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
};

export type StoreProfileInfo = {
  hours: StoreDayHours[];
  address: StoreAddress;
  deliveryRegion: string;
};
