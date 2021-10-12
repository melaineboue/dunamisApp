import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Status } from '../models/const';
import { Evenement } from '../models/evenement';
import { Personne } from '../models/personne';
import { Predicateur } from '../models/predicateur';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  events: Evenement[] = [
    {
      id:1,
      libelle: 'Le grand Live',
      predicateur: 'Apôtre APT',
      predicateur_id:1,
      titre_message: 'Les gens qui ont bouleversé leur génération',
      date_evenement:'04/09/2021'
    }
  ];

  personnesAssiste: Personne[]=[
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
    }
  ];

  personnesNonAssiste: Personne[]=[
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
    }
  ];

  personnesInvitees: Personne[]=[
    {
      id:1,
      nom: 'BOUE',
      prenom:'Brice',
      date_ajout: '04/08/2021',
      telephone: '0769089717',
      status: Status.INVITE,
      gr: {
        id:1,
        libelle: 'GR Franckie',
        idreseau: 1
      }
    }
  ]

  predicateurs: Predicateur[] = [
    { id: 1, nom: 'Apôtre Alain Patrick Tsengue'}
  ]

  constructor() { }

  getEvents(): Observable<Evenement[]> {
    return of(this.events);
  }

  getPredicateurs(): Observable<Predicateur[]>{
    return of(this.predicateurs);
  }

  saveEvent(event: Evenement): Observable<boolean>{
    event.id = this.events.length + 15;
    this.events.push(event);
    return of(true);
  }

  getEventById(id: number): Observable<Evenement> {
    const results = this.events.filter(event => event.id === id);
    return of( results.length > 0 ? results[0] : null );
  }

  getPersonnesAssiste(idEvent: number): Observable<Personne[]>{
    return of(this.personnesAssiste);
  }

  getPersonnesNonAssiste(idEvent: number): Observable<Personne[]>{
    return of(this.personnesNonAssiste);
  }

  getEventInvites(idEvent: number): Observable<Personne[]>{
    return of(this.personnesInvitees)
  }
}
