import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { menuItemsClass } from 'src/app/models/const';
import { GR } from 'src/app/models/gr';
import { CommonService } from 'src/app/services/common.service';
import { ParameterService } from 'src/app/services/parameter.service';

@Component({
  selector: 'app-liste-gr',
  templateUrl: './liste-gr.component.html',
  styleUrls: ['./liste-gr.component.scss']
})
export class ListeGrComponent implements OnInit {

  grs: GR[] = [
    {
      id: 1,
      idreseau:1,
      libelle: "Gr Franckie - Mélaine",
      date_creation: "12/11/2020",
      responsables: "Franckie - Mélaine",
      taille: 20
    },
    {
      id: 2,
      idreseau:1,
      libelle: "Gr Maureen - Armelle",
      date_creation: "12/11/2020",
      responsables: "Maureen - Armelle",
      taille: 16
    }
  ];
  recherche = '';
  nouveauGr = false;

  routeAddGr = `/${menuItemsClass.ADD_GR}`;
  routeDetailsdGr = `/${menuItemsClass.DETAILS_GR}`;
  routeHere = `/${menuItemsClass.LISTE_GR}`;


  constructor(private commonService: CommonService, private router: Router) { }

  ngOnInit(): void {
  }

  details(id: number){
    this.commonService.setIdGr(id);
    this.commonService.setBackRoute(this.routeHere);
    this.router.navigate([this.routeDetailsdGr])
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
