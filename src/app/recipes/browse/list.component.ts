import { Title } from '@angular/platform-browser';

import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { IRecipe } from './../../interfaces/recipeInterface';
import { AuthService } from './../../auth/auth.service';
import { RecipeService } from '../recipe.service';
import { GlobalLoaderService } from 'src/app/shared/services/global-loader.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit, OnDestroy {
  alt = "#";
  params: string | number = '';
  recipeList: IRecipe[] | null = null;
  filtered: IRecipe[] | null | undefined;
  sortingType = 'newest';


  constructor(
    private title: Title,
    public authService: AuthService,
    public recipeService: RecipeService,
    public globalLoaderService: GlobalLoaderService,
  ) {
    this.title.setTitle(`Browse`);
  }

  handleOnSearch(form: NgForm) {

    if (form.value.name) {
      return this.filtered = this.recipeList?.filter((a) => a.name.toLowerCase()
        .includes(form.value.name.toLowerCase()));
    }
    return this.filtered = null;
  }

  handleSorting() {
    if (this.filtered?.length) {
      return (
        (this.filtered?.reverse() && this.sortingType === 'oldest')
          ? this.sortingType = 'newest'
          : this.sortingType = 'oldest'
      )
    }
    return (this.recipeList)
      ? (this.recipeList?.reverse() && this.sortingType === 'oldest')
        ? this.sortingType = 'newest'
        : this.sortingType = 'oldest'
      : this.authService.hasError = 'There are no receipes to load or the server is not responding!'
  }
  ngOnInit(): void {

    this.globalLoaderService.showLoader("Loading", true);
    this.recipeService.loadRecipes()
      .subscribe({
        next: (recipeList) => {
          if (recipeList.length && recipeList !== null) {
            this.recipeList = recipeList.filter(a => !a.isDeleted).reverse();
            console.log(this.recipeList);
            this.globalLoaderService.hideLoader(false);
          }
          return null;
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
  }
  ngOnDestroy(): void {
    this.authService.hasError = null;
  }
}




