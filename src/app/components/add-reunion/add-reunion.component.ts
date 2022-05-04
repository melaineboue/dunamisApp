import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { defaultRedirectNotAuth, menuItemsClass } from 'src/app/models/const';
import { ParameterService } from 'src/app/services/parameter.service';
import { ReunionGr } from 'src/app/models/reunion-gr';
import { ReunionGrService } from 'src/app/services/reunion-gr.service';
import { CommonService } from 'src/app/services/common.service';
import { PersonneSuivi } from 'src/app/models/personneSuivi';
import { deuxChiffre } from 'src/app/utils/utils';
import { GR } from 'src/app/models/gr';
import { GrService } from 'src/app/services/gr.service';
import { ThemeService } from 'src/app/services/theme.service';
import { Personne } from 'src/app/models/personne';
import { getGr, getIdReseau } from 'src/app/utils/utils';
import { ReseauService } from 'src/app/services/reseau.service';
import { Invite } from 'src/app/models/invite';
import { InviteService } from 'src/app/services/invite.service';
import { participantEmitObject } from 'src/app/models/participant-emit-object';

@Component({
  selector: 'app-add-reunion',
  templateUrl: './add-reunion.component.html',
  styleUrls: ['./add-reunion.component.scss']
})
export class AddReunionComponent implements OnInit {

  error = false;
  saved = false;
  validated = false;

  rapport = "";

  semaine: number = 0;

  date_invalide = false;
  heure_debut_invalide = false;
  minute_debut_invalide = false;
  heure_fin_invalide = false;
  minute_fin_invalide = false;
  heure_fin_superieur = false;

  heure_debut = '';
  minute_debut = ''
  heure_fin = '';
  minute_fin = ''
  laDate = '';
  nomInvite = '';

  gr: GR;

  personnesGr: PersonneSuivi[] = [];
  personneGrIds: number[] = [];
  invites: Invite[] = [];

  responsableReseau: Personne[] = [];

  reunion: ReunionGr = {
    id: 0,
    annonce: '',
    semaine: '',
    titre: '',
    enregistre: false,


  } as ReunionGr;


  constructor(
    private router: Router,
    private reunionService: ReunionGrService,
    private commonService: CommonService,
    private grService: GrService,
    private themeService: ThemeService,
    private reseauService: ReseauService,
    private inviteService: InviteService
  ) {
    const idGr = localStorage.getItem('idGr');
    if (!idGr) {
      this.router.navigate([`${defaultRedirectNotAuth}`]);
    }

    this.reseauService.getResponsable(getIdReseau()).subscribe(responsables => this.responsableReseau = responsables);

    //Recuperation du Gr en cours
    this.reunionService.getReunionEnCours(Number(idGr)).subscribe(reunion =>{
      if(reunion){
          // Il y a une reunion en cours
         this.rapport = reunion.rapport;
         this.reunion = reunion;
         this.reunion.enregistre = true;
         this.reunion.semaine = reunion.semaine;
         const heures_debut = reunion.heure_debut.split(':');
         const heures_fin = reunion.heure_fin.split(':');
         this.heure_debut = heures_debut[0];
         this.minute_debut = heures_debut[1];
         this.heure_fin = heures_fin[0];
         this.minute_fin = heures_fin[1];

         this.inviteService.getInvitesFromReunion(reunion.id).subscribe(invites => this.invites = invites);
         this.reunionService.getPersonnesAssiste(reunion.id).subscribe(personnes => {
           this.personneGrIds = personnes.map(personne => personne.id);

           //On recupère la liste des personnes du Gr après avoir récupéré ceux qui assisté au Gr  en cours d'enregistrement
           this.grService.getPersonnesGR(Number(idGr)).subscribe(personnes => this.personnesGr = personnes.map(personne => ({
            id: personne.id,
            nom: personne.nom,
            prenom: personne.prenom,
            checked: this.personneGrIds.includes(personne.id)
          }) as PersonneSuivi));

         });

         this.laDate = reunion.date;
      } else {
        this.reunion.complement_rapport = `Notre GR a porté sur ${this.reunion.titre}`;
        this.grService.getPersonnesGR(Number(idGr)).subscribe(personnes => this.personnesGr = personnes.map(personne => ({
          id: personne.id,
          nom: personne.nom,
          prenom: personne.prenom,
          checked: false
        }) as PersonneSuivi));

        const laDate = new Date();
        this.laDate = `${deuxChiffre(laDate.getDate())}/${deuxChiffre(laDate.getMonth()+1)}/${laDate.getFullYear()}`;
      }
    })

    this.reunion.gr_id = Number(localStorage.getItem('idGr'));
    this.reunion.gr_libelle = localStorage.getItem('gr');




    this.reunion.date = this.laDate;

  }



