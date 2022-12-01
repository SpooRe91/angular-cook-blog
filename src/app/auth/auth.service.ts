import { GlobalLoaderService } from './../core/services/global-loader.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IUser, IUserAuth } from './../interfaces/user';
import { API_URL, endpoints } from '../API/endpoints';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user!: IUser | null;
  isLogged: boolean | null = null;

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

  userLogin(loginData: IUserAuth) {
    this.http.post<IUserAuth>(API_URL + endpoints.API_LOGIN, loginData, {
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
        return (
          this.setUser(user),
          this.setUserStatus(true),
          this.globalLoaderService.hideLoader()
        )
      },
      error: (err) => {
        console.log(err.error.message);
        return err.error.message;
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
        return res;
      },
      error: (err) => {
        console.log(err.error.message);
        return err.error.message;
      }
    })
  }

}
