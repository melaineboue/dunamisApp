
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
return Number(localStorage.getItem('idReseau'));
}


export function getIdGr(): number {
return Number(localStorage.getItem('idGr'));
}

export function getGr(): string {
return localStorage.getItem('gr');
}
