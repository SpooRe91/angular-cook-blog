import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first, Observable, tap } from 'rxjs';

import { IMacros } from 'src/app/interfaces/macrosInterface';
import { IRecipeForm, IRecipe } from './../interfaces/recipeInterface';

import { reqHeaders } from './../constants/requestHeaders';
import { AuthService } from './../auth/auth.service';
import { API_URL, endpoints } from './../API/endpoints';
import { GlobalLoaderService } from '../shared/services/global-loader.service';

@Injectable({
  providedIn: 'root'
})

export class RecipeService {

  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpClient,
    public globalLoaderService: GlobalLoaderService
  ) {

  }
  isOwner = false;
  recipeDetails: IRecipe | null = null;
  ownerId: string | number = "";
  recipeList: IRecipe[] | null = null;

  setOwner(status: boolean) {
    this.isOwner = status;
  }

  loadRecipes(): Observable<IRecipe[]> {
    return this.http.get<IRecipe[]>(API_URL + endpoints.API_BROWSE);
  }

  loadMyRecipes() {
    return this.http.get<IRecipe[]>(API_URL + endpoints.API_MYRECIPES, reqHeaders).pipe(
      tap(res => { return res }
      ));
  }

  loadMacros(): Observable<IMacros[]> {
    return this.http.get<IMacros[]>(API_URL + endpoints.API_MACROS).pipe(
      tap(res => { return res }
      ));
  }

  loadRecipeDetails(id: number | string): Observable<IRecipe> {
    return this.http.get<IRecipe>(API_URL + endpoints.API_DETAILS(id)).pipe(
      tap(res => { return res }
      ));
  }

  handleClearError(path?: string) {
    if (path) {
      this.router.navigate([path]);
      this.authService.isRedirected = true;
    }
    return this.authService.hasError = null;
  }

  createRecipe(recipeData: IRecipeForm) {
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

  editRecipe(id: number | string, recipeData: IRecipe) {
    return this.http.put(API_URL + endpoints.API_EDIT(id, recipeData), recipeData, reqHeaders).pipe(
      tap(res => { return res }
      ));
  };

  deleteRecipe(id: number | string): object {
    this.globalLoaderService.showLoader("Loading", true);
    return this.http.delete(API_URL + endpoints.API_DELETE(id), reqHeaders)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['recipe/my-recipes']);
          this.globalLoaderService.hideLoader(false);
        },
        error: (err) => {
          if (err.error.message) {
            console.error(err);
            this.globalLoaderService.hideLoader(false);
            this.router.navigate(['recipe/my-recipes']);
            return this.authService.hasError = err.error.message;
          }
          this.globalLoaderService.hideLoader(false);
          this.router.navigate(['recipe/my-recipes']);
          return this.authService.hasError = 'There is no connection to the server right now!';
        }
      });
  }
}
