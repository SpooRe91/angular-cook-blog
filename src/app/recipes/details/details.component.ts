import { Title } from '@angular/platform-browser';
import { AuthService } from './../../auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { RecipeService } from '../recipe.service';
import { GlobalLoaderService } from '../../shared/services/global-loader.service';
import { first } from 'rxjs';


@Component({
  selector: 'app-recipe-detials',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class RecipeDetails implements OnInit {

  alt: string = "#";
  params: string | number;
  date: string | Date = '';
  toDelete: boolean = false;

  constructor(
    private title: Title,
    public authService: AuthService,
    public recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    public globalLoaderService: GlobalLoaderService,
  ) {
    this.params = this.activatedRoute.snapshot.params['id'];
  }

  handleRecipeDelete(status: boolean) {
    return this.toDelete = status;
  }

  handleDeleteConfirm() {
    if (this.toDelete) {
      return this.recipeService.deleteRecipe(this.params);
    }
    return;
  }

  ngOnInit(): void {
    this.globalLoaderService.showLoader("Loading", true);
    this.recipeService.loadRecipeDetails(this.params).
      pipe(first()).subscribe({
        next: (value) => {
          if (!value) { return };
          this.recipeService.recipeDetails = value;
          this.globalLoaderService.hideLoader();
          this.title.setTitle(`Details ${this.recipeService.recipeDetails.name}`);
          return
        },
        error: (err) => {
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
};
