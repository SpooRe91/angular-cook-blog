import { AuthService } from './../../auth/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  constructor(private authService: AuthService) { }

}
