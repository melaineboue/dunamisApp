import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Status } from '../models/const';
import { GR } from '../models/gr';
import { Personne } from '../models/personne';
import { PersonneSuivi } from '../models/personneSuivi';
import { Suivi } from '../models/suivi';

@Injectable({
  providedIn: 'root'
})
export class GrService {

  grs: GR[] = [];

  autorizedCaracter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ$_1234567890';

  personnesGR: Personne[] = [];
  personnesHorsGR: Personne[] = [];


  constructor(private http: HttpClient) {  }

  getList(): Observable<GR[]> {
    // service = gr / action = listgr
    let id_reseau = localStorage.getItem('idReseau');
    let url = `${environment.host}?service=gr&action=listgr&id_reseau=${id_reseau}`;
    return this.http.get<GR[]>(url).pipe();
  }

  getGrById(id: number): Observable<GR>{
    // service = login / action = getGrById
    let url = `${environment.host}?service=gr&action=getGrById&id=${id}`;
    return this.http.get<GR>(url).pipe(map(response => response));
  }

  getPersonnesGR(id: number): Observable<Personne[]> {
    // service = gr / action = getGrById
    let url = `${environment.host}?service=gr&action=getPersonnesGr&id_gr=${id}`;
    return this.http.get<Personne[]>(url).pipe(map(response => response));
  }

  getPersonnesHorsGR(id: number): Observable<Personne[]> {
    // service = gr / action = getGrHorsById
    let url = `${environment.host}?service=gr&action=getPersonnesHorsGr&id_gr=${id}`;
    return this.http.get<Personne[]>(url).pipe(map(response => response));
  }

  getSuiviByGr(idGr: number): Observable<Suivi[]>{
    // service = gr / action = suiviGr
    let url = `${environment.host}?service=gr&action=suiviGr&id_gr=${idGr}`;
    return this.http.get<Suivi[]>(url).pipe(map(response => response));
  }

  ajouterPersonne(personne: Personne, id_gr: number): Observable<boolean> {
    // service = gr / action = ajouterPersonne
    let url = `${environment.host}?service=gr&action=ajouterPersonne&id_personne=${personne.id}&id_gr=${id_gr}`;
    return this.http.get<boolean>(url).pipe();
  }


  retirerPersonne(personne: Personne): Observable<boolean> {
    // service = gr / action = retirerPersonne
    let url = `${environment.host}?service=gr&action=retirerPersonne&id_personne=${personne.id}`;
    return this.http.get<boolean>(url).pipe();
  }

  creerGr(responsables: PersonneSuivi[]): Observable<boolean>{
    // service = gr / action = retirerPersonne
    let libelle_gr = responsables.map(personne => personne.prenom).join(' - ');
    const responsableToSend = responsables.map(responsable => this.toString(responsable)).join('||');
    let url = `${environment.host}?service=gr&action=creerGr&libelle_gr=${encodeURI(libelle_gr)}&responsables=${encodeURI(responsableToSend)}&id_reseau=${localStorage.getItem('idReseau')}`;
    return this.http.get<boolean>(url).pipe();
  }

  generateAccessCode(nombre: number): string {
    let code ='';
    for(let i= 0; i< nombre; i++){
      let index = Math.floor(Math.random()* this.autorizedCaracter.length );
      code += this.autorizedCaracter[index];
    }
    return code;
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
