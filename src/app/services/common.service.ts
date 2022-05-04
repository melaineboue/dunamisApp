import { Injectable } from '@angular/core';
import { menuItemsClass } from '../models/const';
import { Personne } from '../models/personne';
import { Reseau } from '../models/reseau';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  messageSuccess = "messageSuccess";

  autorizedCaracter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ$_1234567890';

  idPersonneDetails: number = null;
  idPersonneModifier: number = null;
  idGrDetails: number = null;
  idEvent: number = null;
  idReunion: number = null;
  idReseauDetails: number = 1;

  personneModifier: Personne = { gr: {id:0 }};
  reseauModifier: Reseau;

  backRoute: string[] = [];

  setId(idPersonne: number){
    this.idPersonneDetails = idPersonne;
  }

  getId(): number{
    return this.idPersonneDetails;
  }

  setPersonneModifier(personne: Personne){
    this.personneModifier = personne;
  }

  getPersonneModifier(): Personne {
    return this.personneModifier;
  }

  setReseauModifier(reseau: Reseau){
    this.reseauModifier = reseau;
  }

  getReseauModifier(): Reseau {
    return this.reseauModifier;
  }

  setIdReseau(id: number){
    this.idReseauDetails = id;
  }

  getIdReseau(): number{
    return this.idReseauDetails;
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

  setIdRenuion(idReunion: number){
    this.idReunion = idReunion;
  }

  getIdRenuion(){
    return this.idReunion;
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

  generateAccessCode(nombre: number): string {
    let code ='';
    for(let i= 0; i< nombre; i++){
      let index = Math.floor(Math.random()* this.autorizedCaracter.length );
      code += this.autorizedCaracter[index];
    }
    return code;
  }



  rechercher(value: string, ...valeurs: string[]): boolean {
    return this.supprimerCaractereSpeciaux(valeurs.join(' ')).includes(this.supprimerCaractereSpeciaux(value));
  }

  supprimerCaractereSpeciaux(value: string): string {

    return value.toLowerCase()
    .trim()
    .replace(/\s+/g, ' ') // remplace plusieurs espaces par un seul
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

  addFlashSuccessMessage(message: string){
    sessionStorage.setItem(this.messageSuccess, message)
  }

  removeFlashSuccessMessage(){
    sessionStorage.removeItem(this.messageSuccess);
  }

  getFlashSuccessMessage(): string {
    let message = sessionStorage.getItem(this.messageSuccess);
    return message ? message : '';
  }




}
