import { Personne } from "./personne";

export interface GrContent {
  id: number,
  libelle: string,
  personnes: Personne[],
  total?: number,
  regulier?: number,
  fidelisation?: number,
  irregulier?: number
}
