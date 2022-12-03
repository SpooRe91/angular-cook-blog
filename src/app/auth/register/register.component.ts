import { NgForm } from '@angular/forms';
import { Component, OnDestroy } from '@angular/core';
import { faAt, faKey } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../auth.service';
import { getSession } from 'src/app/API/session';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {

  faEmail = faAt;
  faPass = faKey;

  constructor(
    public authService: AuthService
  ) {
    if (!getSession() && this.authService.isRedirected) {
      this.authService.hasError = "You need to login first!";
    } else if (!getSession() && !this.authService.isRedirected) {
      this.authService.hasError = null;
    } else {
      this.authService.checkIfLogged("You are already logged in!");
    }
  }

  handleOnSubmitForm(form: NgForm) {
    if (form.invalid) { return; }
    const value: { email: string, password: string, rePassword: string } = form.value;
    console.log(value);
    this.authService.userRegister(value);
  }

  ngOnDestroy(): void {
    if (this.authService.hasError && this.authService.isRedirected) {
      this.authService.hasError = null;
      this.authService.isRedirected = false;
    }
    return;
  }
}
