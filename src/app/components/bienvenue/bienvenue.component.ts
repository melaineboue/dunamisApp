import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { menuItemsClass } from 'src/app/models/const';
import { Personne } from 'src/app/models/personne';
import { CommonService } from 'src/app/services/common.service';
import { LoginService } from 'src/app/services/login.service';
import { PersonneService } from 'src/app/services/personne.service';

@Component({
  selector: 'app-bienvenue',
  templateUrl: './bienvenue.component.html',
  styleUrls: ['./bienvenue.component.scss']
})
export class BienvenueComponent implements OnInit {

  user: Personne;
  //localStorage: Storage;
  step = 0;
  loginManquant = false;
  passwordManquant = false;
  passwordManquant2 = false;
  passwordNonIdentique = false;
  emailIncorrect = false;

  login: string = '';
  motDePasse = '';
  motDePasse2 = ''
  email = '';

  saved = false;
  error = false;

  constructor(private router: Router, private personneService: PersonneService, private commonService: CommonService, private loginService: LoginService) { }

  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem("userProvisoire")) as Personne;

    if (!this.user) {
      this.router.navigate([`/${menuItemsClass.LOGIN}`])
    }

  }

  next(){
    this.step++;
  }

  back(){
    this.step--;
  }

  sauvegarder(){
    const emailValide = this.valideEmail();
    const valide = this.valideEmail();
    const pwdsIdentique = this.valideMotDePasseIdentique();
    const pwdNonVide = this.validerMotsDePasseNonVide();
    const loginValide = this.valideLogin();

    if(emailValide && valide && pwdsIdentique && pwdNonVide && loginValide){
      this.user.email = this.email;
      this.user.pwd = this.motDePasse;
      this.user.login = this.login;

      this.personneService.creerCompte(this.user).subscribe(returnValue=>{
        this.saved = true;
        this.error = false;
        this.loginService.setUserSession(this.user); /*
        localStorage.setItem('idGr', this.user.gr.id+'');
        localStorage.setItem('idReseau', this.user.gr.idreseau+'');*/
        this.commonService.setIdGr(Number(localStorage.getItem('idGr')));
        this.router.navigate([`/${menuItemsClass.DETAILS_GR}`])
      },
      error => {
        this.saved = true;
        this.error = true;
      })
    }
  }


  valideLogin(): boolean {
    let result = this.login.trim().length > 0;
    this.loginManquant = ! result;
    return result;
  }

  valideEmail(): boolean {
    let result = true;
    let emailLocal = this.email.trim();

    if(emailLocal.length > 0){
      let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      result = regexp.test(this.email);
    }
    this.emailIncorrect = !result;
    return result;
;
  }

  valideMotDePasseIdentique(): boolean {
    let result = this.motDePasse === this.motDePasse2;
    this.passwordNonIdentique = ! result
    return result;
  }

  validerMotsDePasseNonVide(){
    let result = this.motDePasse.trim().length > 0;
    this.passwordManquant = ! result;
    return result;
  }


}
