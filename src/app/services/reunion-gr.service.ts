import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ReunionGr } from '../models/reunion-gr';

@Injectable({
  providedIn: 'root'
})
export class ReunionGrService {

  reunionsGr: ReunionGr[] = [
    {
      id: 1,
      annonce: 'blabla bla bla',
      semaine: 'S1',
      titre: 'Titre'
    },
    {
      id: 2,
      annonce: 'bla car bla bla',
      semaine: 'S2',
      titre: 'Titre 2'
    }
  ];

  constructor() { }

  getReunions(): Observable<ReunionGr[]>{
    return of(this.reunionsGr);
  }
}
