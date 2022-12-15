import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { IMacros } from 'src/app/interfaces/macrosInterface';
import { CoreService } from './../core-service.service';
import { AuthService } from 'src/app/auth/auth.service';
import { RecipeService } from './../../recipes/recipe.service';
import { GlobalLoaderService } from '../../shared/services/global-loader.service';


@Component({
  selector: 'app-macros',
  templateUrl: './macros.component.html',
  styleUrls: ['./macros.component.scss']
})
export class MacrosComponent implements OnInit {

  macroNutrients: IMacros[] | null = null;
  filtered: IMacros[] | null | undefined;

  constructor(
    private title: Title,
    public authService: AuthService,
    public coreService: CoreService,
    public recipeService: RecipeService,
    public globalLoaderService: GlobalLoaderService,
  ) { this.title.setTitle('Nutrition table') }

  handleOnSearch(form: NgForm) {
    console.log(form.value.name);
    console.log(this.filtered);
    if (form.value.name) {
      return this.filtered = this.macroNutrients?.filter((a) => a.name.toLowerCase()
        .includes(form.value.name.toLowerCase()));
    }
    return this.filtered = null;
  }

  ngOnInit(): void {
    this.globalLoaderService.showLoader("Loading", true);
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
        console.error(err.message);
        this.globalLoaderService.hideLoader(false);
        if (err.ok) { return this.authService.hasError = err.error.messsage; }
        return this.authService.hasError = 'There is no connection to the server right now!';
      }
    });
  };

  ngOnDestroy(): void {
    this.authService.hasError = null;
  }
};
