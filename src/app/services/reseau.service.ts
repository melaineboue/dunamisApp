import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Personne } from '../models/personne';
import { PersonneSuivi } from '../models/personneSuivi';
import { Reseau } from '../models/reseau';
import { getIdEglise } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class ReseauService {

  constructor(private http: HttpClient) { }

  getResponsable(id_reseau): Observable<Personne[]> {
    let url = encodeURI(`${environment.api}?service=reseau&action=getResponsable&id_reseau=${id_reseau}`);
    return this.http.get<Personne[]>(url).pipe();
  }

  getPersonneReseau(id_reseau: number): Observable<Personne[]> {
    let url = encodeURI(`${environment.api}?service=reseau&action=getPersonne&id_reseau=${id_reseau}`);
    console.log(url);

    return this.http.get<Personne[]>(url).pipe();
  }

  getAll(id_eglise: number): Observable<Reseau[]>{
    let url = encodeURI(`${environment.api}?service=reseau&action=getAll&id_eglise=${ id_eglise }`);
    return this.http.get<Reseau[]>(url).pipe();
  }

  creerReseau(reseau: Reseau, responsables: PersonneSuivi[]): Observable<boolean>{
    let url = encodeURI(`${environment.api}?service=reseau&action=creer&id_eglise=${ getIdEglise() }`);
    console.log(url);

    const formData: FormData = new FormData();
    formData.append('responsables', JSON.stringify(responsables));
    formData.append('nom_reseau', reseau.nom);

    return this.http.post<boolean>(url, formData).pipe();
  }

  modifierReseau(reseau: Reseau, responsables: PersonneSuivi[]): Observable<boolean>{
    let url = encodeURI(`${environment.api}?service=reseau&action=modifier&id_eglise=${ getIdEglise() }`);

    const formData: FormData = new FormData();
    formData.append('responsables', JSON.stringify(responsables));
    formData.append('nom_reseau', reseau.nom);
    formData.append('id_reseau', String(reseau.id));

    return this.http.post<boolean>(url, formData).pipe();
  }



  getPersonneNonResponsableReseau(): Observable<PersonneSuivi[]>{
    let url = encodeURI(`${environment.api}?service=eglise&action=personneNonResponsableReseau&id_eglise=${ getIdEglise() }`);
    console.log(url);
    return this.http.get<PersonneSuivi[]>(url).pipe();
  }

  getReseauById(id: number): Observable<Reseau>{
    let url = encodeURI(`${environment.api}?service=reseau&action=getReseauById&id_reseau=${ id }`);
    console.log(url);
    return this.http.get<Reseau>(url).pipe();
  }

  fermerReseau(idReseau: number): Observable<boolean> {
    let url = encodeURI(`${environment.api}?service=reseau&action=fermer&id_reseau=${ idReseau }`);
    return this.http.get<boolean>(url).pipe();
  }


}
