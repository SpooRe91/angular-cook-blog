import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

import { getSession } from "../API/session";
import { AuthService } from './../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkIfAuth(state.url) || this.router.createUrlTree(["/"]);
  }

  checkIfAuth(url: string) {
    if (!getSession() && this.authService.isRedirected) {
      this.authService.hasError = "You need to login first!";
      return false;
    } else if (!getSession() && url === '/auth/logout') {
      this.authService.hasError = "You need to login first!";
      return false;
    } else if (getSession() && url === '/auth/logout') {
      this.authService.hasError = null;
      return true;
    } else if (!getSession() && !this.authService.isRedirected) {
      this.authService.hasError = null;
      return true;
    } else {
      this.authService.checkIfLogged("You are already logged in!");
      return false;
    }
  }
}
