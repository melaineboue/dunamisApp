import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { DataReseauEdition } from 'src/app/models/data-reseau-edition';
import { Personne } from 'src/app/models/personne';
import { PersonneSuivi } from 'src/app/models/personneSuivi';
import { Reseau } from 'src/app/models/reseau';
import { CommonService } from 'src/app/services/common.service';
import { ParameterService } from 'src/app/services/parameter.service';
import { ReseauService } from 'src/app/services/reseau.service';
import { environment } from 'src/environments/environment';
import md5 from 'crypto-js/md5';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-creation-modification-reseau',
  templateUrl: './creation-modification-reseau.component.html',
  styleUrls: ['./creation-modification-reseau.component.scss']
})
export class CreationModificationReseauComponent implements OnChanges{

  @Input() reseau: Reseau = {} as Reseau;
  @Input() errorReseauNomVide = false;
  @Input() personnes: PersonneSuivi[] = [];
  @Input() responsables: PersonneSuivi[] = [];
  @Input() idResponsablesReseau: number[] = [];
  @Input() afficherResponsable = false;
  @Output() dataReseauChanged: EventEmitter<DataReseauEdition> = new EventEmitter<DataReseauEdition>();

  nomReseauEstSaisi = false;
  lienValidation = `${environment.host}?validation=`;
  nomManquant = false;

  recherche = "";

  constructor(
    private commonService: CommonService,
    private clipboardService: ClipboardService,
    private translate: TranslateService
    ) { }


  ngOnChanges(changes: SimpleChanges): void {
    console.log('ici', this.afficherResponsable);

  }

  getCodeResponsable(responsable: PersonneSuivi): string{
    return this.estDejaResponsable(responsable) ? this.translate.instant('common.est_deja_responsable'): responsable.code;
  }

  ajouterResponsable() {
    this.afficherResponsable = true;
  }

  estDejaResponsable(responsable: PersonneSuivi): boolean {
    return this.idResponsablesReseau.includes(responsable.id);
  }

  saisirNomReseau(){
    if(this.reseau.nom.trim() !== ''){
      this.nomReseauEstSaisi = true;
    } else {
      this.nomReseauEstSaisi = false;
    }

    this.dataReseauChanged.emit({
      reseau: this.reseau,
      responsables: this.responsables
    });
  }

  validerResponsable() {

    this.responsables = this.personnes.filter(personne => personne.checked).map(personne => ({
      id: personne.id,
      nom: personne.nom,
      prenom: personne.prenom,
      checked: personne.checked,
      code: this.commonService.generateAccessCode(10),
      copier: false
    } as PersonneSuivi));

    if(!this.nomReseauEstSaisi){
      this.reseau.responsables = this.responsables.filter(responsable => responsable.checked).map(responsable => ({
        id: responsable.id,
        nom: responsable.nom,
        prenom: responsable.prenom

      } as Personne))
    }

    this.dataReseauChanged.emit({
      reseau: this.reseau,
      responsables: this.responsables
    });

  }

  masquerResponsable(){ this.afficherResponsable = false }

  genererCode(responsable: PersonneSuivi) {
    responsable.code = this.commonService.generateAccessCode(10);
    responsable.copier = false;
  }

  copierCodeInClipboard(responsable: PersonneSuivi) {
    this.responsables.forEach(responsable => {
      responsable.copier = false;
      responsable.copier_lien = false;
    });
    this.clipboardService.copy(responsable.code);
    responsable.copier = true;
  }

  copierLinkInClipboard(responsable: PersonneSuivi) {
    this.responsables.forEach(responsable => {
      responsable.copier = false;
      responsable.copier_lien = false;
    });

    const link = `${this.lienValidation}${md5(responsable.code)}`;
    this.clipboardService.copy(link);
    responsable.copier_lien = true;
  }

  get personnesRecherches(): PersonneSuivi[]{
    return this.personnes.filter(personne => this.commonService.rechercher(this.recherche, personne.nom, personne.prenom));
  }

  get secondaryColor(): string {
    return ParameterService.configuration.secondaryColor;
  }

}
