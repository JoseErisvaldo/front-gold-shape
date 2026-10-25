import { useMeQuery } from "../queries/use-me-query";

export function useProfilePage() {
  const meQuery = useMeQuery();

  return {
    user: meQuery.data ?? null,
    isPending: meQuery.isPending,
    isError: meQuery.isError,
    isFetching: meQuery.isFetching,
    refetch: meQuery.refetch,
  };
}
