import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { menuItemsClass } from 'src/app/models/const';
import { DataGrEdition } from 'src/app/models/data-gr-edition';
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

  saved = false;
  error = false;
  errorGrNomVide = false;

  gr: GR = {} as GR;

  personnes: PersonneSuivi[] = [];
  responsables: PersonneSuivi[] = [];



  constructor(
    private http: HttpClient,
    private router: Router,
    private grService: GrService,
    private personneService: PersonneService
  ) {
    this.personneService.getPersonneReseauNonResponsable().subscribe(listePersonnes => {
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



  creerGR(){

    if(!this.gr?.libelle || this.gr?.libelle?.trim().length === 0) {
      this.errorGrNomVide = true;
    }
    else {
      this.errorGrNomVide = false;
      this.grService.creerGr(this.gr, this.responsables).subscribe(envoye => {
        this.error = false;
        this.saved = true;
      },
      error => {
        this.saved = true;
        this.error = true;
      });
    }

  }

  dataGrChanged(data: DataGrEdition){
    console.log(data.gr);

    this.gr = data.gr;
    this.responsables = data.responsables;
  }
}
