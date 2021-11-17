import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Theme } from '../models/theme-gr';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private http: HttpClient) { }

  getThemes(): Observable<Theme[]> {
    // service = event , action = saveEvent
    let url = encodeURI(`${environment.host}?service=theme&action=listeTheme`);
    return this.http.get<Theme[]>(url).pipe();
  }

  getThemeBySemaine(semaine: number, annee: number): Observable<Theme> {
    let url = encodeURI(`${environment.host}?service=theme&action=getThemeBySemaine&semaine=${semaine}&annee=${annee}`);
    return this.http.get<Theme>(url).pipe();
  }
}
