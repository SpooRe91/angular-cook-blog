import { Title } from '@angular/platform-browser';
import { RecipeService } from './../recipe.service';
import { Component, OnInit } from '@angular/core';

import { IRecipe } from './../../interfaces/recipeInterface';
import { AuthService } from './../../auth/auth.service';
import { GlobalLoaderService } from 'src/app/shared/services/global-loader.service';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.scss']
})
export class MyRecipesComponent implements OnInit {

  myRecipes: IRecipe[] | null = null;
  sortingType = 'newest';

  constructor(
    private title: Title,
    public authService: AuthService,
    public recipeService: RecipeService,
    public globalLoaderService: GlobalLoaderService,
  ) {
    this.title.setTitle('My recipes');
  }

  handleSorting() {
    return (this.myRecipes)
      ? (this.myRecipes?.reverse() && this.sortingType === 'oldest')
        ? this.sortingType = 'newest'
        : this.sortingType = 'oldest'
      : this.authService.hasError = 'There are no receipes to load or the server is not responding!'
  }

  ngOnInit(): void {
    this.globalLoaderService.showLoader("Loading", true);
    this.recipeService.loadMyRecipes().subscribe({

      next: (value) => {
        console.log(value);
        if (value !== null && value !== undefined) {
          this.myRecipes = value.filter(a => a.owner === this.authService.user?.id).filter(a => !a.isDeleted);
          this.globalLoaderService.hideLoader();
          console.log(this.myRecipes);
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
}
