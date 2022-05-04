import { Reseau } from "./reseau";
import { RoleU } from "./role";
import { GR } from "./gr";
import { Eglise } from "./eglise";

export interface User {
  id: number;
  nom: string;
  prenom: string;
  id_personne: number; // id de la personne
  role: RoleU;
  gr: GR;
  reseau: Reseau;
  eglise: Eglise;
  login?: string;
  pwd?: string;
  email?: string;
}
