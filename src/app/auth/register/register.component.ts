import { NgForm } from '@angular/forms';
import { IUser } from './../../interfaces/user';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  user: IUser | null = null;
  isLogged: boolean | null = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  handleOnSubmitForm(form: NgForm) {
    if (form.invalid) { return; }
    const value: { email: string, password: string, rePassword: string } = form.value;
    console.log(value);
    //TODO: provide an error somewhere in the form
    this.authService.userRegister(value);
  }

}
