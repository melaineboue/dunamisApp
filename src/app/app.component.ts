import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ParameterService } from './services/parameter.service';
import { TranslateService } from '@ngx-translate/core';
import { Langue } from './models/langue';
import { Menu } from './models/menu';
import { menuItemsClass } from './models/const';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('openCloseMenu', [
      state('openMenu', style({
        transform: "translateX(0px)"
      })),

      state('closeMenu', style({
        transform: "translateX(-250px)"
      })),

      transition('openMenu <=> closeMenu', [
        animate('0.1s ease-in')
      ])

    ])
  ]
})
export class AppComponent {
  classMenuItem = menuItemsClass;

  title = 'dunamisApp';
  hover = false;
  menuOpened: boolean = false;
  menuActive = 'home';
  langues = [
    { code: "fr", libelle: "langage.francais" },
    { code: "en", libelle: "langage.anglais" },
    { code: "es", libelle: "langage.espagnol" },
    { code: "it", libelle: "langage.italien" },
    { code: "de", libelle: "langage.allemand" },
    { code: "pt", libelle: "langage.portugais" },
  ] as Langue[];

  menuItems = [
    { class: menuItemsClass.ACCUEIL, libelle: "menu.accueil", icone: "home" },
    { class: menuItemsClass.LISTE_PERSONNE, libelle: "menu.liste", icone: "groups" },
    { class: menuItemsClass.SUIVI_PERSONNE, libelle: "menu.suivi", icone: "assignment_ind" },
    // { class: menuItemsClass.PRESENCE_CULTE, libelle: "menu.culte", icone: "home" },
    { class: menuItemsClass.LISTE_GR, libelle: "menu.liste_gr", icone: "local_library" },
    { class: menuItemsClass.REUNION_GR_LIST, libelle: "menu.reunion_gr", icone: "group_work" },
    { class: menuItemsClass.EVENT_LIST, libelle: "menu.liste_evenement", icone: "event" },
    // { class: menuItemsClass.EVENT_LIST, libelle: "menu.liste_evenement", icone: "event" },
    { class: menuItemsClass.THEME_GR_LIST, libelle: "menu.theme_gr", icone: "article" },
    // { class: menuItemsClass.LISTE_RESEAU, libelle: "menu.liste_reseau", icone: "local_library" },
    { class: menuItemsClass.DECONNECTER, libelle: "menu.deconnecter", icone: "power_settings_new" },
    // { class: menuItemsClass.DASHBOARD, libelle: "Dashboard", icone: "dashboard" },
    // { class: menuItemsClass.HISTORY, libelle: "History", icone: "history" },
  ] as Menu[];
  // Material Icon
  // https://fonts.google.com/icons

  backgroundColor = "#EEEEEE";
  nomReseau = "";
  secondaryColor = "#EEEEEE";

  langage = 'es';

  constructor(
    private parameterService: ParameterService,
    private translate: TranslateService,
    private router: Router
    ) {
    this.parameterService.getConfigurationReseau().subscribe(config => {
      this.backgroundColor = config.primaryColor;
      this.secondaryColor = config.secondaryColor;
      this.nomReseau = config.reseauName;
    });

    this.langage = this.translate.getBrowserLang();
    this.translate.use(this.langage);
  }

  changeLangage(langage: string) {
    this.langage = langage
    this.translate.use(this.langage);
  }

  showMenu() {
    this.menuOpened = true;
  }

  closeMenu(activeMenu: string) {
    this.menuOpened = false;
    this.menuActive = activeMenu;
  }

  toggle() {
    this.hover = !this.hover;
  }

  survolerMenuItem() {

  }

  cliquerNomReseau(){
    this.router.navigate([ `${menuItemsClass.ACCUEIL}` ])
  }

  get userExiste(): boolean {
    return localStorage.getItem('idUser') !== null && localStorage.getItem('idGr') !== null && localStorage.getItem('idReseau') !== null;
  }

}
