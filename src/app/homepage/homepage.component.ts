import { Component, OnInit, OnDestroy } from '@angular/core';

import { IRecipe } from '../interfaces/recipeInterface';

import { ApiService } from '../api.service';
import { AuthService } from './../auth/auth.service';
import { GlobalLoaderService } from '../shared/services/global-loader.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, OnDestroy {
  path: string = "../../assets/spaghetti-with-pesto-prawns-served-plate.jpg";
  alt: string = '#';

  homePageRecipes: IRecipe[] | null = null;

  constructor(
    private apiService: ApiService,
    public globalLoaderService: GlobalLoaderService,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.globalLoaderService.showLoader("Loading");
    this.apiService.getAllMeals().subscribe({

      next: (value) => {
        if (value !== null && value !== undefined) {
          this.homePageRecipes = value.slice(value.length - 4, value.length);
          this.globalLoaderService.hideLoader();
          console.log(this.homePageRecipes);
        }
      }, error: (err) => {
        if (!err.ok) {
          console.error(err.message);
          this.globalLoaderService.hideLoader(false);
          return this.authService.hasError = 'There is no connection to the server right now!';
        }
        console.error(err.error.message);
        this.globalLoaderService.hideLoader(false);
        return this.authService.hasError = err.error.messsage;
      }
    });
  };

  ngOnDestroy(): void {
    this.authService.hasError = null;
  }
};
