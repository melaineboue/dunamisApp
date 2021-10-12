import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Status } from '../models/const';
import { Personne } from '../models/personne';
import { ResponseAPI } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements CanActivate{

  users: Personne[] = [
    {
      id:1,
      nom: 'BOUE',
      prenom:'Mélaine',
      date_ajout: '04/08/2021',
      telephone: '0769089717',
      status: Status.RESPONSABLE,
      login: 'mboue',
      pwd: '123456',
      email: 'melaineboue@gmail.com',
      gr: {
        id:1,
        libelle: 'GR Franckie',
        idreseau: 1
      }
    },
    {
      id:2,
      nom: 'BOUE',
      prenom:'Arnaud',
      date_ajout: '04/08/2021',
      telephone: '0769089718',
      status: Status.RESPONSABLE,
      login: 'aboue',
      pwd: '123456',
      gr: {
        id:1,
        libelle: 'GR Franckie',
        idreseau: 1
      }
    }
  ]

  constructor() { }



  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return localStorage.getItem('idUser') !== null && localStorage.getItem('idGr') !== null && localStorage.getItem('idReseau') !== null;
  }

  login(login: string, password: string): Observable<Personne>{
    let usersFiltered = this.users.filter(user => user.login === login && user.pwd === password);
    let user = usersFiltered.length > 0 ? usersFiltered[0] : null;

    return of(user);
  }

  reinit(login: string): Observable<ResponseAPI<string>>{
    let usersFiltered = this.users.filter(user => user.login === login);
    if(usersFiltered.length === 0){
      // Login inexistant
      return of({error: {code: '401', message: 'Message'}} as ResponseAPI<string>)
    }

    let user = usersFiltered[0];

    if(user.email){
      return of({ body: ''} as ResponseAPI<string>)
    }
    return of({error: {code: '404', message: 'Message'}} as ResponseAPI<string>)
  }


  /**
   *
   * @param code: code d'acces
   * @returns Personne correspondant au code, sinon null si code incorrect
   */
  validerCode(code: string): Observable<Personne>{
    return of(this.users[1]);
  }

  getUserFromCode(code: string): Observable<Personne>{
    return of(this.users[1]);
  }

  setUserSession(user: Personne){
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('idUser', user.id + '');
    localStorage.setItem('idGr', user.gr.id + '');
    localStorage.setItem('idReseau', user.gr.idreseau + '');
  }

  destroyUserSession(){
    localStorage.removeItem('user');
    localStorage.removeItem('idUser');
    localStorage.removeItem('idGr');
    localStorage.removeItem('idReseau');
  }

}
