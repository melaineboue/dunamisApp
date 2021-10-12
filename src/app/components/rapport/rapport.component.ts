import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.scss']
})
export class RapportComponent implements OnInit {

  @Output() generer : EventEmitter<void> = new EventEmitter();
  @Input() rapport = 'ok ✅ \npp';

  rapportMode = false;
  estCopie = false;

  constructor(private clipboardService: ClipboardService) { }

  ngOnInit(): void {
  }

  generate(){
    this.rapportMode = true;
    this.generer.emit();
  }

  copier(){
    this.clipboardService.copy(this.rapport);
    this.estCopie = true;
  }

}
