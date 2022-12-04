import { AuthService } from './../../auth/auth.service';
import { Router } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnDestroy {

  constructor(
    private router: Router,
    public authService: AuthService,
  ) { }

  ngOnDestroy(): void {
    this.authService.hasError = null;
  }
}
