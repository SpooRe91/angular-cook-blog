import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
//TODO: MAKE THIS WORK FOR NON-LOGGED OR LOGGED USER!
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //TODO:MAKE IT REDIRECT TO AN ERROR PAGE!
    return this.checkIfLogged(state.url) || this.router.createUrlTree(["/home"]);
  }

  //THIS IS JUST AN EXAMPLE, TODO: ADEQUITE GUARD
  checkIfLogged(url: string): boolean {
    return false;
  }

}

