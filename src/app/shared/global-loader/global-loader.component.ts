import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';

import { GlobalLoaderService } from '../services/global-loader.service';

@Component({
  selector: 'app-global-loader',
  templateUrl: './global-loader.component.html',
  styleUrls: ['./global-loader.component.scss']
})
export class GlobalLoaderComponent implements OnInit {

  interval: string = '';
  constructor(
    public globalLoaderService: GlobalLoaderService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    const interval = setInterval(() => {
      this.interval += '.';
      if (this.interval > '...') { this.interval = '' }
    }, 700);
    if (!this.authService.hasError) { clearInterval(interval) }
  }
}
