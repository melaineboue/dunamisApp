import { Component, OnInit } from '@angular/core';
import { GR } from 'src/app/models/gr';
import { GrService } from 'src/app/services/gr.service';
import { ReseauService } from 'src/app/services/reseau.service';
import { deuxChiffre } from 'src/app/utils/utils';

@Component({
  selector: 'app-gestion-rapport',
  templateUrl: './gestion-rapport.component.html',
  styleUrls: ['./gestion-rapport.component.scss']
})
export class GestionRapportComponent implements OnInit {

  rapport_one_soul_jesus = '';
  rapport_evangelisation = 'Evangelisation';
  rapport_suivi = '';

  texte_date_origine = '';
  date_origine = '';

  grs: GR[] = [];

  constructor(private grService: GrService, private reseauService: ReseauService) {
    var lastSundayDate = new Date();
    lastSundayDate.setDate(lastSundayDate.getDate() - lastSundayDate.getDay());
    this.texte_date_origine = `${deuxChiffre(lastSundayDate.getDate())}/${deuxChiffre(lastSundayDate.getMonth()+1)}/${lastSundayDate.getFullYear()} (exclu)`;
    this.date_origine = `${lastSundayDate.getFullYear()}-${lastSundayDate.getMonth()+1}-${lastSundayDate.getDate()}`;

   }

  ngOnInit(): void {
    this.grService.getList().subscribe(grs => {
      this.grs = grs;
      console.log(grs);

      // Rapport suivi
      grs.forEach(gr=>{

        this.grService.getSuiviByGr(gr.id).subscribe(suivis => {
          this.rapport_suivi += '*********************************************\n';
          this.rapport_suivi += `*${gr.libelle}*\n\n`;

          this.rapport_suivi += suivis.map(suivi => `${suivi.nom} (${suivi.date_suivi})\n${suivi.libelle}`).join('\n\n');
          this.rapport_suivi += (suivis.length > 0) ? '\n\n':'';
        });

        this.grService.getPersonneNouveau(gr.id, this.date_origine).subscribe(invites => {
          this.rapport_one_soul_jesus += '*********************************************\n';
          this.rapport_one_soul_jesus += `*${gr.libelle+gr.id} * (${invites.length})\n`;
          this.rapport_one_soul_jesus += invites.map(invite => `${invite.nom}`).join('\n');
          this.rapport_one_soul_jesus += "\n\n";
        })
      });

      // Rapport One soul for Jesus

    })

  }

  genererRapportEvangelisation(){
    // Pas pris en compte pour le moment
    this.grService.getSuiviByGr
  }

  genererRapportSuivi(){
    // Tous les GR
    // Toutes les personnes du reseau
    // Afficher les derniers suivi et leur date
  }

  genererRapportOneSoulJesus(){
    // les GR
    // Recuperer les ajoutés de la semaine
    // Recuperé les invité (GR ou Eglise)

  }

}
