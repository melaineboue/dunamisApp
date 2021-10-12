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

const routes: Routes = [
  { path:menuItemsClass.LISTE_PERSONNE , component: ListePersonnesComponent, canActivate: [ LoginService ] },
  { path:menuItemsClass.LISTE_PERSONNE_GR , component: ListePersonneByGrComponent, canActivate: [ LoginService ]  },
  { path:menuItemsClass.ADD_PERSONNE , component: AddPersonneComponent, canActivate: [ LoginService ]  },
  { path:menuItemsClass.ADD_GR , component: AddGrComponent, canActivate: [ LoginService ]  },
  { path:menuItemsClass.ADD_EVENT , component: AddEventComponent, canActivate: [ LoginService ]  },
  { path:menuItemsClass.ADD_THEME , component: AddThemeGrComponent, canActivate: [ LoginService ]  },
  { path:menuItemsClass.DETAILS_PERSONNE , component: DetailsPersonneComponent, canActivate: [ LoginService ]  },
  { path:menuItemsClass.DETAILS_GR , component: DetailsGrComponent, canActivate: [ LoginService ]  },
  { path:menuItemsClass.DETAILS_GR , component: DetailsGrComponent, canActivate: [ LoginService ]  },
  { path:menuItemsClass.DETAILS_EVENT , component: DetailsEventComponent, canActivate: [ LoginService ]  },
  { path:menuItemsClass.SUIVI_PERSONNE , component: SuiviPersonneComponent , canActivate: [ LoginService ] },
  { path:menuItemsClass.LISTE_GR , component: ListeGrComponent, canActivate: [ LoginService ]  },
  { path:menuItemsClass.EVENT_LIST , component: ListEventsComponent, canActivate: [ LoginService ]  },
  { path:menuItemsClass.REUNION_GR_LIST , component: ReunionGrComponent, canActivate: [ LoginService ]  },
  { path:menuItemsClass.THEME_GR_LIST , component: ThemeGrComponent, canActivate: [ LoginService ]  },
  { path:menuItemsClass.LOGIN , component: LoginComponent  },
  { path:menuItemsClass.BIENVENUE , component: BienvenueComponent },
  { path:menuItemsClass.DECONNECTER , component: DeconnecterComponent, canActivate: [ LoginService ]  },
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
