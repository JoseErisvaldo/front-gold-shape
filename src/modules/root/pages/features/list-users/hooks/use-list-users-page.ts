import { useState } from "react";
import { formatRole } from "../helpers/format-role";
import { useListUsersQuery } from "../queries/use-list-users-query";

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

export function useListUsersPage() {
  const usersQuery = useListUsersQuery();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const users = usersQuery.data ?? [];
  const term = normalize(search);

  const filtered = term
    ? users.filter((user) =>
        normalize(`${user.name} ${user.email} ${formatRole(user.role)}`).includes(term),
      )
    : users;

  const lastPage = Math.max(0, Math.ceil(filtered.length / rowsPerPage) - 1);
  const currentPage = Math.min(page, lastPage);
  const pageItems = filtered.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage,
  );

  return {
    users: pageItems,
    totalUsers: users.length,
    filteredCount: filtered.length,
    isPending: usersQuery.isPending,
    isError: usersQuery.isError,
    isFetching: usersQuery.isFetching,
    refetch: usersQuery.refetch,

    search,
    onSearchChange: (value: string) => {
      setSearch(value);
      setPage(0);
    },
    page: currentPage,
    rowsPerPage,
    onPageChange: setPage,
    onRowsPerPageChange: (value: number) => {
      setRowsPerPage(value);
      setPage(0);
    },
  };
}
