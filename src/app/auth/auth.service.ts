import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IUser, IUserAuth } from './../interfaces/user';
import { API_URL, endpoints } from '../API/endpoints';
import { GlobalLoaderService } from './../core/services/global-loader.service';
import { setSession, getSession, logoutSession } from '../API/session';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user!: IUser | null;
  isLogged: boolean | null = null;
  hasError: null | string = null;

  setUserStatus(status: boolean) {
    return this.isLogged = status;
  }

  setUser(user: IUser | null) {
    return this.user = user;
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private globalLoaderService: GlobalLoaderService,
  ) { }

  handleClearError() {
    return this.hasError = null;
  }

  checkIfLogged() {
    if (getSession()) {
      this.globalLoaderService.showLoader("Loading");
      this.hasError = "You are already logged in!";
      this.router.navigate(['home']);
      this.globalLoaderService.hideLoader();
    };
    return;
  }

  userLogin(loginData: IUserAuth) {
    return this.http.post<IUserAuth>(API_URL + endpoints.API_LOGIN, loginData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Allow-Control-Access-Policy': "true",
        'Access-Control-Allow-Credentials': "true",
      }
    }).subscribe({
      next: (user) => {
        this.globalLoaderService.showLoader("Loading");
        if (!user.email) { return };
        console.log('logged in as - ', user);
        this.router.navigate(['home']);

        setSession(user);
        this.setUser(user);
        this.setUserStatus(true);
        this.globalLoaderService.hideLoader();
      },
      error: (err) => {
        console.log(err.error.message);
        console.error(err.error.message);
        return this.hasError = err.error.message;
      }
    })
  }

  userRegister(registerData: IUserAuth) {
    return this.http.post<IUserAuth>(API_URL + endpoints.API_REGISTER, registerData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Allow-Control-Access-Policy': "true",
        'Access-Control-Allow-Credentials': "true",
      }
    }).subscribe({
      next: (res) => {
        this.globalLoaderService.showLoader('Loading');
        if (!res.email) { return };
        console.log('registered successfully:', res);
        this.setUserStatus(true);
        this.setUser(res);
        this.globalLoaderService.hideLoader();
        this.router.navigate(['home']);
        return this.user;
      },
      error: (err) => {
        console.log(err.error.message);
        return this.hasError = err.error.message;
      }
    });
  }

  userLogout() {
    return this.http.get(API_URL + endpoints.API_LOGOUT, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Allow-Control-Access-Policy': "true",
        'Access-Control-Allow-Credentials': "true",
      }
    }).subscribe({
      next: () => {
        this.globalLoaderService.showLoader('Logging out');
        console.log('Logged out!');
        this.user = null;
        this.isLogged = false;
        logoutSession();
        this.globalLoaderService.hideLoader();
        this.router.navigate(['auth/login']);
      },
      error: (err) => {
        console.log(err.error.message);
        this.router.navigate(['auth/login']);
        return this.hasError = err.error.message;
      }
    })
  }
}
