import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../environments/environment";
import { endpoints } from './API/endpoints';
import { IRecipe } from './interfaces/recipeInterface';
import { IMacros } from './interfaces/macrosInterface';

const apiUrl = environment.apiUrl;

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
