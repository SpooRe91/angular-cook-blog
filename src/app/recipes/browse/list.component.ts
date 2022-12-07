import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';

import { IRecipe } from './../../interfaces/recipeInterface';
import { RecipeService } from '../recipe.service';
import { GlobalLoaderService } from 'src/app/shared/services/global-loader.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  alt = "#";
  recipeList: IRecipe[] | null = null;
  sortingType = 'newest';


  constructor(
    public recipeService: RecipeService,
    private globalLoaderService: GlobalLoaderService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadRecipes();
  }

  handleSorting() {
    return (this.recipeList)
      ? (this.recipeList?.reverse() && this.sortingType === 'oldest')
        ? this.sortingType = 'newest'
        : this.sortingType = 'oldest'
      : this.authService.hasError = 'There are no receipes to load or the server is not responding!'
  }

  loadRecipes(): void {
    this.globalLoaderService.showLoader('Loading');
    this.recipeService.loadRecipes().subscribe({
      next: (recipeList) => {
        if (recipeList) {
          this.globalLoaderService.hideLoader();
          this.recipeList = recipeList.filter(a => !a.isDeleted).reverse();
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
  }

}
