import { Component, OnInit } from '@angular/core';
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
import { getEgliseForUser, getGr, getGrForUser, getReseauForUser } from 'src/app/utils/utils';
import { titleCase } from 'title-case';

@Component({
  selector: 'app-modifier-personne',
  templateUrl: './modifier-personne.component.html',
  styleUrls: ['./modifier-personne.component.scss']
})
export class ModifierPersonneComponent implements OnInit {



  currentUserRole = UserRole.ResponsableGr;
  role_responsable_gr = UserRole.ResponsableGr;

  backRoute = menuItemsClass.ACCUEIL;
  personne: Personne = {};

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
  validation: PersonneDataValidation = { estValide: true }

  constructor(
    private personneService: PersonneService,
    private personneValideService: PersonneValideService,
    private router: Router,
    private commonService: CommonService,
    private grService: GrService,
    private translateService: TranslateService
  ) {
    this.personneService.getStatus().subscribe(status => {
      this.listeStatus = status;
      const statusSelected = this.listeStatus.filter(status => status.selected);
      const idSelected = statusSelected.length > 0 ? statusSelected[0].id : 1;
      this.statusPersonne.setValue(idSelected)
    });
    this.grService.getList().subscribe(grs => this.grs = grs  );
    this.personneService.getPays().subscribe(pays => this.pays = pays);
    this.personneService.getVilles().subscribe(villes => this.villes = villes);
  }



  ngOnInit(): void {
    this.personne = this.commonService.getPersonneModifier();
    console.log('ok',this.personne);


    if(!this.personne){
      this.router.navigate([menuItemsClass.ACCUEIL]);
    }
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

    this.validation = this.personneValideService.estValide(this.personne);
    if(this.validation.estValide){
      this.personneService.modifierPersonne(this.personne).subscribe(
        enregistre => {
          if(enregistre){
            this.error = false;
            this.saved = true;
            this.backRoute = this.commonService.getBackRoute(true);
            if(!this.backRoute){
              this.backRoute = menuItemsClass.LISTE_PERSONNE;
            }
            this.commonService.addFlashSuccessMessage(this.translateService.instant('page.modifier_personne.success_message'));
            this.router.navigate([this.backRoute]);

          } else {
            this.error = true;
            this.saved = true;
          }
        },
        error => this.error = true
      );
    }


  }


  get numeroManquant(): boolean {
    return false;
  }

  normaliserDateNaissance() {
    this.personne.date_naissance =(this.normaliserDate(this.datenaissance.value, this.oldDateNaissance));
    this.oldDateNaissance = this.datenaissance.value;
  }

  normaliserDate(date: string, dateAncien: string) {
    if (dateAncien.length < date.length) {
      if (date.length === 2 || date.length === 5) {
        date = date + '/';
      }
    }
    return date;
  }

  get grName(){
    return getGr();
  }
}
