import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { getIdUser, getUserRole } from '../utils/utils';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UserService implements CanActivate{

  constructor(private http: HttpClient, private loginService: LoginService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let url = encodeURI(`${environment.api}?service=login&action=userExist&id_user=${ getIdUser() }`);
    return this.http.get<boolean>(url).pipe(map(response => {
      if(response == false){
        // User n'est plus valable, user supprimé ou GR/Réseau/Eglise supprimé
        this.loginService.destroyUserSession();
      }
      return response;
    }));
  }

  getUSer(): Observable<User>{
    let url = encodeURI(`${environment.api}?service=login&action=userExist&id_user=${ getIdUser() }`);
    return this.http.get<User>(url).pipe();
  }
}
