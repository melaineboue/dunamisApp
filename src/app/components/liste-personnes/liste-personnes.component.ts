import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { menuItemsClass, Status } from 'src/app/models/const';
import { Personne } from 'src/app/models/personne';
import { CommonService } from 'src/app/services/common.service';
import { GrService } from 'src/app/services/gr.service';
import { ParameterService } from 'src/app/services/parameter.service';
import { PersonneService } from 'src/app/services/personne.service';
import { getIdGr } from 'src/app/utils/utils';

@Component({
  selector: 'app-liste-personnes',
  templateUrl: './liste-personnes.component.html',
  styleUrls: ['./liste-personnes.component.scss'],
  animations: [
    trigger('hover', [
      state('hover', style({
        background: ParameterService.configuration.secondaryColor
      })),

      state('blur', style({
        background: ParameterService.configuration.primaryColor
      })),

      transition('blur <=> hover', [
        animate('0.3s ease-in')
      ])

    ])
  ]
})
export class ListePersonnesComponent implements OnInit {

  personnes: Personne[] = [];
  recherche = new FormControl('');
  hover = false;

  routeAddPersonne = `/${menuItemsClass.ADD_PERSONNE}`;
  routeListePersonneGr = `/${menuItemsClass.LISTE_PERSONNE_GR}`;
  routeDetailsPersonne = `/${menuItemsClass.DETAILS_PERSONNE}`;
  routeHere = `/${menuItemsClass.LISTE_PERSONNE}`;

  constructor(private personneService: PersonneService, private grService: GrService, private commonService: CommonService, private router: Router) {
    commonService.setBackRoute(menuItemsClass.LISTE_PERSONNE);
  }

  ngOnInit(): void {
    this.grService.getPersonnesGR(getIdGr()).subscribe(response => this.personnes = response);
  }

  ajouterPersonneOver() {
    this.hover = true;
  }

  ajouterPersonneBlur() {
    this.hover = false;
  }

  details(idPersonne: number) {
    this.commonService.setId(idPersonne);
    this.commonService.setBackRoute(this.routeHere);
    this.router.navigate([this.routeDetailsPersonne]);
  }



  /**************************** GET************************************** */

  get backgroundButtonAdd(): string {
    return this.hover ? ParameterService.configuration.secondaryColor : ParameterService.configuration.primaryColor;
  }

  get nombreRegulier(): number {
    return this.personnes.filter(personne => personne.status === Status.REGULIER).length
  }

  get nombreIntegration(): number {
    return this.personnes.filter(personne => personne.status === Status.EN_COURS_FIDELISATION).length
  }

  get nombreIrregulier(): number {
    return this.personnes.filter(personne => personne.status === Status.IRREGULIER).length
  }

  get secondaryColor(): string {
    return ParameterService.configuration.secondaryColor;
  }

  get personnesRecherches(): Personne[] {
    return this.personnes.filter(personne => this.commonService.rechercher(
      this.recherche.value,
      personne.nom, personne.prenom, personne.telephone, personne.status, personne.ville, personne.gr.libelle, personne.email, personne.date_naissance, personne.date_evangelisation, personne.date_ajout
    ));
  }

}
