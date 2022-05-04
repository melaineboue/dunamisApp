import { Personne } from "./personne";
import { ReseauInfo, ReseauMembre } from "./reseau-details";

export interface Reseau {
  id: number,
  nom?: string,
  taille?: number,
  nombreGR?: number,
  responsables?: Personne[],
  infos?: ReseauInfo,
  membres?: ReseauMembre,
  date_creation?: string
}
