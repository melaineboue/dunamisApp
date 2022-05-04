import { GR } from "./gr";
import { Personne } from "./personne";

export interface ReseauInfo {
  responsablesGR?: number;
  potentiel?: number;
  regulier?: number;
  en_cours_fidelisation?: number;
  irregulier?: number;
  date_creation?: string;
  date_dernier_ajout?: string;
}

export interface ReseauMembre {
  personnes?: Personne[];
  grs?: GR[]
}


