import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { IRecipe } from './../../interfaces/recipeInterface';
import { AuthService } from 'src/app/auth/auth.service';
import { RecipeService } from '../recipe.service';
import { GlobalLoaderService } from 'src/app/shared/services/global-loader.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnDestroy, OnInit {

  currentRecipe: IRecipe | null = null;
  recipeDetails: IRecipe | null = null;
  params: string | number = this.activatedRoute.snapshot.params['id'];

  constructor(
    private title: Title,
    private router: Router,
    public authService: AuthService,
    public recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    public globalLoaderService: GlobalLoaderService
  ) {
    this.title.setTitle('Edit recipe')
  }

  ngOnInit() {
    this.recipeService.loadRecipeDetails(this.params)
      .subscribe({
        next: (res) => {
          if (res.owner !== this.authService.user?.id) {
            this.authService.hasError = "You don't have access to this resource!";
            this.router.navigate(['/']);
          }
          console.log(!!res);
          this.globalLoaderService.hideLoader(false);
          return this.currentRecipe = res;
        },
        error: (err) => {
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

  handleOnSubmitForm(form: NgForm | null) {
    if (form?.invalid) { return; };
    this.globalLoaderService.showLoader("Loading", true);
    this.authService.hasError = null;

    if (!!this.currentRecipe) {

      this.recipeService.editRecipe(this.params, this.currentRecipe)
        .subscribe({
          next: () => {
            this.router.navigate([`recipe/details/${this.params}`]);
            this.globalLoaderService.hideLoader(false);
          },
          error: (err) => {
            if (err.error.message) {
              console.error(err);
              this.globalLoaderService.hideLoader(false);
              return this.authService.hasError = err.error.message;
            }
            this.globalLoaderService.hideLoader(false);
            return this.authService.hasError = 'There is no connection to the server right now!';
          }
        });
    }
  }

  ngOnDestroy(): void {
    if (this.authService.hasError && this.authService.isRedirected) {
      this.authService.hasError = null;
      this.authService.isRedirected = false;
      this.globalLoaderService.hideLoader(false);
    }
    return;
  }
}
