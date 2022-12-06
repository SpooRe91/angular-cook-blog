import { Router } from '@angular/router';
import { Component } from '@angular/core';


import { AuthService } from './../../auth/auth.service';
import { GlobalLoaderService } from '../../shared/services/global-loader.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  path: string = "../../assets/logo.ico";
  alt: string = '#';

  constructor(
    public globalLoaderService: GlobalLoaderService,
    public authService: AuthService,
    private router: Router,
  ) { }

}
