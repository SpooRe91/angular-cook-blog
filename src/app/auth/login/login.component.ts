import { API_URL } from './../../API/endpoints';
import { IUser, IUserAuth } from './../../interfaces/user';
import { Router } from '@angular/router';
import { Component, ViewChild } from '@angular/core';

import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  // @ViewChild('loginForm') loginForm!: NgForm;

  user: IUser | null = null;
  isLogged: boolean | null = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  handleOnSubmitForm(form: NgForm) {
    if (form.invalid) { return; }
    const value: { email: string, password: string } = form.value;
    console.log(value);
    //TODO: provide an error somewhere in the form
    this.authService.userLogin(value);
  }
}
