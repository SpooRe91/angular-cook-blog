import { GlobalLoaderComponent } from './core/global-loader/global-loader.component';
import { AuthService } from './auth/auth.service';
import { Component } from '@angular/core';
import { getSession } from './API/session';
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
    globalLoaderService.showLoader("Loading");
    if (!getSession()) { return }
    this.globalLoaderService.hideLoader();
    return (
      this.authService.isLogged = true,
      this.authService.user = getSession()
    );
  }
}
