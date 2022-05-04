import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ParameterService } from './services/parameter.service';
import { TranslateService } from '@ngx-translate/core';
import { Langue } from './models/langue';
import { Menu } from './models/menu';
import { menuItemsClass } from './models/const';
import { Router } from '@angular/router';
import { getUserRole } from './utils/utils';
import { UserRole } from './enums/user-role';
import { UserService } from './services/user.service';



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
export class AppComponent  implements OnInit {
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
    { class: menuItemsClass.ACCUEIL, libelle: "menu.accueil", icone: "home", habilitation: [UserRole.ResponsableGr, UserRole.ResponsableReseau, UserRole.Pasteur, UserRole.Apotre, UserRole.Administrator] },
    { class: menuItemsClass.LISTE_PERSONNE, libelle: "menu.liste", icone: "groups", habilitation: [UserRole.ResponsableReseau] },
    { class: menuItemsClass.SUIVI_PERSONNE, libelle: "menu.suivi", icone: "assignment_ind", habilitation: [UserRole.ResponsableGr] },
    { class: menuItemsClass.LISTE_GR, libelle: "menu.liste_gr", icone: "local_library", habilitation: [UserRole.ResponsableReseau] },
    { class: menuItemsClass.REUNION_GR_LIST, libelle: "menu.reunion_gr", icone: "group_work", habilitation: [UserRole.ResponsableGr, UserRole.ResponsableReseau] },
    { class: menuItemsClass.SYNERGIE_MEGA_GR, libelle: "menu.synergie_megagr", icone: "supervisor_account", habilitation: [UserRole.ResponsableReseau] },
    { class: menuItemsClass.EVENT_LIST, libelle: "menu.liste_evenement", icone: "event", habilitation: [UserRole.ResponsableGr, UserRole.ResponsableReseau] },
    { class: menuItemsClass.GESTION_RAPPORT, libelle: "menu.gestion_rapport", icone: "summarize", habilitation: [UserRole.ResponsableReseau] },
    { class: menuItemsClass.THEME_GR_LIST, libelle: "menu.theme_gr", icone: "article", habilitation: [] },
    { class: menuItemsClass.SUGGESTION_BUG, libelle: "menu.suggestion_bug", icone: "warning_amber", habilitation: [UserRole.ResponsableReseau, UserRole.ResponsableGr] },
    { class: menuItemsClass.DECONNECTER, libelle: "menu.deconnecter", icone: "power_settings_new", habilitation: [UserRole.ResponsableGr, UserRole.ResponsableReseau, UserRole.Pasteur, UserRole.Apotre, UserRole.Administrator] },
    // { class: menuItemsClass.LISTE_RESEAU, libelle: "menu.liste_reseau", icone: "local_library" },
    // { class: menuItemsClass.PRESENCE_CULTE, libelle: "menu.culte", icone: "home" },
    // { class: menuItemsClass.EVENT_LIST, libelle: "menu.liste_evenement", icone: "event" },
    // { class: menuItemsClass.DASHBOARD, libelle: "Dashboard", icone: "dashboard" },
    // { class: menuItemsClass.HISTORY, libelle: "History", icone: "history" },
  ] as Menu[];

  // Material Icon
  // https://fonts.google.com/icons

  backgroundColor = "#EEEEEE";
  nomReseau = "";
  secondaryColor = "#EEEEEE";

  langage = 'fr';

  constructor(
    private parameterService: ParameterService,
    private translate: TranslateService,
    private router: Router,
    private userService: UserService
    ) {
    this.parameterService.getConfigurationReseau().subscribe(config => {
      this.backgroundColor = config.primaryColor;
      this.secondaryColor = config.secondaryColor;
      this.nomReseau = config.reseauName;
    });

    this.langage = this.translate.getBrowserLang();
    this.translate.use(this.langage);
  }

  ngOnInit(): void {
    console.log('okkkk');

    this.userService.getUSer().subscribe(user=>{
      // if(!user)
    })
  }

  estResponsableGR(){
    return getUserRole().role_libelle_court === UserRole.ResponsableGr;
  }



  changeLangage() {
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

  survolerMenuItem() {}

  cliquerNomReseau(){
    this.closeMenu(menuItemsClass.ACCUEIL);
    this.router.navigate([ `${menuItemsClass.ACCUEIL}` ]);
  }

  userSetup(){
    console.log('User setup');
  }

  estAutorise(listeDroit: string[]): boolean {
    const userRole = getUserRole();
    if(!userRole){
      return false;
    }
    const role: string = userRole.role_libelle_court;
    return listeDroit.includes(role);
  }

  get userExiste(): boolean {
    return localStorage.getItem('idUser') !== null && localStorage.getItem('idGr') !== null && localStorage.getItem('idReseau') !== null;
  }

  get username(): string {
      let username = '';
      if(localStorage.getItem('user')){
        const user = JSON.parse(localStorage.getItem('user'));
        username = `${user.prenom} ${user.nom}`.length > 24 ? `${user.prenom.substring(0,1)}. ${user.nom}`: `${user.prenom} ${user.nom}`;
      }
      return username;
  }

  get menuItemsAutorises(): Menu[] {
    return this.menuItems.filter(menu => this.estAutorise(menu.habilitation));
  }


}
