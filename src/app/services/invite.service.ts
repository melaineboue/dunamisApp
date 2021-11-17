import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Invite } from '../models/invite';
import { getIdGr } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class InviteService {

  constructor(private http: HttpClient) { }

  saveInviteReunion(nomInvite: string): Observable<number>{
    const url = encodeURI(`${environment.host}?service=invite&action=saveInvite&nom=${nomInvite}&id_gr=${getIdGr()}`);
    return this.http.get<number>(url).pipe();
  }

  getInvitesFromReunion(idReunion: number): Observable<Invite[]>{
    const url = encodeURI(`${environment.host}?service=invite&action=getInviteByReunion&id_reunion=${idReunion}`);
    return this.http.get<Invite[]>(url).pipe();
  }
}
