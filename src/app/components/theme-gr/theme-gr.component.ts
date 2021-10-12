import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { menuItemsClass } from 'src/app/models/const';
import { Theme } from 'src/app/models/theme-gr';
import { CommonService } from 'src/app/services/common.service';
import { ParameterService } from 'src/app/services/parameter.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-theme-gr',
  templateUrl: './theme-gr.component.html',
  styleUrls: ['./theme-gr.component.scss']
})
export class ThemeGrComponent implements OnInit {

  themes: Theme[];
  recherche = new FormControl('');
  hover = false;

  routeAddTheme = `/${menuItemsClass.ADD_THEME}`;
  routeHere = `/${menuItemsClass.THEME_GR_LIST}`;

  constructor(private themeService: ThemeService, private commonService: CommonService, private router: Router) {
    commonService.setBackRoute(menuItemsClass.EVENT_LIST);
  }

  ngOnInit(): void {
    this.themeService.getThemes().subscribe(response => this.themes = response);
  }

  ajouterPersonneOver() {
    this.hover = true;
  }

  ajouterPersonneBlur() {
    this.hover = false;
  }




  /**************************** GET************************************** */

  get backgroundButtonAdd(): string {
    return this.hover ? ParameterService.configuration.secondaryColor : ParameterService.configuration.primaryColor;
  }

  get secondaryColor(): string {
    return ParameterService.configuration.secondaryColor;
  }

  get themesRecherches(): Theme[] {
    return this.themes.filter(theme => this.commonService.rechercher(
      this.recherche.value,
      theme.titre, theme.semaine, theme.annonce
    ));
  }

}
