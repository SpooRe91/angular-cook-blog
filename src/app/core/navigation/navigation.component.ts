import { AuthService } from './../../auth/auth.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { GlobalLoaderService } from './../services/global-loader.service';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  path: string = "../../assets/logo.ico";
  alt: string = '#';

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  get user() {
    return this.authService.user;
  }


  constructor(
    public globalLoaderService: GlobalLoaderService,
    private router: Router,
    private authService: AuthService
  ) { }


}