  ngOnInit(): void {
    this.getWeek(0)
  }

  changerPresence(participants: participantEmitObject){
    this.invites = participants.invites;
    this.personnesGr = participants.personnes;
    this.genererRapport();
    console.log('change');

  }

  back() {
    this.router.navigate([`/${menuItemsClass.ACCUEIL}`])
  }

  enregistrer() {

    const heure_debut = Number(this.heure_debut);
    const heure_fin = Number(this.heure_fin);
    const minute_debut = Number(this.minute_debut);
    const minute_fin = Number(this.minute_fin);

    if (
      this.estChiffre(heure_debut) &&
      this.estChiffre(heure_fin) &&
      this.estChiffre(minute_debut) &&
      this.estChiffre(minute_fin) &&
      this.heureEstValide(heure_debut) &&
      this.heureEstValide(heure_fin) &&
      this.minuteEstValide(minute_debut) &&
      this.minuteEstValide(minute_fin) &&
      this.estInferieur(minute_debut, heure_debut, minute_fin, heure_fin)
    ) {

      this.reunion.date = this.laDate;
      this.reunion.heure_debut = `${deuxChiffre(heure_debut)}:${deuxChiffre(minute_debut)}`;
      this.reunion.heure_fin = `${deuxChiffre(heure_fin)}:${deuxChiffre(minute_fin)}`;;
      this.reunion.date = this.laDate;

      this.genererRapport();

      this.reunion.rapport = this.rapport;

      // Si pas d'heure ou de date incorrecte
      const ids = this.personnesGr.filter(personne => personne.checked).map(personne => personne.id);
      const idsInvitePresent = this.invites.filter(invite => invite.checked).map(invite => invite.id);
      const idsInvite = this.invites.map(invite => invite.id);

      this.reunionService.save(ids, idsInvite, idsInvitePresent, this.reunion).subscribe(idReunion => {
        if(idReunion){
          this.reunion.id = idReunion
          this.reunion.enregistre = true;
          this.error = false;
          this.validated = false;
          this.saved = true;

          this.resetError();
        } else {
          this.error = true;
          this.saved = true;
          this.validated = false;
        }


      },
      error => {
          this.error = true;
          this.saved = true;
          this.validated = false;
        });

    }
    else {
      this.resetError();

      if(!this.estInferieur(minute_debut, heure_debut, minute_fin, heure_fin)){
        this.heure_fin_superieur = true;
      }

      if (!this.estChiffre(heure_debut) || !this.heureEstValide(heure_debut)) {
        this.heure_debut_invalide = true;
      }

      if (!this.estChiffre(heure_fin) || !this.heureEstValide(heure_fin)) {
        this.heure_fin_invalide = true;
      }

      if (!this.estChiffre(minute_debut) || !this.minuteEstValide(minute_debut)) {
        this.minute_debut_invalide = true;
      }

      if (!this.estChiffre(minute_fin) || !this.minuteEstValide(minute_fin)) {
        this.minute_fin_invalide = true;
      }

    }

  }

  setRapport(rapport: string){
    this.rapport = rapport;
  }

  resetError() {
    this.heure_debut_invalide = false;
    this.heure_fin_invalide = false;
    this.minute_debut_invalide = false;
    this.minute_fin_invalide = false;
    this.heure_fin_superieur = false;
  }

