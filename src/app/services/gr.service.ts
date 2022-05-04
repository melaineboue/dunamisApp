import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GR } from '../models/gr';
import { Invite } from '../models/invite';
import { Personne } from '../models/personne';
import { PersonneSuivi } from '../models/personneSuivi';
import { Suivi } from '../models/suivi';
import { getIdGr, getIdReseau, getUrlId } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class GrService {

  grs: GR[] = [];


  personnesGR: Personne[] = [];
  personnesHorsGR: Personne[] = [];

  constructor(private http: HttpClient) { }

  getList(): Observable<GR[]> {
    // service = gr / action = listgr
    let id_reseau = localStorage.getItem('idReseau');
    let url = `${environment.api}?service=gr&action=listgr${getUrlId()}`;
    return this.http.get<GR[]>(url).pipe();
  }

  /**
   *
   * @param id Recupère les personnes qui ont été ajouté dans cette période
   * @param date la date d'effet
   * @returns
   *
   */
  getPersonneNouveau(id: number, date: string): Observable<Invite[]>{
    let url = encodeURI(`${environment.api}?service=gr&action=getNouveauGr&id_gr=${id}&date=${date}`);
    // url = encodeURI(`${environment.api}?service=gr&action=getNouveauGr&id_gr=${id}&date=2022-01-01`);
    console.log(url);

    return this.http.get<Invite[]>(url).pipe(map(response => response));
  }

  getGrById(id: number): Observable<GR>{
    // service = login / action = getGrById
    let url = `${environment.api}?service=gr&action=getGrById&id=${id}`;
    return this.http.get<GR>(url).pipe(map(response => response));
  }

  getPersonnesGR(id: number): Observable<Personne[]> {
    // service = gr / action = getGrById
    let url = `${environment.api}?service=gr&action=getPersonnesGr&id_gr=${id}`;
    return this.http.get<Personne[]>(url).pipe(map(response => response));
  }

  getPersonnesHorsGR(id: number): Observable<Personne[]> {
    // service = gr / action = getGrHorsById
    let url = `${environment.api}?service=gr&action=getPersonnesHorsGr&id_gr=${id}`;
    return this.http.get<Personne[]>(url).pipe(map(response => response));
  }

  getPersonnesSansGR(id: number): Observable<Personne[]> {
    // service = gr / action = getGrHorsById
    let url = `${environment.api}?service=gr&action=getPersonnesSansGr&id_reseau=${id}`;
    return this.http.get<Personne[]>(url).pipe(map(response => response));
  }

  getSuiviByGr(idGr: number): Observable<Suivi[]>{
    // service = gr / action = suiviGr
    let url = `${environment.api}?service=gr&action=suiviGr&id_gr=${idGr}`;
    return this.http.get<Suivi[]>(url).pipe(map(response => response));
  }

  ajouterPersonne(personne: Personne, id_gr: number): Observable<boolean> {
    // service = gr / action = ajouterPersonne
    let url = `${environment.api}?service=gr&action=ajouterPersonne&id_personne=${personne.id}&id_gr=${id_gr}`;
    return this.http.get<boolean>(url).pipe();
  }


  retirerPersonne(personne: Personne): Observable<boolean> {
    // service = gr / action = retirerPersonne
    let url = `${environment.api}?service=gr&action=retirerPersonne&id_personne=${personne.id}`;
    return this.http.get<boolean>(url).pipe();
  }

  creerGr(gr: GR, responsables: PersonneSuivi[]): Observable<boolean>{
    // service = gr / action = retirerPersonne
    let libelle_gr = gr.libelle;
    const responsableToSend = responsables.map(responsable => this.toString(responsable)).join('||');
    const urlResponsable = responsables.length === 0 ? '' : `&responsables=${encodeURI(responsableToSend)}`;
    let url = `${environment.api}?service=gr&action=creerGr&libelle_gr=${encodeURI(libelle_gr)}${urlResponsable}${getUrlId()}`;
    return this.http.get<boolean>(url).pipe();
  }

  getFuturResponsable(): Observable<PersonneSuivi[]> {
    let url = encodeURI(`${environment.api}?service=gr&action=getFuturResponsable&id_reseau=${getIdReseau()}`);
    return this.http.get<PersonneSuivi[]>(url).pipe();
  }

  fermerGr(id_gr: number): Observable<boolean>{
    let url = encodeURI(`${environment.api}?service=gr&action=fermer&id_gr=${id_gr}`);
    console.log(url);

    return this.http.get<boolean>(url).pipe();
  }

  definirReponsable(idPersonne: number, idGr: number){
    let url = `${environment.api}?service=gr&action=setResponsableGr&id_gr=${idGr}&id_personne=${idPersonne}`;
    console.log(url);


  }

  setReunionEnCours(idGr: number, idReunion: number){
    this.grs.forEach(gr=>{
      if(gr.id === idGr){
        gr.reunion = true;
        gr.id_reunion_cours = idReunion
      }
    })
  }

  setValide(idGr: number, idReunion: number){
    this.grs.forEach(gr=>{
      if(gr.id === idGr && gr.id_reunion_cours === idReunion){
        gr.reunion = false;
        gr.id_reunion_cours = 0
      }
    })
  }

  toString(personne: PersonneSuivi): string {
    return `${personne.id}***${personne.code}`;
  }


}
