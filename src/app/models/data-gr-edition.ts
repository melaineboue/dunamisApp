import { GR } from "./gr";
import { PersonneSuivi } from "./personneSuivi";

export interface DataGrEdition {
  gr: GR;
  responsables: PersonneSuivi[];
}
