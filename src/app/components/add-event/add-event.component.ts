import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { menuItemsClass } from 'src/app/models/const';
import { Evenement } from 'src/app/models/evenement';
import { Predicateur } from 'src/app/models/predicateur';
import { estDate, estHeure, getUserRole } from 'src/app/utils/utils';
import { CommonService } from 'src/app/services/common.service';
import { EventService } from 'src/app/services/event.service';
import { ParameterService } from 'src/app/services/parameter.service';
import { UserRole } from 'src/app/enums/user-role';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  backRoute = menuItemsClass.EVENT_LIST;
  event: Evenement;

  libelle: string = '';
  predicateur: string = '';
  titre_message: string = '';
  date_evenement: string='';
  old_date_evenement = '';
  heure_evenement = '20:30';

  predicateurs: Predicateur[] = [];

  error: boolean = false;
  saved: boolean = false;

  niveauRole = 1;

  nomTitreManquant = false;
  dateInvalide = false;
  heureInvalide = false;

  portee = 1;

  constructor(
    private eventService: EventService,
    private router: Router,
    private commonService: CommonService,
  ) {
    this.eventService.getPredicateurs().subscribe(response => this.predicateurs = response);
  }



  ngOnInit(): void {
    const role = getUserRole();

    if(
      role.role_libelle_court === UserRole.Pasteur ||
      role.role_libelle_court === UserRole.PasteurReadOnly
    ){
      this.niveauRole = 2;
    }

    if(
      role.role_libelle_court === UserRole.ResponsableReseau ||
      role.role_libelle_court === UserRole.ResponsableReseauReadOnly
    ){
      this.niveauRole = 3;
    }

    if(
      role.role_libelle_court === UserRole.ResponsableGr ||
      role.role_libelle_court === UserRole.ResponsableGrReadOnly
    ){
      this.niveauRole = 4;
    }

  }

  changerPortee(portee){
    this.portee = portee;
  }

  get secondaryColor(): string {
    return ParameterService.configuration.secondaryColor;
  }

  back() {
    this.router.navigate([this.backRoute]);
  }

  sauvegarder() {

    this.event = {
      libelle: this.libelle.trim(),
      predicateur: this.predicateur.trim(),
      titre_message: this.titre_message.trim(),
      date_evenement: this.date_evenement.trim(),
      heure_evenement: this.heure_evenement.trim()
    } as Evenement;

    // Validation Nom - prenom
    let nomTitreValide = this.nomTitreValide();
    let dateValide = this.dateEstValide();
    let heureValide = this.heureEstValide();

    if (nomTitreValide && dateValide && heureValide) {

      this.eventService.saveEvent(this.event, this.portee).subscribe(
        enregistre => {
          if(enregistre){
            this.error = false;
            this.saved = true;
          } else {
            this.error = true;
            this.saved = true;
          }
        },
        error => this.error = true
      );
    } else {

    }


  }


  nomTitreValide(): boolean {
    let result = this.libelle.trim() === '' && this.titre_message.trim() === '';

    if (!result) {
      this.nomTitreManquant = false;
      return true;
    }
    // Afficher erreur
    this.nomTitreManquant = true;
    return false;
  }


  numeroValide() {
    return true;
  }

  get numeroManquant(): boolean {
    return false;
  }

  normaliserDateNaissance() {
    this.date_evenement =this.normaliserDate(this.date_evenement, this.old_date_evenement);
    this.old_date_evenement = this.date_evenement;
  }

  dateEstValide(): boolean {
    var date_regex = /^\d{2}\/\d{2}\/\d{4}$/;
    let response = false;

    this.date_evenement = this.date_evenement.trim();
    if (this.date_evenement !== '' &&  date_regex.test(this.date_evenement) && estDate(this.date_evenement)) {

      this.dateInvalide = false;
      response = true;
    } else {
      this.dateInvalide = true;
    }

    return response;
  }

  heureEstValide(): boolean {
    var heure_regex = /^\d{2}:\d{2}$/;
    let response = false;

    this.heure_evenement = this.heure_evenement.trim();

    if (this.heure_evenement !== '' &&  heure_regex.test(this.heure_evenement) && estHeure(this.heure_evenement)) {

      this.heureInvalide = false;
      response = true;
    } else {
      this.heureInvalide = true;
    }

    return response;
  }

  isNumero(numero: string): boolean {
    var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    if (!(date_regex.test(numero))) {
      return false;
    }
    return true;
  }

  normaliserDate(date: string, dateAncien: string) {
    if (dateAncien.length < date.length) {
      if (date.length === 2 || date.length === 5) {
        date = date + '/';
      }
    }
    return date;
  }

}
