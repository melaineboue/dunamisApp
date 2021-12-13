import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { menuItemsClass } from 'src/app/models/const';
import { Evenement } from 'src/app/models/evenement';
import { Personne } from 'src/app/models/personne';
import { ReunionGr } from 'src/app/models/reunion-gr';
import { Suivi } from 'src/app/models/suivi';
import { CommonService } from 'src/app/services/common.service';
import { ParameterService } from 'src/app/services/parameter.service';
import { PersonneService } from 'src/app/services/personne.service';

@Component({
  selector: 'app-details-personne',
  templateUrl: './details-personne.component.html',
  styleUrls: ['./details-personne.component.scss']
})
export class DetailsPersonneComponent implements OnInit {

  idPersonne: number = null;
  backRoute: string = '';
  personne: Personne = { id: 0 , gr: { id: 0 }};
  panelOpenState = true;
  ajoutSuivi = false;
  suivi = '';

  error = false;
  saved = false;

  suivis: Suivi[] =[];
  grAssiste: ReunionGr [] = [];
  evenementAssistes: Evenement[] = [];
  evenementNonAssistes: Evenement[] = [];


  routeListePersonne = `/${menuItemsClass.LISTE_PERSONNE}`;

  constructor(private commonService: CommonService, private router: Router, private personneService: PersonneService) {
    this.idPersonne = this.commonService.getId();

    if (!this.idPersonne) {
      this.router.navigate([this.routeListePersonne]);
    } else {
      this.personneService.getPersonne(this.idPersonne).subscribe(personne => this.personne = personne);
      this.personneService.getSuivis(this.idPersonne).subscribe(suivis => this.suivis = suivis);
      this.personneService.getEvenementsAssistes(this.idPersonne).subscribe(event => this.evenementAssistes = event);
      this.personneService.getEvenementsNonAssistes(this.idPersonne).subscribe(event => this.evenementNonAssistes = event);
      this.personneService.getGrAssiste(this.idPersonne).subscribe(grs => this.grAssiste = grs);

    }
  }

  ngOnInit(): void {
  }

  back() {

    this.backRoute = this.commonService.getBackRoute(true);

    if(! this.backRoute){
      this.backRoute = menuItemsClass.LISTE_PERSONNE;
    }
    this.router.navigate([this.backRoute]);
  }

  ajouterSuivi(){
    this.ajoutSuivi = true;
  }

  enregistrerSuivi(){

    this.personneService.sauvegarderSuivi(this.suivi,[this.idPersonne]).subscribe(
      enregistre => {

        if(enregistre){
          this.saved = true;
          this.error = false;

          let ladate = new Date();
          this.suivis.unshift({
            id: 0,
            libelle: this.suivi,
            libelle_html: this.suivi,
            personne_id: this.idPersonne,
            date_suivi: this.getLabelZero(ladate.getDate())+"/"+this.getLabelZero(ladate.getMonth()+1)+"/"+ladate.getFullYear()
          } as Suivi);

          this.suivi = '';
          this.ajoutSuivi = false;
        } else {
          this.error = true;
          this.saved = true;
        }

      },
      error => {
        this.error = true;
      }
    );




  }

  getLabelZero(nombre:number):string {
    return nombre <= 9 ? '0'+ nombre : nombre+'';
  }

  cancel(){
    this.suivi = '';
    this.ajoutSuivi = false;
  }



  get secondaryColor(): string {
    return ParameterService.configuration.secondaryColor;
  }

}
