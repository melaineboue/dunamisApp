import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRole } from 'src/app/enums/user-role';
import { menuItemsClass } from 'src/app/models/const';
import { GR } from 'src/app/models/gr';
import { Personne } from 'src/app/models/personne';
import { PersonneDataValidation } from 'src/app/models/personne-data-validation';
import { StatusModel } from 'src/app/models/status';
import { CommonService } from 'src/app/services/common.service';
import { GrService } from 'src/app/services/gr.service';
import { PersonneValideService } from 'src/app/services/personne-valide.service';
import { PersonneService } from 'src/app/services/personne.service';
import { getGr, getUserRole } from 'src/app/utils/utils';
import { titleCase } from 'title-case';

@Component({
  selector: 'app-formulaire-creer-modifier-personne',
  templateUrl: './formulaire-creer-modifier-personne.component.html',
  styleUrls: ['./formulaire-creer-modifier-personne.component.scss']
})
export class FormulaireCreerModifierPersonneComponent implements OnInit {

  @Input() personne: Personne = {
    gr: { id: 0 }
  } as Personne;
  @Input() validation: PersonneDataValidation = { estValide: true }

  currentUserRole: string = UserRole.ResponsableGr;
  role_responsable_gr = UserRole.ResponsableGr;
  role_responsable_reseau = UserRole.ResponsableReseau;

  backRoute = menuItemsClass.ACCUEIL;

  oldDateNaissance = "";
  oldDateEvangelisation = "";

  listeStatus: StatusModel[] = [];
  grs: GR[] = [];

  villes: string[] = [];
  pays: string[] = [];

  error: boolean = false;
  saved: boolean = false;
  nomPrenomManquant = false;
  emailInvalide = false;
  dateEvangelisationInvalide = false;
  dateNaissanceInvalide = false;

  constructor(
    private personneService: PersonneService,
    private personneValideService: PersonneValideService,
    private router: Router,
    private commonService: CommonService,
    private grService: GrService
  ) {
    this.personneService.getStatus().subscribe(status => {
      this.listeStatus = status;
    });

    let role = getUserRole();
    this.currentUserRole = role?.role_libelle_court;

    this.grService.getList().subscribe(grs => {
      this.grs = grs;
      console.log('this.grs', this.grs);

    });
    this.personneService.getPays().subscribe(pays => this.pays = pays);
    this.personneService.getVilles().subscribe(villes => this.villes = villes);
  }

  ngOnInit(): void {

    this.personne = this.commonService.getPersonneModifier();
    console.log('*** api ***', this.personne);

    console.log(this.personne);

    if (!this.personne) {
      this.router.navigate([menuItemsClass.ACCUEIL]);

    } else if (this.personne.id === undefined && this.personne.gr === undefined) {
      this.personne = { gr: { id: 0 } } as Personne;
    }
  }

  nomPrenomValide(): boolean {
    let result = this.personne.nom || this.personne.prenom;
    if (result) {
      this.nomPrenomManquant = false;
      return true;
    }
    // Afficher erreur
    this.nomPrenomManquant = true;
    return false;
  }

  emailValide(email: string): boolean {
    let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    let estEmail = regexp.test(email);
    if (!email || estEmail) {
      this.emailInvalide = false;
      return true;
    }

    this.emailInvalide = true;
  }

  numeroValide() {
    return true;
  }

  inTitleCase(text: string): string {
    return titleCase(text);
  }


  get numeroManquant(): boolean {
    return false;
  }

  normaliserDateNaissance() {
    console.log('debut normalisation');

    this.personne.date_naissance = this.normaliserDate(this.personne.date_naissance, this.oldDateNaissance);
    this.oldDateNaissance = this.personne.date_naissance;
    console.log('fin normalisation');
  }

  dateValide(): boolean {
    var date_regex = /^\d{2}\/\d{2}\/\d{4}$/;
    let response = true;
    if (this.personne.date_naissance.trim() !== '' && !(date_regex.test(this.personne.date_naissance) && this.isDate(this.personne.date_naissance))) {
      this.dateNaissanceInvalide = true;
      response = false;
    } else {
      this.dateNaissanceInvalide = false;
    }

    if (this.personne.date_evangelisation.trim() !== '' && !(date_regex.test(this.personne.date_evangelisation)) && this.isDate(this.personne.date_evangelisation)) {
      this.dateEvangelisationInvalide = true;
      response = false;
    } else {
      this.dateEvangelisationInvalide = false;
    }



    return response;
  }

  isDate(date: string): boolean {
    const dates = date.split('/');
    let resultat = true;

    if (Number(dates[0]) <= 0 || Number(dates[0]) > 31) {
      resultat = false;
    }

    if (Number(dates[1]) <= 0 || Number(dates[1]) > 12) {
      resultat = false;
    }

    if (Number(dates[2]) <= 0) {
      resultat = false;
    }
    return resultat;
  }

  isNumero(numero: string): boolean {
    var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    if (!(date_regex.test(numero))) {
      return false;
    }
    return true;
  }

  normaliserDate(date: string, dateAncien: string) {
    if (dateAncien.length < date.length) {
      if (date.length === 2 || date.length === 5) {
        date = date + '/';
      }
    }
    return date;
  }

  get grName() {
    return getGr();
  }

}
