export const menuItemsClass = {
  ACCUEIL: "accueil",
  LISTE_PERSONNE: "listeBrebis",
  LISTE_PERSONNE_GR: "listeBrebisGr",
  LISTE_GR: "listeGR",
  LISTE_RESEAU: "listeReseau",
  EVENT_LIST: "events",
  THEME_GR_LIST: "themegr",
  REUNION_GR_LIST: "reuniongr",
  ADD_PERSONNE: "addBrebis",
  ADD_EVENT: "addEvent",
  ADD_THEME: "addTheme",
  ADD_REUNION_GR: "addReunionGr",
  ADD_GR: "addGr",
  ADD_REUNION: "addReunion",
  PRESENCE_CULTE: "presenceCulte",
  DETAILS_REUNION_GR: "detailsReunionGr",
  DETAILS_PERSONNE: "detailsBrebis",
  DETAILS_EVENT: "detailsEvent",
  DETAILS_GR: "detailsGr",
  SUIVI_PERSONNE: "suivi",
  LOGIN: "login",
  BIENVENUE: "bienvenue",
  DECONNECTER: "logout",
  DASHBOARD: "dashboard",
  HISTORY: ""
}

export const defaultRedirectParamNotExist = menuItemsClass.ACCUEIL;
export const defaultRedirectNotAuth = menuItemsClass.LOGIN;
export const defaultConnectedPage = menuItemsClass.ACCUEIL;

export const Status = {
  RESPONSABLE: "responsable",
  POTENTIEL: "potentiel",
  REGULIER: "regulier",
  EN_COURS_FIDELISATION: "en_cours_fidelisation",
  IRREGULIER: "irregulier",
  FANTOME: "fantome",
  INVITE: "invite"
}
