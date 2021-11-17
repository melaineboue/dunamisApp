import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { menuItemsClass } from 'src/app/models/const';
import { GR } from 'src/app/models/gr';
import { CommonService } from 'src/app/services/common.service';
import { GrService } from 'src/app/services/gr.service';
import { ParameterService } from 'src/app/services/parameter.service';

@Component({
  selector: 'app-liste-gr',
  templateUrl: './liste-gr.component.html',
  styleUrls: ['./liste-gr.component.scss']
})
export class ListeGrComponent implements OnInit {

  grs: GR[] = [];
  recherche = '';
  nouveauGr = false;

  routeAddGr = `/${menuItemsClass.ADD_GR}`;
  routeDetailsdGr = `/${menuItemsClass.DETAILS_GR}`;
  routeHere = `/${menuItemsClass.LISTE_GR}`;


  constructor(private commonService: CommonService, private router: Router, private grService: GrService) {
    this.grService.getList().subscribe(list => this.grs = list);
  }

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
