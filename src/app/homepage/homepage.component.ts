import { Title } from '@angular/platform-browser';
import { RecipeService } from './../recipes/recipe.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { IRecipe } from '../interfaces/recipeInterface';

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
    private title: Title,
    public authService: AuthService,
    private recipeService: RecipeService,
    public globalLoaderService: GlobalLoaderService,
  ) { this.title.setTitle('Home'); }

  ngOnInit(): void {
    this.globalLoaderService.showLoader("Loading", true);
    this.recipeService.loadRecipes().subscribe({

      next: (value) => {
        if (value.length) {
          this.homePageRecipes = value.filter(x => !x.isDeleted);
          this.homePageRecipes = this.homePageRecipes
            .slice(this.homePageRecipes.length - 4, this.homePageRecipes.length)
            .reverse();
          this.globalLoaderService.hideLoader(false);
          console.log(this.homePageRecipes);
        };
      }, error: (err) => {
        console.error(err.message);
        this.globalLoaderService.hideLoader(false);
        if (err.ok) { return this.authService.hasError = err.error.messsage; }
        if (err.ok && this.authService.isRedirected) { return this.authService.hasError = null; }
        return this.authService.hasError = 'There is no connection to the server right now!';
      }
    });
  };

  ngOnDestroy(): void {
    this.authService.hasError = null;
  }
};
