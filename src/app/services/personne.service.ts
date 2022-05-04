import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserRole } from '../enums/user-role';
import { Status } from '../models/const';
import { Evenement } from '../models/evenement';
import { GR } from '../models/gr';
import { Personne } from '../models/personne';
import { PersonneDataValidation } from '../models/personne-data-validation';
import { ReunionGr } from '../models/reunion-gr';
import { StatusModel } from '../models/status';
import { Suivi } from '../models/suivi';
import { User } from '../models/user';
import { getIdReseau, getUrlId } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class PersonneService {

  personnes: Personne[] = [];

  status: StatusModel[] = [
    { id: 1, libelle: Status.RESPONSABLE, selected: true},
    { id: 2, libelle: Status.POTENTIEL},
    { id: 3, libelle: Status.REGULIER},
    { id: 4, libelle: Status.EN_COURS_FIDELISATION},
    { id: 5, libelle: Status.IRREGULIER},
    { id: 6, libelle: Status.FANTOME}
  ]

  suivis: Suivi[] = [
    {
      id:1,
      libelle: "Suivi 1",
      date_suivi: "14/05/2021",
      personne_id: 1
    }
  ];
  evenementAssistes: Evenement[] = [
    {
      id:1,
      libelle: "Suivi 1",
      date_evenement: "14/05/2021",
      predicateur_id: 1,
      predicateur: 'APT',
      titre_message:'Titre 1'
    }
  ];
  evenementNonAssistes: Evenement[] = [{
    id:2,
    libelle: "NonSuivi 1",
    date_evenement: "18/05/2021",
    predicateur_id: 1,
    predicateur: 'APT',
    titre_message:'Titre 1'
  }];

  constructor(private http: HttpClient ) { }

  getPersonneReseau(): Observable<Personne[]> {
    // service = personne ** action = personneNonResponsable
    let url = `${environment.api}?service=personne&action=personneReseau${getUrlId()}`;
    return this.http.get<Personne[]>(url).pipe();
  }


  getPersonneReseauNonResponsable(): Observable<Personne[]> {
    // service = personne ** action = personneNonResponsable
    let url = `${environment.api}?service=personne&action=personneNonResponsable${getUrlId()}`;
    return this.http.get<Personne[]>(url).pipe();
  }


  getStatus(): Observable<StatusModel[]> {
    // service = personne ** action = listeStatus
    let url = `${environment.api}?service=personne&action=listeStatus`;
    return this.http.get<StatusModel[]>(url).pipe();
  }

  ajouterPersonne(personne: Personne): Observable<boolean>{
    // service = personne ** action = ajouterPersonne
    this.personnes.push(personne);
    let url = encodeURI(`${environment.api}?service=personne&action=ajouterPersonne${this.toStringPersonne(personne)}`);
    console.log(url);

    const formData: FormData = new FormData();
    formData.append('personne', JSON.stringify(personne));
    return this.http.post<boolean>(url, formData).pipe();


    //return this.http.get<boolean>(url).pipe();
  }

  /**
   * Modifie la personne passé en paramètre sans modifier le GR, Reseau, et l'eglise
   * @param personne les nouvelles données de la personne à modifier
   */
  modifierPersonne(personne: Personne): Observable<boolean> {

    let url = encodeURI(`${environment.api}?service=personne&action=modifierPersonne`);

    const formData: FormData = new FormData();
    formData.append('personne', JSON.stringify(personne));
    return this.http.post<boolean>(url, formData).pipe();

  }

  getVilles(): Observable<string[]>{
    let url = `${environment.api}?service=personne&action=personneVilles`;
    return this.http.get<string[]>(url).pipe();
  }

  getPays(): Observable<string[]>{
    let url = `${environment.api}?service=personne&action=personnePays`;
    return this.http.get<string[]>(url).pipe();
  }

  getPersonne(personneId: number): Observable<Personne>{
    // service = personne ** action = personneDetails
    let url = encodeURI(`${environment.api}?service=personne&action=personneDetails&id_personne=${personneId}`);
    return this.http.get<Personne>(url).pipe();
  }

  getSuivis(personneId: number): Observable<Suivi[]>{
    // service = personne ** action = suivis
    let url = encodeURI(`${environment.api}?service=personne&action=suivis&id_personne=${personneId}`);
    return this.http.get<Suivi[]>(url).pipe();
  }

  sauvegarderSuivi(suivi: string, idPersonnes: number[]): Observable<boolean>{
    // service = personne ** action = sauvegardeSuivi
    let url = encodeURI(`${environment.api}?service=personne&action=sauvegardeSuivi&id_personnes=${idPersonnes.join('***')}&suivi=${suivi}`);
    return this.http.get<boolean>(url).pipe();
  }

  getEvenementsAssistes(personneId: number): Observable<Evenement[]>{
    // service = personne ** action = events
    let url = encodeURI(`${environment.api}?service=personne&action=events&id_personne=${personneId}`);
    return this.http.get<Evenement[]>(url).pipe();
  }

  getEvenementsNonAssistes(personneId: number): Observable<Evenement[]>{
    // service = personne ** action = eventsNot
    let url = encodeURI(`${environment.api}?service=personne&action=eventsNot&id_personne=${personneId}`);
    return this.http.get<Evenement[]>(url).pipe();
    let a = 1;
    a+=a;

  }

  creerCompte(user:User): Observable<User>{
    //service=creerGr, service=login
    console.log('creer user', user);

    let id_gr = (user.role.role_libelle_court === UserRole.ResponsableGr) ? user.gr.id: 0;
    let id_reseau = (user.role.role_libelle_court === UserRole.ResponsableReseau) ? user.reseau.id: 0;
    let id_eglise = (user.role.role_libelle_court === UserRole.Pasteur) ? user.eglise.id: 0;

    let url = `${environment.api}?action=creerUserEtConnexion&service=login&id_personne=${user.id_personne}&email=${user.email}&login=${user.login}&password=${user.pwd}&role=${user.role.role_libelle_court}`;
    url = encodeURI(`${url}&id_gr=${id_gr}&id_reseau=${id_reseau}&id_eglise=${id_eglise}`);
    console.log(url);

    return this.http.get<User>(url).pipe();

  }

  getGrAssiste(personneId: number): Observable<ReunionGr[]>{
    // service = personne ** action = grAssiste
    let url = encodeURI(`${environment.api}?service=personne&action=grAssiste&id_personne=${personneId}`);
    return this.http.get<ReunionGr[]>(url).pipe();
  }

  toStringPersonne(personne: Personne): string {
    //return `&nom=${personne.nom}&prenom=${personne.prenom}&telephone=${personne.telephone}&email=${personne.email}&ville=${personne.ville}&pays=${personne.pays}&status=${personne.status}&id_gr=${personne.gr.id}&id_reseau=${personne.reseau.id}&id_eglise=${personne.eglise.id}&date_naissance=${personne.date_naissance}&date_evangelisation=${personne.date_evangelisation}`;
    return '';
  }

}
