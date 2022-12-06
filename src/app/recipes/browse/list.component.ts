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

  constructor(
    private recipeService: RecipeService,
    private globalLoaderService: GlobalLoaderService
  ) { }

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes(): void {
    this.globalLoaderService.showLoader('Loading');
    this.recipeService.loadRecipes().subscribe({
      next: (recipeList) => {
        if (recipeList !== undefined && recipeList !== null) {
          this.globalLoaderService.hideLoader();
          this.recipeList = recipeList;
        }
      }
    });
  }

}
