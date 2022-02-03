import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { menuItemsClass } from 'src/app/models/const';
import { GR } from 'src/app/models/gr';
import { PersonneSuivi } from 'src/app/models/personneSuivi';
import { CommonService } from 'src/app/services/common.service';
import { GrService } from 'src/app/services/gr.service';
import { ParameterService } from 'src/app/services/parameter.service';
import md5 from 'crypto-js/md5';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-liste-gr',
  templateUrl: './liste-gr.component.html',
  styleUrls: ['./liste-gr.component.scss']
})
export class ListeGrComponent implements OnInit {

  grs: GR[] = [];
  recherche = '';
  nouveauGr = false;
  afficherFuturResponsable = false;
  lienValidation = `${environment.host}?validation=`;

  futurResponsables: PersonneSuivi[] = [];

  routeAddGr = `/${menuItemsClass.ADD_GR}`;
  routeDetailsdGr = `/${menuItemsClass.DETAILS_GR}`;
  routeHere = `/${menuItemsClass.LISTE_GR}`;


  constructor(private commonService: CommonService, private router: Router, private grService: GrService, private clipboardService: ClipboardService) {
    this.grService.getList().subscribe(listeGr => this.grs = listeGr);
    this.grService.getFuturResponsable().subscribe(responsables => this.futurResponsables = responsables);
  }

  ngOnInit(): void {
  }

  details(id: number){
    this.commonService.setIdGr(id);
    this.commonService.setBackRoute(this.routeHere);
    this.router.navigate([this.routeDetailsdGr])
  }

  getTextFromResponsable(responsable: PersonneSuivi): string{
    return `${responsable.prenom} ${responsable.nom} (${responsable.gr_libelle})`;
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

  get secondaryColor(): string {
    return ParameterService.configuration.secondaryColor;
  }

  get backgroundButtonAdd(): string {
    return ParameterService.configuration.primaryColor;
  }

  get grsRecherches(): GR[]{
    return this.grs.filter(gr => this.commonService.rechercher(this.recherche, gr.libelle, gr.responsables, gr.taille+'', gr.date_creation))
  }
}
