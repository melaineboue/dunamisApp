import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Invite } from 'src/app/models/invite';
import { Personne } from 'src/app/models/personne';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.scss']
})
export class ParticipantComponent implements OnInit {

  @Input() personnes: Personne[];
  @Input() invite: Invite[];

  definitionPresent = false;


  @Output() personneChange: EventEmitter<Personne> = new EventEmitter<Personne>();
  @Output() inviteChange: EventEmitter<Invite> = new EventEmitter<Invite>();
  constructor() { }

  ngOnInit(): void {
  }

}
