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
    this.globalLoaderService.showLoader("Loading");

    if (getSession()) {
      this.hasError = message || "";
      this.router.navigate(['home']);
      this.globalLoaderService.hideLoader();
      return;
    };
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
    this.globalLoaderService.showLoader("Loading");
    return this.http.post<IUserAuth>(API_URL + endpoints.API_LOGIN, loginData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Allow-Control-Access-Policy': "true",
        'Access-Control-Allow-Credentials': "true",
      }
    }).subscribe({
      next: (user) => {
        if (!user.email) { return };
        console.log('logged in as - ', user);

        setSession(user);
        this.setLoginInfo(user, true);
        this.router.navigate(['home']);
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
    this.globalLoaderService.showLoader('Loading');
    return this.http.post<IUserAuth>(API_URL + endpoints.API_REGISTER, registerData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Allow-Control-Access-Policy': "true",
        'Access-Control-Allow-Credentials': "true",
      }
    }).subscribe({
      next: (res) => {
        if (!res.email) { return };
        console.log('registered successfully:', res);

        this.setLoginInfo(res, true);
        this.router.navigate(['home']);
        this.globalLoaderService.hideLoader();
        return this.user;
      },
      error: (err) => {
        console.log(err.error.message);
        return this.hasError = err.error.message;
      }
    });
  }

  userLogout() {
    this.globalLoaderService.showLoader('Loading');
    if (!getSession()) { this.router.navigate(['auth/login']); return };

    return this.http.get(API_URL + endpoints.API_LOGOUT, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Allow-Control-Access-Policy': "true",
        'Access-Control-Allow-Credentials': "true",
      }
    }).subscribe({
      next: () => {
        console.log('Logged out!');
        logoutSession();
        this.setLoginInfo(null, false);
        this.hasError = null;
        this.router.navigate(['auth/login']);
        this.globalLoaderService.hideLoader();
      },
      error: (err) => {
        console.log(err.error.message);
        this.router.navigate(['auth/login']);
        return this.hasError = err.error.message;
      }
    });
  }
}

