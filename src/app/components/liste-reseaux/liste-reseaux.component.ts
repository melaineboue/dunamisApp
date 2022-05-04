import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { menuItemsClass, Status } from 'src/app/models/const';
import { PersonneSuivi } from 'src/app/models/personneSuivi';
import { Reseau } from 'src/app/models/reseau';
import { CommonService } from 'src/app/services/common.service';
import { EgliseService } from 'src/app/services/eglise.service';
import { ParameterService } from 'src/app/services/parameter.service';
import { ReseauService } from 'src/app/services/reseau.service';
import { getIdEglise } from 'src/app/utils/utils';
import { environment } from 'src/environments/environment';
import md5 from 'crypto-js/md5';

@Component({
  selector: 'app-liste-reseaux',
  templateUrl: './liste-reseaux.component.html',
  styleUrls: ['./liste-reseaux.component.scss']
})
export class ListeReseauxComponent implements OnInit {

  reseaux: Reseau[] = [];
  recherche = new FormControl('');
  hover = false;
  afficherFuturResponsable = false;
  futurResponsables: PersonneSuivi[] = [];
  lienValidation = `${environment.host}?validation=`;

  message: string = null;

  routeAddReseau = `/${menuItemsClass.ADD_RESEAU}`;
  routeDetailsReseau = `/${menuItemsClass.DETAILS_RESEAU}`;
  routeHere = `/${menuItemsClass.LISTE_RESEAU}`;

  constructor(
    private reseauService: ReseauService,
    private commonService: CommonService,
    private egliseService: EgliseService,
    private clipboardService: ClipboardService,
    private router: Router,
    private route: ActivatedRoute) {
    commonService.setBackRoute(this.routeHere);
  }

  ngOnInit(): void {
    this.message = this.commonService.getFlashSuccessMessage();
    this.commonService.removeFlashSuccessMessage();

    this.reseauService.getAll(getIdEglise()).subscribe( response => this.reseaux = response );
    this.egliseService.getFuturResponsable().subscribe( response => this.futurResponsables = response );
  }

  ajouterReseauOver() {
    this.hover = true;
  }

  ajouterReseauBlur() {
    this.hover = false;
  }

  details(idReseau: number) {
    this.commonService.setIdReseau(idReseau);
    this.commonService.setBackRoute(this.routeHere);
    this.router.navigate([this.routeDetailsReseau]);
  }

  copierCodeInClipboard(responsable: PersonneSuivi) {
    this.futurResponsables.forEach(responsable => {
      responsable.copier = false;
      responsable.copier_lien = false;
    });
    this.clipboardService.copy(responsable.code);
    responsable.copier = true;
  }

  copierLinkInClipboard(responsable: PersonneSuivi) {
    this.futurResponsables.forEach(responsable => {
      responsable.copier = false;
      responsable.copier_lien = false;
    });

    const link = `${this.lienValidation}${md5(responsable.code)}`;
    this.clipboardService.copy(link);
    responsable.copier_lien = true;
  }



  /**************************** GET************************************** */

  get backgroundButtonAdd(): string {
    return this.hover ? ParameterService.configuration.secondaryColor : ParameterService.configuration.primaryColor;
  }

  get secondaryColor(): string {
    return ParameterService.configuration.secondaryColor;
  }

  get personnesRecherches(): Reseau[] {
    return this.reseaux.filter(reseau => this.commonService.rechercher(this.recherche.value, reseau.nom));
  }

}
