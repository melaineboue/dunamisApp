import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { DataGrEdition } from 'src/app/models/data-gr-edition';
import { GR } from 'src/app/models/gr';
import { PersonneSuivi } from 'src/app/models/personneSuivi';
import { CommonService } from 'src/app/services/common.service';
import { GrService } from 'src/app/services/gr.service';
import { ParameterService } from 'src/app/services/parameter.service';

@Component({
  selector: 'app-creation-modification-gr',
  templateUrl: './creation-modification-gr.component.html',
  styleUrls: ['./creation-modification-gr.component.scss']
})
export class CreationModificationGrComponent {

  @Input() gr: GR = {} as GR;
  @Input() errorGrNomVide = false;
  @Input() personnes: PersonneSuivi[] = [];
  @Input() responsables: PersonneSuivi[] = [];
  @Output() dataGrChanged: EventEmitter<DataGrEdition> = new EventEmitter<DataGrEdition>();

  afficherResponsable = false;
  nomGrEstSaisi = false;


  constructor(
    private commonService: CommonService,
    private grService: GrService,
    private clipboardService: ClipboardService
    ) { }



  ajouterResponsable() {
    this.afficherResponsable = true;
  }

  saisirNomGr(){

    if(this.gr.libelle.trim() !== ''){
      this.nomGrEstSaisi = true;
    } else {
      this.nomGrEstSaisi = false;
    }
  }

  validerResponsable() {

    //
    this.responsables = this.personnes.filter(personne => personne.checked).map(personne => ({
      id: personne.id,
      nom: personne.nom,
      prenom: personne.prenom,
      checked: personne.checked,
      code: this.grService.generateAccessCode(10),
      copier: false
    } as PersonneSuivi));

    if(!this.nomGrEstSaisi){
      this.gr = {
        idreseau: 0,
        libelle: 'GR ' + this.responsables.map(personne => personne.prenom).join(' - '),
        responsables: this.responsables.map(personne => personne.prenom).join(' - '),
        taille: 0,
      } as GR;
    }

    this.dataGrChanged.emit({
      gr: this.gr,
      responsables: this.responsables
    });

    console.log('valider', this.gr);


  }

  masquerResponsable(){ this.afficherResponsable = false }

  genererCode(responsable: PersonneSuivi) {
    responsable.code = this.grService.generateAccessCode(10);
    responsable.copier = false;
  }

  copierCodeInClipboard(responsable: PersonneSuivi) {
    this.responsables.forEach(responsable => responsable.copier = false);
    this.clipboardService.copy(responsable.code);
    responsable.copier = true;
  }

  get secondaryColor(): string {
    return ParameterService.configuration.secondaryColor;
  }

}
