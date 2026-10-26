import type { StoreAddress } from "../types/store-profile.types";

export function formatAddressLines(address: StoreAddress): string[] {
  return [
    address.street,
    `${address.neighborhood}, ${address.city} - ${address.state}`,
    `CEP ${address.zipCode}`,
  ];
}

export function formatAddressLine(address: StoreAddress): string {
  return `${address.street} - ${address.neighborhood}, ${address.city} - ${address.state}, ${address.zipCode}`;
}

export function buildMapsUrl(address: StoreAddress): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    formatAddressLine(address),
  )}`;
}
