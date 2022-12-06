import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IUser, IUserAuth } from './../interfaces/user';
import { API_URL, endpoints } from '../API/endpoints';
import { GlobalLoaderService } from '../shared/services/global-loader.service';
import { setSession, getSession, logoutSession } from '../API/session';
import { headers } from '../constants/requestHeaders';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user!: IUser | null;
  isLogged: boolean = false;
  hasError: null | string = null;
  isRedirected: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private globalLoaderService: GlobalLoaderService,
  ) { }

  handleClearError() {
    return this.hasError = null;
  }

  checkIfLogged(message?: string | null) {
    this.globalLoaderService.showLoader("Loading", true);
    if (getSession()) {
      this.hasError = message || "";
      this.router.navigate(['home']);
      return;
    };
    this.globalLoaderService.hideLoader(false);
    this.hasError = message || "";
    this.router.navigate(['auth/login']);
    this.isRedirected = true;
    return;
  }

  setLoginInfo(user: IUser | null, status: boolean) {
    return (
      this.user = user,
      this.isLogged = status
    );
  }

  userLogin(loginData: IUserAuth) {
    this.globalLoaderService.showLoader("Loading", true);
    return this.http.post<IUserAuth>(API_URL + endpoints.API_LOGIN, loginData, headers).subscribe({
      next: (user) => {
        if (!user.email) { return };
        console.log('logged in as - ', user);

        setSession(user);
        this.setLoginInfo(user, true);
        this.router.navigate(['home']);
        this.globalLoaderService.hideLoader(false);
      },
      error: (err) => {
        if (!err.ok) {
          console.error(err.message);
          this.globalLoaderService.hideLoader(false);
          return this.hasError = 'There is no connection to the server right now!';
        }
        console.error(err.error.message);
        this.globalLoaderService.hideLoader(false);
        return this.hasError = err.error.messsage;
      }
    })
  }

  userRegister(registerData: IUserAuth) {
    this.globalLoaderService.showLoader('Loading', true);
    return this.http.post<IUserAuth>(API_URL + endpoints.API_REGISTER, registerData, headers).subscribe({
      next: (res) => {
        if (!res.email) { return };
        console.log('registered successfully:', res);

        this.setLoginInfo(res, true);
        this.router.navigate(['home']);
        return this.user;
      },
      error: (err) => {
        if (!err.ok) {
          console.error(err.message);
          this.globalLoaderService.hideLoader(false);
          return this.hasError = 'There is no connection to the server right now!';
        }
        this.globalLoaderService.hideLoader(false);
        console.error(err.error.message);
        return this.hasError = err.error.messsage;
      }
    });
  }

  userLogout() {
    if (!getSession()) { this.router.navigate(['auth/login']); return };
    this.globalLoaderService.showLoader('Loading', true);

    return this.http.get(API_URL + endpoints.API_LOGOUT, headers).subscribe({
      next: () => {
        console.log('Logged out!');
        logoutSession();
        this.setLoginInfo(null, false);
        this.hasError = null;
        this.router.navigate(['auth/login']);
      },
      error: (err) => {
        if (!err.ok) {
          console.error(err.message);
          this.globalLoaderService.hideLoader(false);
          return this.hasError = 'There is no connection to the server right now!';
        }
        console.error(err.error.message);
        this.globalLoaderService.hideLoader(false);
        this.router.navigate(['auth/login']);
        return this.hasError = err.error.message;
      }
    });
  }
}

