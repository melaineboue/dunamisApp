import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { menuItemsClass } from 'src/app/models/const';
import { Evenement } from 'src/app/models/evenement';
import { GR } from 'src/app/models/gr';
import { Invite } from 'src/app/models/invite';
import { participantEmitObject } from 'src/app/models/participant-emit-object';
import { Personne } from 'src/app/models/personne';
import { PersonneSuivi } from 'src/app/models/personneSuivi';
import { CommonService } from 'src/app/services/common.service';
import { EventService } from 'src/app/services/event.service';
import { GrService } from 'src/app/services/gr.service';
import { ParameterService } from 'src/app/services/parameter.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-details-event',
  templateUrl: './details-event.component.html',
  styleUrls: ['./details-event.component.scss']
})
export class DetailsEventComponent implements OnInit {

  idEvent: number = null;
  event: Evenement = { id: 0 };
  backRoute: string = `/${menuItemsClass.EVENT_LIST}`;

  error = false;
  saved = false;
  validated = false;

  personneAssistes: Personne[] = [];
  personneNonAssistes: Personne[] = [];
  personnesInvite: Invite[] = [];
  personneGr: PersonneSuivi[] = []; // Pour les participations
  grs: GR[] = [];

  recherchePresent = '';
  rechercheAbsent = '';
  rapport = '';

  constructor(
    private commonService: CommonService,
    private router: Router,
    private eventService: EventService,
    private grService: GrService,
    private http: HttpClient
  ) {
    this.idEvent = this.commonService.getIdEvent();

    if (!this.idEvent) {
      this.router.navigate([this.backRoute]);
    } else {
      this.eventService.getEventById(this.idEvent).subscribe( event => this.event = event );
      this.eventService.getPersonnesAssiste(this.idEvent).subscribe( personnes => this.personneAssistes = personnes );
      this.eventService.getPersonnesNonAssiste(this.idEvent).subscribe( personnes => this.personneNonAssistes = personnes );
      this.eventService.getEventInvites(this.idEvent).subscribe(invites => this.personnesInvite = invites);
      this.eventService.getPersonneGrUser(this.idEvent).subscribe(personnes => this.personneGr = personnes);
      this.grService.getList().subscribe(grs => this.grs = grs);

    }
  }

  ngOnInit(): void {
  }

  back() {
    this.commonService.setIdEvent(null);
    this.router.navigate([this.backRoute]);
  }

  genererRapport(){
    let texte = ''

    this.grs.forEach(gr=> {
      const personnesGr = this.personneAssistes.filter(personne => personne.gr.id === gr.id)
      const personnesInviteGr = this.personnesInvite.filter(personne => personne.gr.id === gr.id)
      texte += `*${gr.libelle} (${personnesGr.length + personnesInviteGr.length})*\n`
      texte += personnesGr.map(personne => personne.prenom + ' '+ personne.nom +  ' ✅\n') ;

      if(personnesInviteGr.length > 0) {
        texte += `----Invités---- (${personnesInviteGr.length})\n`;
        texte += personnesInviteGr.map(invite => invite.nom + ' ✅\n') + '\n';
      }

      texte += '\n\n';
    });

    texte += 'Total: '+ (this.personneAssistes.length + this.personnesInvite.length)

    this.rapport = texte;
  }

  enregistrerParticipant(){
      const idsParticipant = this.personneGr.filter(personne => personne.checked).map(personne => personne.id);
      const idsInvite = this.personnesInvite.map(personne => personne.id);
      const idsInvitePresent = this.personnesInvite.filter(personne => personne.checked).map(personne => personne.id);

      this.eventService.enregistrerParticipant(idsParticipant,idsInvite,idsInvitePresent,this.event).subscribe(idEvent => {
        if(idEvent){
          this.eventService.getPersonnesAssiste(this.idEvent).subscribe( personnes => this.personneAssistes = personnes );
          this.eventService.getPersonnesNonAssiste(this.idEvent).subscribe( personnes => this.personneNonAssistes = personnes );

          this.saved = true;
        } else {
          this.saved = true;
          this.error = true;
        }
      },
      error => {
        this.saved = true;
        this.error = true;
      });
  }

  changerPresence(participantObject: participantEmitObject){
    this.personneGr = participantObject.personnes;
    this.personnesInvite = participantObject.invites;
  }


  get secondaryColor(): string {
    return ParameterService.configuration.secondaryColor;
  }

  get personneAssistesRecherche(): Personne[]{
    return this.personneAssistes.filter(personne => this.commonService.rechercher(
      this.recherchePresent,
      personne.nom, personne.prenom, personne.gr.libelle
    ));
  }

  get personnesInviteRecherche(): Invite[]{
    return this.personnesInvite.filter(personne => personne.checked).filter(personne => this.commonService.rechercher(
      this.recherchePresent,
      personne.nom, personne.gr.libelle
    ));
  }



  get personneNonAssistesRecherche(): Personne[]{
    return this.personneNonAssistes.filter(personne => this.commonService.rechercher(
      this.rechercheAbsent,
      personne.nom, personne.prenom, personne.telephone, personne.status, personne.gr.libelle, personne.email, personne.date_naissance, personne.date_evangelisation, personne.date_ajout
    ));
  }

  get personnesInviteAbsentRecherche(): Invite[]{
    return this.personnesInvite.filter(personne => !personne.checked).filter(personne => this.commonService.rechercher(
      this.recherchePresent,
      personne.nom, personne.gr.libelle
    ));
  }

  get toutPersonneInvite(): Invite[] {
    return this.personnesInvite.filter(personne => personne.checked);
  }

  get toutPersonneInviteAbsent(): Invite[] {
    return this.personnesInvite.filter(personne => !personne.checked);
  }


}
