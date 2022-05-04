import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { defaultRedirectParamNotExist, menuItemsClass } from 'src/app/models/const';
import { Personne } from 'src/app/models/personne';
import { Reseau } from 'src/app/models/reseau';
import { ReseauMembre } from 'src/app/models/reseau-details';
import { CommonService } from 'src/app/services/common.service';
import { ParameterService } from 'src/app/services/parameter.service';
import { ReseauService } from 'src/app/services/reseau.service';

@Component({
  selector: 'app-details-reseau',
  templateUrl: './details-reseau.component.html',
  styleUrls: ['./details-reseau.component.scss']
})
export class DetailsReseauComponent {

  rechercheGr = '';
  rechercheHorsGr = '';
  routeHere = `/${menuItemsClass.DETAILS_RESEAU}`;
  routeDetailsdGr = `/${menuItemsClass.DETAILS_GR}`;
  routeDetailsPersonne = `/${menuItemsClass.DETAILS_PERSONNE}`;
  routeModifierReseau = `/${menuItemsClass.MODIFIER_RESEAU}`;

  error = false;
  saved = false;

  personnesReseau = [] as Personne[];

  nombreResponsableGR = 0;
  responsablesGRList = "";

  reseau: Reseau = { id: 0, infos: {}, membres: { personnes: [], grs:[] } as ReseauMembre, responsables: [] };


  suppressionEnCours = false; // Fermeture du reseau

  constructor(private commonService: CommonService, private reseauService: ReseauService, private router: Router, private translateService: TranslateService) {
    let idReseau = commonService.getIdReseau();

    if (idReseau) {
      this.reseauService.getReseauById(idReseau).subscribe(reseau => {

        if (reseau === null) {
          this.router.navigate([`/${defaultRedirectParamNotExist}`])
        } else {
          this.reseau = reseau;

          this.getResponsablesGR();

          //this.grService.getPersonnesGR(idGr).subscribe(personnes => this.personnesGR = personnes);
          //this.grService.getPersonnesHorsGR(idGr).subscribe(personnes => this.personnesHorsGR = personnes);
        }
      })
    } else {
      this.router.navigate([`/${defaultRedirectParamNotExist}`])
    }
  }

  back() {
    this.router.navigate([`/${this.commonService.getBackRoute(true)}`])
  }

  modifierReseau(){
    this.commonService.setBackRoute(this.routeHere);
    this.commonService.setReseauModifier(this.reseau);
    this.router.navigate([this.routeModifierReseau]);
  }

  fermerReseau(){
    this.reseauService.fermerReseau(this.reseau.id).subscribe(response => {
      if(response){
        let message = `${this.reseau.nom}: ${this.translateService.instant('page.reseau.reseau_ferme')}`;
        this.commonService.addFlashSuccessMessage(message);
        this.router.navigate([`/${menuItemsClass.ACCUEIL}`])
      } else {

      }
    });
  }

  getResponsablesGR(){
    /*if(this.reseau?.infos?.responsablesGR){
      this.reseau?.infos?.responsablesGR.forEach(responsable =>{
        this.nombreResponsableGR++;
        this.responsablesGRList+= `${responsable.prenom} ${responsable.nom}\n`;
      })
    }*/
    console.log(this.responsablesGRList);

  }


  detailsGR(idGr: number){
    this.commonService.setIdGr(idGr);
    this.commonService.setBackRoute(this.routeHere);
    this.router.navigate([this.routeDetailsdGr])
  }

  detailsPersonne(idPersonne: number){
    this.commonService.setId(idPersonne);
    this.commonService.setBackRoute(this.routeHere);
    this.router.navigate([this.routeDetailsPersonne]);
  }

  get secondaryColor(): string {
    return ParameterService.configuration.secondaryColor;
  }

  get responsables(): string {
    return this.reseau.responsables.map(responsable => `${responsable.prenom} ${responsable.nom}`).join(' - ');
  }

}
