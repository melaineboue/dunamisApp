import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Personne } from '../models/personne';
import { ResponseAPI } from '../models/response';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements CanActivate{

  constructor(private http: HttpClient) { }



  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const user = JSON.parse(localStorage.getItem('user')) as User;
    return user !== null && user.role !== null;
  }

  login(login: string, password: string): Observable<User>{
    // service = login
    // action = connection
    let url = `${environment.api}?action=connection&service=login&login=${login}&password=${password}`;

    return this.http.get<User>(url).pipe(map(user => {
      return user;
    }));

  }

  reinit(login: string): Observable<ResponseAPI<string>>{
    // service = login
    // action = init password
    /*let url = `${environment.api}?service=login&action=initpassword&login=${login}`;
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
    return of({error: {code: '404', message: 'Message'}} as ResponseAPI<string>)*/
    return of();
  }


  /**
   *
   * @param code: code d'acces
   * @returns Personne correspondant au code, sinon null si code incorrect
   */
   getUserFromCode(code: string): Observable<User>{
    // service = login
    // action = validercode
    let url = `${environment.api}?service=login&action=validercode&code=${code}&mode=code`;
    console.log(url);

    return this.http.get<User>(url).pipe(map(response => response))
  }

  getUserFromUrl(codeMd5: string): Observable<User>{
    // service = login
    // action = validercode
    let url = `${environment.api}?service=login&action=validercode&code=${codeMd5}&mode=url`;
    return this.http.get<User>(url).pipe(map(response => response))
  }

  /*getUserFromCode(code: string): Observable<Personne>{
    return
    return of(this.users[1]);
  }*/

  setUserSession(user: User){
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
    localStorage.clear();
  }

}
