import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IRecipe } from './../interfaces/recipeInterface';
import { API_URL, endpoints } from './../API/endpoints';

@Injectable({
  providedIn: 'root'
})

export class RecipeService {

  constructor(private http: HttpClient) { }

  loadRecipes() {
    return this.http.get<IRecipe[]>(API_URL + endpoints.API_BROWSE);
  }

  loadRecipeDetails(id: number | string) {
    return this.http.get<IRecipe>(API_URL + endpoints.API_DETAILS(id));
  }
}
