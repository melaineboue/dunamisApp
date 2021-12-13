import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { defaultConnectedPage, menuItemsClass } from 'src/app/models/const';
import { Personne } from 'src/app/models/personne';
import { CommonService } from 'src/app/services/common.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginMotDePasseIncorrect = false;
  codeAccesInvalide = false;
  loginInexistant = false;
  emailRecuperationNonRattache = false;
  loginVide = false;
  initSent = false;
  errorInconnue = false;


  motDePasse = '';
  login = '';
  code = '';

  constructor(private router: Router, private loginService: LoginService, private commonService: CommonService) {

    if( localStorage.getItem('user')
        && localStorage.getItem('idUser')
        && localStorage.getItem('idGr')
        && localStorage.getItem('idReseau')) {

          this.router.navigate([`${defaultConnectedPage}`]);
    }
  }

  ngOnInit(): void {
  }

  connexion() {
    this.loginService.login(this.login, this.motDePasse).subscribe(user => {
      if (user) {
        this.setUserSession(user);
        this.router.navigate([`/${defaultConnectedPage}`])
      } else {
        this.loginMotDePasseIncorrect = true;
        this.loginInexistant = false;
        this.codeAccesInvalide = false;
        this.emailRecuperationNonRattache = false;
        this.loginVide = false;
        this.initSent = false;
        this.errorInconnue = false;
      }
    },
      error => {
        this.errorInconnue = true;
        this.loginMotDePasseIncorrect = false;
        this.loginInexistant = false;
        this.codeAccesInvalide = false;
        this.emailRecuperationNonRattache = false;
        this.loginVide = false;
        this.initSent = false;
      })
  }

  reinitialiser() {
    if (this.login.trim().length === 0) {
      // Le login est vide
      this.loginVide = true;
      this.loginMotDePasseIncorrect = false;
      this.loginInexistant = false;
      this.codeAccesInvalide = false;
      this.emailRecuperationNonRattache = false;
      this.initSent = false;
      this.errorInconnue = false;

    } else {

      this.loginService.reinit(this.login).subscribe(result => {
        if (result.error) {
          this.loginInexistant = false;
          this.emailRecuperationNonRattache = false
          // Quand il y a erreur
          if (result.error.code === '401') {
            // Le login n'existe pas
            this.loginInexistant = true;

          } else if (result.error.code === '404') {
            // Aucun email rattaché
            this.emailRecuperationNonRattache = true
          }

          this.loginMotDePasseIncorrect = false;
          this.codeAccesInvalide = false;
          this.loginVide = false;
          this.initSent = false;
          this.errorInconnue = false;

        } else {
          this.initSent = true;
          this.loginMotDePasseIncorrect = false;
          this.loginInexistant = false;
          this.codeAccesInvalide = false;
          this.emailRecuperationNonRattache = false;
          this.loginVide = false;
          this.errorInconnue = false;

        }
      })

    }
  }

  validerCode() {
    this.loginService.getUserFromCode(this.code).subscribe(user => {
      if(user){
        this.setUserSessionProvisoire(user);
        this.router.navigate([`/${menuItemsClass.BIENVENUE}`])
      } else {
        this.codeAccesInvalide = true;
      }
    },
    error => {
      this.errorInconnue = true;
      this.initSent = false;
      this.loginMotDePasseIncorrect = false;
      this.loginInexistant = false;
      this.codeAccesInvalide = false;
      this.emailRecuperationNonRattache = false;
      this.loginVide = false;
    });
  }

  setUserSession(user: Personne){
    this.loginService.setUserSession(user);
  }

  setUserSessionProvisoire(user: Personne){
    localStorage.setItem('userProvisoire', JSON.stringify(user));
    localStorage.setItem('provisoire_idUser', user.id + '');
    localStorage.setItem('provisoire_idGr', user.gr.id + '');
    localStorage.setItem('provisoire_idReseau', user.gr.idreseau + '');
    localStorage.setItem('provisoire_gr', user.gr.libelle);
  }


}
