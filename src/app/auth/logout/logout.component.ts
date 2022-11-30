import { IUser } from './../../interfaces/user';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

  constructor(private router: Router, private authService: AuthService) {
    this.authService.user = null;
    this.authService.isLogged = false;
    this.router.navigate(['home']);
  }

}
