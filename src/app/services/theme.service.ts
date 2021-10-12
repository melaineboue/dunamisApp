import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Theme } from '../models/theme-gr';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  themes: Theme[] = [
    {
      id:1,
      semaine: 'S1',
      annonce:'',
      titre: 'Titre du theme S1'
    }
  ]

  constructor() { }

  getThemes(): Observable<Theme[]> {
    return of(this.themes);
  }
}
