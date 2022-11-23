import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private router: Router, private authService: AuthService) {


    // dummie user
    this.authService.user = {
      email: "john@abv.bg",
      password: "123123",
      __v: 1,
      _id: "123"
    };

    this.router.navigate(['home']);

  }

}
