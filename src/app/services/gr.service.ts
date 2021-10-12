import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Status } from '../models/const';
import { GR } from '../models/gr';
import { Personne } from '../models/personne';
import { PersonneSuivi } from '../models/personneSuivi';

@Injectable({
  providedIn: 'root'
})
export class GrService {

  grs: GR[] = [
    { id: 1, libelle: 'Gr Franckie', idreseau: 1, date_creation:'12/12/2020', taille: 20, responsables: 'Franckie - Mélaine' },
    { id: 2, libelle: 'Gr Christellyne', idreseau: 1, date_creation: '14/07/2021', taille: 14, responsables: 'Christellyne' },
    { id: 3, libelle: 'Gr Maureen', idreseau: 1, date_creation: '25/08/2021', taille: 12, responsables: 'Maurren - Maeva' },
  ];

  autorizedCaracter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ$_&1234567890';

  personnesGR: Personne[] = [
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
        idreseau: 1
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
    },

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
  personnesHorsGR: Personne[] = [
    {
      id:2,
      nom: 'BOUE',
      prenom:'Arnaud',
      date_ajout: '05/08/2021',
      telephone: '0769089717',
      status: Status.REGULIER,
      gr: {
        id:1,
        libelle: 'GR Franckie',
        idreseau: 1
      }
    }
  ];


  constructor() { }

  getList(): Observable<GR[]> {
    return of(this.grs);
  }

  getGrById(id: number): Observable<GR>{
    let gr = this.grs.filter(gr => gr.id === id);
    if(gr.length > 0){
      return of(gr[0]);
    }
    return of(null);
  }

  getPersonnesGR(id: number): Observable<Personne[]> {
    return of(this.personnesGR);
  }

  getPersonnesHorsGR(id: number): Observable<Personne[]> {
    return of(this.personnesHorsGR);
  }

  ajouterPersonne(personne: Personne): Observable<boolean> {
    return of(true);
  }


  retirerPersonne(personne: Personne): Observable<boolean> {
    return of(true);
  }

  creerGr(responsable: PersonneSuivi[]): Observable<boolean>{
    return of(true);
  }

  generateAccessCode(nombre: number): string {
    let code ='';
    for(let i= 0; i< nombre; i++){
      let index = Math.floor(Math.random()* this.autorizedCaracter.length );
      code += this.autorizedCaracter[index];
    }
    return code;
  }


}
