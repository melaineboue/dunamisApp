export interface Evenement {
  id:number,
  libelle: string,
  predicateur: string,
  titre_message: string,
  date_evenement: string,
  heure_evenement?: string,
  predicateur_id?: number
}
