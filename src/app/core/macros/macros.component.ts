import { RecipeService } from './../../recipes/recipe.service';
import { Component, OnInit } from '@angular/core';

import { IMacros } from 'src/app/interfaces/macrosInterface';
import { CoreService } from './../core-service.service';
import { AuthService } from 'src/app/auth/auth.service';
import { GlobalLoaderService } from '../../shared/services/global-loader.service';


@Component({
  selector: 'app-macros',
  templateUrl: './macros.component.html',
  styleUrls: ['./macros.component.scss']
})
export class MacrosComponent implements OnInit {

  macroNutrients: IMacros[] | null = null;

  constructor(
    public authService: AuthService,
    public recipeService: RecipeService,
    public globalLoaderService: GlobalLoaderService,
    public coreService: CoreService,
  ) { }

  ngOnInit(): void {
    this.globalLoaderService.showLoader("Loading");
    this.recipeService.loadMacros().subscribe({
      next: (value) => {
        if (value !== null) {
          this.macroNutrients = value.sort((a: IMacros, b: IMacros) => a.calories > b.calories ? 1 : -1);
          this.globalLoaderService.hideLoader();
          console.log(this.macroNutrients);
          return;
        }
        this.macroNutrients = null;
      }, error: (err) => {
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

  ngOnDestroy(): void {
    this.authService.hasError = null;
  }
};
