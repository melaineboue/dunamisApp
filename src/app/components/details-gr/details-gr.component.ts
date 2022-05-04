import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRole } from 'src/app/enums/user-role';
import { defaultRedirectParamNotExist, menuItemsClass, Status } from 'src/app/models/const';
import { GR } from 'src/app/models/gr';
import { Personne } from 'src/app/models/personne';
import { CommonService } from 'src/app/services/common.service';
import { GrService } from 'src/app/services/gr.service';
import { ParameterService } from 'src/app/services/parameter.service';
import { getUserRole } from 'src/app/utils/utils';

@Component({
  selector: 'app-details-gr',
  templateUrl: './details-gr.component.html',
  styleUrls: ['./details-gr.component.scss']
})
export class DetailsGrComponent implements OnInit {

  gr: GR = {id: 0, libelle: '', idreseau: 0};
  personnesGR: Personne[] = [];
  personnesHorsGR: Personne[] = [];

  statusResponsable = Status.RESPONSABLE;

  suppressionEnCours = false;

  rechercheGr = '';
  rechercheHorsGr = '';
  routeHere = `/${menuItemsClass.DETAILS_GR}`;

  constructor(private commonService: CommonService, private grService: GrService, private router: Router) {
    let idGr = commonService.getIdGr();

    if (idGr) {
      this.grService.getGrById(idGr).subscribe(gr => {
        if (gr === null) {
          this.router.navigate([`/${defaultRedirectParamNotExist}`])
        } else {
          this.gr = gr;

          this.grService.getPersonnesGR(idGr).subscribe(personnes => this.personnesGR = personnes);
          this.grService.getPersonnesHorsGR(idGr).subscribe(personnes => this.personnesHorsGR = personnes);
        }
      })
    } else {
      this.router.navigate([`/${defaultRedirectParamNotExist}`])
    }

  }

  ngOnInit(): void {
  }

  back() {
    this.router.navigate([`/${this.commonService.getBackRoute(true)}`])
  }

  details(idPersonne: number) {
    this.commonService.setId(idPersonne);
    this.commonService.setBackRoute(this.routeHere);
    this.router.navigate([`/${menuItemsClass.DETAILS_PERSONNE}`]);
  }

  ajouterGR(personne: Personne) {
    this.grService.ajouterPersonne(personne, this.gr.id).subscribe(response => {
      this.personnesGR.push(personne);
      this.personnesHorsGR = this.personnesHorsGR.filter(currentPersonne => currentPersonne.id !== personne.id);
    });
  }

  retirerDuGR(personne: Personne) {
    this.grService.retirerPersonne(personne).subscribe(response => {
      this.personnesHorsGR.push(personne);
      this.personnesGR = this.personnesGR.filter(currentPersonne => currentPersonne.id !== personne.id);
    });
  }

  fermerGr(){
    this.grService.fermerGr(this.gr.id).subscribe(result => {
      if(result){
        this.router.navigate([`/${menuItemsClass.ACCUEIL}`])
      } else {

      }
    })
  }

  definirReponsable(idPersonne: number){
    this.grService.definirReponsable(idPersonne, this.gr.id);
  }

  estAdministrateur(): boolean {
    return getUserRole().role_libelle_court === UserRole.Administrator || getUserRole().role_libelle_court === UserRole.AdministratorPartial || getUserRole().role_libelle_court === UserRole.AdministratorReadOnly;
  }

  estApotre(): boolean {
    return getUserRole().role_libelle_court === UserRole.Apotre;
  }


  estPasteur(): boolean {
    return getUserRole().role_libelle_court === UserRole.Pasteur || getUserRole().role_libelle_court === UserRole.PasteurReadOnly;
  }

  estResponsableReseau(): boolean {
    return getUserRole().role_libelle_court === UserRole.ResponsableReseau || getUserRole().role_libelle_court === UserRole.ResponsableReseauReadOnly;
  }

  estResponsableGr(): boolean {
    return getUserRole().role_libelle_court === UserRole.ResponsableGr || getUserRole().role_libelle_court === UserRole.ResponsableGrReadOnly;
  }

  get secondaryColor(): string {
    return ParameterService.configuration.secondaryColor;
  }

  get nombreRegulier(): number {
    return 0;
  }

  get nombreIntegration(): number {
    return 0;
  }

  get nombreIrregulier(): number {
    return 0;
  }

  get personnesGrRecherches(): Personne[] {
    return this.personnesGR.filter(personne => this.commonService.rechercher(
      this.rechercheGr,
      personne.nom, personne.prenom, personne.telephone, personne.status, personne.gr.libelle, personne.email, personne.date_naissance, personne.date_evangelisation, personne.date_ajout
    ));
  }

  get personnesHorsGrRecherches(): Personne[] {
    return this.personnesHorsGR.filter(personne => this.commonService.rechercher(
      this.rechercheHorsGr,
      personne.nom, personne.prenom, personne.telephone, personne.status, personne.gr.libelle, personne.email, personne.date_naissance, personne.date_evangelisation, personne.date_ajout
    ));
  }

}
