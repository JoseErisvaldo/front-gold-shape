export const storeQueryKeys = {
  all: ["stores"] as const,
  lists: () => ["stores", "list"] as const,
  detail: (id: string | number) => ["stores", "detail", id] as const,
  list: () => ["stores", "list"] as const,
};
