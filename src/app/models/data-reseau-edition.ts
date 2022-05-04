import { GR } from "./gr";
import { PersonneSuivi } from "./personneSuivi";
import { Reseau } from "./reseau";

export interface DataReseauEdition {
  reseau: Reseau;
  responsables: PersonneSuivi[];
}
