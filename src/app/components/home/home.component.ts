import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { defaultRedirectNotAuth, defaultRedirectParamNotExist, menuItemsClass, Status } from 'src/app/models/const';
import { GR } from 'src/app/models/gr';
import { Personne } from 'src/app/models/personne';
import { Suivi } from 'src/app/models/suivi';
import { CommonService } from 'src/app/services/common.service';
import { GrService } from 'src/app/services/gr.service';
import { ParameterService } from 'src/app/services/parameter.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  gr: GR = { id:0, idreseau:0, libelle:'' };

  personnesGR: Personne[] = [];
  personnesHorsGR: Personne[] = [];
  suivis: Suivi[] = [];

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
    let idGr = Number(localStorage.getItem('idGr'));

    if (idGr) {
      this.grService.getGrById(idGr).subscribe(gr => {
        if (gr === null) {
          this.router.navigate([`/${defaultRedirectParamNotExist}`])
        } else {
          this.gr = gr;

          this.grService.getPersonnesGR(idGr).subscribe(personnes => this.personnesGR = personnes);
          this.grService.getPersonnesHorsGR(idGr).subscribe(personnes => this.personnesHorsGR = personnes);
          this.grService.getSuiviByGr(idGr).subscribe(suivis => this.suivis = suivis)
        }
      })
    } else {
      this.router.navigate([`/${defaultRedirectNotAuth}`])
    }


  }

  ngOnInit(): void {
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
        this.personnesHorsGR = this.personnesHorsGR.filter(currentPersonne => currentPersonne.id !== personne.id);
      }
    });
  }

  genererRapport(){
    this.rapport = `*Rapport suivi ${ this.gr.libelle }*\n\n` + this.suivis.map((suivi, index) => `*${index + 1}-* ${suivi.nom}\n${suivi.libelle}\n`).join('------------------------\n');
  }

  retirerDuGR(personne: Personne) {
    this.grService.retirerPersonne(personne).subscribe(response => {
      if(response){
        this.personnesHorsGR.push(personne);
        this.personnesGR = this.personnesGR.filter(currentPersonne => currentPersonne.id !== personne.id);
      }
    });
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

  get personnesHorsGrRecherches(): Personne[] {
    console.log(this.personnesHorsGR);

    return this.personnesHorsGR.filter(personne => this.commonService.rechercher(
      this.rechercheHorsGr,
      personne.nom, personne.prenom, personne.telephone, personne.status, personne.gr?.libelle, personne.email, personne.date_naissance, personne.date_evangelisation, personne.date_ajout
    ));
  }

}
