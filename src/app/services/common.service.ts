import { Injectable } from '@angular/core';
import { menuItemsClass } from '../models/const';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  idPersonneDetails: number = null;
  idGrDetails: number = null;
  idEvent: number = null;

  backRoute: string[] = [];

  setId(idPersonne: number){
    this.idPersonneDetails = idPersonne;
  }

  getId(): number{
    return this.idPersonneDetails;
  }

  setIdGr(id:number){
    this.idGrDetails = id;
  }

  getIdGr(){
    return this.idGrDetails;
  }

  setIdEvent(idEvent: number){
    this.idEvent = idEvent;
  }

  getIdEvent(){
    return this.idEvent;
  }

  setBackRoute(route: string){
    this.backRoute.push(route);
  }

  getBackRoute(pop: boolean):string {
    if(pop){
      return this.backRoute.pop();
    } else {
      return this.backRoute[this.backRoute.length - 1 ];
    }
  }



  rechercher(value: string, ...valeurs: string[]): boolean {
    return this.supprimerCaractereSpeciaux(valeurs.join('')).includes(this.supprimerCaractereSpeciaux(value));
  }

  supprimerCaractereSpeciaux(value: string): string {
    return value.toLowerCase()
    .trim()
    .replace(' ', '')
    .replace('â', 'a')
    .replace('ä', 'a')
    .replace('é', 'e')
    .replace('è', 'e')
    .replace('ë', 'e')
    .replace('ê', 'e')
    .replace('ï', 'i')
    .replace('ô', 'o')
    .replace('û', 'u');
  }


}
