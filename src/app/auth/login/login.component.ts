import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { faAt, faKey } from '@fortawesome/free-solid-svg-icons';

import { IUser } from './../../interfaces/user';
import { getSession } from 'src/app/API/session';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  faEmail = faAt;
  faPass = faKey;

  user: IUser | null = null;
  isLogged: boolean | null = null;

  constructor(
    public authService: AuthService,
  ) {
    this.authService.checkIfLogged();
  }

  handleOnSubmitForm(form: NgForm) {
    if (form.invalid) { return; };
    const value: { email: string, password: string } = form.value;
    console.log(value);
    this.authService.userLogin(value);
  }
}
