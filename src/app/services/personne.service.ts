import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Status } from '../models/const';
import { Evenement } from '../models/evenement';
import { Personne } from '../models/personne';
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
    return of(this.personnes);
  }

  getStatus(): Observable<StatusModel[]> {
    return of(this.status);
  }

  ajouterPersonne(personne: Personne): Observable<boolean>{
    console.log('personne ', personne);

    this.personnes.push(personne);
    return of(true);
  }

  getPersonne(personneId: number): Observable<Personne>{
    let response = this.personnes.filter(personne => personne.id == personneId);
    return of(response.length > 0 ? response[0] : null);
  }

  getSuivis(personneId: number): Observable<Suivi[]>{
    return of(this.suivis);
  }

  getEvenementsAssistes(personneId: number): Observable<Evenement[]>{
    return of(this.evenementAssistes);
  }

  getEvenementsNonAssistes(personneId: number): Observable<Evenement[]>{
    return of(this.evenementNonAssistes);
  }

  sauvegarderSuivi(suivi: string, idPersonne: number[]): Observable<boolean>{
    return of(true);
  }

  creerCompte(personne:Personne): Observable<boolean>{
    return of(true);
  }

}
