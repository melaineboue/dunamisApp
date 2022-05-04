import { GR } from "../models/gr";
import { User } from "../models/user";
import { RoleU } from "../models/role"
import { UserRole } from "../enums/user-role";
import { Reseau } from "../models/reseau";
import { Eglise } from "../models/eglise";

export function deuxChiffre(number: number){
  return number < 10 ? '0'+number : number;
}


/**
 *
 * @param date : Date au format DD/MM/YYYY
 * return true si Date is valid: si pas 32/15/2009
 */
 export function estDate(date: string): boolean{
  const dates = date.split('/');

  return Number(dates[0]) > 0 && Number(dates[0]) <= 31 &&
         Number(dates[1]) > 0 && Number(dates[1]) <= 12 &&
         Number(dates[2]) > 0;
}


/**
*
* @param heure : Heure au format HH:MM
* return true si Heure is valid: si pas 25:72
*/
export function estHeure(heure: string): boolean{

const heures = heure.split(':');

return Number(heures[0]) >= 0 && Number(heures[0]) < 24 &&
       Number(heures[1]) >= 0 && Number(heures[1]) < 60;
}

export function getIdReseau(): number {
  const user = JSON.parse(localStorage.getItem('user')) as User;
  return Number(user.reseau.id);
}

export function getIdEglise(): number {
  const user = JSON.parse(localStorage.getItem('user')) as User;
  return Number(user.eglise.id);
}


export function getIdGr(): number {
  const user = JSON.parse(localStorage.getItem('user')) as User;
  return Number(user.gr?.id);
}

export function getIdUser(): number {
  const user = JSON.parse(localStorage.getItem('user')) as User;
  return Number(user?.id);
}

export function getGr(): string {
  return localStorage.getItem('gr');
}

export function getGrForUser(): GR {
  return JSON.parse(localStorage.getItem('user')).gr;
}

export function getReseauForUser(): Reseau {
  return JSON.parse(localStorage.getItem('user')).reseau;
}

export function getEgliseForUser(): Eglise {
  return JSON.parse(localStorage.getItem('user')).eglise;
}

export function getUserRole(): RoleU {
  let user = JSON.parse(localStorage.getItem('user')) as User;
  return user?.role;
}

export function getUrlId(): string {
  let url = "";
  let user = JSON.parse(localStorage.getItem('user')) as User;
  if(user?.role.role_libelle_court === UserRole.ResponsableReseau || user?.role.role_libelle_court === UserRole.ResponsableReseauReadOnly){
    url = `&id_reseau=${user.reseau.id}`;
  }
  else if(user?.role.role_libelle_court === UserRole.ResponsableGr || user?.role.role_libelle_court === UserRole.ResponsableGrReadOnly){
    url = `&id_gr=${user.gr.id}`;
  }
  else if(user?.role.role_libelle_court === UserRole.Pasteur || user?.role.role_libelle_court === UserRole.PasteurReadOnly){
    url = `&id_gr=${user.gr.id}`;
  }

  return url;
}

export function getFullUrlId(): string {
  let url = "";
  let user = JSON.parse(localStorage.getItem('user')) as User;
  if(user?.role.role_libelle_court === UserRole.Pasteur || user?.role.role_libelle_court === UserRole.PasteurReadOnly){
    url = `&id_eglise=${user.eglise.id}`;
  }
  else if(user?.role.role_libelle_court === UserRole.ResponsableReseau || user?.role.role_libelle_court === UserRole.ResponsableReseauReadOnly){
    url = `&id_eglise=${user.eglise.id}&id_reseau=${user.reseau.id}`;
  }
  else if(user?.role.role_libelle_court === UserRole.ResponsableGr || user?.role.role_libelle_court === UserRole.ResponsableGrReadOnly){
    url = `&id_eglise=${user.eglise.id}&id_reseau=${user.reseau.id}&id_gr=${user.gr.id}`;
  }

  return url;
}

