import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { menuItemsClass } from 'src/app/models/const';
import { GR } from 'src/app/models/gr';
import { PersonneSuivi } from 'src/app/models/personneSuivi';
import { CommonService } from 'src/app/services/common.service';
import { GrService } from 'src/app/services/gr.service';
import { ParameterService } from 'src/app/services/parameter.service';
import { PersonneService } from 'src/app/services/personne.service';

@Component({
  selector: 'app-add-gr',
  templateUrl: './add-gr.component.html',
  styleUrls: ['./add-gr.component.scss']
})
export class AddGrComponent implements OnInit {

  gr: GR = {

  } as GR;
  saved = false;
  error = false;
  selectionEnCoursResponsable = false;

  personnes: PersonneSuivi[] = [];
  responsables: PersonneSuivi[] = [];

  constructor(
    private router: Router,
    private commonService: CommonService,
    private grService: GrService,
    private personneService: PersonneService,
    private clipboardService: ClipboardService
  ) {
    this.personneService.getPersonneReseau().subscribe(listePersonnes => {
      this.personnes = listePersonnes.map(personne => ({
        id: personne.id,
        nom: personne.nom,
        prenom: personne.prenom,
        checked: false
      } as PersonneSuivi))
    })
  }

  ngOnInit(): void {
  }

  back() {
    this.router.navigate([`/${menuItemsClass.LISTE_GR}`]);
  }

  definirResponsable() {

  }

  ajouterResponsable() {
    this.selectionEnCoursResponsable = true;
  }

  validerResponsable() {
    this.selectionEnCoursResponsable = false;
    this.responsables = this.personnes.filter(personne => personne.checked).map(personne => ({
      id: personne.id,
      nom: personne.nom,
      prenom: personne.prenom,
      checked: personne.checked,
      code: this.grService.generateAccessCode(10),
      copier: false
    } as PersonneSuivi));

    this.gr = {
      idreseau: 1,
      libelle: 'GR ' + this.responsables.map(personne => personne.prenom).join(' - '),
      responsables: this.responsables.map(personne => personne.prenom).join(' - '),
      taille: 0,
    } as GR;

  }

  genererCode(responsable: PersonneSuivi) {
    responsable.code = this.grService.generateAccessCode(10);
    responsable.copier = false;
  }

  copierCodeInClipboard(responsable: PersonneSuivi) {
    console.log('copy ', responsable);

    this.responsables.forEach(responsable => responsable.copier = false);
    this.clipboardService.copy(responsable.code);
    responsable.copier = true;
  }

  creerGR(){
    this.grService.creerGr(this.responsables).subscribe(envoye => {
      this.error = false;
      this.saved = true;
    },
    error => {
      this.saved = true;
      this.error = true;
    })
  }


  get personneCoches(): PersonneSuivi[] {
    return this.personnes.filter(personne => personne.checked);
  }

  get secondaryColor(): string {
    return ParameterService.configuration.secondaryColor;
  }
}
