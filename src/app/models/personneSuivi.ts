export interface PersonneSuivi {
  id: number,
  nom: string,
  prenom: string,
  checked?: boolean,
  code?: string,
  copier?: boolean,
  copier_lien?: boolean,
  gr_libelle?: string,
  libelle_eglise?: string,
  nom_reseau?: string
}
