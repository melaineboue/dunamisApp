import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Status } from '../models/const';
import { Evenement } from '../models/evenement';
import { GR } from '../models/gr';
import { Personne } from '../models/personne';
import { ReunionGr } from '../models/reunion-gr';
import { StatusModel } from '../models/status';
import { Suivi } from '../models/suivi';

@Injectable({
  providedIn: 'root'
})
export class PersonneService {

  personnes: Personne[] = [
    {
      id:1,
      nom: 'BOUE',
      prenom:'Mélaine',
      date_ajout: '04/08/2021',
      telephone: '0769089717',
      status: Status.RESPONSABLE,
      gr: {
        id:1,
        libelle: 'GR Franckie',
        idreseau: 1
      }
    },

    {
      id:3,
      nom: 'Birat',
      prenom:'Christellyne',
      date_ajout: '04/08/2021',
      telephone: '0745859652',
      status: Status.RESPONSABLE,
      gr: {
        id:2,
        libelle: 'GR Christellyne',
        idreseau: 1
      }
    },

    {
      id:4,
      nom: 'Nzimbou',
      prenom:'Ludmila',
      date_ajout: '04/08/2021',
      telephone: '0623521452',
      status: Status.POTENTIEL,
      gr: {
        id:2,
        libelle: 'GR Christellyne',
        idreseau: 1
      }
    },

    {
      id:2,
      nom: 'BOUE',
      prenom:'Arnaud',
      date_ajout: '05/08/2021',
      telephone: '0769089717',
      status: Status.REGULIER,
      gr: {
        id:1,
        libelle: 'GR Franckie',
        idreseau: 1
      }
    }
  ];

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
    let url = `${environment.host}?service=personne&action=personneReseau&id_reseau=${localStorage.getItem('idReseau')}`;
    return this.http.get<Personne[]>(url).pipe();
  }


  getPersonneReseauNonResponsable(): Observable<Personne[]> {
    // service = personne ** action = personneNonResponsable
    let url = `${environment.host}?service=personne&action=personneNonResponsable&id_reseau=${localStorage.getItem('idReseau')}`;
    return this.http.get<Personne[]>(url).pipe();
  }


  getStatus(): Observable<StatusModel[]> {
    // service = personne ** action = listeStatus
    let url = `${environment.host}?service=personne&action=listeStatus`;
    return this.http.get<StatusModel[]>(url).pipe();
  }

  ajouterPersonne(personne: Personne): Observable<boolean>{
    // service = personne ** action = ajouterPersonne
    this.personnes.push(personne);
    let url = encodeURI(`${environment.host}?service=personne&action=ajouterPersonne&id_reseau=${localStorage.getItem('idReseau')}${this.toStringPersonne(personne)}`);
    return this.http.get<boolean>(url).pipe();
  }

  getVilles(): Observable<string[]>{
    let url = `${environment.host}?service=personne&action=personneVilles`;
    return this.http.get<string[]>(url).pipe();
  }

  getPays(): Observable<string[]>{
    let url = `${environment.host}?service=personne&action=personnePays`;
    return this.http.get<string[]>(url).pipe();
  }

  getPersonne(personneId: number): Observable<Personne>{
    // service = personne ** action = personneDetails
    let url = encodeURI(`${environment.host}?service=personne&action=personneDetails&id_personne=${personneId}`);
    return this.http.get<Personne>(url).pipe();
  }

  getSuivis(personneId: number): Observable<Suivi[]>{
    // service = personne ** action = suivis
    let url = encodeURI(`${environment.host}?service=personne&action=suivis&id_personne=${personneId}`);
    return this.http.get<Suivi[]>(url).pipe();
  }

  sauvegarderSuivi(suivi: string, idPersonnes: number[]): Observable<boolean>{
    // service = personne ** action = sauvegardeSuivi
    let url = encodeURI(`${environment.host}?service=personne&action=sauvegardeSuivi&id_personnes=${idPersonnes.join('***')}&suivi=${suivi}`);
    return this.http.get<boolean>(url).pipe();
  }

  getEvenementsAssistes(personneId: number): Observable<Evenement[]>{
    // service = personne ** action = events
    let url = encodeURI(`${environment.host}?service=personne&action=events&id_personne=${personneId}`);
    return this.http.get<Evenement[]>(url).pipe();
  }

  getEvenementsNonAssistes(personneId: number): Observable<Evenement[]>{
    // service = personne ** action = eventsNot
    let url = encodeURI(`${environment.host}?service=personne&action=eventsNot&id_personne=${personneId}`);
    return this.http.get<Evenement[]>(url).pipe();
  }

  creerCompte(personne:Personne): Observable<boolean>{
    //service=creerGr, service=login
    let url = `${environment.host}?action=creerGr&service=login&id_personne=${personne.id}&email=${personne.email}&login=${personne.login}&password=${personne.pwd}`;
    console.log(url);

    return this.http.get<boolean>(url).pipe(map(response=>{
      if(response){
        return true;
      } else {
        return false;
      }
    }));

  }

  getGrAssiste(personneId: number): Observable<ReunionGr[]>{
    // service = personne ** action = grAssiste
    let url = encodeURI(`${environment.host}?service=personne&action=grAssiste&id_personne=${personneId}`);
    return this.http.get<ReunionGr[]>(url).pipe();
  }

  toStringPersonne(personne: Personne): string {
    return `&nom=${personne.nom}&prenom=${personne.prenom}&telephone=${personne.telephone}&email=${personne.email}&ville=${personne.ville}&pays=${personne.pays}&status=${personne.status}&id_gr=${personne.gr.id}&date_naissance=${personne.date_naissance}&date_evangelisation=${personne.date_evangelisation}`;
  }

}
