import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { encode } from 'querystring';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { getIdUser, getUserRole } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

  constructor(private http: HttpClient){}

  saveSuggestion(suggestion: string): Observable<boolean> {

    let formData = new FormData();
    formData.append("suggestion", suggestion);

    const url = encodeURI(`${environment.host}?service=suggestion&action=addSuggestion&id_personne=${getIdUser()}`);
    return this.http.post<boolean>(url, formData).pipe();
  }
}
