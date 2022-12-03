import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { faAt, faKey } from '@fortawesome/free-solid-svg-icons';

import { IUser } from './../../interfaces/user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  faEmail = faAt;
  faPass = faKey;

  user: IUser | null = null;
  isLogged: boolean | null = null;

  constructor(
    public authService: AuthService
  ) {
    this.authService.checkIfLogged();
  }

  handleOnSubmitForm(form: NgForm) {
    if (form.invalid) { return; }
    const value: { email: string, password: string, rePassword: string } = form.value;
    console.log(value);
    this.authService.userRegister(value);
  }
}
