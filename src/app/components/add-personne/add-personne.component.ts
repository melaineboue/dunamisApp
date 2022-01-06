import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRole } from 'src/app/enums/user-role';
import { menuItemsClass } from 'src/app/models/const';
import { GR } from 'src/app/models/gr';
import { Personne } from 'src/app/models/personne';
import { StatusModel } from 'src/app/models/status';
import { CommonService } from 'src/app/services/common.service';
import { GrService } from 'src/app/services/gr.service';
import { ParameterService } from 'src/app/services/parameter.service';
import { PersonneService } from 'src/app/services/personne.service';
import { getGr, getGrForUser } from 'src/app/utils/utils';
import { titleCase } from 'title-case';


@Component({
  selector: 'app-add-personne',
  templateUrl: './add-personne.component.html',
  styleUrls: ['./add-personne.component.scss']
})
export class AddPersonneComponent implements OnInit {

  currentUserRole = UserRole.ResponsableGr;
  role_responsable_gr = UserRole.ResponsableGr;

  backRoute = menuItemsClass.ACCUEIL;
  personne: Personne;

  nom = '';
  prenom = '';
  numero = new FormControl('');
  email = new FormControl('');
  statusPersonne = new FormControl('2');
  gr = new FormControl('1');
  paysPersonne = '';
  ville = '';

  datenaissance = new FormControl('');
  dateEvangelisation = new FormControl('');
  oldDateNaissance = "";
  oldDateEvangelisation = "";

  listeStatus: StatusModel[] = [];
  grs: GR[] = [];

  villes: string[] = ['Rennes', 'Nantes'];
  pays: string[] = ['France'];

  error: boolean = false;
  saved: boolean = false;
  nomPrenomManquant = false;
  emailInvalide = false;
  dateEvangelisationInvalide = false;
  dateNaissanceInvalide = false;

  constructor(
    private personneService: PersonneService,
    private router: Router,
    private commonService: CommonService,
    private grService: GrService
  ) {
    this.personneService.getStatus().subscribe(status => {
      this.listeStatus = status;
      const statusSelected = this.listeStatus.filter(status => status.selected);
      const idSelected = statusSelected.length > 0 ? statusSelected[0].id : 1;
      this.statusPersonne.setValue(idSelected)
    });
    this.grService.getList().subscribe(grs => this.grs = grs);
    this.personneService.getPays().subscribe(pays => this.pays = pays);
    this.personneService.getVilles().subscribe(villes => this.villes = villes);
  }



  ngOnInit(): void {
  }

  get secondaryColor(): string {
    return ParameterService.configuration.secondaryColor;
  }

  back() {
    this.backRoute = this.commonService.getBackRoute(true);
    if(! this.backRoute){
      this.backRoute = menuItemsClass.ACCUEIL;
    }
    this.router.navigate([this.backRoute]);
  }

  sauvegarder() {

    const gr = ((this.currentUserRole === this.role_responsable_gr) ? getGrForUser() : { id: this.gr.value }) as GR;


    this.personne = {
      nom: this.nom,
      prenom: this.prenom,
      date_naissance: this.datenaissance.value,
      date_evangelisation: this.dateEvangelisation.value,
      date_ajout: "",
      telephone: this.numero.value,
      email: this.email.value,
      gr: gr,
      photo: "",
      status: this.statusPersonne.value,
      ville: this.ville,
      pays: this.paysPersonne
    } as Personne;

    // Validation Nom - prenom
    let nomPrenomValide = this.nomPrenomValide();
    let emailValide = this.emailValide(this.email.value);
    let dateValide = this.dateValide();

    if (nomPrenomValide && emailValide && dateValide) {

      console.log('this.personne', this.personne);


      this.personneService.ajouterPersonne(this.personne).subscribe(
        enregistre => {
          if(enregistre){

            this.error = false;
            this.saved = true;
          } else {
            this.error = true;
            this.saved = true;
          }
        },
        error => this.error = true
      );
    }


  }


  nomPrenomValide(): boolean {
    let result = this.nom || this.prenom;
    if (result) {
      this.nomPrenomManquant = false;
      return true;
    }
    // Afficher erreur
    this.nomPrenomManquant = true;
    return false;
  }

  emailValide(email: string): boolean {
    let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    let estEmail = regexp.test(email);
    if (!email || estEmail) {
      this.emailInvalide = false;
      return true;
    }

    this.emailInvalide = true;
  }

  numeroValide() {
    return true;
  }


  get numeroManquant(): boolean {
    return false;
  }

  normaliserDateNaissance() {
    this.datenaissance.setValue(this.normaliserDate(this.datenaissance.value, this.oldDateNaissance));
    this.oldDateNaissance = this.datenaissance.value;
  }

  dateValide(): boolean {
    var date_regex = /^\d{2}\/\d{2}\/\d{4}$/;
    let response = true;
    if (this.datenaissance.value.trim() !== '' && !(date_regex.test(this.datenaissance.value) && this.isDate(this.datenaissance.value))) {
      this.dateNaissanceInvalide = true;
      response = false;
    } else {
      this.dateNaissanceInvalide = false;
    }

    if (this.dateEvangelisation.value.trim() !== '' &&  !(date_regex.test(this.dateEvangelisation.value)) && this.isDate(this.dateEvangelisation.value) ) {
      this.dateEvangelisationInvalide = true;
      response = false;
    } else {
      this.dateEvangelisationInvalide = false;
    }



    return response;
  }

  isDate(date: string): boolean {
    const dates = date.split('/');
    let resultat = true;

    if(Number(dates[0]) <= 0 || Number(dates[0])> 31){
      resultat = false;
    }

    if(Number(dates[1]) <= 0 || Number(dates[1])> 12){
      resultat = false;
    }

    if(Number(dates[2]) <= 0 ){
      resultat = false;
    }
    return resultat;
  }

  isNumero(numero: string): boolean {
    var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    if (!(date_regex.test(numero))) {
      return false;
    }
    return true;
  }

  normaliserDate(date: string, dateAncien: string) {
    if (dateAncien.length < date.length) {
      if (date.length === 2 || date.length === 5) {
        date = date + '/';
      }
    }
    return date;
  }

  inTitleCase(text: string): string {
      return titleCase(text);
  }

  get grName(){
    return getGr();
  }
}
