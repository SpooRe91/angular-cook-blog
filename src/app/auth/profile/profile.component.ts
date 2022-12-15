import { Title } from '@angular/platform-browser';
import { IRecipe } from './../../interfaces/recipeInterface';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { IUser } from './../../interfaces/user';
import { AuthService } from 'src/app/auth/auth.service';
import { RecipeService } from './../../recipes/recipe.service';
import { GlobalLoaderService } from 'src/app/shared/services/global-loader.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  params: string;
  profileData: IUser | null = null;
  myRecipes: IRecipe[] | null = null;
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
    this.recipeService.loadMyRecipes()
      .subscribe({
        next: (value) => {
          if (value) {
            this.myRecipes = value;
            console.log(this.myRecipes);
            this.title.setTitle(`Profile`);
            this.globalLoaderService.hideLoader(false);
          }
        }, error: (err) => {
          if (!err.error.message) {
            console.error(err.message);
            this.globalLoaderService.hideLoader(false);
            return this.authService.hasError = 'There is no connection to the server right now!';
          }
          console.error(err.error.message);
          this.globalLoaderService.hideLoader(false);
          return this.authService.hasError = err.error.messsage;
        }
      });

    this.authService.getUser(this.params).subscribe({
      next: (res) => {
        console.log(res);

        if (!res.email) { return };
        this.profileData = res;
        this.globalLoaderService.hideLoader(false);
      },
      error: (err) => {
        if (err.error.message) {
          this.globalLoaderService.hideLoader(false);
          console.error(err.error.message);
          return this.authService.hasError = err.error.message;
        };
        console.error(err.message);
        this.globalLoaderService.hideLoader(false);
        return this.authService.hasError = 'There is no connection to the server right now!';
      }
    });
  }
}
