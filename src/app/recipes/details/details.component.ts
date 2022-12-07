import { AuthService } from './../../auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { RecipeService } from '../recipe.service';
import { GlobalLoaderService } from '../../shared/services/global-loader.service';


@Component({
  selector: 'app-recipe-detials',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class RecipeDetails implements OnInit {

  alt: string = "#";

  params: string | number;
  date: string | Date = '';

  constructor(
    public recipeService: RecipeService,
    public globalLoaderService: GlobalLoaderService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    this.params = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.globalLoaderService.showLoader("Loading");
    this.recipeService.loadRecipeDetails(this.params).subscribe({

      next: (value) => {
        if (value === null && value === undefined) { return }
        this.recipeService.recipeDetails = value;
        this.recipeService.getOwnerOfOne;
        this.date = new Date(value.createdAt.toString());
        this.date = this.date.toString()
          .slice(0, this.date
            .toString()
            .indexOf('GMT'));
        console.log(typeof this.date);
        console.log(this.recipeService.recipeDetails);
        this.globalLoaderService.hideLoader();
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
