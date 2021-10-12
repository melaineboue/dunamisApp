import { Personne } from "./personne";

export interface Reseau {
  id: number,
  nom: string,
  responsable: Personne
}
