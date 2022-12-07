import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { reqHeaders } from './../constants/requestHeaders';
import { AuthService } from './../auth/auth.service';
import { API_URL, endpoints } from './../API/endpoints';
import { GlobalLoaderService } from '../shared/services/global-loader.service';
import { ICreateRecipe, IRecipe } from './../interfaces/recipeInterface';

@Injectable({
  providedIn: 'root'
})

export class RecipeService {

  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    public globalLoaderService: GlobalLoaderService
  ) {

  }
  isOwner = false;
  recipeDetails: IRecipe | null = null;
  params: string | number = this.activatedRoute.snapshot.params['id']
  ownerId: string | number = "";

  set setOwner(status: boolean) {
    this.isOwner = status;
  }

  get getOwnerOfOne() {
    this.loadRecipeDetails(this.params).subscribe({
      next: (value) => {
        if (value !== null && value !== undefined) {
          this.ownerId = value?.owner.toString()
        }
      }
    })
    if (this.ownerId === this.authService.user?.id?.toString()) {
      return this.setOwner = true;
    } else {
      return this.setOwner = false;
    }
  }

  loadRecipes() {
    return this.http.get<IRecipe[]>(API_URL + endpoints.API_BROWSE);
  }

  loadRecipeDetails(id: number | string) {
    return this.http.get<IRecipe>(API_URL + endpoints.API_DETAILS(id));
  }

  handleClearError() {
    if (this.authService.hasError) {
      this.authService.hasError = null;
      this.router.navigate(['/']);
    }
  }

  createRecipe(recipeData: ICreateRecipe) {
    this.globalLoaderService.showLoader("Loading", true);
    return this.http.post<IRecipe>(API_URL + endpoints.API_ADD, recipeData, reqHeaders).subscribe({
      next: (res) => {
        if (!res._id) { return };
        console.log(res);
        this.router.navigate(['recipe/browse']);
        this.globalLoaderService.hideLoader(false);
      },
      error: (err) => {
        if (err.error.message) {
          console.error(err);
          this.globalLoaderService.hideLoader(false);
          return this.authService.hasError = err.error.message;
        }
        this.globalLoaderService.hideLoader(false);
        return this.authService.hasError = 'There is no connection to the server right now!';
      }
    });
  }
}