  valider() {
    this.reunionService.validerReunion(this.reunion.id).subscribe((data) => {
      this.reunion.valide = true;
      this.error = false;
      this.validated = true;
      this.saved = false;
    },
      error => {
        this.error = true;
        this.validated = true;
        this.saved = false;
      });
  }

  genererRapport() {

      let heure_debut = (this.reunion?.heure_debut) ? this.reunion.heure_debut : `${this.heure_debut}:${this.minute_debut}`;
      let heure_fin = (this.reunion?.heure_fin) ? this.reunion.heure_fin : `${this.heure_fin}:${this.minute_fin}`;
      let date_gr = (this.reunion?.date) ? this.reunion.date : this.laDate;

      this.rapport = `Bonsoir mes Pasteurs, mes CE, ma Respo et les 12 \nMerci à l'Apôtre, au pasteur Elvis et à ${this.notreRespo}\n\n`;
      this.rapport += `Le Rapport du Gr DUNAMIS \nRespo du réseau : Respo ${this.respos} \nRespo du Gr : ${getGr()}\n`;
      this.rapport += `${date_gr}  \n ${heure_debut.replace(':','h')} - ${heure_fin.replace(':','h')}\n\n`;

      const presents = this.personnesGr.filter(personne => personne.checked);
      const absents = this.personnesGr.filter(personne => !personne.checked);
      const invites = this.invites.filter(invite => invite.checked);
      const invitesAbsent = this.invites.filter(invite => !invite.checked);
      const textPresents = presents.map(personne=> `- `+personne.prenom).join('\n');

      let rapportSuite = "";
      rapportSuite += `Liste des présents (${ presents.length + invites.length })\n${textPresents}\n`;

      rapportSuite += invites.length > 0 ? `Invités (${ invites.length })\n${invites.map(invite => '- '+ invite.nom ).join('\n')}\n`: '';
      rapportSuite += `\nAbsents (${ absents.length + invitesAbsent.length })\n${absents.map(personne=> `- `+personne.prenom).join('\n')}`;
      rapportSuite += invitesAbsent.length > 0 ? `\n${invitesAbsent.map(invite => '- '+ invite.nom + ' (invité)').join('\n')}\n`: '';
      rapportSuite += `\n\n${this.reunion.complement_rapport}`;

      this.rapport += rapportSuite;

  }


  getWeek(week?: number) {
    // 0 : cette semaine; 1: semaine prochaine; -1 semaine précedente
    var currentdate = new Date();
    var year = currentdate.getFullYear();
    var oneJan = new Date(currentdate.getFullYear(), 0, 1);
    let semaine;

    if(!week){
      let semaine = Math.floor((currentdate.getTime() - oneJan.getTime()) / 1000 / 60 / 60 / 24 / 7) + 1;
      this.reunion.semaine = `${semaine}`;
    } else {

      semaine = this.reunion.semaine
    }

    semaine += week;
    if (semaine <= 0) {
      semaine = 53
      year--
    }
    else if (semaine > 53) {
      semaine = 1
      year++
    }

    this.themeService.getThemeBySemaine(Number(this.reunion.semaine), year).subscribe(theme => {
      if (theme) {
        this.reunion.annonce = theme.annonce;
        this.reunion.titre = theme.titre;
      }
    })
  }



  heureEstValide(heure: number): boolean {
    return heure >= 0 && heure < 24;
  }

  minuteEstValide(minute: number): boolean {
    return minute >= 0 && minute < 60;
  }

  estInferieur(minute_debut, heure_debut, minute_fin, heure_fin): boolean {
    return (heure_fin === 0 && minute_fin === 0) || (heure_debut == heure_fin && minute_debut < minute_fin) || heure_debut < heure_fin;
  }

  estChiffre(nombre: number): boolean {
    return Number(nombre) != NaN  ? true : false;
  }


  get secondaryColor(): string {
    return ParameterService.configuration.secondaryColor;
  }

  get respos(): string {
    return this.responsableReseau.map(respo => respo.prenom).join(',')
  }

  get notreRespo(): string {
    return (this.responsableReseau.length > 1 ? 'Nos Respos ': 'Notre Respo ')+this.responsableReseau.map(respo => respo.prenom).join(',');
  }

}
