import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { menuItemsClass } from 'src/app/models/const';

@Component({
  selector: 'app-deconnecter',
  templateUrl: './deconnecter.component.html',
  styleUrls: ['./deconnecter.component.css']
})
export class DeconnecterComponent {

  constructor(private router: Router) {
    localStorage.removeItem('user');
    localStorage.removeItem('idUser');
    localStorage.removeItem('idGr');
    localStorage.removeItem('idReseau');
    this.router.navigate([`/${menuItemsClass.LOGIN}`])
  }

}
