import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { menuItemsClass } from 'src/app/models/const';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-deconnecter',
  templateUrl: './deconnecter.component.html',
  styleUrls: ['./deconnecter.component.css']
})
export class DeconnecterComponent {

  constructor(private router: Router, private loginService: LoginService) {
    this.loginService.destroyUserSession();
    this.router.navigate([`/${menuItemsClass.LOGIN}`])
  }

}
