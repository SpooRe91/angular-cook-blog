import { Component } from '@angular/core';

import { getSession } from './API/session';
import { AuthService } from './auth/auth.service';
import { GlobalLoaderService } from './core/services/global-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-cook-blog';

  constructor(
    private authService: AuthService,
    private globalLoaderService: GlobalLoaderService
  ) {
    this.globalLoaderService.showLoader("Loading");
    if (!getSession()) { return }
    this.authService.isLogged = true;
    this.authService.user = getSession();
    this.globalLoaderService.hideLoader();
  }
}
