import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ListePersonnesComponent } from './components/liste-personnes/liste-personnes.component';
import { AddPersonneComponent } from './components/add-personne/add-personne.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ListePersonneByGrComponent } from './components/liste-personne-by-gr/liste-personne-by-gr.component';
import { DetailsPersonneComponent } from './components/details-personne/details-personne.component';
import { TitreComponent } from './components/titre/titre.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import {MatExpansionModule} from '@angular/material/expansion';
import { SuiviPersonneComponent } from './components/suivi-personne/suivi-personne.component';
import { ListeGrComponent } from './components/liste-gr/liste-gr.component';
import { AddGrComponent } from './components/add-gr/add-gr.component';
import { DetailsGrComponent } from './components/details-gr/details-gr.component';
import { BienvenueComponent } from './components/bienvenue/bienvenue.component';
import { LoginComponent } from './components/login/login.component';
import { DeconnecterComponent } from './components/deconnecter/deconnecter.component';
import { ThemeGrComponent } from './components/theme-gr/theme-gr.component';
import { ReunionGrComponent } from './components/reunion-gr/reunion-gr.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { DetailsEventComponent } from './components/details-event/details-event.component';
import { AddThemeGrComponent } from './components/add-theme-gr/add-theme-gr.component';
import { RapportComponent } from './components/rapport/rapport.component';
import { ListEventsComponent } from './components/list-events/list-events.component';


export function translateLoaderHttp(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    ListePersonnesComponent,
    AddPersonneComponent,
    ListePersonneByGrComponent,
    DetailsPersonneComponent,
    TitreComponent,
    CapitalizePipe,
    SuiviPersonneComponent,
    ListeGrComponent,
    AddGrComponent,
    DetailsGrComponent,
    BienvenueComponent,
    LoginComponent,
    DeconnecterComponent,
    ThemeGrComponent,
    ReunionGrComponent,
    AddEventComponent,
    DetailsEventComponent,
    AddThemeGrComponent,
    RapportComponent,
    ListEventsComponent
  ],
  imports: [
    MatSelectModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatExpansionModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateLoaderHttp,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
