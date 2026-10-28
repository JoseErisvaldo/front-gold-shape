const ROLE_LABELS: Record<string, string> = {
  ADMIN: "Administrador",
  MODERADOR: "Moderador",
  USER: "Usuário",
  CUSTOMER: "Cliente",
};

export function formatRole(role: string): string {
  const known = ROLE_LABELS[role.toUpperCase()];
  if (known) return known;

  const lower = role.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}
