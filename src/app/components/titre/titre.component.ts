import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-titre',
  templateUrl: './titre.component.html',
  styleUrls: ['./titre.component.scss']
})
export class TitreComponent {
  @Input() libelle: string = '';
  @Input() complement: string = '';
}
