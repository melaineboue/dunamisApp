import { Component, OnInit } from '@angular/core';
import { PersonneSuivi } from 'src/app/models/personneSuivi';
import { CommonService } from 'src/app/services/common.service';
import { GrService } from 'src/app/services/gr.service';
import { ParameterService } from 'src/app/services/parameter.service';
import { PersonneService } from 'src/app/services/personne.service';
import { getGr, getIdGr } from 'src/app/utils/utils';

@Component({
  selector: 'app-suivi-personne',
  templateUrl: './suivi-personne.component.html',
  styleUrls: ['./suivi-personne.component.scss']
})
export class SuiviPersonneComponent implements OnInit {

  saved = false;
  error = false;

  suivi = '';
  personnes: PersonneSuivi[] = [];
  recherche = '';

  toutCocher = false;

  constructor(private personneService: PersonneService, private grService: GrService, private commonService: CommonService) {
    this.grService.getPersonnesGR(getIdGr()).subscribe(listePersonne => this.personnes = listePersonne.map(personne => ({
      id: personne.id,
      nom: personne.nom,
      prenom: personne.prenom,
      checked: false
    } as PersonneSuivi)));

  }

  ngOnInit(): void {
  }

  enregistrerSuivi() {
    let ids: number[] = this.personnes.filter(personne => personne.checked).map(personne => personne.id);
    this.personneService.sauvegarderSuivi(this.suivi, ids).subscribe(enregistre => {
      this.saved = true;
      this.error = false;
    },
    error => {
      this.error = true;
      this.saved = true;
    })
  }

  cocherTout() {
    this.personnes.forEach(personne => personne.checked = this.toutCocher);
  }

  cocherPersonne(){
    if(this.personnes.length === this.personnes.filter(personne => personne.checked).length){
      this.toutCocher = true;
    }
    else {
      this.toutCocher = false;
    }
  }

  get checkedPersonnes(): string {
    return this.personnes.filter(personne => personne.checked).map(personne => personne.prenom + ' ' + personne.nom).join(', ');
  }

  get personnesRecherchees(): PersonneSuivi[] {
    return this.personnes.filter(personne => this.commonService.rechercher(this.recherche, personne.nom, personne.prenom) || this.commonService.rechercher(this.recherche, personne.prenom, personne.nom));
  }

  get secondaryColor(): string {
    return ParameterService.configuration.secondaryColor;
  }

}
