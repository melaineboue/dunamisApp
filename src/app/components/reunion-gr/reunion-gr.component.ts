import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { menuItemsClass } from 'src/app/models/const';
import { ReunionGr } from 'src/app/models/reunion-gr';
import { CommonService } from 'src/app/services/common.service';
import { ParameterService } from 'src/app/services/parameter.service';
import { ReunionGrService } from 'src/app/services/reunion-gr.service';

@Component({
  selector: 'app-reunion-gr',
  templateUrl: './reunion-gr.component.html',
  styleUrls: ['./reunion-gr.component.scss']
})
export class ReunionGrComponent implements OnInit {

  reunions: ReunionGr[] = [];
  recherche = '';
  hover = false;

  routeDetailsReunionGr = `/${menuItemsClass.DETAILS_REUNION_GR}`;
  routeHere = `/${menuItemsClass.REUNION_GR_LIST}`;

  constructor(private reunionService: ReunionGrService, private commonService: CommonService, private router: Router) {
    commonService.setBackRoute(this.routeHere);
  }

  ngOnInit(): void {
    this.reunionService.getReunions().subscribe(response => this.reunions = response);
  }

  ajouterPersonneOver() {
    this.hover = true;
  }

  ajouterPersonneBlur() {
    this.hover = false;
  }

  details(idReunion: number) {
    this.commonService.setId(idReunion);
    this.commonService.setBackRoute(this.routeHere);
    this.router.navigate([this.routeDetailsReunionGr]);
  }



  /**************************** GET************************************** */

  get backgroundButtonAdd(): string {
    return this.hover ? ParameterService.configuration.secondaryColor : ParameterService.configuration.primaryColor;
  }

  get secondaryColor(): string {
    return ParameterService.configuration.secondaryColor;
  }

  get reunionsRecherches(): ReunionGr[] {
    return this.reunions.filter(reunion => this.commonService.rechercher(
      this.recherche,
      reunion.semaine, reunion.titre, reunion.annonce
    ));
  }

}
