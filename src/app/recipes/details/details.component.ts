import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalLoaderService } from './../../core/services/global-loader.service';
import { IRecipe } from './../../interfaces/recipeInterface';
import { RecipeService } from '../recipe.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-recipe-detials',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class RecipeDetails implements OnInit {

  alt: string = "#";
  recipeDetails: IRecipe | null = null;
  params: string | number;
  date: string | Date = '';
  isOwner = true;

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
        // TODO:
        // if (value.owner === user._id)
        // { this.isOwner = true }

        this.recipeDetails = value;
        this.globalLoaderService.hideLoader();
        this.date = new Date(value.createdAt.toString());
        this.date = this.date.toString()
          .slice(0, this.date
            .toString()
            .indexOf('GMT'));
        console.log(typeof this.date);
        console.log(this.recipeDetails);
        return
      },
      error: (err) => console.log(err)
    });
  };
};
