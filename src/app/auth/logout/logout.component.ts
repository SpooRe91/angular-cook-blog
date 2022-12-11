import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { AuthService } from './../auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

  constructor(private router: Router, public authService: AuthService) { }

  handleLogout() {
    this.authService.userLogout();
  }

}
