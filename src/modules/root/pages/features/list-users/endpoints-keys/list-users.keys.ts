export const listUsersQueryKeys = {
  all: ["list-users"] as const,
  list: () => [...listUsersQueryKeys.all, "list"] as const,
};
