import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Status } from '../models/const';
import { ParticipantGr } from '../models/participant-gr';
import { Personne } from '../models/personne';
import { ReunionGr } from '../models/reunion-gr';
import { Theme } from '../models/theme-gr';
import { getIdGr, getIdReseau } from '../utils/utils';
import { GrService } from './gr.service';
import { ThemeService } from './theme.service';

@Injectable({
  providedIn: 'root'
})
export class ReunionGrService {

  reunionsGr: ReunionGr[] = [];

  personnesAssiste: Personne[]=[];

  personnesNonAssiste: Personne[]=[];

  personnesInvitees: Personne[]=[]

  participants: ParticipantGr[]= []

  constructor(private http: HttpClient, private grService: GrService, private reunionService: ReunionGrService, private themeService: ThemeService) { }

  getReunionsReseau(): Observable<ReunionGr[]>{
    // service = event , action = saveEvent
    let url = encodeURI(`${environment.host}?service=reunion&action=listeReunionReseau&id_reseau=${getIdReseau()}`);
    return this.http.get<ReunionGr[]>(url).pipe();
  }

  getReunionsGr(): Observable<ReunionGr[]>{
    // service = event , action = saveEvent
    let url = encodeURI(`${environment.host}?service=reunion&action=listeReunionGr&id_gr=${getIdGr()}`);
    return this.http.get<ReunionGr[]>(url).pipe();
  }

  getReunionById(reunionId: number): Observable<ReunionGr>{
    let url = encodeURI(`${environment.host}?service=reunion&action=getReunionById&id_reunion=${reunionId}`);
    return this.http.get<ReunionGr>(url).pipe();
  }

  getPersonnesAssiste(idReunion: number): Observable<Personne[]>{
    let url = encodeURI(`${environment.host}?service=reunion&action=getPersonnesReunion&id_reunion=${idReunion}`);
    return this.http.get<Personne[]>(url).pipe();
  }

  getPersonnesNonAssiste(idReunion: number): Observable<Personne[]>{
    let url = encodeURI(`${environment.host}?service=reunion&action=getPersonnesNonAssisteReunion&id_reunion=${idReunion}`);
    return this.http.get<Personne[]>(url).pipe();
  }

  /*getReunionInvites(idReunion: number): Observable<Invite[]>{
    let url = encodeURI(`${environment.host}?service=invite&action=getInviteByReunion&id_reunion=${idReunion}`);
    return this.http.get<Invite[]>(url).pipe();
  }*/

  saveInvite(idReunion: number,nomInvite: string): Observable<number> {
    let url = encodeURI(`${environment.host}?service=reunion&action=saveInvite&id_reunion=${idReunion}&nom=${nomInvite}`);
    return this.http.get<number>(url).pipe();
  }

  save(idsParticipant:number[], idsInvite:number[], idsInvitePresent:number[], reunion?: ReunionGr): Observable<number>{
    const ids = idsParticipant.join('-');
    const idsInviteChaine = idsInvite.join('-');
    const idsInvitePresentChaine = idsInvitePresent.join('-');
    let url = encodeURI(`${environment.host}?service=reunion&action=saveReunion&invite=${idsInviteChaine}&invitePresent=${idsInvitePresentChaine}&participants=${ids}${this.reunionToString(reunion)}`);
    const formData: FormData = new FormData();
    formData.append('rapport', reunion.rapport);

    return this.http.post<number>(url, formData).pipe();
  }

  validerReunion(idReunion: number):Observable<number>{
    let url = encodeURI(`${environment.host}?service=reunion&action=validerReunionEnCours&id_reunion=${idReunion}&id_gr=${getIdGr()}`);
    return this.http.get<number>(url).pipe();
  }

  getReunionEnCours(idGr: number): Observable<ReunionGr> {
    let url = encodeURI(`${environment.host}?service=reunion&action=getReunionEnCours&id_gr=${idGr}`);

    return this.http.get<ReunionGr>(url).pipe();
  }

  reunionToString(reunion: ReunionGr): string {
    const dates = reunion.date.split('/');
    const date_debut=`${dates[2]}-${dates[1]}-${dates[0]} ${reunion.heure_debut}:00`;
    const date_fin=`${dates[2]}-${dates[1]}-${dates[0]} ${reunion.heure_fin}:00`;

    return `&semaine=${reunion.semaine}&annonce=${reunion.annonce.trim()}&id_gr=${reunion.gr_id}&message=${reunion.titre.trim()}&date_fin=${date_fin.trim()}&date_debut=${date_debut.trim()}&id_reunion=${reunion.id ? reunion.id : 0 }`;
  }
}
