import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListePersonnesComponent } from './components/liste-personnes/liste-personnes.component';
import { BrowserModule } from '@angular/platform-browser';
import { menuItemsClass } from './models/const';
import { AddPersonneComponent } from './components/add-personne/add-personne.component';
import { ListePersonneByGrComponent } from './components/liste-personne-by-gr/liste-personne-by-gr.component';
import { DetailsPersonneComponent } from './components/details-personne/details-personne.component';
import { SuiviPersonneComponent } from './components/suivi-personne/suivi-personne.component';
import { ListeGrComponent } from './components/liste-gr/liste-gr.component';
import { AddGrComponent } from './components/add-gr/add-gr.component';
import { DetailsGrComponent } from './components/details-gr/details-gr.component';
import { BienvenueComponent } from './components/bienvenue/bienvenue.component';
import { LoginComponent } from './components/login/login.component';
import { DeconnecterComponent } from './components/deconnecter/deconnecter.component';
import { LoginService } from './services/login.service';
import { ReunionGrComponent } from './components/reunion-gr/reunion-gr.component';
import { ThemeGrComponent } from './components/theme-gr/theme-gr.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { AddThemeGrComponent } from './components/add-theme-gr/add-theme-gr.component';
import { DetailsEventComponent } from './components/details-event/details-event.component';
import { ListEventsComponent } from './components/list-events/list-events.component';
import { DetailsReunionComponent } from './components/details-reunion/details-reunion.component';
import { HomeComponent } from './components/home/home.component';
import { AddReunionComponent } from './components/add-reunion/add-reunion.component';
import { SuggestionComponent } from './components/suggestion/suggestion.component';
import { GestionRapportComponent } from './components/gestion-rapport/gestion-rapport.component';
import { UserService } from './services/user.service';
import { AddReseauComponent } from './components/add-reseau/add-reseau.component';
import { DetailsReseauComponent } from './components/details-reseau/details-reseau.component';
import { ModifierPersonneComponent } from './components/modifier-personne/modifier-personne.component';
import { ModifierReseauComponent } from './components/modifier-reseau/modifier-reseau.component';
import { ModifierGrComponent } from './components/modifier-gr/modifier-gr.component';

const routes: Routes = [
  { path:menuItemsClass.ACCUEIL , component: HomeComponent, canActivate: [ LoginService, UserService ] },
  { path:menuItemsClass.LISTE_PERSONNE , component: ListePersonnesComponent, canActivate: [ LoginService, UserService ] },
  { path:menuItemsClass.LISTE_PERSONNE_GR , component: ListePersonneByGrComponent, canActivate: [ LoginService, UserService ]  },
  { path:menuItemsClass.ADD_PERSONNE , component: AddPersonneComponent, canActivate: [ LoginService, UserService ]  },
  { path:menuItemsClass.ADD_GR , component: AddGrComponent, canActivate: [ LoginService, UserService ]  },
  { path:menuItemsClass.ADD_EVENT , component: AddEventComponent, canActivate: [ LoginService, UserService ]  },
  { path:menuItemsClass.ADD_THEME , component: AddThemeGrComponent, canActivate: [ LoginService, UserService ]  },
  { path:menuItemsClass.ADD_REUNION , component: AddReunionComponent, canActivate: [ LoginService, UserService ]  },
  { path:menuItemsClass.ADD_RESEAU , component: AddReseauComponent, canActivate: [ LoginService, UserService ]  },
  { path:menuItemsClass.DETAILS_PERSONNE , component: DetailsPersonneComponent, canActivate: [ LoginService, UserService ]  },
  { path:menuItemsClass.DETAILS_GR , component: DetailsGrComponent, canActivate: [ LoginService, UserService ]  },
  { path:menuItemsClass.DETAILS_GR , component: DetailsGrComponent, canActivate: [ LoginService, UserService ]  },
  { path:menuItemsClass.DETAILS_EVENT , component: DetailsEventComponent, canActivate: [ LoginService, UserService ]  },
  { path:menuItemsClass.DETAILS_RESEAU , component: DetailsReseauComponent, canActivate: [ LoginService, UserService ]  },
  { path:menuItemsClass.SUIVI_PERSONNE , component: SuiviPersonneComponent , canActivate: [ LoginService, UserService ] },
  { path:menuItemsClass.LISTE_GR , component: ListeGrComponent, canActivate: [ LoginService, UserService ]  },
  { path:menuItemsClass.EVENT_LIST , component: ListEventsComponent, canActivate: [ LoginService, UserService ]  },
  { path:menuItemsClass.REUNION_GR_LIST , component: ReunionGrComponent, canActivate: [ LoginService, UserService ]  },
  { path:menuItemsClass.THEME_GR_LIST , component: ThemeGrComponent, canActivate: [ LoginService, UserService ]  },
  { path:menuItemsClass.DETAILS_REUNION_GR , component: DetailsReunionComponent, canActivate: [ LoginService, UserService ]  },
  { path:menuItemsClass.SUGGESTION_BUG , component: SuggestionComponent, canActivate: [ LoginService, UserService ]   },
  { path:menuItemsClass.LOGIN , component: LoginComponent  },
  { path:menuItemsClass.BIENVENUE , component: BienvenueComponent },
  { path:menuItemsClass.GESTION_RAPPORT , component: GestionRapportComponent },
  { path:menuItemsClass.MODIFIER_PERSONNE , component: ModifierPersonneComponent },
  { path:menuItemsClass.MODIFIER_RESEAU , component: ModifierReseauComponent },
  { path:menuItemsClass.MODIFIER_GR , component: ModifierGrComponent },
  { path:menuItemsClass.DECONNECTER , component: DeconnecterComponent, canActivate: [ LoginService, UserService ]  },
  { path:'**' , component: LoginComponent },
]

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
