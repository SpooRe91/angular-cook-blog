import { Router } from '@angular/router';
// import { IUser, IUserLogin } from './../interfaces/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import { IUser } from '../interfaces';
import { API_URL, endpoints } from '../API/endpoints';
import { IUser } from '../interfaces';
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
  ) { }

  userLogin<IUserLogin>(loginData: IUserLogin) {
    return this.http.post(API_URL + endpoints.API_LOGIN, loginData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Allow-Control-Access-Policy': "true",
        'Access-Control-Allow-Credentials': "true",
      }
    }).subscribe({
      next: (value) => {
        if (!value.hasOwnProperty('email')) { return };
        console.log('logged in');
        this.router.navigate(['home']);
        return (this.setUser(value), this.setUserStatus(true));
      },
      error: (err) => {
        console.log(err.error.message);
        return;
      }
    })
  }

}
