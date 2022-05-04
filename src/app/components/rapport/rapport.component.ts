import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.scss']
})
export class RapportComponent{

  @Output() generer : EventEmitter<void> = new EventEmitter();
  @Output() textChanged : EventEmitter<string> = new EventEmitter();
  @Input() rapport = '';
  @Input() enabled = true;
  @Input() buttonLibelle = 'generer_rapport';
  @Input() readonly = false;

  rapportMode = false;
  estCopie = false;

  constructor(private clipboardService: ClipboardService) {
    this.rapportMode = (this.rapport.trim()==='') ? false : true;
  }

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

  texteAchange(){
    this.textChanged.emit(this.rapport);
  }

}
