import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { faAt, faKey } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../auth.service';
import { GlobalLoaderService } from '../../shared/services/global-loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  faEmail = faAt;
  faPass = faKey;

  constructor(
    private title: Title,
    public authService: AuthService,
    public globalLoaderService: GlobalLoaderService,
  ) {
    this.title.setTitle('Login');
  }

  handleOnSubmitForm(form: NgForm) {
    if (form.invalid) { this.authService.hasError = "Please fill out all fields!"; return };
    this.authService.hasError = null;
    const value: { email: string, password: string } = form.value;
    this.authService.userLogin(value);
  }

  ngOnDestroy(): void {
    if (this.authService.hasError && this.authService.isRedirected) {
      this.authService.hasError = null;
      this.authService.isRedirected = false;
    }
    return;
  }
}
