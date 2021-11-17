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

  reunionsGr: ReunionGr[] = [
    {
      id: 1,
      annonce: 'blabla bla bla',
      semaine: 'S40',
      annee: 2021,
      titre: 'Titre',
      gr_libelle: 'Gr Franckie',
      gr_id: 1,
      date: '12/05/2020',
      enregistre: true,
      valide: false,
      heure_debut: '',
      heure_fin: ''
    },
    {
      id: 2,
      annonce: 'bla car bla bla',
      semaine: 'S2',
      annee: 2021,
      titre: 'Titre 2',
      gr_libelle: 'Gr Christellyne',
      gr_id: 3,
      date: '21/10/2021',
      enregistre: true,
      valide: true,
      heure_debut: '',
      heure_fin: ''
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
        idreseau: 1,

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

  participants: ParticipantGr[]= [
    {
      id_gr: 1,
      semaine: 'S40',
      personne_ids: [1,2,3],
      valide: true
    }
  ]

  constructor(private http: HttpClient, private grService: GrService, private reunionService: ReunionGrService, private themeService: ThemeService) { }

  getReunions(): Observable<ReunionGr[]>{
    // service = event , action = saveEvent
    let url = encodeURI(`${environment.host}?service=reunion&action=listeReunion&id_reseau=${getIdReseau()}`);
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
    // TO DO
    let url = encodeURI(`${environment.host}?service=reunion&action=saveInvite&id_reunion=${idReunion}&nom=${nomInvite}`);
    //return this.http.get<number>(url).pipe();
    return of(1);
  }

  save(idsParticipant:number[], idsInvite:number[], idsInvitePresent:number[], reunion?: ReunionGr): Observable<number>{
    const ids = idsParticipant.join('-');
    const idsInviteChaine = idsInvite.join('-');
    const idsInvitePresentChaine = idsInvitePresent.join('-');
    let url = encodeURI(`${environment.host}?service=reunion&action=saveReunion&invite=${idsInviteChaine}&invitePresent=${idsInvitePresentChaine}&participants=${ids}${this.reunionToString(reunion)}`);
    console.log(url);

    return this.http.get<number>(url).pipe();
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

    return `&semaine=${reunion.semaine}
            &annonce=${reunion.annonce.trim()}
            &id_gr=${reunion.gr_id}
            &message=${reunion.titre.trim()}
            &date_fin=${date_fin.trim()}
            &date_debut=${date_debut.trim()}
            &id_reunion=${reunion.id ? reunion.id : 0 }
            &rapport=${reunion.rapport.replace('&',' ')}`;
  }
}
