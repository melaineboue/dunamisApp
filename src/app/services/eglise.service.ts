import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PersonneSuivi } from '../models/personneSuivi';
import { getIdEglise } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class EgliseService {

  constructor(private http: HttpClient) { }

  getFuturResponsable(): Observable<PersonneSuivi[]> {
    let url = encodeURI(`${environment.api}?service=eglise&action=getFuturResponsableReseau&id_eglise=${getIdEglise()}`);
    console.log(url);

    return this.http.get<PersonneSuivi[]>(url).pipe();
  }
}
