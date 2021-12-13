import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Status } from '../models/const';
import { Personne } from '../models/personne';
import { ResponseAPI } from '../models/response';
import { map } from 'rxjs/operators';

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
        idreseau: 1,

      }
    }
  ]

  constructor(private http: HttpClient) { }



  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return localStorage.getItem('idUser') !== null && localStorage.getItem('idGr') !== null && localStorage.getItem('idReseau') !== null;
  }

  login(login: string, password: string): Observable<Personne>{
    // service = login
    // action = connection
    let url = `${environment.host}?action=connection&service=login&login=${login}&password=${password}`;

    return this.http.get<Personne>(url).pipe(map(user => {
      return user;
    }));

  }

  reinit(login: string): Observable<ResponseAPI<string>>{
    // service = login
    // action = init password
    let url = `${environment.host}?service=login&action=initpassword&login=${login}`;
    // TO DO


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
   getUserFromCode(code: string): Observable<Personne>{
    // service = login
    // action = validercode
    let url = `${environment.host}?service=login&action=validercode&code=${code}`;
    return this.http.get<Personne>(url).pipe(map(response => response))
  }

  /*getUserFromCode(code: string): Observable<Personne>{
    return
    return of(this.users[1]);
  }*/

  setUserSession(user: Personne){
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('idUser', user.id + '');
    localStorage.setItem('idGr', user.gr.id + '');
    localStorage.setItem('idReseau', user.gr.idreseau + '');
    localStorage.setItem('gr', user.gr.libelle);

  }

  destroySessionProvisoire(){
    localStorage.removeItem('userProvisoire');
    localStorage.removeItem('provisoire_idUser');
    localStorage.removeItem('provisoire_idGr');
    localStorage.removeItem('provisoire_idReseau');
    localStorage.removeItem('provisoire_gr');
  }

  destroyUserSession(){
    console.log("ici");

    localStorage.clear();
  }

}
