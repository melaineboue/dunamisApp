import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Invite } from 'src/app/models/invite';
import { participantEmitObject } from 'src/app/models/participant-emit-object';
import { Personne } from 'src/app/models/personne';
import { PersonneSuivi } from 'src/app/models/personneSuivi';
import { CommonService } from 'src/app/services/common.service';
import { InviteService } from 'src/app/services/invite.service';
import { getGr, getGrForUser } from 'src/app/utils/utils';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.scss']
})
export class ParticipantComponent implements OnInit {

  @Input() personnes: PersonneSuivi[] = [];
  @Input() invites: Invite[] = [];
  @Output() situationChange: EventEmitter<void> = new EventEmitter<void>();
  @Output() changerPresence: EventEmitter<participantEmitObject> = new EventEmitter<participantEmitObject>();


  definitionPresent = false;
  errorSavingInvite = false;
  nomInviteInvalide = false;
  toutCocher = false;
  ajoutInviteEnCours = false;


  recherche = '';
  nomInvite = '';



  constructor(private commonService: CommonService, private inviteService: InviteService) { }

  ngOnInit(): void {
  }

  definrPresent() {
    this.definitionPresent = true;
  }


  ajouterInvite(){
    this.ajoutInviteEnCours = true;
  }

  annulerInviter(){
    this.nomInvite = '';
    this.ajoutInviteEnCours = false;
  }

  enregistrerInvite(){
    if(this.nomInvite.trim() !== ''){
      this.inviteService.saveInviteReunion(this.nomInvite.trim()).subscribe(id=>{
        if(id){
          this.situationChange.emit();
          this.errorSavingInvite = false;
          const invite = {nom: this.nomInvite.trim(), checked: true, id: id, gr: getGrForUser() };

          this.invites.push(invite);
          this.nomInvite = '';
          this.changerPresence.emit({personnes: this.personnes, invites: this.invites} as participantEmitObject)
        } else {
          this.errorSavingInvite = true;
        }
      },
      error => this.errorSavingInvite = true );

    } else {
      this.nomInviteInvalide = true;
    }
  }


  cocherTout() {
    this.personnes.map(personne => personne.checked = this.toutCocher);
    this.invites.map(invite => invite.checked = this.toutCocher);
    this.changerPresence.emit({personnes: this.personnes, invites: this.invites} as participantEmitObject)
  }

  normaliserToutCocher(){
    this.changerPresence.emit({personnes: this.personnes, invites: this.invites} as participantEmitObject)

    if(
      this.personnes.length === this.personnes.filter(personne => personne.checked).length &&
      this.invites.length === this.invites.filter(invite => invite.checked).length
    ){
      this.toutCocher = true;
    } else {
      this.toutCocher = false;
    }
  }



  get personnesRecherchees(): PersonneSuivi[] {
    return this.personnes.filter(personne => this.commonService.rechercher(this.recherche, personne.nom, personne.prenom) || this.commonService.rechercher(this.recherche, personne.prenom, personne.nom));
  }

  get invitesRecherchees(): Invite[] {
    return this.invites.filter(invite => this.commonService.rechercher(this.recherche, invite.nom));
  }


}
