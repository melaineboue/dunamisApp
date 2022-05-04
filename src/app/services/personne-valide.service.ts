import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { formatDesDate } from '../models/const';
import { Personne } from '../models/personne';
import { PersonneDataValidation } from '../models/personne-data-validation';

@Injectable({
  providedIn: 'root'
})
export class PersonneValideService {

  estValide(personne: Personne): PersonneDataValidation {
    let validation: PersonneDataValidation = {
      estValide: true,
      emailInvalide: !this.emailValide(personne.email),
      nomPrenomVide: !this.nomPrenomNonVide(personne.nom, personne.prenom),
      numeroInvalide: !this.isNumero(personne.telephone),
      dateNaissanceInvalide: !this.dateEstValide(personne.date_naissance),
      dateEvangelisationInvalide: !this.dateEstValide(personne.date_evangelisation)
    };

    validation.estValide = this.estSansErreur(validation);
    console.log('validation', validation, personne);
    return validation;
  }

  private estSansErreur(validation: PersonneDataValidation): boolean{
    return !validation.nomPrenomVide &&
    !validation.numeroInvalide &&
    !validation.emailInvalide  &&
    !validation.dateNaissanceInvalide  &&
    !validation.dateEvangelisationInvalide
  }

  private isNumero(numero: string): boolean {
    var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    //return (!numero.trim() || numero_regex.test(numero));
    return true;
  }

  private dateEstValide(date: string): boolean {
    return !(date && date.trim())  || moment(date.trim(), formatDesDate, true).isValid();
  }

  /*isDate(date: string): boolean {
    const dates = date.split('/');
    return moment(date, formatDesDate).isValid();

    if (Number(dates[0]) <= 0 || Number(dates[0]) > 31) {
      resultat = false;
    }

    if (Number(dates[1]) <= 0 || Number(dates[1]) > 12) {
      resultat = false;
    }

    if (Number(dates[2]) <= 0) {
      resultat = false;
    }
    return resultat;

  }*/

  normaliserDate(date: string, dateAncien: string) {
    if (dateAncien.length < date.length) {
      if (date.length === 2 || date.length === 5) {
        date = date + '/';
      }
    }
    return date;
  }

  /**
   * Verifie si le nom et le prenom ne sont pas vide à la fois
   * @param nom le nom
   * @param prenom le prenom
   * @returns true si l'un des deux est non vide
   */
  nomPrenomNonVide(nom: string, prenom: string): boolean {
    console.log('=>',nom, prenom);

    return !!((nom && nom.trim().length > 0) || (prenom && prenom.trim().length > 0));
  }

  /**
   * Verifie si email passé est valide ou non
   * @param email email à valider
   * @returns true si email est vide ou si email est renseigné et son format est correct
   */
  emailValide(email: string): boolean {
    let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    let estEmail = regexp.test(email);
    return (!(email && email.trim()) || estEmail);
  }

  /*normaliserDateNaissance(date_naissance: string): string {
    date_naissance = this.normaliserDate(date_naissance, this.oldDateNaissance);
    this.oldDateNaissance = this.personne.date_naissance;
  }*/
}
