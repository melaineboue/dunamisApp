export interface PersonneDataValidation {
  estValide: boolean,
  nomPrenomVide?: boolean,
  emailInvalide?: boolean,
  numeroInvalide?: boolean,
  dateNaissanceInvalide?: boolean,
  dateEvangelisationInvalide?: boolean
}
