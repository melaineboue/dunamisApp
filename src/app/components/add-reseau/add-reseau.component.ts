import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { menuItemsClass } from 'src/app/models/const';
import { DataReseauEdition } from 'src/app/models/data-reseau-edition';
import { PersonneSuivi } from 'src/app/models/personneSuivi';
import { Reseau } from 'src/app/models/reseau';
import { CommonService } from 'src/app/services/common.service';
import { ParameterService } from 'src/app/services/parameter.service';
import { ReseauService } from 'src/app/services/reseau.service';

@Component({
  selector: 'app-add-reseau',
  templateUrl: './add-reseau.component.html',
  styleUrls: ['./add-reseau.component.scss']
})
export class AddReseauComponent {

  backRoute = menuItemsClass.ACCUEIL;

  error = false;
  saved = false;
  nomManquant = false;
  afficherResponsable = false;

  reseau: Reseau = {} as Reseau;

  responsables = [] as PersonneSuivi[];
  personnesNonResponsableEgliseLocal = [] as PersonneSuivi[];



  constructor( private router: Router, private commonService: CommonService, private reseauService: ReseauService, private translate: TranslateService) {
    this.reseauService.getPersonneNonResponsableReseau().subscribe(personnes => this.personnesNonResponsableEgliseLocal = personnes)
  }

  back() {
    this.backRoute = this.commonService.getBackRoute(true);
    if(! this.backRoute){
      this.backRoute = menuItemsClass.ACCUEIL;
    }
    this.router.navigate([this.backRoute]);
  }

  dataReseauChanged(data: DataReseauEdition){
    this.responsables = data.responsables;
    this.reseau = data.reseau;
  }

  sauvegarder(){
    this.afficherResponsable = false;
    console.log('Save 2');

    if(!this.reseau?.nom || this.reseau?.nom?.trim().length === 0) {
      this.nomManquant = true;
    }
    else {

      this.nomManquant = false;
      this.reseauService.creerReseau(this.reseau, this.responsables).subscribe(envoye => {
        let message = this.translate.instant('common.reseau') + ' ' + this.reseau.nom+ ' ' + this.translate.instant('common.a_ete_creer');
        console.log(message);

        sessionStorage.setItem('messageSuccess', message);
        this.router.navigate([menuItemsClass.LISTE_RESEAU]);
        // this.error = false;
        // this.saved = true;
        let ok: NavigationExtras
      },
      error => {
        this.saved = true;
        this.error = true;
      });
    }
  }

  definirResponsable(){}

  /* *************************************** */
  get secondaryColor(): string {
    return ParameterService.configuration.secondaryColor;
  }

}
