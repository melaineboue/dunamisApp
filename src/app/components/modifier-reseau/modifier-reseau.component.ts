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
  selector: 'app-modifier-reseau',
  templateUrl: './modifier-reseau.component.html',
  styleUrls: ['./modifier-reseau.component.scss']
})
export class ModifierReseauComponent {

  backRoute = menuItemsClass.ACCUEIL;

  error = false;
  saved = false;
  nomManquant = false;
  afficherResponsable = false;

  reseau: Reseau = {} as Reseau;
  nomReseauTitre = '';

  responsables = [] as PersonneSuivi[];
  responsablesInitial = [] as PersonneSuivi[];
  personnesNonResponsableEgliseLocal = [] as PersonneSuivi[];
  idResponsables: number[] = [];



  constructor(private router: Router, private commonService: CommonService, private reseauService: ReseauService, private translate: TranslateService) {
    this.reseauService.getPersonneNonResponsableReseau().subscribe(personnes => {
      this.personnesNonResponsableEgliseLocal = personnes;

      this.reseau = this.commonService.getReseauModifier();

      if(!this.reseau){
        this.router.navigate([menuItemsClass.ACCUEIL]);
      }

      this.responsables = this.reseau.responsables.map(responsable => ({
        id: responsable.id,
        nom: responsable.nom,
        prenom: responsable.prenom,
        checked: true
      } as PersonneSuivi));

      // Cocher les responsables
      this.responsablesInitial = this.responsables;
      this.idResponsables = this.responsables.map(responsable => responsable.id);
      this.personnesNonResponsableEgliseLocal.forEach(personne => {
        if (this.idResponsables.includes(personne.id)) {
          personne.checked = true;
        }
      });

      if (this.reseau) {
        this.nomReseauTitre = this.reseau.nom;
      } else {
        this.router.navigate([this.commonService.getBackRoute(true)]);
      }
    })
  }

  back() {
    this.backRoute = this.commonService.getBackRoute(true);
    if (!this.backRoute) {
      this.backRoute = menuItemsClass.ACCUEIL;
    }
    this.router.navigate([this.backRoute]);
  }

  dataReseauChanged(data: DataReseauEdition) {
    this.responsables = data.responsables;
    this.reseau = data.reseau;
  }

  getResponsablePerteDroits(): string {
    // qui sont dans idResponsables et ne sont plus dans responsables
    let nouveauxResponsable = this.responsables.map(responsable => responsable.id);
    let listeResponsableRetraitDroit = this.responsablesInitial
      .filter(responsable => !nouveauxResponsable.includes(responsable.id))
      .map(responsable => responsable.nom+' '+responsable.prenom);

    let texte = (listeResponsableRetraitDroit.length > 1)
                    ? this.translate.instant('common.vont_perdre_droit')
                    : this.translate.instant('common.va_perdre_droit');
    return listeResponsableRetraitDroit.length > 0 ? listeResponsableRetraitDroit.join(', ')+ ' '+ texte: null;
  }

  sauvegarder() {

    this.afficherResponsable = false;

    if (!this.reseau?.nom || this.reseau?.nom?.trim().length === 0) {
      this.nomManquant = true;
    }
    else {

      this.nomManquant = false;

      this.reseauService.creerReseau(this.reseau, this.responsables).subscribe(envoye => {
        let message = this.translate.instant('common.reseau') + ' ' + this.reseau.nom+ ' ' + this.translate.instant('common.a_ete_creer');
        console.log(message);

        sessionStorage.setItem('messageSuccess', message);
        this.router.navigate([menuItemsClass.LISTE_RESEAU]);
      },
      error => {
        this.saved = true;
        this.error = true;
      });
    }
  }


  /* *************************************** */
  get secondaryColor(): string {
    return ParameterService.configuration.secondaryColor;
  }

}
