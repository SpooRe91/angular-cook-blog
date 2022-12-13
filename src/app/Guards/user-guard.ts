import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

import { AuthService } from './../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
//TODO: MAKE THIS WORK FOR NON-LOGGED OR LOGGED USER!
export class UserGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkIfLogged() || this.router.createUrlTree(["/"]);
  }

  checkIfLogged(): boolean {
    if (!this.authService.isLogged) {
      this.authService.hasError = "You must login first!";
      return false;
    }
    return this.authService.isLogged;
  }
}

