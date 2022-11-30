import { IUser } from './../../interfaces/user';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { AuthService } from './../../auth/auth.service';
import { GlobalLoaderService } from './../services/global-loader.service';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  path: string = "../../assets/logo.ico";
  alt: string = '#';

  get isLogged(): boolean | null {
    return this.authService.isLogged;
  }

  get getUser() {
    return this.authService.user;
  }

  constructor(
    public globalLoaderService: GlobalLoaderService,
    private authService: AuthService,
    private router: Router,
  ) { }

}
