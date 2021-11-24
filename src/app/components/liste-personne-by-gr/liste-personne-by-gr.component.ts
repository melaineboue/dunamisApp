import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ifError } from 'assert';
import { menuItemsClass, Status } from 'src/app/models/const';
import { GrContent } from 'src/app/models/gr-content';
import { Personne } from 'src/app/models/personne';
import { CommonService } from 'src/app/services/common.service';
import { ParameterService } from 'src/app/services/parameter.service';
import { PersonneService } from 'src/app/services/personne.service';

@Component({
  selector: 'app-liste-personne-by-gr',
  templateUrl: './liste-personne-by-gr.component.html',
  styleUrls: ['./liste-personne-by-gr.component.scss']
})
export class ListePersonneByGrComponent implements OnInit {

  grs: GrContent[] = [];
  recherche = new FormControl('');
  hover = false;

  routeAddPersonne = `/${menuItemsClass.ADD_PERSONNE}`;
  routeListePersonne = `/${menuItemsClass.LISTE_PERSONNE}`;
  routeDetailsPersonne = `/${menuItemsClass.DETAILS_PERSONNE}`;
  routeHere = `/${menuItemsClass.LISTE_PERSONNE_GR}`;

  constructor(private personneService: PersonneService, private commonService: CommonService, private router: Router) {}

  ngOnInit(): void {
    this.personneService.getPersonneReseau().subscribe(response => this.grs = this.classerParGr(response));
  }

  classerParGr(personnes: Personne[]): GrContent[] {
    let map = new Map<number, GrContent>(); //key = Gr name / value Personne[]
    personnes.forEach(personne => {

      if (map.has(personne.gr?.id)) {
        let currentGr = map.get(personne.gr.id);
        currentGr.personnes.push(personne);
        map.set(personne.gr.id, currentGr);

      } else {
        let personnes = [] as Personne[];
        personnes.push(personne);

        let currentGr: GrContent = {
          id: personne.gr.id,
          libelle: personne.gr.libelle,
          personnes: personnes,
          total: personnes.length,
          regulier: personnes.filter(personne => personne.status === Status.REGULIER).length,
          irregulier: personnes.filter(personne => personne.status === Status.IRREGULIER).length,
          fidelisation: personnes.filter(personne => personne.status === Status.EN_COURS_FIDELISATION).length,
        };
        map.set(personne.gr.id, currentGr);
      }
    });

    return Array.from(map.values());
  }


  ajouterPersonneOver() {
    this.hover = true;
  }

  ajouterPersonneBlur() {
    this.hover = false;
  }

  get backgroundButtonAdd(): string {
    return this.hover ? ParameterService.configuration.secondaryColor : ParameterService.configuration.primaryColor;
  }

  /**
   * Retourne les Grs qui contiennent texte recherché dans leur libellé ou le nom des personnes
   */
  get grRecherches(): GrContent[] {
    const grRecherche = this.grs.filter(gr =>
      this.commonService.rechercher(this.recherche.value, gr.libelle) ||
      gr.personnes.some( personne => this.commonService.rechercher(this.recherche.value, personne.nom, personne.prenom, personne.telephone, personne.status, personne.ville, personne.gr.libelle, personne.email, personne.date_naissance, personne.date_evangelisation, personne.date_ajout))
    );

    grRecherche.map(gr => gr.personnes = gr.personnes.filter(personne => this.commonService.rechercher(this.recherche.value, personne.nom, personne.prenom, personne.telephone, personne.status, personne.ville, personne.gr.libelle, personne.email, personne.date_naissance, personne.date_evangelisation, personne.date_ajout)));
    return grRecherche;
  }

  get secondaryColor(): string {
    return ParameterService.configuration.secondaryColor;
  }

  details(idPersonne: number) {
    this.commonService.setId(idPersonne);
    this.commonService.setBackRoute(this.routeHere);
    this.router.navigate([this.routeDetailsPersonne]);
  }

  nombreRegulier(personnes: Personne[]): number {
    return personnes.filter(personne => personne.status === Status.REGULIER).length
  }

  nombreIntegration(personnes: Personne[]): number {
    return personnes.filter(personne => personne.status === Status.EN_COURS_FIDELISATION).length
  }

  nombreIrregulier(personnes: Personne[]): number {
    return personnes.filter(personne => personne.status === Status.IRREGULIER).length
  }
}
