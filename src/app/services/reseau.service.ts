import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Personne } from '../models/personne';

@Injectable({
  providedIn: 'root'
})
export class ReseauService {

  constructor(private http: HttpClient) { }

  getResponsable(id_reseau): Observable<Personne[]> {
    let url = encodeURI(`${environment.host}?service=reseau&action=getResponsable&id_reseau=${id_reseau}`);
    return this.http.get<Personne[]>(url).pipe();
  }

  getPersonneReseau(id_reseau: number): Observable<Personne[]> {
    let url = encodeURI(`${environment.host}?service=reseau&action=getPersonne&id_reseau=${id_reseau}`);
    return this.http.get<Personne[]>(url).pipe();
  }

}
