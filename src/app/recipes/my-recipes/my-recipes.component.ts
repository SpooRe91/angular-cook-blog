import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { RecipeService } from './../recipe.service';
import { Component, OnInit } from '@angular/core';

import { IRecipe } from './../../interfaces/recipeInterface';
import { AuthService } from './../../auth/auth.service';
import { GlobalLoaderService } from 'src/app/shared/services/global-loader.service';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.scss'],
})
export class MyRecipesComponent implements OnInit {

  sortingType = 'newest';
  myRecipes: IRecipe[] | null = null;
  filtered: IRecipe[] | null | undefined;

  constructor(
    private title: Title,
    public authService: AuthService,
    public recipeService: RecipeService,
    public globalLoaderService: GlobalLoaderService,
  ) {
    this.title.setTitle('My recipes');
  }

  handleSorting() {
    if (this.filtered?.length) {
      return (
        (this.filtered?.reverse() && this.sortingType === 'oldest')
          ? this.sortingType = 'newest'
          : this.sortingType = 'oldest'
      )
    }
    return (this.myRecipes)
      ? (this.myRecipes?.reverse() && this.sortingType === 'oldest')
        ? this.sortingType = 'newest'
        : this.sortingType = 'oldest'
      : this.authService.hasError = 'There are no receipes to load or the server is not responding!'
  }

  handleOnSearch(form: NgForm) {

    if (form.value.name) {
      return this.filtered = this.myRecipes?.filter((a) => a.name.toLowerCase()
        .includes(form.value.name.toLowerCase()));
    }
    return this.filtered = null;
  }


  ngOnInit(): void {
    this.globalLoaderService.showLoader("Loading", true);
    this.recipeService.loadMyRecipes().subscribe({
      next: (value) => {
        if (!value) { return }
        this.myRecipes = value;
        console.log(this.myRecipes);
        this.globalLoaderService.hideLoader(false);
      }, error: (err) => {
        if (err.error.message) {
          console.error(err.error.message);
          this.globalLoaderService.hideLoader(false);
          return this.authService.hasError = err.error.message;
        }
        this.globalLoaderService.hideLoader(false);
        return this.authService.hasError = 'There is no connection to the server right now!';
      }
    });
  };

  ngOnDestroy(): void {
    this.authService.hasError = null;
  }
}
