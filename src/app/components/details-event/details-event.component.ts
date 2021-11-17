import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { menuItemsClass } from 'src/app/models/const';
import { Evenement } from 'src/app/models/evenement';
import { GR } from 'src/app/models/gr';
import { Personne } from 'src/app/models/personne';
import { CommonService } from 'src/app/services/common.service';
import { EventService } from 'src/app/services/event.service';
import { GrService } from 'src/app/services/gr.service';
import { ParameterService } from 'src/app/services/parameter.service';

@Component({
  selector: 'app-details-event',
  templateUrl: './details-event.component.html',
  styleUrls: ['./details-event.component.scss']
})
export class DetailsEventComponent implements OnInit {

  idEvent: number = null;
  event: Evenement = { id: 0 };
  backRoute: string = `/${menuItemsClass.EVENT_LIST}`;

  personneAssistes: Personne[] = [];
  personneNonAssistes: Personne[] = [];
  personnesInvite: Personne[] = []
  grs: GR[] = [];

  recherchePresent = '';
  rechercheAbsent = '';
  rapport = '';

  constructor(
    private commonService: CommonService,
    private router: Router,
    private eventService: EventService,
    private grService: GrService
  ) {
    this.idEvent = this.commonService.getIdEvent();

    if (!this.idEvent) {
      this.router.navigate([this.backRoute]);
    } else {
      this.eventService.getEventById(this.idEvent).subscribe( event => this.event = event );
      this.eventService.getPersonnesAssiste(this.idEvent).subscribe( personnes => this.personneAssistes = personnes );
      this.eventService.getPersonnesNonAssiste(this.idEvent).subscribe( personnes => this.personneNonAssistes = personnes );
      this.eventService.getEventInvites(this.idEvent).subscribe(personnes => this.personnesInvite = personnes);
      this.grService.getList().subscribe(grs => this.grs = grs);
    }
  }

  ngOnInit(): void {
  }

  back() {
    console.log(this.rechercheAbsent);
    console.log(this.recherchePresent);

    this.commonService.setIdEvent(null);
    this.router.navigate([this.backRoute]);
  }

  genererRapport(){
    let texte = ''

    this.grs.forEach(gr=> {
      const personnesGr = this.personneAssistes.filter(personne => personne.gr.id === gr.id)
      const personnesInviteGr = this.personnesInvite.filter(personne => personne.gr.id === gr.id)
      texte += `*${gr.libelle} (${personnesGr.length})*\n`
      texte += personnesGr.map(personne => personne.prenom + ' '+ personne.nom +  ' ✅\n') ;

      if(personnesInviteGr.length > 0) {
        texte += `----Invités---- (${personnesInviteGr.length})\n`;
        texte += personnesInviteGr.map(personne => personne.prenom + ' '+ personne.nom + ' ✅\n') + '\n';
      }

      texte += '\n\n';
    });

    texte += 'Total: '+ (this.personneAssistes.length + this.personnesInvite.length)

    this.rapport = texte;
  }


  get secondaryColor(): string {
    return ParameterService.configuration.secondaryColor;
  }

  get personneAssistesRecherche(): { nom, prenom, gr}[]{

    const personnesGr = this.personneAssistes.map(personne => ({ nom: personne.nom, prenom: personne.prenom, gr: personne.gr}));
    const invitesGr = this.personnesInvite.map(personne => ({ nom: personne.nom, prenom: personne.prenom, gr: personne.gr}));
    const personnes = personnesGr.concat(invitesGr);

    return personnes.filter(personne => this.commonService.rechercher(
      this.recherchePresent,
      personne.nom, personne.prenom, personne.gr.libelle
    ));
  }

  get personneNonAssistesRecherche(): Personne[]{
    return this.personneNonAssistes.filter(personne => this.commonService.rechercher(
      this.rechercheAbsent,
      personne.nom, personne.prenom, personne.telephone, personne.status, personne.gr.libelle, personne.email, personne.date_naissance, personne.date_evangelisation, personne.date_ajout
    ));
  }

}
