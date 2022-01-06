import { Component } from '@angular/core';
import { UserRole } from 'src/app/enums/user-role';
import { getUserRole } from 'src/app/utils/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  estResponsableReseau(): boolean{
    return getUserRole()?.role_libelle_court === UserRole.ResponsableReseau;
  }

  estResponsableGr(): boolean{
    return getUserRole()?.role_libelle_court === UserRole.ResponsableGr;
  }

  estResponsableAdministrateur(): boolean{
    return getUserRole()?.role_libelle_court === UserRole.Administrator;
  }

  estPasteur(): boolean{
    return getUserRole()?.role_libelle_court === UserRole.Pasteur;
  }

}
