import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalLoaderService } from './../../core/services/global-loader.service';
import { IRecipe } from './../../interfaces/recipeInterface';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detials',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class RecipeDetails implements OnInit {

  alt: string = "#";
  recipeDetails: IRecipe | null = null;
  params: string | number;

  constructor(
    private recipeService: RecipeService,
    public globalLoaderService: GlobalLoaderService,
    private activatedRoute: ActivatedRoute
  ) {

    this.params = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.globalLoaderService.showLoader("Loading");
    this.recipeService.loadRecipeDetails(this.params).subscribe({

      next: (value) => {
        if (value === null && value === undefined) { return }

        this.recipeDetails = value;
        this.globalLoaderService.hideLoader();
        console.log(this.recipeDetails);
        return
      },
      error: (err) => console.log(err)
    });
  };
};
