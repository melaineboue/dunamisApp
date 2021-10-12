import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { menuItemsClass } from 'src/app/models/const';
import { Evenement } from 'src/app/models/evenement';
import { CommonService } from 'src/app/services/common.service';
import { EventService } from 'src/app/services/event.service';
import { ParameterService } from 'src/app/services/parameter.service';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.scss']
})
export class ListEventsComponent implements OnInit {

  events: Evenement[];
  recherche = new FormControl('');
  hover = false;

  routeAddEvent = `/${menuItemsClass.ADD_EVENT}`;
  routeDetailsEvent = `/${menuItemsClass.DETAILS_EVENT}`;
  routeHere = `/${menuItemsClass.EVENT_LIST}`;

  constructor(private eventService: EventService, private commonService: CommonService, private router: Router) {
    console.log('construct');

    commonService.setBackRoute(menuItemsClass.EVENT_LIST);
  }

  ngOnInit(): void {
    console.log('ngInit');
    this.eventService.getEvents().subscribe(response => this.events = response);
  }

  ajouterPersonneOver() {
    this.hover = true;
  }

  ajouterPersonneBlur() {
    this.hover = false;
  }

  details(idEvent: number) {
    this.commonService.setIdEvent(idEvent);
    this.commonService.setBackRoute(this.routeHere);
    this.router.navigate([this.routeDetailsEvent]);
  }



  /**************************** GET************************************** */

  get backgroundButtonAdd(): string {
    return this.hover ? ParameterService.configuration.secondaryColor : ParameterService.configuration.primaryColor;
  }

  get secondaryColor(): string {
    return ParameterService.configuration.secondaryColor;
  }

  get eventsRecherches(): Evenement[] {
    return this.events.filter(event => this.commonService.rechercher(
      this.recherche.value,
      event.libelle, event.predicateur, event.titre_message, event.date_evenement
    ));
  }
}
