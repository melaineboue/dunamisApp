import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserRole } from 'src/app/enums/user-role';
import { menuItemsClass } from 'src/app/models/const';
import { GR } from 'src/app/models/gr';
import { Personne } from 'src/app/models/personne';
import { PersonneDataValidation } from 'src/app/models/personne-data-validation';
import { StatusModel } from 'src/app/models/status';
import { CommonService } from 'src/app/services/common.service';
import { GrService } from 'src/app/services/gr.service';
import { ParameterService } from 'src/app/services/parameter.service';
import { PersonneValideService } from 'src/app/services/personne-valide.service';
import { PersonneService } from 'src/app/services/personne.service';
import { getEgliseForUser, getGr, getGrForUser, getReseauForUser, getUserRole } from 'src/app/utils/utils';
import { titleCase } from 'title-case';


@Component({
  selector: 'app-add-personne',
  templateUrl: './add-personne.component.html',
  styleUrls: ['./add-personne.component.scss']
})
export class AddPersonneComponent implements OnInit {

  personne: Personne = {
    id:0,
    nom:'',
    prenom:'',
    date_ajout:'',
    gr:{ id: 0 },
    status: 'nouveau',
    date_naissance:'',
    date_evangelisation: '',
    email:'',
    telephone:'',
    ville:'',
    pays:''
  };

  validation: PersonneDataValidation = { estValide: true };
  currentUserRole = getUserRole();
  role_responsable_gr = UserRole.ResponsableGr;

  backRoute = menuItemsClass.ACCUEIL;

  nom = '';
  prenom = '';
  numero = new FormControl('');
  email = new FormControl('');
  statusPersonne = new FormControl('2');
  gr = new FormControl('1');
  paysPersonne = '';
  ville = '';

  datenaissance = new FormControl('');
  dateEvangelisation = new FormControl('');
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
    private translateService: TranslateService,
    private grService: GrService
  ) {
    this.personneService.getStatus().subscribe(status => {
      this.listeStatus = status;
      const statusSelected = this.listeStatus.filter(status => status.selected);
      const idSelected = statusSelected.length > 0 ? statusSelected[0].id : 1;
      this.statusPersonne.setValue(idSelected)
    });
    this.grService.getList().subscribe(grs => this.grs = grs);
    this.personneService.getPays().subscribe(pays => this.pays = pays);
    this.personneService.getVilles().subscribe(villes => this.villes = villes);
  }



  ngOnInit(): void {
    this.commonService.setPersonneModifier(this.personne);
  }

  get secondaryColor(): string {
    return ParameterService.configuration.secondaryColor;
  }

  back() {
    this.backRoute = this.commonService.getBackRoute(true);
    if(! this.backRoute){
      this.backRoute = menuItemsClass.ACCUEIL;
    }
    this.router.navigate([this.backRoute]);
  }

  sauvegarder() {

    console.log('La personne là', this.personne);

    this.validation = this.personneValideService.estValide(this.personne);
    if(this.validation.estValide){
      // Code HERE
      const gr = getGrForUser();
      const reseau = getReseauForUser();
      const eglise = getEgliseForUser();

      this.personne.id = 0;
      if(this.currentUserRole.role_libelle_court === UserRole.ResponsableGr || this.currentUserRole.role_libelle_court === UserRole.ResponsableGrReadOnly){
        this.personne.gr = gr;
      }
      this.personne.reseau = reseau;
      this.personne.eglise = eglise;
      this.personne.photo = "";

      console.log('oooooooooo', this.personne);

      this.personneService.ajouterPersonne(this.personne).subscribe(
        enregistre => {
          if(enregistre){

            this.error = false;
            this.saved = true;

            let messageSuccess = this.personne.nom+ ' '+this.personne.prenom + ' ' + this.translateService.instant('page.add_personne.sucess_message');
            this.commonService.addFlashSuccessMessage(messageSuccess);
            this.router.navigate([menuItemsClass.LISTE_PERSONNE]);

          } else {
            this.error = true;
            this.saved = true;
          }
        },
        error => this.error = true
      );
    }
  }




  normaliserDateNaissance() {
    this.datenaissance.setValue(this.normaliserDate(this.datenaissance.value, this.oldDateNaissance));
    this.oldDateNaissance = this.datenaissance.value;
  }

  dateValide(): boolean {
    var date_regex = /^\d{2}\/\d{2}\/\d{4}$/;
    let response = true;
    if (this.datenaissance.value.trim() !== '' && !(date_regex.test(this.datenaissance.value) && this.isDate(this.datenaissance.value))) {
      this.dateNaissanceInvalide = true;
      response = false;
    } else {
      this.dateNaissanceInvalide = false;
    }

    if (this.dateEvangelisation.value.trim() !== '' &&  !(date_regex.test(this.dateEvangelisation.value)) && this.isDate(this.dateEvangelisation.value) ) {
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

    if(Number(dates[0]) <= 0 || Number(dates[0])> 31){
      resultat = false;
    }

    if(Number(dates[1]) <= 0 || Number(dates[1])> 12){
      resultat = false;
    }

    if(Number(dates[2]) <= 0 ){
      resultat = false;
    }
    return resultat;
  }

  normaliserDate(date: string, dateAncien: string) {
    if (dateAncien.length < date.length) {
      if (date.length === 2 || date.length === 5) {
        date = date + '/';
      }
    }
    return date;
  }
}
