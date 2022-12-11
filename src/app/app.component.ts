import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

import { getSession } from './API/session';
import { AuthService } from './auth/auth.service';
import { GlobalLoaderService } from './shared/services/global-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = '';

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private globalLoaderService: GlobalLoaderService
  ) {
    this.globalLoaderService.showLoader("Loading");
    if (!getSession()) { return }
    this.authService.isLogged = true;
    this.authService.user = getSession();
    this.globalLoaderService.hideLoader();
  }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }

}
