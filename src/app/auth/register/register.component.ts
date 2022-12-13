import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { faAt, faKey } from '@fortawesome/free-solid-svg-icons';
import { Component, OnDestroy } from '@angular/core';

import { AuthService } from '../auth.service';
import { GlobalLoaderService } from 'src/app/shared/services/global-loader.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {

  faEmail = faAt;
  faPass = faKey;

  constructor(
    private title: Title,
    public authService: AuthService,
    public globalLoaderService: GlobalLoaderService
  ) {
    this.title.setTitle('Register');
  }

  handleOnSubmitForm(form: NgForm) {
    if (form.invalid) { this.authService.hasError = "Please fill out all fields!"; return; }
    const value: { email: string, password: string, rePassword: string } = form.value;
    console.log(value);
    this.authService.userRegister(value);
  }

  ngOnDestroy(): void {
    if (!this.authService.hasError) { return }
    this.authService.hasError = null;
    this.authService.isRedirected = false;
  }
}
