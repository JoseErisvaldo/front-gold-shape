import { useQuery } from "@tanstack/react-query";
import { usersQueryKeys } from "../endpoints-keys/users.keys";
import { getMeService } from "../services/get-me.service";

export function useMeQuery() {
  return useQuery({
    queryKey: usersQueryKeys.me(),
    queryFn: getMeService,
  });
}
