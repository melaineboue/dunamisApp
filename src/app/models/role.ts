import { UserRole } from "../enums/user-role";

export interface RoleU {
  id_role: number;
  role_libelle_court: UserRole;
  role_libelle_long: string
}
