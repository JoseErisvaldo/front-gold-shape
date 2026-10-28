import { useQuery } from "@tanstack/react-query";
import { listUsersQueryKeys } from "../endpoints-keys/list-users.keys";
import { listUsersService } from "../services/list-users.service";

export function useListUsersQuery() {
  return useQuery({
    queryKey: listUsersQueryKeys.list(),
    queryFn: listUsersService,
  });
}
