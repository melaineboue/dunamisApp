import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserRole } from '../enums/user-role';
import { Status } from '../models/const';
import { Evenement } from '../models/evenement';
import { Invite } from '../models/invite';
import { Personne } from '../models/personne';
import { PersonneSuivi } from '../models/personneSuivi';
import { Predicateur } from '../models/predicateur';
import { getFullUrlId, getIdEglise, getIdGr, getIdReseau, getUserRole } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  events: Evenement[] = [];

  personnesAssiste: Personne[]=[];

  personnesNonAssiste: Personne[]=[];

  personnesInvitees: Personne[]=[]

  predicateurs: Predicateur[] = [
    { id: 1, nom: 'Apôtre Alain Patrick Tsengue'}
  ]

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Evenement[]> {
    // service = event
    // action = listeEvent
    let url = `${environment.api}?service=event&action=listeEvent${getFullUrlId()}`;
    return this.http.get<Evenement[]>(url).pipe();
  }

  getEventsAvenir(): Observable<Evenement[]> {
    let url = `${environment.api}?service=event&action=listeEventAvenir${getFullUrlId()}`;
    return this.http.get<Evenement[]>(url).pipe();
  }

  getPredicateurs(): Observable<Predicateur[]>{
    let url = encodeURI(`${environment.api}?service=event&action=listePredicateur`);
    return this.http.get<Predicateur[]>(url).pipe();
  }

  saveEvent(event: Evenement, portee: number): Observable<boolean>{
    // service = event , action = saveEvent
    let urlComplement = "";

    if(portee == 2){
      urlComplement = `${urlComplement}&id_eglise=${getIdEglise()}`;
    }
    if(portee == 3){
      urlComplement = `${urlComplement}&id_reseau=${getIdReseau()}`;
    }
    if(portee == 4){
      urlComplement = `${urlComplement}&id_gr=${getIdGr()}`;
    }

    let url = encodeURI(`${environment.api}?service=event&action=saveEvent&${this.eventToString(event)}${urlComplement}`);
    console.log(url);

    return this.http.get<number | boolean>(url).pipe(map(response => {
      if(response){
        event.id = Number(response);
        this.events.push(event);
        return true;
      }
      return false;
    }));
  }

  getEventById(id: number): Observable<Evenement> {
    // service = event , action = saveEvent
    let url = encodeURI(`${environment.api}?service=event&action=getEventById&id_event=${id}`);
    return this.http.get<Evenement>(url).pipe();
  }

  getPersonnesAssiste(idEvent: number): Observable<Personne[]>{
    let url = encodeURI(`${environment.api}?service=event&action=getPersonnesAssiste&id_event=${idEvent}&id_reseau=${getIdReseau()}`);
    return this.http.get<Personne[]>(url).pipe();
  }

  getPersonnesNonAssiste(idEvent: number): Observable<Personne[]>{
    let url = encodeURI(`${environment.api}?service=event&action=getPersonnesNonAssiste&id_event=${idEvent}&id_reseau=${getIdReseau()}`);
    return this.http.get<Personne[]>(url).pipe();
  }

  getPersonneGrUser(idEvent: number): Observable<PersonneSuivi[]>{
    let url = encodeURI(`${environment.api}?service=event&action=personnes&id_event=${idEvent}&id_gr=${getIdGr()}`);
    return this.http.get<PersonneSuivi[]>(url).pipe();
  }

  getEventInvites(idEvent: number): Observable<Invite[]>{
    let url = encodeURI(`${environment.api}?service=event&action=listeInvite&id_event=${idEvent}&id_reseau=${getIdReseau()}`);
    return this.http.get<Invite[]>(url).pipe();
  }

  eventToString(event: Evenement): string {
    const dates = event.date_evenement.split('/');
    const heures = event.heure_evenement.trim();
    const date = `${dates[2]}-${dates[1]}-${dates[0]} ${heures}:00`;

    return `id_event=${event.id}&nom_event=${event.libelle}&predicateur_event=${event.predicateur}&titre_message=${event.titre_message}&date_event=${date}`
  }

  /**
   *
   * @param idsParticipant
   * @param idsInvite
   * @param idsInvitePresent
   * @param event
   * @returns le id de l'evênement modifié
   */
  enregistrerParticipant(idsParticipant:number[], idsInvite:number[], idsInvitePresent:number[], event: Evenement): Observable<number>{
    const ids = idsParticipant.join('-');
    const idsInviteChaine = idsInvite.join('-');
    const idsInvitePresentChaine = idsInvitePresent.join('-');
    let url = encodeURI(`${environment.api}?service=event&action=saveParticipantEvent&invite=${idsInviteChaine}&invitePresent=${idsInvitePresentChaine}&participants=${ids}&id_event=${event.id}`);

    return this.http.get<number>(url).pipe();
  }
}
