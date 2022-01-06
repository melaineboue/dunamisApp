import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRole } from 'src/app/enums/user-role';
import { defaultRedirectNotAuth, defaultRedirectParamNotExist, menuItemsClass, Status } from 'src/app/models/const';
import { GR } from 'src/app/models/gr';
import { Personne } from 'src/app/models/personne';
import { Suivi } from 'src/app/models/suivi';
import { CommonService } from 'src/app/services/common.service';
import { GrService } from 'src/app/services/gr.service';
import { ParameterService } from 'src/app/services/parameter.service';
import { getIdGr, getIdReseau, getUserRole } from 'src/app/utils/utils';

@Component({
  selector: 'app-home-responsable-gr',
  templateUrl: './home-responsable-gr.component.html',
  styleUrls: ['./home-responsable-gr.component.scss']
})
export class HomeResponsableGrComponent {


  routeAddPersonne = `/${menuItemsClass.ADD_PERSONNE}`;

  gr: GR = { id:0, idreseau:0, libelle:'' };

  personnesGR: Personne[] = [];
  personnesSansGR: Personne[] = [];
  suivis: Suivi[] = [];

  hover = false;

  statusResponsable = Status.RESPONSABLE;

  rechercheGr = '';
  rechercheHorsGr = '';
  routeNouvelleReunion = `/${menuItemsClass.ADD_REUNION}`;
  routeHere = `/${menuItemsClass.ACCUEIL}`;

  nouveau = true;
  modifier = false;
  generationRapport = false;
  rapport = 'Yes yes';

  constructor(private commonService: CommonService, private grService: GrService, private router: Router) {
    let idGr = Number(getIdGr());
    console.log(idGr);


    if (idGr) {
      this.grService.getGrById(idGr).subscribe(gr => {
        console.log(gr);

        if (gr === null) {
          this.router.navigate([`/${defaultRedirectParamNotExist}`])
        } else {
          this.gr = gr;

          this.grService.getPersonnesGR(idGr).subscribe(personnes => this.personnesGR = personnes);
          this.grService.getPersonnesSansGR(getIdReseau()).subscribe(personnes => this.personnesSansGR = personnes);
          this.grService.getSuiviByGr(idGr).subscribe(suivis => this.suivis = suivis)
        }
      })
    } else {
      this.router.navigate([`/${defaultRedirectNotAuth}`])
    }


  }

  goToNouvelleModifierReunion() {
    this.router.navigate([`/${this.routeNouvelleReunion}`])
  }

  details(idPersonne: number) {
    this.commonService.setId(idPersonne);
    this.commonService.setBackRoute(this.routeHere);
    this.router.navigate([`/${menuItemsClass.DETAILS_PERSONNE}`]);
  }

  ajouterGR(personne: Personne) {
    this.grService.ajouterPersonne(personne, this.gr.id).subscribe(response => {
      if(response){
        this.personnesGR.push(personne);
        this.personnesSansGR = this.personnesSansGR.filter(currentPersonne => currentPersonne.id !== personne.id);
      }
    });
  }

  genererRapport(){
    this.rapport = `*Rapport suivi ${ this.gr.libelle }*\n\n` + this.suivis.map((suivi, index) => `*${index + 1}-* ${suivi.nom}\n${suivi.libelle}\n`).join('------------------------\n');
  }

  retirerDuGR(personne: Personne) {
    this.grService.retirerPersonne(personne).subscribe(response => {
      if(response){
        personne.gr.id = 0;
        personne.gr.libelle = 'aucun_gr';
        this.personnesSansGR.push(personne);
        this.personnesGR = this.personnesGR.filter(currentPersonne => currentPersonne.id !== personne.id);
      }
    });
  }

  ajouterPersonneOver() {
    this.hover = true;
  }

  ajouterPersonneBlur() {
    this.hover = false;
  }


  get secondaryColor(): string {
    return ParameterService.configuration.secondaryColor;
  }

  get nombreRegulier(): number {
    return this.personnesGR.filter(personne => personne.status === Status.REGULIER).length;
  }

  get nombreIntegration(): number {
    return this.personnesGR.filter(personne => personne.status === Status.EN_COURS_FIDELISATION).length;
  }

  get nombreIrregulier(): number {
    return this.personnesGR.filter(personne => personne.status === Status.IRREGULIER).length;
  }

  get personnesGrRecherches(): Personne[] {
    return this.personnesGR.filter(personne => this.commonService.rechercher(
      this.rechercheGr,
      personne.nom, personne.prenom, personne.telephone, personne.status, personne.gr.libelle, personne.email, personne.date_naissance, personne.date_evangelisation, personne.date_ajout
    ));
  }

  get personnesSansGrRecherches(): Personne[] {

    return this.personnesSansGR.filter(personne => this.commonService.rechercher(
      this.rechercheHorsGr,
      personne.nom, personne.prenom, personne.telephone, personne.status, personne.gr?.libelle, personne.email, personne.date_naissance, personne.date_evangelisation, personne.date_ajout
    ));
  }

  get backgroundButtonAdd(): string {
    return this.hover ? ParameterService.configuration.secondaryColor : ParameterService.configuration.primaryColor;
  }

  estResponsableReseau(): boolean{
    return getUserRole()?.role_libelle_court === UserRole.ResponsableReseau;
  }

}


