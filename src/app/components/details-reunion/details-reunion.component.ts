import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { menuItemsClass } from 'src/app/models/const';
import { GR } from 'src/app/models/gr';
import { Invite } from 'src/app/models/invite';
import { Personne } from 'src/app/models/personne';
import { ReunionGr } from 'src/app/models/reunion-gr';
import { CommonService } from 'src/app/services/common.service';
import { GrService } from 'src/app/services/gr.service';
import { InviteService } from 'src/app/services/invite.service';
import { ParameterService } from 'src/app/services/parameter.service';
import { ReunionGrService } from 'src/app/services/reunion-gr.service';
import { getGr } from 'src/app/utils/utils';

@Component({
  selector: 'app-details-reunion',
  templateUrl: './details-reunion.component.html',
  styleUrls: ['./details-reunion.component.scss']
})
export class DetailsReunionComponent implements OnInit {

  idReunion: number = null;
  reunion: ReunionGr = { id: 0, gr_libelle:'', date:'' };
  backRoute: string = `/${menuItemsClass.REUNION_GR_LIST}`;

  personneAssistes: Personne[] = [];
  personneNonAssistes: Personne[] = [];
  personnesInvite: Invite[] = []
  grs: GR[] = [];

  recherchePresent = '';
  rechercheAbsent = '';
  rapport = '';

  constructor(
    private commonService: CommonService,
    private router: Router,
    private reunionGrService: ReunionGrService,
    private inviteService: InviteService,
    private grService: GrService
  ) {
    this.idReunion = this.commonService.getIdRenuion();
    console.log(this.idReunion);

    if (!this.idReunion) {
      this.router.navigate([this.backRoute]);
    } else {
      this.reunionGrService.getReunionById(this.idReunion).subscribe( reunion => this.reunion = reunion );
      this.reunionGrService.getPersonnesAssiste(this.idReunion).subscribe( personnes => this.personneAssistes = personnes );
      this.reunionGrService.getPersonnesNonAssiste(this.idReunion).subscribe( personnes => this.personneNonAssistes = personnes );
      this.inviteService.getInvitesFromReunion(this.idReunion).subscribe(invites => this.personnesInvite = invites);
      this.grService.getList().subscribe(grs => this.grs = grs);
    }
  }

  ngOnInit(): void {
  }

  back() {
    console.log(this.rechercheAbsent);
    console.log(this.recherchePresent);

    this.commonService.setIdEvent(null);
    this.router.navigate([this.backRoute]);
  }

  /*genererRapport(){
    let texte = ''

    this.grs.forEach(gr=> {
      const personnesGr = this.personneAssistes.filter(personne => personne.gr.id === gr.id)
      const personnesInviteGr = this.personnesInvite.filter(personne => personne.gr.id === gr.id)
      texte += `*${gr.libelle} (${personnesGr.length})*\n`
      texte += personnesGr.map(personne => personne.prenom + ' ✅\n') + '\n';

      if(personnesInviteGr.length > 0) {
        texte += `Invités (${personnesInviteGr.length})\n`;
        texte += personnesInviteGr.map(personne => personne.nom + ' ✅\n') + '\n';
      }

      texte += '\n';
    });

    texte += 'Total: '+ (this.personneAssistes.length + this.personnesInvite.length)

    this.rapport = texte;
  }*/



  get secondaryColor(): string {
    return ParameterService.configuration.secondaryColor;
  }

  get personneAssistesRecherche(): Personne[]{

    return this.personneAssistes.filter(personne => this.commonService.rechercher(
      this.recherchePresent,
      personne.nom, personne.prenom, personne.telephone, personne.status, personne.gr.libelle, personne.email, personne.date_naissance, personne.date_evangelisation, personne.date_ajout
    ));
  }

  get inviteAssisteRecherche(): Invite[]{
    return this.personnesInvite.filter(invite => invite.checked && this.commonService.rechercher(this.recherchePresent, invite.nom));
  }

  get inviteNonAssisteRecherche(): Invite[]{
    return this.personnesInvite.filter(invite => !invite.checked && this.commonService.rechercher(this.recherchePresent, invite.nom));
  }

  get inviteAssiste(): Invite[]{
    return this.personnesInvite.filter(invite => invite.checked);
  }

  get inviteNonAssiste(): Invite[]{
    return this.personnesInvite.filter(invite => !invite.checked);
  }

  get personneNonAssistesRecherche(): Personne[]{
    return this.personneNonAssistes.filter(personne => this.commonService.rechercher(
      this.rechercheAbsent,
      personne.nom, personne.prenom, personne.telephone, personne.status, personne.gr.libelle, personne.email, personne.date_naissance, personne.date_evangelisation, personne.date_ajout
    ));
  }

}
