import { Reseau } from "./reseau";

export interface GR {
  id:number,
  libelle:string,
  idreseau: number,
  responsables?: string,
  taille?: number,
  date_creation?: string
}
