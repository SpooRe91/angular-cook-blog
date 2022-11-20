import { Component, OnInit } from '@angular/core';

import { IRecipe } from './../../interfaces/recipeInterface';
import { GlobalLoaderService } from './../../core/services/global-loader.service';
import { RecipeService } from '../recipe.service';

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
    this.loadUsers();
  }

  loadUsers(): void {
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

  reloadUsersHandler(): void {
    this.loadUsers();
  }
}
