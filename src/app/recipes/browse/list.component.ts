import { Title } from '@angular/platform-browser';

import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { IRecipe } from './../../interfaces/recipeInterface';
import { RecipeService } from '../recipe.service';
import { GlobalLoaderService } from 'src/app/shared/services/global-loader.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit, OnDestroy {
  alt = "#";
  recipeList: IRecipe[] | null = null;
  sortingType = 'newest';
  params: string | number;

  constructor(
    private title: Title,
    public authService: AuthService,
    public recipeService: RecipeService,
    public activatedRoute: ActivatedRoute,
    public globalLoaderService: GlobalLoaderService,
  ) {
    this.params = this.activatedRoute.snapshot.params['id'];
  }



  handleSorting() {
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
          if (recipeList) {
            this.recipeList = recipeList.filter(a => !a.isDeleted).reverse();
            console.log(this.recipeList);
            this.title.setTitle(`Browse`);
            this.globalLoaderService.hideLoader(false);
            return;
          }
        }, error: (err) => {
          console.error(err.message);
          this.globalLoaderService.hideLoader(false);
          if (err.ok) { return this.authService.hasError = err.error.messsage; }
          return this.authService.hasError = 'There is no connection to the server right now!';
        }
      });
  }
  ngOnDestroy(): void {
    this.authService.hasError = null;
  }
}




