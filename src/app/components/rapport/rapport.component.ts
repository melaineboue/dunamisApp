import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.scss']
})
export class RapportComponent{

  @Output() generer : EventEmitter<void> = new EventEmitter();
  @Input() rapport = '';
  @Input() buttonLibelle = 'generer_rapport';
  @Input() readonly = false;

  rapportMode = false;
  estCopie = false;

  constructor(private clipboardService: ClipboardService) { }

  generate(){
    this.rapportMode = true;
    this.generer.emit();
  }

  copier(){
    this.clipboardService.copy(this.rapport);
    this.estCopie = true;
  }

  masquer(){
    this.rapportMode = false;
  }

}
