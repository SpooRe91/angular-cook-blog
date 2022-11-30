import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { endpoints, API_URL } from './API/endpoints';
import { IRecipe } from './interfaces/recipeInterface';
import { IMacros } from './interfaces/macrosInterface';

const apiUrl = API_URL;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  getAllMeals() {
    return this.httpClient.get<IRecipe[]>(apiUrl + endpoints.API_BROWSE);
  }

  getMacros() {
    return this.httpClient.get<IMacros[]>(apiUrl + endpoints.API_MACROS);
  }
}
