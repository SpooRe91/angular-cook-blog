import { API_URL } from './../../API/endpoints';
import { IUser, IUserLogin } from './../../interfaces/user';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  email: string = '';
  password: string = '';
  user: IUser | null = null;
  isLogged: boolean | null = null;

  constructor(
    private router: Router,
    private authService: AuthService) {
  }

  handleOnSubmitForm(value: { email: string, password: string }) {
    return this.authService.userLogin(value);
  }
}
