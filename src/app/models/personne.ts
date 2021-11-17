import { GR } from "./gr";

export interface Personne {
  id: number;
  nom?: string;
  prenom?: string;
  date_naissance?: string;
  date_evangelisation?: string;
  date_ajout?: string;
  telephone?: string;
  email?: string;
  gr?: GR;
  photo?: string;
  status?: string;
  ville?: string,
  pays?: string,
  login?: string,
  pwd?: string,
  invite?: boolean
}
